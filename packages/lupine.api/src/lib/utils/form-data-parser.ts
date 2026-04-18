import { IncomingMessage } from 'http';

export type FormDataFile = {
  filename: string;
  mimeType: string;
  data: Buffer;
};

export type ParsedFormData = {
  fields: Record<string, string>;
  files: Record<string, FormDataFile>;
};

export const parseFormData = (req: IncomingMessage, bodyBuffer: Buffer): Promise<ParsedFormData> => {
  return new Promise((resolve, reject) => {
    try {
      const contentType = req.headers['content-type'];
      if (!contentType || !contentType.includes('multipart/form-data')) {
        return reject(new Error('Content-Type is not multipart/form-data'));
      }

      const match = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
      if (!match) {
        return reject(new Error('No boundary found in content-type'));
      }
      const boundary = match[1] || match[2];
      const boundaryBuffer = Buffer.from('--' + boundary);

      const result: ParsedFormData = { fields: {}, files: {} };
      let offset = 0;

      while (offset < bodyBuffer.length) {
        const boundaryIdx = bodyBuffer.indexOf(boundaryBuffer, offset);
        if (boundaryIdx === -1) break;

        // Find the next boundary to determine the chunk
        const nextBoundaryIdx = bodyBuffer.indexOf(boundaryBuffer, boundaryIdx + boundaryBuffer.length);
        if (nextBoundaryIdx === -1) break; // Reached concluding boundary '--boundary--'

        // Extract the part (excluding the newline right before the next boundary)
        const partEndIdx = nextBoundaryIdx - 2; 
        const partBuffer = bodyBuffer.subarray(boundaryIdx + boundaryBuffer.length + 2, partEndIdx);

        // Find where the double newline splits Headers vs Content
        const headerEndIdx = partBuffer.indexOf(Buffer.from('\r\n\r\n'));
        if (headerEndIdx !== -1) {
          const headerString = partBuffer.subarray(0, headerEndIdx).toString('utf8');
          const dataBuffer = partBuffer.subarray(headerEndIdx + 4);

          // Parse Headers
          const dispositionMatch = headerString.match(/Content-Disposition:.* name="([^"]+)"/i);
          if (dispositionMatch) {
            const name = dispositionMatch[1];
            const filenameMatch = headerString.match(/filename="([^"]+)"/i);
            
            if (filenameMatch) {
              const filename = filenameMatch[1];
              const contentTypeMatch = headerString.match(/Content-Type: ([^\r\n]+)/i);
              const mimeType = contentTypeMatch ? contentTypeMatch[1] : 'application/octet-stream';
              
              result.files[name] = { filename, mimeType, data: dataBuffer };
            } else {
              result.fields[name] = dataBuffer.toString('utf8');
            }
          }
        }
        offset = nextBoundaryIdx;
      }
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};
