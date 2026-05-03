import { ServerResponse } from 'http';
import { Db } from '../db';

const escapeCSV = (value: any): string => {
  if (value === null || value === undefined) {
    return '\\0';
  }
  let str = '';
  if (value instanceof Date) {
    const pad = (n: number) => (n < 10 ? '0' + n : n);
    str = `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())} ${pad(value.getHours())}:${pad(value.getMinutes())}:${pad(value.getSeconds())}`;
  } else {
    str = String(value);
  }

  if (/["\r\n,]/.test(str) || str.startsWith('@')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  if (str.startsWith('\\')) {
    return `\\${str}`;
  }
  return str;
};

const parseCSVLine = (line: string): any[] => {
  if (line.startsWith('[')) {
    try {
      const parsed = JSON.parse(line);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      // fallback to normal CSV parse
    }
  }

  const result: any[] = [];
  let inQuotes = false;
  let currentVal = '';
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          currentVal += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        currentVal += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        result.push(currentVal);
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
  }
  result.push(currentVal);

  return result.map(v => {
    if (v === '\\0') return null;
    if (v.startsWith('\\')) return v.substring(1);
    return v;
  });
};

export const exportCSVData = async (db: Db, tableName: string, res: ServerResponse, where: string = '', orderBy: string = '') => {
  res.write(`@TABLE,"${tableName.replace(/"/g, '""')}"\r\n`);

  let sql = `SELECT * FROM ${tableName}`;
  if (where) {
    res.write(`@WHERE,"${where.replace(/"/g, '""')}"\r\n`);
    sql += ` WHERE ${where}`;
  }
  if (orderBy) {
    sql += ` ORDER BY ${orderBy}`;
  }

  const result = await db.select(sql);
  if (result && result.length > 0) {
    const fields = Object.keys(result[0]).join(',').toLowerCase();
    res.write(`@FIELD,"${fields.replace(/"/g, '""')}"\r\n`);
    result.forEach((row: any) => {
      const csvRow = Object.values(row).map(escapeCSV).join(',');
      res.write(`${csvRow}\r\n`);
    });
  } else {
    res.write('#no data\r\n');
  }
};

export const exportCSVHead = (fileName: string, res: ServerResponse) => {
  res.writeHead(200, {
    'Content-Type': 'text/csv',
    'Content-Disposition': 'attachment; filename=' + fileName + '.ljcsv',
  });
};

export const exportCSV = async (db: Db, tableName: string, res: ServerResponse, where: string = '', orderBy: string = '') => {
  if (tableName) {
    exportCSVHead(tableName + '-' + new Date().toJSON().replace(/:/g, '-'), res);
    await exportCSVData(db, tableName, res, where, orderBy);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Need a table name.');
  }
  res.end();
  return true;
};

export const loadCSV = async (db: Db, lines: string[], overwrite: boolean = false) => {
  let table = '';
  let insSql = '';
  const result: any = {};
  let toFields: string[] = [];
  let toFieldsIndex: number[] = [];
  let pkFields: string[] = [];
  let activePkFields: string[] = [];
  let pkIndices: number[] = [];
  for (const i in lines) {
    const line = lines[i].trim();
    if (!line || line.startsWith('#')) {
      continue;
    }
    if (line.startsWith('@TABLE,')) {
      table = line.substring(7).trim();
      if (table.startsWith('"') && table.endsWith('"')) {
        table = table.substring(1, table.length - 1).replace(/""/g, '"');
      }
      if (!result[table]) {
        result[table] = { succeeded: 0, failed: 0, errorMessage: [] };
      }

      const toTableInfo = await db.getTableInfo(table);
      toFields = toTableInfo.map((item: any) => item.name);
      pkFields = toTableInfo.filter((item: any) => item.pk > 0).map((item: any) => item.name);
    } else if (line.startsWith('@WHERE,')) {
      continue; // Ignored during import
    } else if (line.startsWith('@FIELD,')) {
      let fieldsStr = line.substring(7).trim();
      if (fieldsStr.startsWith('"') && fieldsStr.endsWith('"')) {
        fieldsStr = fieldsStr.substring(1, fieldsStr.length - 1).replace(/""/g, '"');
      }
      const allCsvFields = fieldsStr.split(',');
      const validFields: string[] = [];
      const validIndices: number[] = [];

      allCsvFields.forEach((field, index) => {
        const cleanField = field.trim().toLowerCase();
        const matchedField = toFields.find(f => f.toLowerCase() === cleanField);
        if (matchedField) {
          validFields.push(matchedField);
          validIndices.push(index);
        }
      });

      toFieldsIndex = validIndices;
      activePkFields = [];
      pkIndices = [];
      pkFields.forEach(pk => {
        const idx = validFields.findIndex(f => f === pk);
        if (idx !== -1) {
          activePkFields.push(pk);
          pkIndices.push(validIndices[idx]);
        }
      });

      if (validFields.length > 0) {
        const values = Array(validFields.length).fill('?').join(',');
        insSql = `INSERT INTO ${table} (${validFields.join(',')}) VALUES (${values})`;
      } else {
        insSql = ''; // Prevent invalid SQL if no fields match
      }
    } else {
      if (toFields.length === 0 || !insSql) {
        throw new Error('Invalid CSV format (no @TABLE or @FIELD)');
      }
      const row = parseCSVLine(line);
      let pkInfo = '';
      if (pkIndices.length > 0) {
        const pkVals = activePkFields.map((pk, i) => `${pk}=${row[pkIndices[i]]}`).join(', ');
        pkInfo = ` (Row ID: ${pkVals})`;
      }
      try {
        const values = toFieldsIndex.map((index: number) => row[index]);
        await db.execute(insSql, values);
        result[table].succeeded++;
      } catch (error: any) {
        if (overwrite && pkIndices.length > 0) {
          try {
            const delWhere = activePkFields.map(pk => `${pk}=?`).join(' AND ');
            const delValues = pkIndices.map(index => row[index]);
            await db.execute(`DELETE FROM ${table} WHERE ${delWhere}`, delValues);

            const values = toFieldsIndex.map((index: number) => row[index]);
            await db.execute(insSql, values);
            result[table].succeeded++;
            continue;
          } catch (overwriteError: any) {
            result[table].failed++;
            result[table].errorMessage.push(`Overwrite failed: ${overwriteError.message}${pkInfo}`);
          }
        } else {
          result[table].failed++;
          result[table].errorMessage.push(`${error.message}${pkInfo}`);
        }
      }
    }
  }

  return result;
};
