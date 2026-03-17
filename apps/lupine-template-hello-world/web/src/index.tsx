// css order is important
import './styles/global.css';
import './styles/app.css';

import { bindRouter, CssProps, isFrontEnd, PageRouter, webEnv, debugWatch, useState } from 'lupine.components';

// ── useState demo component ─────────────────────────────────────
const Counter = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('World');
  const [show, setShow] = useState(true);

  const css: CssProps = {
    display: 'inline-block',
    padding: '24px',
    border: '2px solid #4f8ef7',
    borderRadius: '12px',
    margin: '20px',
    minWidth: '280px',
    fontFamily: 'monospace',
  };

  return (
    <div css={css}>
      {/* number state */}
      <p>
        count = <strong>{count}</strong>
      </p>
      <button onClick={() => setCount(count - 1)}>−</button> <button onClick={() => setCount(count + 1)}>＋</button>{' '}
      {/* functional update test */}
      <button onClick={() => setCount((n) => n * 2)}>×2</button>
      {/* string state */}
      <p style={{ marginTop: '12px' }}>
        Hello, <strong>{name}</strong>!
      </p>
      <button onClick={() => setName(name === 'World' ? 'Lupine' : 'World')}>Toggle name</button>
      {/* boolean state + multiple setState calls should batch into one rerender */}
      <p style={{ marginTop: '12px' }}>
        <button
          onClick={() => {
            // 3 consecutive setState calls — should batch into 1 rerender
            setCount(count + 10);
            setName('Batch!');
            setShow(!show);
          }}
        >
          Batch
        </button>
      </p>
      {show && <p>✅ true</p>}
      {!show && <p>❌ false</p>}
    </div>
  );
};

const HelloPage = () => (
  <div css={{ textAlign: 'center', padding: '20px' }}>
    <h1>Demo</h1>
    <Counter />
    <Counter /> {/* two independent instances — state is isolated */}
  </div>
);
// ────────────────────────────────────────────────────────────────

// #if DEV==='1'
if (isFrontEnd() && webEnv('NODE_ENV', '') === 'development') {
  debugWatch(webEnv('API_PORT', 0));
}
// #endif

const pageRouter = new PageRouter();
pageRouter.use('/', HelloPage);
bindRouter(pageRouter);
