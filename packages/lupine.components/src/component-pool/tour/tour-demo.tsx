import { HtmlVar } from '../../components';
import { DemoStory } from '../../demo/demo-types';
import { Tour } from './tour';

export const tourDemo: DemoStory<any> = {
  id: 'tour-demo',
  text: 'Tour (Guidance)',
  args: {},
  argTypes: {},
  render: () => {
    const tour = new HtmlVar();
    const handleStartTour = () => {
      const steps = [
        {
          target: '#tour-step-1',
          title: 'Welcome to Lupine.js',
          content: 'This is the first step of your product tour. You can highlight any element!',
          placement: 'bottom' as const,
        },
        {
          target: '#tour-step-2',
          title: 'Main Feature',
          content: 'Here is a key feature we want to draw your attention to.',
          placement: 'right' as const,
        },
        {
          target: '#tour-step-3',
          title: 'Action Button',
          content: 'Click here to perform the primary action on this page.',
          placement: 'top' as const,
        },
      ];

      tour.value = (
        <Tour
          steps={steps}
          onClose={() => console.log('Tour skipped or closed')}
          onFinish={() => console.log('Tour completed!')}
        />
      );
    };

    return (
      <div style={{ padding: '20px' }}>
        <h2>Tour Component Demo</h2>
        <p>The Tour component is used to guide users through your application by highlighting specific elements.</p>

        {tour.node}
        <button
          id='tour-step-1'
          class='ifc-btn ifc-btn-primary'
          style={{ marginBottom: '40px' }}
          onClick={handleStartTour}
        >
          Start Tour
        </button>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
          <div
            id='tour-step-2'
            style={{ padding: '20px', backgroundColor: '#f0f2f5', borderRadius: '8px', width: '200px' }}
          >
            <h3>Feature Card</h3>
            <p>This is some pseudo content to highlight.</p>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#f0f2f5', borderRadius: '8px', width: '200px' }}>
            <h3>Another Card</h3>
            <p>This will not be highlighted.</p>
          </div>
        </div>

        <button id='tour-step-3' class='ifc-btn ifc-btn-secondary' style={{ marginTop: '100px' }}>
          Submit Action
        </button>
      </div>
    );
  },
};
