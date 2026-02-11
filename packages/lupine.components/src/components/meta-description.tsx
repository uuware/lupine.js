// import { bindPageResetEvent } from '../core/page-reset-events';

import { addMetaDataTags } from 'lupine.web';
import { encodeHtml } from '../lib';

export const MetaDescription = ({ children }: { children: string }) => {
  addMetaDataTags('name:description', `<meta name="description" content="${encodeHtml(children)}">`);
  return <></>;
};

// bindPageResetEvent(() => {
//   _description.value = '';
// });
