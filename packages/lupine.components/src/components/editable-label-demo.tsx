import { DemoStory } from '../demo/demo-types';
import { EditableLabel, EditableLabelProps } from './editable-label';

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
    return (
      <div style={{ padding: '20px', width: '300px' }}>
        <p style={{ color: '#666', fontSize: '13px', marginBottom: '10px' }}>
          Instructions: Double-click the text below to switch to edit mode. Press Enter to save, or Escape to cancel.
        </p>
        <EditableLabel {...args} save={(val) => console.log('Saved:', val)} />
      </div>
    );
  },
};
