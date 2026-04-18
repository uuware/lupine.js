import { ServerRequest } from '../../models';
import { ServerResponse } from 'http';

/**
 * Helmet Middleware natively inserts security headers into each response.
 * This conforms to standard security practices (e.g. XSS protection, HSTS, frame options).
 */
export const helmetMiddleware = async (req: ServerRequest, res: ServerResponse, next: () => Promise<void>): Promise<void> => {
  res.setHeader('X-DNS-Prefetch-Control', 'off');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '0');
  
  await next();
};
