import { DemoStory } from '../demo/demo-types';
import { SelectWithTitle, SelectOptionProps } from './select-with-title';

export const selectWithTitleDemo: DemoStory<any> = {
  id: 'select-with-title-demo',
  text: 'Select With Title Demo',
  args: {
    title: 'Choose a fruit',
    size: 1,
    width: '200px',
  },
  argTypes: {
    title: { control: 'text', description: 'Title text shown above' },
    size: { control: 'number', description: 'HTML select size attribute' },
    width: { control: 'text', description: 'Width of the select' },
  },
  render: (args) => {
    const options: SelectOptionProps[] = [
      { option: 'Apple', value: 'apple' },
      { option: 'Banana', value: 'banana', selected: true },
      { option: 'Cherry', value: 'cherry' },
    ];
    return (
      <div style={{ padding: '20px' }}>
        {SelectWithTitle(
          args.title,
          options,
          (val) => console.log('Selected:', val),
          args.size,
          'input-base',
          args.width
        )}
      </div>
    );
  },
};
