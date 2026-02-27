import { bindGlobalStyle, getGlobalStylesId, CssProps, RefProps, VNode } from 'lupine.web';
import { SvgSvg, SvgPath, SvgCircle, ChevronRightIcon, DotsIcon } from '../svg-props';

export type BreadcrumbItem = {
  text: string;
  url?: string;
  icon?: VNode<any>;
};

export type BreadcrumbsProps = {
  class?: string;
  style?: CssProps;
  items: BreadcrumbItem[];
  separator?: string | VNode<any>;
  autoCollapse?: boolean;
};

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const css: CssProps = {
    display: 'flex',
    width: '100%',
    minWidth: 0,
    position: 'relative',
    overflow: 'hidden',
    padding: '8px 0',
    boxSizing: 'border-box',
    '&.is-measuring .&-list, &.is-initializing .&-list': {
      position: 'absolute',
      visibility: 'hidden',
    },
    '.&-list': {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      margin: 0,
      padding: 0,
      listStyle: 'none',
      width: '100%',
    },
    '.&-item': {
      display: 'inline-flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      flexShrink: 0,
      color: 'var(--secondary-color, #6b7280)',
      fontSize: '14px',
      transition: 'color 0.2s',
    },
    '.&-item.is-active': {
      color: 'var(--primary-text-color, #111827)',
      fontWeight: '500',
    },
    '.&-item a': {
      color: 'inherit',
      textDecoration: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      transition: 'color 0.2s',
    },
    '.&-item a:hover': {
      color: 'var(--primary-text-color, #111827)',
    },
    '.&-separator': {
      display: 'inline-flex',
      margin: '0 8px',
      color: 'var(--secondary-color, #9ca3af)',
      opacity: 0.8,
      flexShrink: 0,
    },
    '.&-ellipsis': {
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2px 4px',
      margin: '0 2px',
      color: 'var(--secondary-color, #6b7280)',
      cursor: 'default',
      borderRadius: '4px',
      transition: 'background-color 0.2s, color 0.2s',
    },
  };

  const globalCssId = getGlobalStylesId(css);
  bindGlobalStyle(globalCssId, css);

  const autoCollapse = props.autoCollapse !== false;

  let ro: ResizeObserver | null = null;
  let timer: any = null;

  const ref: RefProps = {
    globalCssId,
    onLoad: async () => {
      if (!autoCollapse) return;
      const container = ref.current as HTMLElement;
      const list = ref.$('.&-list') as HTMLElement;
      if (!list) return;

      const checkOverflow = () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          const cItems = list.querySelectorAll('.collapsible-item');
          const cSeps = list.querySelectorAll('.collapsible-separator');
          const ellipsis = ref.$('.&-ellipsis') as HTMLElement;

          if (!cItems.length) {
            container.classList.remove('is-initializing');
            return;
          }

          // Reset all items to visible state
          cItems.forEach((el) => ((el as HTMLElement).style.display = ''));
          cSeps.forEach((el) => ((el as HTMLElement).style.display = ''));
          if (ellipsis) ellipsis.style.display = 'none';

          // Temporarily attach tracking class to measure unconstrained parent vs absolute list
          container.classList.add('is-measuring');
          const listWidth = list.scrollWidth;
          const containerWidth = container.clientWidth;
          container.classList.remove('is-measuring');

          if (listWidth > containerWidth) {
            if (ellipsis) ellipsis.style.display = 'inline-flex';

            for (let k = 1; k <= cItems.length; k++) {
              (cItems[k - 1] as HTMLElement).style.display = 'none';

              if (k >= 2) {
                (cSeps[k - 2] as HTMLElement).style.display = 'none';
              }

              // Synchronously check if the new layout fits
              if (list.scrollWidth <= container.clientWidth) {
                break;
              }
            }
          }

          // Reveal the component after the first layout pass
          container.classList.remove('is-initializing');
        }, 80);
      };

      ro = new ResizeObserver(() => checkOverflow());
      ro.observe(container);
    },
    onUnload: async () => {
      if (ro) ro.disconnect();
      if (timer) clearTimeout(timer);
    },
  };

  const items = props.items || [];
  const Separator = props.separator || <ChevronRightIcon />;

  return (
    <nav
      class={['&-container', autoCollapse ? 'is-initializing' : '', props.class].join(' ').trim()}
      ref={ref}
      css={props.style}
      aria-label='Breadcrumb'
    >
      <ol class='&-list'>
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;
          const isCollapsible = !isFirst && !isLast && items.length > 2;
          const isCollapsibleSeparator = isCollapsible && index > 1;

          return (
            <>
              {index > 0 && (
                <li
                  class={['&-separator', isCollapsibleSeparator ? 'collapsible-separator' : ''].join(' ').trim()}
                  aria-hidden='true'
                >
                  {Separator}
                </li>
              )}
              {index === 1 && items.length > 2 && (
                <li class='&-ellipsis' aria-hidden='true' title='More items hidden'>
                  <DotsIcon />
                </li>
              )}
              <li
                class={['&-item', isCollapsible ? 'collapsible-item' : '', isLast ? 'is-active' : ''].join(' ').trim()}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.url && !isLast ? (
                  <a href={item.url}>
                    {item.icon}
                    {item.text}
                  </a>
                ) : (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {item.icon}
                    {item.text}
                  </span>
                )}
              </li>
            </>
          );
        })}
      </ol>
    </nav>
  );
};
