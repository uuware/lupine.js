import { ThemeProps } from 'lupine.web';

export const sharedThemes: ThemeProps = {
  // z-index
  '--layer-inside': '100', // for inside orders
  '--layer-cover': '200',
  '--layer-header-footer': '300',
  '--layer-sidebar': '400',
  '--layer-sidebar-sub': '410',
  '--layer-slider': '500', // screen slider
  '--layer-modal': '600',
  '--layer-modal-over': '610',
  '--layer-float-window': '700',
  '--layer-actionsheet-window': '710',
  '--layer-menu': '800', // popup menu
  '--layer-menu-sub': '810',
  '--layer-notice': '900', // notice, loading, toast
  '--layer-tooltip': '2000',
  '--layer-dragged-item': '2100',
  '--layer-guide': '2500', // learning guide

  '--font-size-base': '16px',
  '--font-weight-base': '', //'400',
  '--font-family-base': 'SimSun, "Microsoft YaHei", Helvetica, Arial, sans-serif',
  '--line-height-base': '1.1',

  '--font-size-h1-l': '2.5rem', //40px
  '--font-size-h1': '2rem', //32px
  '--font-size-h2': '1.5rem', //24px
  '--font-size-h3': '1.17rem', //18.72px
  '--font-size-h3-5': '1.08rem', //17.28px
  '--font-size-h4': '1rem', //16px
  '--font-size-h4-5': '.91rem', //14.56px
  '--font-size-h5': '.83rem', //13.28px
  '--font-size-h6': '.67rem', //10.72px
  '--font-size-h6-s': '.55rem', //9.28px
  '--font-size-title': 'var(--font-size-h2)',
  '--font-size-subtitle': 'var(--font-size-h3-5)',
  '--font-size-paragraph': 'var(--font-size-h4)',
  '--font-size-paragraph-s': 'var(--font-size-h5)',

  '--input-height': '2.2rem',
  '--input-padding': '.3rem .6rem',
  '--button-height': '2.1rem',
  '--button-padding': '.3rem .9rem',

  // space for margin, padding
  '--space-ss': '.15rem',
  '--space-s': '.25rem',
  '--space-m': '.5rem',
  '--space-l': '1rem',
  '--space-ll': '2rem',

  '--border-radius-s': '2px',
  '--border-radius-m': '4px',
  '--border-radius-l': '8px',
};
