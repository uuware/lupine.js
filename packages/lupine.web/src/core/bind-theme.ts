import { setCookie } from '../lib/cookie';
import { ThemesProps } from '../models';
import { isFrontEnd } from '../lib/is-frontend';
import { getEitherCookie } from './server-cookie';
import { appData, getRequestContext } from './use-request-context';

// theme name is stored per session, themes & defaultTheme are global to all sessions

export const themeCookieName = 'theme';
export const updateThemeEventName = 'updateTheme';
export const themeAttributeName = 'data-theme';
export const bindTheme = (defaultTheme: string, themes: ThemesProps) => {
  appData.defaultTheme = defaultTheme;
  appData.themes = themes;
};

export const getCurrentTheme = () => {
  let themeName = getEitherCookie(themeCookieName) as string;
  if (!themeName || !appData.themes[themeName]) {
    themeName = appData.defaultTheme;
    // if getRequestContext().themeName is set but hasn't been saved, then put it into cookie
    if (isFrontEnd() && getRequestContext().themeName && getRequestContext().themeName !== appData.defaultTheme) {
      setCookie(themeCookieName, getRequestContext().themeName);
    }
  }
  return { themeName, themes: appData.themes };
};

export const updateTheme = (themeName: string) => {
  getRequestContext().themeName = themeName;
  if (!isFrontEnd()) {
    return;
  }

  setCookie(themeCookieName, themeName);
  document.documentElement.setAttribute(themeAttributeName, themeName);

  // update theme for all iframe
  // TODO: third-party domains?
  const allIframe = document.querySelectorAll('iframe');
  for (let i = 0; i < allIframe.length; i++) {
    if (allIframe[i].contentWindow && allIframe[i].contentWindow!.top === window) {
      allIframe[i].contentWindow!.document.documentElement.setAttribute(themeAttributeName, themeName);
    }
  }

  const event = new CustomEvent(updateThemeEventName, { detail: themeName });
  window.dispatchEvent(event);
};

/**
 * Converts a HEX color string into an RGB 3-channel integer tuple.
 * Supports both 3-digit shorthand (e.g. '#fff') and 6-digit full format (e.g. '#ffffff').
 * 
 * @param hex - Hexadecimal color string.
 * @returns [r, g, b] integer tuple with values ranging from 0 to 255.
 */
export function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return [0, 0, 0];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

/**
 * Converts RGB channel values to a standard 6-digit uppercase HEX color string.
 * Automatically clamps out-of-range values to [0, 255] and rounds floating point numbers.
 * 
 * @param r - Red channel (0-255).
 * @param g - Green channel (0-255).
 * @param b - Blue channel (0-255).
 * @returns Formatted color string like '#RRGGBB'.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return '#' + [clamp(r), clamp(g), clamp(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
}

/**
 * Linearly interpolates (blends / lerps) between two HEX colors by a specified weight,
 * with optional alpha transparency.
 * 
 * Useful for:
 * 1. Generating harmonious secondary / muted text colors by tinting text with the background color.
 * 2. Creating elevated card / surface backgrounds following UI surface elevation standards.
 * 3. Computing dynamic hover, active, or disabled color states with optional alpha transparency.
 * 
 * @param hex1 - Base color (HEX format, e.g. '#25282B').
 * @param hex2 - Target blend color (HEX format, e.g. '#FFFFFF' or background color).
 * @param weight - Blend factor from 0.0 to 1.0:
 *                 - 0.0: 100% hex1 (original color untouched).
 *                 - 0.5: 50% hex1 + 50% hex2 (equal midpoint blend).
 *                 - 1.0: 100% hex2 (fully transitioned to target color).
 * @param alpha - Optional alpha opacity from 0.0 to 1.0. If omitted, returns 6-digit hex '#RRGGBB'.
 * @returns Blended color string (e.g. '#717476' or 'rgba(113, 116, 118, 0.5)').
 * 
 * @example
 * // Example 1: Generate slightly elevated card background in dark mode (+10% white)
 * const darkCardBg = blendColor('#34383D', '#FFFFFF', 0.10); // => '#484C50'
 * 
 * // Example 2: Generate softened secondary text in light mode (42% background blend)
 * const subTextColor = blendColor('#25282B', '#D9DDE2', 0.42); // => '#717476'
 * 
 * // Example 3: Generate clean, elevated card background in light mode (+55% white)
 * const lightCardBg = blendColor('#D9DDE2', '#FFFFFF', 0.55); // => '#EEF0F2'
 * 
 * // Example 4: Generate semi-transparent hover tint
 * const hoverTint = blendColor('#000000', '#FFFFFF', 0.1, 0.08); // => 'rgba(25, 25, 25, 0.08)'
 */
export function blendColor(hex1: string, hex2: string, weight: number, alpha?: number): string {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);

  const r = r1 + (r2 - r1) * weight;
  const g = g1 + (g2 - g1) * weight;
  const b = b1 + (b2 - b1) * weight;

  if (typeof alpha === 'number') {
    const clampByte = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
    const clampAlpha = Math.max(0, Math.min(1, alpha));
    return `rgba(${clampByte(r)}, ${clampByte(g)}, ${clampByte(b)}, ${clampAlpha})`;
  }

  return rgbToHex(r, g, b);
}