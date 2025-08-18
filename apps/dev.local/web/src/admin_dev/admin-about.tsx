import { CssProps } from 'lupine.components';
import { LUPINE_API_VERSION, LUPINE_COMPONENTS_VERSION, LUPINE_WEB_VERSION } from '../../../../shared-web-src';

export const AdminAboutPage = () => {
  const css: CssProps = {
  };

  return (
    <div css={css} class='admin-about-top'>
      <div class='row-box h2'>
        About this application
      </div>
      <div class=''>
        <div class='h3'>Versions</div>
        <div>
          <li>lupine.web {LUPINE_WEB_VERSION}</li>
          <li>lupine.components {LUPINE_COMPONENTS_VERSION}</li>
          <li>lupine.api {LUPINE_API_VERSION}</li>
        </div>
      </div>
    </div>
  );
};
