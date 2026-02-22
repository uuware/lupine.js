import { CssProps, HtmlVar, isFrontEnd, PageProps } from 'lupine.components';
import { demoRegistry } from './demo-registry';

export const DemoRenderPage = async (props: PageProps) => {
  const dom = new HtmlVar(
    (
      <div
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
      // First render using the correct context
      dom.value = story.render(story.args);

      (window as any)._lj_demo_hook = {
        updateArgs: (newArgs: any) => {
          dom.value = story.render(newArgs);
        },
      };
    } else {
      dom.value = <div>Component not found</div>;
    }
  }

  const css: CssProps = {
    width: '100%',
    height: '100%',
    // Reset any body margins if they exist, though typically handled by global css
    margin: 0,
    padding: 'var(--space-m, 16px)',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Center components by default
  };

  return <div css={css}>{dom.node}</div>;
};
