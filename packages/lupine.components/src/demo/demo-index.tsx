import { PageProps, PageRouter } from 'lupine.components';
import { DemoFrame } from './demo-frame';
import { DemoRenderPage } from './demo-render-page';

export const DemoIndexPage = async (props: PageProps) => {
  // if inside an iframe, redirect to the demo page
  if (props.query.id) {
    return <DemoRenderPage {...props} />;
  }
  return <DemoFrame title='Components Demo' />;
};

const demoPageRouter = new PageRouter();
demoPageRouter.use('/demo', DemoRenderPage);
demoPageRouter.use('/*', DemoIndexPage);

export { demoPageRouter };
