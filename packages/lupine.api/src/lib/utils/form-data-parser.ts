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

export type FormDataParseOptions = {
  /** Maximum allowed size per individual file in bytes (default: 10 MB) */
  maxFileSize?: number;
  /** Maximum allowed total body size in bytes (default: 50 MB) */
  maxBodySize?: number;
  /** Optional MIME type allowlist. If set, files with other types are rejected. */
  allowedMimeTypes?: string[];
  /** Whether to allow all MIME types (default: false, uses a safe built-in allowlist) */
  allowAllMimeTypes?: boolean;
};

const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const DEFAULT_MAX_BODY_SIZE = 50 * 1024 * 1024; // 50 MB
const DEFAULT_ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/bmp',
  'image/svg+xml',
  'application/pdf',
  'text/plain',
  'text/csv',
  'application/json',
  'application/zip',
  'application/octet-stream',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.ms-excel',
];

/**
 * Sanitizes a filename to prevent path traversal and injection attacks.
 * - Strips directory components (path separators)
 * - Removes null bytes
 * - Removes ".." sequences
 * - Truncates to a safe length
 * - Falls back to "upload" if the result is empty
 */
const sanitizeFilename = (filename: string): string => {
  let safe = filename
    .replace(/\0/g, '') // null bytes
    .replace(/[\\/]+/g, '_') // path separators → underscore
    .replace(/\.\./g, '_') // parent dir traversal
    .replace(/[<>:"|?*]/g, '_') // reserved chars on Windows
    .trim()
    .slice(0, 255); // max filename length

  if (!safe || safe === '.' || safe === '..') {
    safe = 'upload';
  }
  return safe;
};

export const parseFormData = (
  req: IncomingMessage,
  bodyBuffer: Buffer,
  options: FormDataParseOptions = {}
): Promise<ParsedFormData> => {
  return new Promise((resolve, reject) => {
    try {
      const maxFileSize = options.maxFileSize ?? DEFAULT_MAX_FILE_SIZE;
      const maxBodySize = options.maxBodySize ?? DEFAULT_MAX_BODY_SIZE;
      const allowAllMimeTypes = options.allowAllMimeTypes ?? false;
      const allowedMimeTypes = options.allowedMimeTypes ?? DEFAULT_ALLOWED_MIME_TYPES;

      // Reject oversized bodies to prevent OOM/DoS
      if (bodyBuffer.length > maxBodySize) {
        return reject(new Error(`Request body exceeds maximum size of ${maxBodySize} bytes`));
      }

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
              const rawFilename = filenameMatch[1];
              const contentTypeMatch = headerString.match(/Content-Type: ([^\r\n]+)/i);
              const mimeType = (contentTypeMatch ? contentTypeMatch[1] : 'application/octet-stream').trim();

              // Enforce per-file size limit
              if (dataBuffer.length > maxFileSize) {
                return reject(new Error(`File "${rawFilename}" exceeds maximum size of ${maxFileSize} bytes`));
              }

              // Enforce MIME type allowlist (unless explicitly disabled)
              if (!allowAllMimeTypes && !allowedMimeTypes.includes(mimeType.toLowerCase())) {
                return reject(new Error(`File type "${mimeType}" is not allowed`));
              }

              // Sanitize filename to prevent path traversal and injection
              const safeFilename = sanitizeFilename(rawFilename);

              result.files[name] = { filename: safeFilename, mimeType, data: dataBuffer };
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
