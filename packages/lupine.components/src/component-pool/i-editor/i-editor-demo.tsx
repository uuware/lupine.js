import { CssProps, RefProps } from 'lupine.web';
import { DemoStory } from '../../demo/demo-types';
import { IEditor } from './i-editor';

const IEditorDemoPage = () => {
  let editor: IEditor | undefined;

  const ref: RefProps = {
    onLoad: async () => {
      const container = ref.$('.i-edit-view-box');
      if (container) {
        editor = IEditor.getEditor(container);
      }
    },
  };

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    height: '600px',
    padding: '16px',
    boxSizing: 'border-box',
    '.i-editor-demo-header': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: '12px',
    },
    '.i-editor-demo-desc': {
      fontSize: '12px',
      color: 'var(--secondary-color, #888)',
      marginLeft: '8px',
    },
    '.i-edt-body': {
      flex: 1,
      border: '1px solid var(--primary-border, #444)',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    '.i-edit-view-box': {
      width: '100%',
      height: '100%',
    },
  };

  return (
    <div ref={ref} css={css}>
      <div class='i-editor-demo-header'>
        <h3 style={{ margin: 0 }}>Image Editor</h3>
        <span class='i-editor-demo-desc'>
          Upload an image or start with a blank canvas. Use the toolbar to draw, crop, rotate, add text, add stickers,
          and more.
        </span>
      </div>
      <div class='i-edt-body'>
        <div class='i-edit-view-box'></div>
      </div>
    </div>
  );
};

export const iEditorDemo: DemoStory<any> = {
  id: 'i-editor-demo',
  text: 'Image Editor',
  args: {},
  argTypes: {},
  render: () => {
    return <IEditorDemoPage />;
  },
};
