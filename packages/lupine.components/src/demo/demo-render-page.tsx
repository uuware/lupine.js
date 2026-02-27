import { CssProps, encodeHtml, HtmlVar, isFrontEnd, PageProps } from 'lupine.components';
import { demoRegistry } from './demo-registry';
import { demoIcons, demoIconsCss } from './mock/demo-icons';

export const DemoRenderPage = async (props: PageProps) => {
  const dom = new HtmlVar(
    (
      <div
        class='demo-render-page-loading'
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
          color: 'var(--text-color, #333)',
        }}
      >
        Loading component preview...
      </div>
    )
  );

  if (isFrontEnd()) {
    const urlParams = new URL(window.location.href).searchParams;
    const id = urlParams.get('id');
    const story = id ? demoRegistry[id] : null;

    if (story) {
      const renderContent = (args: any, showCode: boolean) => {
        if (showCode && story.code) {
          return (
            <pre
              style={{
                margin: 0,
                padding: '20px',
                backgroundColor: '#f5f5f5',
                width: '100%',
                height: '100%',
                overflow: 'auto',
              }}
              class='demo-render-page-code'
            >
              <code>{encodeHtml(story.code)}</code>
            </pre>
          );
        } else if (showCode && !story.code) {
          return <div class='demo-render-page-no-code'>Code snippet not available for this demo.</div>;
        }
        return story.render(args);
      };

      (window as any)._lj_demo_hook = {
        updateArgs: (newArgs: any, showCode: boolean = false) => {
          // wait for parent to call here to render
          dom.value = renderContent(newArgs, showCode);
        },
      };
    } else {
      dom.value = <div class='demo-render-page-not-found'>Component not found</div>;
    }
  }

  const css: CssProps = {
    width: '100%',
    height: '100%',
    // Reset any body margins if they exist, though typically handled by global css
    margin: 0,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Center components by default
    overflow: 'auto',
    '>fragment>div': {
      width: '100%',
      height: '100%',
    },
    ...demoIconsCss,
  };

  return (
    <div css={css} class='demo-render-page'>
      {dom.node}
    </div>
  );
};
