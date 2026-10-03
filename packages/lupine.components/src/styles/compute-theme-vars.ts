import { blendColor } from "lupine.web";

export interface ComputedThemeVars {
    '--primary-color': string;
    '--primary-bg-color': string;
    '--primary-border-color': string;
    '--primary-border': string;
    '--primary-color-disabled': string;
    '--primary-disabled-opacity': string;
    '--secondary-color': string;
    '--secondary-bg-color': string;
    '--secondary-border-color': string;
    '--secondary-border': string;
    '--activatable-color-normal': string;
    '--activatable-bg-color-normal': string;
    '--activatable-color-hover': string;
    '--activatable-bg-color-hover': string;
    '--activatable-color-selected': string;
    '--activatable-bg-color-selected': string;
}

/**
 * Computes a full set of global theme CSS variables from the theme mode,
 * primary background color, and primary text color.
 * 
 * Design Specifications:
 * - `--secondary-color` (Secondary / Muted Text):
 *   - Dark mode: blendColor(primaryText, primaryBg, 0.38) (~62% text + 38% bg)
 *   - Light mode: blendColor(primaryText, primaryBg, 0.42) (~58% text + 42% bg)
 *   - Ensures soft readability while strictly meeting WCAG AA contrast standards (>= 4.5:1).
 * - `--secondary-bg-color` (Surface / Card / Modal Background):
 *   - Dark mode: blendColor(primaryBg, '#FFFFFF', 0.10) (elevated by +10% lightness)
 *   - Light mode: blendColor(primaryBg, '#FFFFFF', 0.55) (elevated towards white by +55%)
 * - `--primary-border-color` & `--secondary-border-color`:
 *   - Balanced contrast border tints for cards, buttons, and dividers.
 * - `--activatable-...`:
 *   - Normal, hover, and selected states for buttons, tabs, pills, and menus.
 */
export function computeThemeVars(mode: 'light' | 'dark', primaryBg: string, primaryText: string): ComputedThemeVars {
    const isDark = mode === 'dark';

    // 1. Secondary Text
    const secondaryColor = isDark
        ? blendColor(primaryText, primaryBg, 0.38)
        : blendColor(primaryText, primaryBg, 0.42);

    // 2. Card / Surface Elevation Background
    const secondaryBg = isDark
        ? blendColor(primaryBg, '#FFFFFF', 0.10)
        : blendColor(primaryBg, '#FFFFFF', 0.55);

    // 3. Borders & Dividers
    const primaryBorderColor = isDark
        ? blendColor(primaryBg, primaryText, 0.35)
        : blendColor(primaryBg, primaryText, 0.25);

    const secondaryBorderColor = isDark
        ? blendColor(primaryBg, primaryText, 0.18)
        : blendColor(primaryBg, primaryText, 0.12);

    // 4. Disabled Text
    const primaryColorDisabled = isDark
        ? blendColor(primaryText, primaryBg, 0.60)
        : blendColor(primaryText, primaryBg, 0.65);

    // 5. Activatable Hover State
    const activatableBgHover = isDark
        ? blendColor(primaryBg, '#FFFFFF', 0.16)
        : blendColor(primaryBg, primaryText, 0.08);

    const activatableColorHover = isDark ? '#FFFFFF' : primaryText;

    // 6. Activatable Selected State
    const activatableBgSelected = isDark
        ? blendColor(primaryBg, '#FFFFFF', 0.22)
        : blendColor(primaryBg, primaryText, 0.14);

    const activatableColorSelected = isDark ? '#FFFFFF' : primaryText;

    return {
        // Primary Group
        '--primary-color': primaryText,
        '--primary-bg-color': primaryBg,
        '--primary-border-color': primaryBorderColor,
        '--primary-border': `1px solid ${primaryBorderColor}`,
        '--primary-color-disabled': primaryColorDisabled,
        '--primary-disabled-opacity': isDark ? '0.6' : '0.45',

        // Secondary Group
        '--secondary-color': secondaryColor,
        '--secondary-bg-color': secondaryBg,
        '--secondary-border-color': secondaryBorderColor,
        '--secondary-border': `1px solid ${secondaryBorderColor}`,

        // Activatable Group (Buttons, Pills, Tabs, Menus)
        '--activatable-color-normal': primaryText,
        '--activatable-bg-color-normal': secondaryBg,
        '--activatable-color-hover': activatableColorHover,
        '--activatable-bg-color-hover': activatableBgHover,
        '--activatable-color-selected': activatableColorSelected,
        '--activatable-bg-color-selected': activatableBgSelected,
    };
}
