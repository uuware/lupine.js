import { PageProps, PageRouter, Redirect } from 'lupine.components';
import { demoFrameHelper } from './demo-frame-helper';
import { DemoFrame } from './demo-frame';
import { DemoRenderPage } from './demo-render-page';

export const DemoIndexPage = async (props: PageProps) => {
  return <DemoFrame title='Components Demo' />;
};

const demoPageRouter = new PageRouter();
demoPageRouter.use('/demo', DemoRenderPage);
demoPageRouter.use('/*', DemoIndexPage);

export { demoPageRouter };
