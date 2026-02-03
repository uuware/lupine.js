import { CssProps, RefProps } from 'lupine.components';
import { pressLoad, pressProcessUrl } from '../services/press-load';

export const PressSidemenu = (props: { sidebar: any[] }) => {
  const ref: RefProps = {};
  const css: CssProps = {
    width: '100%',
    padding: '0 8px 8px',
    height: 'max-content',
    // overflowY: 'auto',
    '.&-item': {
      marginBottom: '0.3rem',
      display: 'block',
      color: 'var(--text-color)',
      textDecoration: 'none',
      '&:hover': {
        color: 'var(--primary-accent-color)',
      },
      transition: 'color 0.2s',
    },
    '.&-item.active': {
      color: 'var(--primary-accent-color)',
      fontWeight: 'bold',
    },
    '.&-group-title': {
      fontWeight: 'bold',
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
      fontSize: '15px',
      // color: 'var(--secondary-color)',
      '&.group-level-0': {
        marginTop: '1.5rem',
        fontSize: '19px',
      },
      '&.group-level-1': {
        marginTop: '0.75rem',
        fontSize: '17px',
      },
    },
  };

  const highlight = (targetLink?: string) => {
    const link = targetLink || window.location.href;
    const items = ref.$all('&-item');
    if (items) {
      items.forEach((el: Element) => {
        el.classList.remove('active');
        const dataLink = el.getAttribute('data-link');
        if (dataLink && link.endsWith(dataLink)) {
          el.classList.add('active');
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }
  };

  ref.onLoad = async () => {
    highlight();
  };

  // Expecting props.sidebar to be already flattened by parent
  const flatList = props.sidebar || [];
  const basePadding = 1; // rem

  return (
    <aside css={css} ref={ref}>
      {flatList.map((item, index) => {
        const style = { paddingLeft: `${item.level * basePadding}rem` };

        if (item.type === 'group') {
          return (
            <div class={'&-group-title' + (' group-level-' + item.level)} style={style} key={index}>
              {item.text}
            </div>
          );
        } else {
          const target = pressProcessUrl(item.link);
          return (
            <a
              class='&-item'
              style={style}
              href='javascript:void(0)'
              data-link={target}
              onClick={() => {
                highlight(target);
                pressLoad(target);
                return false;
              }}
              key={index}
            >
              {item.text}
            </a>
          );
        }
      })}
    </aside>
  );
};
