import { CssProps } from 'lupine.components';

export const DesktopFooter = (props: { title: string }) => {
  const css: CssProps = {
    display: 'flex',
    padding: '0 32px 16px',
    '.d-footer-cp': {
      padding: '1px 15px',
      margin: 'auto',
    },
  };
  return (
    <div css={css} class='d-footer-box'>
      <div class='d-footer-cp'>{props.title}</div>
    </div>
  );
};
