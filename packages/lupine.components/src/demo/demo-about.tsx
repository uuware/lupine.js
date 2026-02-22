import { CssProps } from 'lupine.components';

export const DemoAboutPage = () => {
  const css: CssProps = {};

  return (
    <div css={css} class='demo-about-top'>
      <div class='row-box'>This is a demo page for testing components.</div>
      <div class='row-box'></div>
    </div>
  );
};
