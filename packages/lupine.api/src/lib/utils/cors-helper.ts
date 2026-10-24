import { ServerResponse } from 'http';
import { ServerRequest } from '../../models/locals-props';

/**
 * Extracts the hostname (with port if non-default) from an Origin or Referer header.
 * Returns undefined if the header is missing or cannot be parsed.
 *
 * Examples:
 *   "https://example.com"       → "example.com"
 *   "http://localhost:8080"     → "localhost:8080"
 *   "https://sub.example.com"   → "sub.example.com"
 */
export const extractHostFromOrigin = (origin: string | undefined | null): string | undefined => {
    if (!origin || origin === 'null') return undefined;
    try {
        const url = new URL(origin);
        return url.host; // hostname:port (port only included if non-default)
    } catch {
        return undefined;
    }
};

/**
 * Returns true if the given host matches any of the trusted hosts.
 * Supports wildcard subdomain matching: a trusted host "example.com"
 * will also match "sub.example.com", "api.sub.example.com", etc.
 */
export const isHostTrusted = (host: string, trustedHosts: string[]): boolean => {
    if (trustedHosts.length === 0) return false;
    for (const trusted of trustedHosts) {
        if (trusted === '*') return true;
        if (host === trusted || host.endsWith('.' + trusted)) {
            return true;
        }
    }
    return false;
};

/**
 * Validates the Origin header against the configured trusted hosts for the
 * current request's application, and sets safe CORS headers on the response.
 *
 * - If the Origin is trusted: reflects it back with `Access-Control-Allow-Credentials: true`.
 * - If no Origin header is present: falls back to `*` (for uncredentialed public access).
 * - If the Origin is untrusted: no CORS headers are set (browser blocks the response).
 *
 * @param req The incoming server request (must have locals.hostPath populated)
 * @param res The server response to set headers on
 * @param allowCredentials Whether to allow credentials (default: true for SSR/API pages)
 * @returns The validated origin string if trusted, or null if untrusted/absent
 */
export const setSafeCorsHeaders = (
    req: ServerRequest,
    res: ServerResponse,
    allowCredentials: boolean = true
): string | null => {
    const origin = req.headers.origin;
    const originHost = extractHostFromOrigin(origin);

    // Get the trusted hosts from the app configuration for this request
    const trustedHosts = req.locals.hostPath?.hosts || [];

    if (originHost && isHostTrusted(originHost, trustedHosts)) {
        // Trusted origin: reflect it and allow credentials
        res.setHeader('Access-Control-Allow-Origin', origin as string);
        res.setHeader('Vary', 'Origin');
        if (allowCredentials) {
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        }
        return origin as string;
    }

    // No Origin header or untrusted origin
    if (!origin || origin === 'null') {
        // No origin: allow public uncredentialed access (no credentials with '*')
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Vary', 'Origin');
        return null;
    }

    // Untrusted origin: do NOT set CORS headers — browser will block the response
    res.setHeader('Vary', 'Origin');
    return null;
};
