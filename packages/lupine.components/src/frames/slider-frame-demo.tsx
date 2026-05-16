import { DemoStory } from '../demo/demo-types';
import { SliderFrame, SliderFrameHookProps } from './slider-frame';
import { SliderHelper, SliderHelperCloseProps } from './slider-helper';
import { HeaderWithBackFrame } from '../components/mobile-components/mobile-header-with-back';
import { Button, ButtonSize } from '../components/button';

// A dummy component to load inside the slider
const DummyInnerPage = ({ hook }: { hook: SliderFrameHookProps }) => {
  return (
    <HeaderWithBackFrame title='Slider Inner Page' onBack={(e) => hook.close!(e)}>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3>This is the inner page content!</h3>
        <p>You can put any scrollable content here. Click the back arrow in the header to close.</p>
        <div>
          <Button text='Close Slider via Button' size={ButtonSize.Medium} onClick={() => hook.close!(null as any)} />
        </div>
      </div>
    </HeaderWithBackFrame>
  );
};

export const sliderFrameDemo: DemoStory<any> = {
  id: 'slider-frame-demo',
  text: 'Slider Frame Demo',
  args: {
    direction: 'right',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['right', 'bottom'],
      description: 'Direction the slider enters from',
    },
  },
  render: (args) => {
    const sliderHook: SliderFrameHookProps = {};
    return (
      <div style={{ padding: '20px', height: '100%', position: 'relative' }}>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          This demo shows how to use SliderFrame to slide in a new full-cover page over the current view.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <Button
            text='Open Slider'
            size={ButtonSize.Medium}
            onClick={() => {
              sliderHook.load!(<DummyInnerPage hook={sliderHook} />);
            }}
          />
          <Button
            text='Open Slider Helper'
            size={ButtonSize.Medium}
            onClick={async () => {
              let close: SliderHelperCloseProps;
              close = await SliderHelper.show({
                direction: args.direction,
                children: (
                  <HeaderWithBackFrame title='Slider Helper Inner Page' onBack={() => close()}>
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <h3>This is the SliderHelper inner page content!</h3>
                      <p>It uses a static show function and shows a mask on larger screens.</p>
                      <div>
                        <Button text='Close SliderHelper via Button' size={ButtonSize.Medium} onClick={() => close()} />
                      </div>
                    </div>
                  </HeaderWithBackFrame>
                ),
              });
            }}
          />
        </div>

        {/* The SliderFrame is placed here but initially hidden */}
        <SliderFrame hook={sliderHook} direction={args.direction} defaultContent='' />
      </div>
    );
  },
  code: `import { SliderFrame, SliderFrameHookProps } from 'lupine.components/frames/slider-frame';
import { HeaderWithBackFrame } from 'lupine.components/components/mobile-components/mobile-header-with-back';
import { Button, ButtonSize } from 'lupine.components/components/button';

// 1. Define your inner page component
const InnerPage = ({ hook }: { hook: SliderFrameHookProps }) => {
  return (
    <HeaderWithBackFrame 
      title="Inner Page" 
      onBack={(e) => hook.close!(e)}
    >
      <div style={{ padding: '20px' }}>Content goes here</div>
    </HeaderWithBackFrame>
  );
};

// 2. Setup the hook and frame in your main page
const MyPage = () => {
  const sliderHook: SliderFrameHookProps = {};

  return (
    <div>
      <Button 
        text="Open Slider" 
        onClick={() => sliderHook.load!(<InnerPage hook={sliderHook} />)} 
      />
      
      {/* SliderFrame container */}
      <SliderFrame hook={sliderHook} direction="right" />
    </div>
  );
};
`,
};
