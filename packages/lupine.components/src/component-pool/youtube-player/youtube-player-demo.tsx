import { YouTubePlayer, YouTubePlayerProps } from './youtube-player';
import { DemoStory } from '../../demo/demo-types';

export const youtubePlayerDemo: DemoStory<YouTubePlayerProps> = {
  id: 'youtubePlayerDemo',
  text: 'YouTube Player',
  args: {
    videoId: 'dQw4w9WgXcQ',
    width: '100%',
    height: '400px',
    autoplay: false,
  },
  argTypes: {
    videoId: { control: 'text', description: 'YouTube Video ID' },
    width: { control: 'text' },
    height: { control: 'text' },
    autoplay: { control: 'boolean' },
  },
  render: (args: any) => {
    return (
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          width: '100%',
          maxWidth: '800px',
        }}
      >
        <section>
          <div class='section-title'>Basic Usage</div>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Embed a YouTube video simply by providing its ID.
          </p>
          <YouTubePlayer {...args} />
        </section>

        <section>
          <div class='section-title'>Custom Size</div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <YouTubePlayer videoId='jNQXAC9IVRw' width='300px' height='200px' />
            <YouTubePlayer videoId='M7lc1UVf-VE' width='400px' height='250px' />
          </div>
        </section>
      </div>
    );
  },
  code: `import { YouTubePlayer } from 'lupine.components/component-pool';

<YouTubePlayer 
  videoId="dQw4w9WgXcQ" 
  width="100%" 
  height="400px" 
/>
`,
};
