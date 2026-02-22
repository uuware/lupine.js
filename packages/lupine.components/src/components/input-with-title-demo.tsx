import { DemoStory } from '../demo/demo-types';
import { InputWithTitle } from './input-with-title';

export const inputWithTitleDemo: DemoStory<any> = {
  id: 'input-with-title-demo',
  text: 'Input With Title Demo',
  args: {
    title: 'Enter your name',
    defaultValue: 'John Doe',
    width: '250px',
  },
  argTypes: {
    title: { control: 'text', description: 'Title text shown above input' },
    defaultValue: { control: 'text', description: 'Initial default value' },
    width: { control: 'text', description: 'Width of the input container' },
  },
  render: (args) => {
    return (
      <div style={{ padding: '20px' }}>
        {InputWithTitle(
          args.title,
          args.defaultValue,
          (val) => console.log('Input onChange:', val),
          (val) => console.log('Input onInput:', val),
          'input-base',
          args.width
        )}
      </div>
    );
  },
};
