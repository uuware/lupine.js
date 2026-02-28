import { CssProps, RefProps } from 'lupine.web';
import { DemoStory } from '../../demo/demo-types';
import { PEditor } from './p-editor';
import { PEditorOptions } from './p-editor-types';

const PEditorDemoPage = (props: { args: PEditorOptions }) => {
  let editor: PEditor | undefined;

  const ref: RefProps = {
    onLoad: async () => {
      const container = ref.$('.pe-demo-box');
      editor = new PEditor(container, props.args);
    },
  };

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 100px)',
    padding: '0',
    boxSizing: 'border-box',
    '.pe-demo-box': {
      width: '100%',
      height: '100%',
    },
  };

  return (
    <div ref={ref} css={css} class='p-editor-demo-container'>
      <div class='pe-demo-box'></div>
    </div>
  );
};

export const pEditorDemo: DemoStory<PEditorOptions> = {
  id: 'pEditorDemo',
  text: 'PDF Editor',
  args: {},
  argTypes: {},
  render: (args: PEditorOptions) => {
    return <PEditorDemoPage args={args} />;
  },
  code: `import { PEditor } from 'lupine.components/component-pool';

const container = document.getElementById('my-container');
new PEditor(container, {
  // optionally pre-load a PDF:
  // pdfUrl: '/path/to/my.pdf'
});
`,
};
