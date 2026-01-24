import { CssProps } from 'lupine.components';
import { pressLoad } from '../services/press-load';

export const PressSidemenu = (props: { sidebar: any[] }) => {
  const css: CssProps = {
    width: '100%',
    padding: '0 8px 8px',
    height: 'max-content',
    // overflowY: 'auto',
    '&-item': {
      marginBottom: '0.3rem',
      display: 'block',
      color: 'var(--text-color)',
      textDecoration: 'none',
      '&:hover': {
        color: 'var(--primary-color)',
      },
    },
    '&-group-title': {
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
    '&-active': {
      color: 'var(--primary-color)',
      fontWeight: 'bold',
    },
  };

  // Expecting props.sidebar to be already flattened by parent
  const flatList = props.sidebar || [];
  const basePadding = 1; // rem

  return (
    <aside css={css}>
      {flatList.map((item, index) => {
        const style = { paddingLeft: `${item.level * basePadding}rem` };

        if (item.type === 'group') {
          return (
            <div class={'&-group-title' + (' group-level-' + item.level)} style={style} key={index}>
              {item.text}
            </div>
          );
        } else {
          return (
            <a
              class='&-item'
              style={style}
              href='javascript:void(0)'
              onClick={() => {
                pressLoad(item.link);
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
