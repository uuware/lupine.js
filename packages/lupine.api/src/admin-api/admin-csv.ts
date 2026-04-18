import { ServerResponse } from 'http';
import { exportCSVData, exportCSVHead, Logger, Db } from 'lupine.api';

const logger = new Logger('admin-csv');

export const exportCSVTables = async (db: Db, tables: string[], res: ServerResponse) => {
  exportCSVHead('all-tables-' + new Date().toJSON().replace(/:/g, '-'), res);
  for (const i in tables) {
    await exportCSVData(db, tables[i], res);
    res.write('\r\n');
  }
  res.end();
  return true;
};
