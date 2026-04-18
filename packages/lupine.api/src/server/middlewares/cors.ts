import { ServerRequest } from '../../models';
import { ServerResponse } from 'http';

let accessControlAllowHosts: string[] = [];
export const setAccessControlAllowHost = (allowHosts: string[]) => {
  accessControlAllowHosts = allowHosts;
};

/**
 * CORS Middleware securely reflects Origin and negotiates Preflight OPTIONS calls.
 */
export const corsMiddleware = async (req: ServerRequest, res: ServerResponse, next: () => Promise<void>): Promise<void> => {
  const host = req.locals.host;
  
  if (accessControlAllowHosts.includes(host)) {
    const originHeader = req.headers.origin && req.headers.origin !== 'null' ? req.headers.origin : null;
    
    if (originHeader) {
      res.setHeader('Access-Control-Allow-Origin', originHeader);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }

    // Handle OPTIONS Preflight
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS');
      
      const reqHeaders = req.headers['access-control-request-headers'];
      if (reqHeaders) {
        res.setHeader('Access-Control-Allow-Headers', reqHeaders);
      }
      
      // Cache preflight response for 24 hours to reduce latency
      res.setHeader('Access-Control-Max-Age', '86400');
      
      res.writeHead(204);
      res.end();
      return; // Short-circuit, no further processing needed
    }
  }

  await next();
};
