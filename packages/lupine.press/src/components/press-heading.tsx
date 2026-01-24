import { CssProps } from 'lupine.components';

export const PageHeading = (props: { headings: any[] }) => {
  if (props.headings.length === 0) return null;

  const css: CssProps = {
    '&-title': {
      fontWeight: 'bold',
      fontSize: '0.8rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: 'var(--primary-color)',
      marginBottom: '0.8rem',
    },
    '&-list': {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      borderLeft: '1px solid var(--press-border-color)',
    },
    '&-item': {
      padding: '0.2rem 0 0.2rem 1rem',
      fontSize: '0.85rem',
      '&.level-3': { paddingLeft: '2rem' },
      a: {
        display: 'block',
        transition: 'color 0.2s',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  };
  return (
    <div css={css}>
      <div class='&-title'>On this page</div>
      <ul class='&-list'>
        {props.headings.map((h) => (
          <li class={`&-item level-${h.level}`}>
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
