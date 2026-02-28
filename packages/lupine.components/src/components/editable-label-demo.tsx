import { DemoStory } from '../demo/demo-types';
import { EditableLabel, EditableLabelProps } from './editable-label';
import { HtmlVar } from './html-var';

export const editableLabelDemo: DemoStory<EditableLabelProps> = {
  id: 'editable-label-demo',
  text: 'Editable Label Demo',
  args: {
    text: 'Double click to edit me!',
    mandtory: false,
  },
  argTypes: {
    text: { control: 'text', description: 'Initial text content' },
    mandtory: { control: 'boolean', description: 'If true, value cannot be left empty' },
  },
  render: (args: EditableLabelProps) => {
    const msg = new HtmlVar(args.text);
    return (
      <div style={{ padding: '20px', width: '300px' }}>
        <p style={{ color: '#666', fontSize: '13px', marginBottom: '10px' }}>
          Instructions: Double-click the text below to switch to edit mode. Press Enter to save, or Escape to cancel.
        </p>
        <EditableLabel {...args} save={(val) => (msg.value = val)} />
        <p css={{ fontSize: '13px', color: 'var(--secondary-color, #999)' }}>Saved: {msg.node}</p>
      </div>
    );
  },
  code: `import { EditableLabel } from 'lupine.components/components/editable-label';

<EditableLabel 
  text="Double click to edit me!" 
  mandtory={false} 
  save={(val) => console.log('Saved:', val)} 
/>
`,
};
