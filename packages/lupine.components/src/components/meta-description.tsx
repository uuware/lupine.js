// import { bindPageResetEvent } from '../core/page-reset-events';

import { addMetaDataTags, encodeHtml } from 'lupine.web';

export const MetaDescription = ({ children }: { children: string }) => {
  addMetaDataTags('name:description', `<meta name="description" content="${encodeHtml(children)}">`);
  return <></>;
};

// bindPageResetEvent(() => {
//   _description.value = '';
// });
