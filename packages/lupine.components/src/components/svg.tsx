// this is not a good approach because if one svg file is used in multiple places
// then the svg string will be rendered multiple times.
export const Svg = ({
  children,
  width,
  height,
  color,
}: {
  children: string;
  width?: string;
  height?: string;
  color?: string;
}) => {
  let content = children || '';
  if (content.startsWith('data:image/svg+xml,')) {
    content = decodeURIComponent(content.slice('data:image/svg+xml,'.length));
  } else if (content.includes('%') && content.includes('<svg')) {
    // Handle cases where it's encoded but prefix is missing
    content = decodeURIComponent(content);
  }

  const css: any = {
    svg: {
      maxWidth: '100%',
      maxHeight: '100%',
      width,
      height,
      fill: color,
    },
  };
  return <div css={css} dangerouslySetInnerHTML={content}></div>;
};
