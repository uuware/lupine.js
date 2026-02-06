import {
  VNode,
  CssProps,
  MediaQueryRange,
  bindLinks,
  RefProps,
  MediaQueryMaxWidth,
  isFrontEnd,
} from 'lupine.components';
import { pressLoad } from '../services/press-load';
import { getSidebarScroll, setSidebarScroll } from '../services';

export interface PressFrameProps {
  header: VNode<any>;
  sidemenu: VNode<any>;
  sidemenuWidth?: string;
  hideSidemenu?: boolean;
  content: VNode<any>;
  css?: CssProps;
}

export const PressFrame = (props: PressFrameProps) => {
  if (isFrontEnd()) {
    // Global navigation helper requested by user
    (window as any).lpPressLoad = pressLoad;
  }

  const cssMarkdown: CssProps = {
    // used in built markdown htmls, put under some element to override global.css
    'h1, h2, h3': {
      borderBottom: '1px solid var(--press-border-color)',
      paddingBottom: '0.3em',
      marginTop: '1.5em',
      position: 'relative',
      scrollMarginTop: '80px',
      '&:first-child': { marginTop: 0 },
      '&:hover .header-anchor': { opacity: 1 },
    },
    '.header-anchor': {
      position: 'absolute',
      left: '-1.5rem',
      width: '1rem',
      opacity: 0,
      textDecoration: 'none',
      color: 'var(--press-brand-color)',
      fontSize: '0.8em',
      transition: 'opacity 0.2s',
    },
    ol: {
      listStyleType: 'disc',
    },
    'li, p': {
      margin: '0.5em 0',
    },
    pre: {
      backgroundColor: 'var(--secondary-bg-color)',
      padding: '1rem',
      borderRadius: '8px',
      overflowX: 'auto',
    },
    code: {
      fontFamily: 'var(--font-family-mono, monospace)',
    },
    img: {
      maxWidth: '100%',
    },
  };

  const cssContainer: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    minHeight: '100%',
    position: 'relative',
    ...cssMarkdown,
    ...props.css,
    '.press-frame-box': {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      maxWidth: MediaQueryMaxWidth.DesktopMax,
      margin: 'auto',
      // trick: to put two padding-top properties
      'padding-top ': 'constant(safe-area-inset-top)',
      'padding-top': 'env(safe-area-inset-top)',
    },
    '.press-frame-header': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4px 16px 4px 0px',
      width: '100%',
    },
    '.press-frame-main': {
      display: 'flex',
      flex: '1',
      flexDirection: 'row',
      overflowY: 'auto',
      scrollbarWidth: 'none',
      borderTop: '1px solid var(--press-border-color)',
      minHeight: '0',
      scrollBehavior: 'smooth',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    '.press-frame-main .padding-block': {
      padding: '0 16px',
    },
    '.press-frame-content': {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      overflowY: 'auto',
      scrollbarWidth: 'none',
    },
    '.press-frame-sidemenu': {
      width: props.sidemenuWidth || '260px',
      display: 'flex',
      borderRight: '1px solid var(--press-border-color)',
      overflowX: 'hidden',
      overflowY: 'auto',
      color: 'var(--sidebar-color)',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      // '&::-webkit-scrollbar': { width: '4px' },
      // '&::-webkit-scrollbar-thumb': { backgroundColor: 'var(--press-border-color)' },
      // backgroundColor: 'var(--sidebar-bg-color)',
    },
    [MediaQueryRange.TabletBelow]: {
      '.press-frame-sidemenu': {
        display: 'none',
      },
    },
  };

  const ref: RefProps = {
    onLoad: async (el: Element) => {
      bindLinks(el);
      const sidemenu = el.querySelector('.press-frame-sidemenu');
      if (sidemenu) {
        sidemenu.scrollTop = getSidebarScroll();
        sidemenu.addEventListener('scroll', () => {
          setSidebarScroll(sidemenu.scrollTop);
        });
      }
    },
  };

  return (
    <div ref={ref} css={cssContainer} class='press-frame'>
      <div class='press-frame-box'>
        <div class='press-frame-header'>{props.header}</div>
        <div class='press-frame-main'>
          {!props.hideSidemenu && <div class='press-frame-sidemenu'>{props.sidemenu}</div>}
          <div class='press-frame-content'>{props.content}</div>
        </div>
      </div>
    </div>
  );
};
