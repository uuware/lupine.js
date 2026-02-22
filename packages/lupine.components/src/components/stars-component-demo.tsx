import { DemoStory } from '../demo/demo-types';
import { StarsComponent, StarsComponentProps } from './stars-component';

export const starsDemo: DemoStory<StarsComponentProps> = {
  id: 'stars-demo',
  text: 'Stars Component Demo',
  args: {
    maxLength: 5,
    value: 3,
    fontSize: '30px',
    fullIcon: <div class='ifc-icon full'>★</div>,
    outlineIcon: <div class='ifc-icon outline'>☆</div>,
  },
  argTypes: {
    maxLength: { control: 'number', description: 'Total number of stars' },
    value: { control: 'number', description: 'Current rating value' },
    fontSize: { control: 'text', description: 'Size of the stars (e.g., 20px, 2rem)' },
  },
  render: (args: StarsComponentProps) => {
    return (
      <div style={{ padding: '20px' }}>
        <StarsComponent {...args} />
      </div>
    );
  },
};
