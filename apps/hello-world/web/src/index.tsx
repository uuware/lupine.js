// css order is important
import './styles/global.css';
import './styles/app.css';

import { bindRouter, CssProps, debugWatch, HtmlVar, isFrontEnd, PageRouter, webEnv } from 'lupine.components';

const HelloPage = () => {
  const css: CssProps = {
    padding: '20px',
    h1: {
      color: 'blue',
      '&:hover': {
        color: 'red',
      },
    },
  };
  const dom = new HtmlVar('0');
  return (
    <div css={css} style={{ textAlign: 'center' }}>
      <h1>Hello World</h1>
      <p>This is a simplified Lupine.js project.</p>
      <p>{dom.node}</p>
      <button onClick={() => (dom.value = (Number(dom.value) + 1).toString())}>Increment</button>
    </div>
  );
};

if (isFrontEnd() && webEnv('NODE_ENV', '') === 'development') {
  debugWatch(webEnv('API_PORT', 0));
}

const pageRouter = new PageRouter();
pageRouter.use('/', HelloPage);
bindRouter(pageRouter);
