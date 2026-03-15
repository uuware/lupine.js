import { CssProps } from 'lupine.web';
import { appIconsCss } from '../app-icons';

export const baseCss: CssProps = {
  ...appIconsCss,
  '.user-page-placeholder': {
    width: '100%',
    height: '100%',
  },
  '.flex-center-gap-12': {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  '.icon-14': {
    fontSize: '14px',
  },
  '.icon-20-pointer': {
    fontSize: '20px',
    cursor: 'pointer',
  },
  '.icon-btn-secondary': {
    fontSize: '14px',
    marginLeft: '8px',
    color: 'var(--secondary-color)',
  },
  '.text-danger': {
    color: '#ff4d4f',
  },
  '.color-preview-box': {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    border: '1px solid var(--primary-border-color)',
  },
  '.fab-button': {
    position: 'absolute',
    right: '24px',
    bottom: '24px',
    width: '56px',
    height: '56px',
    borderRadius: '28px',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    cursor: 'pointer',
    zIndex: 10,
    fontFamily: 'monospace',
  },
  '.fab-icon': {
    fontSize: '32px',
    lineHeight: '1',
  },
  '.note-card-wrapper': {
    position: 'relative',
    marginBottom: '16px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: 'var(--cover-box-shadow)',
    backgroundColor: 'transparent',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
};
