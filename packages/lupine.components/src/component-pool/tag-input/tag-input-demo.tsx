import { DemoStory } from '../../demo/demo-types';
import { TagInput, TagInputProps } from './tag-input';
import { HtmlVar } from '../../components/html-var';

export const tagInputDemo: DemoStory<TagInputProps> = {
  id: 'tag-input-demo',
  text: 'Tag Input',
  args: {
    options: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'],
    selectedIndices: [0, 2],
    placeholder: 'Select your favorite fruits...',
    disabled: false,
    maxCount: 3,
    align: 'center',
    title: 'Select Fruits',
  },
  argTypes: {
    placeholder: { control: 'text', description: 'Placeholder when empty' },
    disabled: { control: 'boolean', description: 'Disable interaction' },
    maxCount: { control: 'number', description: 'Max number of items allowed to be selected' },
    align: { control: 'select', options: ['left', 'center', 'right'], description: 'Text alignment in selector' },
    title: { control: 'text', description: 'Title for the ActionSheet' },
  },
  render: (args: TagInputProps) => {
    const msg = new HtmlVar('');
    return (
      <div>
        <TagInput
          {...args}
          onChange={(indices, labels) => {
            msg.value = `Selected: [${labels.join(', ')}] (Indices: ${indices.join(', ')})`;
          }}
        />
        <div css={{ marginTop: '10px', fontSize: '13px', color: 'var(--secondary-color, #999)' }}>{msg.node}</div>
      </div>
    );
  },
  code: `import { TagInput } from 'lupine.components/component-pool/tag-input/tag-input';

// Basic usage
<TagInput
  options={['Apple', 'Banana', 'Cherry']}
  selectedIndices={[0, 2]}
  onChange={(indices, labels) => console.log(labels)}
/>
`,
};
