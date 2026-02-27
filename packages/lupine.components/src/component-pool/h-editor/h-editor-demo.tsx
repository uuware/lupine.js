import { CssProps, RefProps } from 'lupine.web';
import { NotificationColor, NotificationMessage, ModalWindow } from 'lupine.components';
import { DemoStory } from '../../demo/demo-types';
import { HEditor } from './h-editor';

const defaultHtml = `
  <h2>Welcome to HEditor!</h2>
  <p>This is a <strong>rich text</strong> editing component powered by <em>Lupine.js</em>.</p>
  <ul>
    <li>Try typing some text</li>
    <li>Use toolbar to format content</li>
    <li>Insert links or images</li>
  </ul>
`;

const HEditorDemoPage = () => {
  let edt: HEditor | undefined;

  const ref: RefProps = {
    onLoad: async () => {
      // Find the container and initialize the editor with defaultHtml
      const container = ref.$('.edit-view-box');
      if (container) {
        edt = HEditor.getEditor(container, defaultHtml);
      }
    },
  };

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    height: '600px', // Set an explicit height for the editor container area
    padding: '16px',
    boxSizing: 'border-box',
    '.h-editor-demo-header': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: '16px',
    },
    '.a-vw-edt-body': {
      flex: 1, // Take up remaining space
      border: '1px solid var(--primary-border, #eee)',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    // The editor container needs width and height 100% to fill the flex container
    '.edit-view-box': {
      width: '100%',
      height: '100%',
    },
  };

  const handleGetHtml = async () => {
    if (!edt) {
      NotificationMessage.sendMessage("Editor hasn't initialized yet.", NotificationColor.Error);
      return;
    }

    const htmlContent = edt.getHtml();

    // Show output in a modal to clearly see the source code
    const closeIndex = await ModalWindow.show({
      title: 'Current HTML Output',
      buttons: ['Close'],
      handleClicked: async (index, close) => {
        close();
      },
      children: (
        <div
          style={{
            padding: '20px',
            backgroundColor: 'var(--secondary-bg-color, #f5f5f5)',
            borderRadius: '4px',
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          {htmlContent}
        </div>
      ),
    });
  };

  return (
    <div ref={ref} css={css}>
      <div class='h-editor-demo-header'>
        <h3>HTML Editor</h3>
        <button class='button-base' onClick={handleGetHtml}>
          Get HTML
        </button>
      </div>
      <div class='a-vw-edt-body'>
        {/* The container element for HEditor */}
        <div class='edit-view-box'></div>
      </div>
    </div>
  );
};

export const hEditorDemo: DemoStory<any> = {
  id: 'h-editor-demo',
  text: 'Rich Text Editor',
  args: {},
  argTypes: {},
  render: () => {
    return <HEditorDemoPage />;
  },
};
