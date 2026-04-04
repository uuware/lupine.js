import { VNode } from '../jsx';
import { initializeApp } from './initialize';
import { IPageRouter } from '../models/page-router-props';

// main instance and fundamental types to be used in the FE and the BE
import { _LupineJs, RenderPageFunctionsType, PageProps } from '../models/page-props';
import { _lupineJs } from './lupine-instance';


// this should be called by the FE and also by the server side to set fetchData and others for client and server side rendering.
// And the RenderPageFunctionsType will be passed to call (generate) a page through PageProps
export const bindRenderPageFunctions = (calls: RenderPageFunctionsType) => {
  _lupineJs.renderPageFunctions = calls || {};
};
// export const getRenderPageFunctions = (): RenderPageFunctionsType => {
//   return globalThis._lupineJs.renderPageFunctions;
// }
// this is only used inside the core
export const setRenderPageProps = (props: PageProps) => {
  _lupineJs.renderPageProps = props;
};
// this is used by the code to get url info when it's executed in the FE or in the server side.
export const getRenderPageProps = (): PageProps => {
  return _lupineJs.renderPageProps;
};

export const bindRouter = (router: IPageRouter | ((props: PageProps) => Promise<VNode<any>>)) => {
  _lupineJs.router = router;

  // avoid tree shaking as bindRouter must be called
  initializeApp();
};
