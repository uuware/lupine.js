import { CssProps } from 'lupine.web';

/**
 * A collection of SVG Data URIs for demo purposes.
 *
 * Note: When configuring your build tool (like esbuild or webpack) to handle .svg imports
 * as Data URLs, the resulting string will be in this exact pure 'data:image/svg+xml,...' format.
 *
 * Therefore, you can directly do this:
 *   import themeIcon from '../styles/theme.svg';
 *
 *   export const DemoIcons = {
 *     'theme': themeIcon,
 *     'myCustomIcon': myIcon
 *   };
 *
 * Usage 1 (React/JSX Svg component):
 *   <Svg>{DemoIcons.theme}</Svg>
 *
 * Usage 2 (CSS Masking, wrapping it in url()):
 *   '.ifc-icon.theme': {
 *     maskImage: `url("${DemoIcons['theme']}")`,
 *   }
 */
export const demoIcons = {
  'bs-list': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h16M4 18h16'/%3E%3C/svg%3E`,
  'ma-home-outline': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M9 22V12h6v10'/%3E%3C/svg%3E`,
  'ma-tools': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'/%3E%3C/svg%3E`,
  'co-cil-chat-bubble': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E`,
  'ma-crown-outline': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M2 4l3 7 7-6 7 6 3-7v14H2V4z'/%3E%3C/svg%3E`,
  'ma-account-cog-outline': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4' fill='none' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E`,
  'ma-chevron-right': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 18l6-6-6-6'/%3E%3C/svg%3E`,
  'ma-email-outline': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'/%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M22 6l-10 7L2 6'/%3E%3C/svg%3E`,
  'ma-logout': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9'/%3E%3C/svg%3E`,
  'mg-arrow_back_ios_new_outlined': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 18l-6-6 6-6'/%3E%3C/svg%3E`,
  'ma-close': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M18 6L6 18M6 6l12 12'/%3E%3C/svg%3E`,
  'ma-add': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 5v14M5 12h14'/%3E%3C/svg%3E`,
  'bs-search': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'/%3E%3C/svg%3E`,
  'ma-pencil-outline': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z'/%3E%3C/svg%3E`,
};

export const demoIconsCss: CssProps = {
  '.ifc-icon': {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    maskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    WebkitMaskSize: 'contain',
    backgroundColor: 'currentColor',
  },
  '.ifc-icon.bs-list': {
    // Make sure it takes the intended color (using CSS mask if we wanted variable colors,
    // but since stroke is currentColor in the SVG, if we want it to adapt color properly
    // without JS, mask-image is best. Let's use mask-image for better theming.)
    maskImage: `url("${demoIcons['bs-list']}")`,
  },
  '.ifc-icon.ma-home-outline': {
    maskImage: `url("${demoIcons['ma-home-outline']}")`,
  },
  '.ifc-icon.ma-tools': {
    maskImage: `url("${demoIcons['ma-tools']}")`,
  },
  '.ifc-icon.co-cil-chat-bubble': {
    maskImage: `url("${demoIcons['co-cil-chat-bubble']}")`,
  },
  '.ifc-icon.ma-crown-outline': {
    maskImage: `url("${demoIcons['ma-crown-outline']}")`,
  },
  '.ifc-icon.ma-account-cog-outline': {
    maskImage: `url("${demoIcons['ma-account-cog-outline']}")`,
  },
  '.ifc-icon.ma-chevron-right': {
    maskImage: `url("${demoIcons['ma-chevron-right']}")`,
  },
  '.ifc-icon.ma-email-outline': {
    maskImage: `url("${demoIcons['ma-email-outline']}")`,
  },
  '.ifc-icon.ma-logout': {
    maskImage: `url("${demoIcons['ma-logout']}")`,
  },
  '.ifc-icon.mg-arrow_back_ios_new_outlined': {
    maskImage: `url("${demoIcons['mg-arrow_back_ios_new_outlined']}")`,
  },
  '.ifc-icon.ma-close': {
    maskImage: `url("${demoIcons['ma-close']}")`,
  },
  '.ifc-icon.ma-add': {
    maskImage: `url("${demoIcons['ma-add']}")`,
  },
  '.ifc-icon.bs-search': {
    maskImage: `url("${demoIcons['bs-search']}")`,
  },
  '.ifc-icon.ma-pencil-outline': {
    maskImage: `url("${demoIcons['ma-pencil-outline']}")`,
  },
};
