import { DemoStory } from '../../demo/demo-types';
import { Badge, BadgeProps } from './badge';
import { SvgSvg, SvgPath } from '../svg-props';

const BellIcon = () => (
  <SvgSvg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='2'
    stroke-linecap='round'
    stroke-linejoin='round'
  >
    <SvgPath d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
    <SvgPath d='M13.73 21a2 2 0 0 1-3.46 0' />
  </SvgSvg>
);

const CheckIcon = () => (
  <SvgSvg
    width='12'
    height='12'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='3'
    stroke-linecap='round'
    stroke-linejoin='round'
  >
    <SvgPath d='M20 6L9 17l-5-5' />
  </SvgSvg>
);

export const badgeDemo: DemoStory<BadgeProps> = {
  id: 'badge',
  text: 'Badge',
  args: {
    content: 5,
    max: 99,
    dot: false,
    color: '#ffffff',
    bgColor: '#e74c3c',
  },
  argTypes: {
    content: { control: 'number', description: 'Number or text to display' },
    max: { control: 'number', description: 'Max number before showing +' },
    dot: { control: 'boolean', description: 'Show as dot instead of value' },
    color: { control: 'color', description: 'Text color' },
    bgColor: { control: 'color', description: 'Background color' },
  },
  render: (args) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '16px' }}>Interactive Config</div>
            <Badge
              content={args.content}
              max={args.max}
              dot={args.dot}
              color={args.color}
              bgColor={args.bgColor}
              onClick={() => alert(`Badge clicked: ${args.content}`)}
            >
              <div style={{ padding: '8px 16px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>Messages</div>
            </Badge>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '16px' }}>Max Value (99+)</div>
            <Badge content={150} max={99}>
              <div style={{ padding: '8px 16px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>Notifications</div>
            </Badge>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '16px' }}>Dot Mode</div>
            <Badge dot={true}>
              <BellIcon />
            </Badge>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '16px' }}>Custom Node Content</div>
            <Badge content={<CheckIcon />} bgColor='var(--success-color, #2ecc71)'>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#eee', borderRadius: '4px' }} />
            </Badge>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '16px' }}>Text Content</div>
            <Badge content='NEW' bgColor='var(--primary-accent-color, #0a74c9)'>
              <div style={{ padding: '8px 16px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>Features</div>
            </Badge>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '16px' }}>Standalone Badge</div>
            <Badge content='Status: Online' bgColor='var(--success-color, #2ecc71)' />
          </div>
        </div>
      </div>
    );
  },
  code: `import { Badge } from 'lupine.components/component-pool';

<Badge content={5} max={99} bgColor="red" color="white" onClick={...}>
  <div>Anchor Element</div>
</Badge>

<Badge dot={true}>
  <Icon />
</Badge>

<Badge content={<CheckIcon />} bgColor="green">
  <div>Task</div>
</Badge>
`,
};
