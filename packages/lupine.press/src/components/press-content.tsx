import { CssProps, MediaQueryRange, MenuItemProps, PopupMenu, Svg, VNode } from 'lupine.components';
import { pressLoad } from '../services/press-load';
import { LayoutHome } from './press-home';
import { PageHeading } from './press-heading';
import menuIcon from '../styles/menu.svg';

export const PressContent = (props: {
  children: VNode<any>;
  isHome: boolean;
  sidebar: any[];
  headings: any[];
  data: any;
}) => {
  const css: CssProps = {
    display: 'flex',
    flex: 1,
    maxWidth: '100vw',
    margin: '0 auto',
    width: '100%',
    '.press-content': {
      flex: 1,
      padding: props.isHome ? '0' : '2rem 4rem',
      width: '100%',
      // maxWidth: isHome ? '100%' : '800px',
      margin: props.isHome ? '0' : '0 auto',
      minWidth: 0,
    },
    '.page-heading-container': {
      width: '240px',
      minWidth: '240px',
      padding: '2rem 1rem',
      position: 'sticky',
      top: '64px',
      maxHeight: 'calc(100vh - 64px)',
      overflowY: 'auto',
      alignSelf: 'flex-start', // Prevent stretching to full height
      display: props.isHome || props.headings.length === 0 ? 'none' : 'block',
    },
    '.markdown-body': {
      lineHeight: 1.6,
    },
    '.press-mobile-toc': {
      display: 'none',
      // border: '1px solid var(--press-border-color)',
      borderRadius: '6px',
      alignItems: 'center',
      padding: '4px',
      position: 'fixed',
      top: '74px',
      right: '7px',
      zIndex: 90,
      fontSize: '0.9rem',
      cursor: 'pointer',
      textTransform: 'uppercase',
      backgroundColor: 'var(--primary-bg-color)',
    },
    '.press-mobile-sidebar': {
      display: 'none',
      borderRadius: '6px',
      alignItems: 'center',
      padding: '4px',
      position: 'fixed',
      top: '74px',
      left: '7px',
      zIndex: 90,
      fontSize: '0.9rem',
      cursor: 'pointer',
      // can't put up level, otherwise it will override parent's same level selector
      [MediaQueryRange.TabletBelow]: {
        display: 'flex',
      },
    },
    [MediaQueryRange.MobileBelow]: {
      '.page-heading-container': {
        display: 'none',
      },
      '.press-mobile-toc': { display: 'flex' },
      '.press-content': {
        padding: props.isHome ? '0' : '2rem 1rem',
      },
    },
  };
  return (
    <main css={css}>
      {!props.isHome && props.sidebar.length > 0 && (
        <div class='press-mobile-sidebar'>
          <PopupMenu
            list={props.sidebar.map(
              (item: any) =>
                ({
                  text: item.text,
                  id: item.link || '',
                  url: item.link || '',
                  indent: item.level,
                  visible: item.type ? true : false, // Validating it's processed item
                  disabled: item.type === 'group',
                  bold: item.type === 'group',
                } as MenuItemProps)
            )}
            defaultValue='Menu'
            tips=''
            width='max-content'
            maxHeight='400px'
            align='left'
            handleSelected={(text: string, item: any) => {
              if (item && item.url) pressLoad(item.url);
            }}
            noUpdateLabel={true}
            icon={<Svg>{menuIcon}</Svg>}
          ></PopupMenu>
        </div>
      )}

      <main class='press-content'>
        {props.isHome ? <LayoutHome data={props.data} /> : <article class='markdown-body'>{props.children}</article>}
      </main>
      <aside class='page-heading-container'>
        <PageHeading headings={props.headings} />
      </aside>
      {!props.isHome && props.headings.length > 0 && (
        <div class='press-mobile-toc'>
          <PopupMenu
            list={props.headings.map(
              (h) =>
                ({
                  text: h.text,
                  id: h.id,
                  indent: h.level - 2,
                } as MenuItemProps)
            )}
            defaultValue='On this page'
            tips=''
            width='max-content'
            maxHeight='300px'
            align='right'
            handleSelected={(text: string) => {
              const cleanText = text.trim();
              const heading = props.headings.find((h) => h.text === cleanText);
              if (heading) {
                document.getElementById(heading.id)?.scrollIntoView(true);
              }
            }}
            noUpdateLabel={true}
          ></PopupMenu>
        </div>
      )}
    </main>
  );
};
