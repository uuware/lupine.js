import { ServerRequest } from '../../models';
import { ServerResponse } from 'http';
import { extractHostFromOrigin, isHostTrusted } from '../../lib/utils/cors-helper';

let accessControlAllowHosts: string[] = [];
export const setAccessControlAllowHost = (allowHosts: string[]) => {
  accessControlAllowHosts = allowHosts;
};

/**
 * CORS Middleware securely checks Origin against allowlist and negotiates Preflight OPTIONS calls.
 */
export const corsMiddleware = async (req: ServerRequest, res: ServerResponse, next: () => Promise<void>): Promise<void> => {
  const origin = req.headers.origin;
  const originHost = extractHostFromOrigin(origin);

  // Fallback to app trusted hosts if accessControlAllowHosts is not explicitly configured
  const trustedHosts = accessControlAllowHosts.length > 0
    ? accessControlAllowHosts
    : req.locals?.hostPath?.hosts || [];

  const isTrusted = originHost ? isHostTrusted(originHost, trustedHosts) : false;

  if (origin && isTrusted) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  } else if (!origin) {
    // Non-credentialed fallback for requests without an Origin header
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

  await next();
};
