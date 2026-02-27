import { Avatar, AvatarGroup } from './avatar';
import { DemoStory } from '../../demo/demo-types';

export const avatarDemo: DemoStory<any> = {
  id: 'avatarDemo',
  text: 'Avatar',
  args: {
    maxCount: 3,
    size: 'md',
    shape: 'circle',
  },
  argTypes: {
    maxCount: {
      control: 'number',
      description: 'Maximum visible avatars in a group',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatars',
    },
    shape: {
      control: 'select',
      options: ['circle', 'rounded', 'square'],
      description: 'Shape of the avatars',
    },
  },
  render: (args: any) => {
    const css = {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      padding: '24px',
      '.section-title': {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '12px',
        color: 'var(--primary-color)',
      },
      '.demo-row': {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignItems: 'center',
      },
    };

    return (
      <div css={css}>
        {/* Controllable Standalone */}
        <section>
          <div class='section-title'>
            Controlled by Panel (Size: {args.size}, Shape: {args.shape})
          </div>
          <div class='demo-row'>
            <Avatar size={args.size} shape={args.shape} src='https://i.pravatar.cc/150?u=99' online />
            <Avatar size={args.size} shape={args.shape} initials='AD' />
          </div>
        </section>

        {/* Sizes */}
        <section>
          <div class='section-title'>Sizes (Static)</div>
          <div class='demo-row'>
            <Avatar size='xs' initials='XS' />
            <Avatar size='sm' initials='SM' />
            <Avatar size='md' initials='MD' />
            <Avatar size='lg' initials='LG' />
            <Avatar size='xl' initials='XL' />
          </div>
        </section>

        {/* Shapes */}
        <section>
          <div class='section-title'>Shapes (Static)</div>
          <div class='demo-row'>
            <Avatar shape='circle' initials='C' />
            <Avatar shape='rounded' initials='R' />
            <Avatar shape='square' initials='S' />
          </div>
        </section>

        {/* Status */}
        <section>
          <div class='section-title'>Status Indicators</div>
          <div class='demo-row'>
            <Avatar size='md' src='https://i.pravatar.cc/150?u=3' status='online' />
            <Avatar size='md' src='https://i.pravatar.cc/150?u=4' status='away' />
            <Avatar size='md' src='https://i.pravatar.cc/150?u=5' status='busy' />
            <Avatar size='md' src='https://i.pravatar.cc/150?u=6' status='offline' />
          </div>
        </section>

        {/* Group */}
        <section>
          <div class='section-title'>
            Avatar Group (maxCount: {args.maxCount}, size: {args.size})
          </div>
          <div class='demo-row'>
            <AvatarGroup maxCount={args.maxCount} size={args.size}>
              <Avatar src='https://i.pravatar.cc/150?u=7' />
              <Avatar src='https://i.pravatar.cc/150?u=8' />
              <Avatar src='https://i.pravatar.cc/150?u=9' />
              <Avatar src='https://i.pravatar.cc/150?u=10' />
              <Avatar src='https://i.pravatar.cc/150?u=11' />
              <Avatar src='https://i.pravatar.cc/150?u=12' />
            </AvatarGroup>
          </div>
        </section>
      </div>
    );
  },
  code: `import { Avatar, AvatarGroup } from 'lupine.components/component-pool';

// Standalone
<Avatar size="md" shape="circle" src="..." status="online" />
<Avatar size="lg" initials="AD" />

// Group
<AvatarGroup maxCount={3}>
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
</AvatarGroup>
`,
};
