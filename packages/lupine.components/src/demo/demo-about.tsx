import { CssProps, PageProps } from 'lupine.components';

export const DemoAboutPage = () => {
  const css: CssProps = {};

  return (
    <div css={css} class='demo-about-top'>
      <div class='row-box'>
        lupine.components: A fully-featured, out-of-the-box front-end component library designed for everyday
        development.
      </div>
      <div class='row-box'></div>
    </div>
  );
};
