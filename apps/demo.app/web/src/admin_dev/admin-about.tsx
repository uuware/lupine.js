import { CssProps } from 'lupine.components';

export const AdminAboutPage = () => {
  const css: CssProps = {};

  return (
    <div css={css} class='admin-about-top'>
      <div class='row-box h2'>About this application</div>
      <div class=''>
        <li>lupine.web</li>
        <li>lupine.components</li>
        <li>lupine.api</li>
      </div>
    </div>
  );
};
