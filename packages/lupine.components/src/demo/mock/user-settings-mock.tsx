import { CssProps, RefProps } from 'lupine.web';
import {
  ActionSheetSelectPromise,
  HeaderWithBackFrame,
  HtmlVar,
  NotificationColor,
  NotificationMessage,
  SliderFrame,
  SliderFrameHookProps,
} from '../../index';

export const Nested2DemoMock = (props: { sliderFrameHook: SliderFrameHookProps }) => {
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    padding: '0 16px',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
    color: 'var(--secondary-text-color)',
    fontSize: '16px',
  };
  return (
    <HeaderWithBackFrame
      title={`Nested Demo`}
      onBack={(event: any) => {
        props.sliderFrameHook.close!(event);
      }}
    >
      <div css={css}>
        This is a generic sub-page demo.
        <br />
        <br />
        (Further nesting is disabled in this mockup)
      </div>
    </HeaderWithBackFrame>
  );
};

const NestedDemoMockContent = () => {
  const sliderFrameHook: SliderFrameHookProps = {};
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    padding: '0 16px',
    '.fb-detail': {
      height: '100px',
    },
    '.input-field': {
      position: 'relative',
      marginTop: '16px',
      marginBottom: '16px',
    },
    '.input-base': {
      width: '100%',
      padding: '12px',
      border: '1px solid var(--primary-border-color)',
      borderRadius: '8px',
      boxSizing: 'border-box',
    },
    '.setting-section-row-btn': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 16px',
      backgroundColor: 'var(--primary-color)',
      color: 'white',
      borderRadius: '8px',
      marginTop: '16px',
      cursor: 'pointer',
      fontSize: '16px',
      gap: '8px',
    },
    '.setting-section-row-btn i': {
      fontSize: '20px',
    },
  };

  const ref: RefProps = {};

  const openAnotherLevel = () => {
    sliderFrameHook.load!(<Nested2DemoMock sliderFrameHook={sliderFrameHook} />);
  };

  const submitFeedback = async (e: Event) => {
    const titleDom = ref.$('.fb-title') as HTMLInputElement;
    const detailDom = ref.$('.fb-detail') as HTMLTextAreaElement;
    if (!titleDom || !titleDom.value || !detailDom || !detailDom.value) {
      NotificationMessage.sendMessage('Please enter the required information.', NotificationColor.Error);
      return;
    }
    const index = await ActionSheetSelectPromise({
      title: 'Are you sure you want to submit?',
      options: ['Confirm'],
      cancelButtonText: 'Cancel',
    });
    if (index !== 0) {
      return;
    }
    NotificationMessage.sendMessage('Thank you for your feedback.', NotificationColor.Success);
    sliderFrameHook.close!(e);
  };

  return (
    <div css={css} ref={ref}>
      <SliderFrame hook={sliderFrameHook} />
      <div class='setting-section-group'>
        <div class='setting-section-title' style={{ marginTop: '20px', marginBottom: '8px', fontWeight: 'bold' }}>
          Nested Demo
        </div>
        <div class='setting-section-block'>
          <div class='setting-section-item'>
            <div
              class='setting-section-item-text'
              style={{ color: 'var(--secondary-text-color)', marginBottom: '16px' }}
            >
              This is a generic generic demo page. You can nest another level of itself by clicking the button below.
            </div>
          </div>
        </div>

        <div
          class='setting-section-row-btn'
          onClick={openAnotherLevel}
          style={{ backgroundColor: 'var(--secondary-color, #4caf50)' }}
        >
          <i class='ifc-icon ma-chevron-right'></i>
          <div>Open Nested Demo</div>
        </div>

        <div class='row-box u-ph-code-top' style={{ marginTop: '32px' }}>
          <div class='input-field flex-1'>
            <input class='input-base w-100p fb-title' type='text' required placeholder='Summary' />
          </div>
        </div>

        <div class='row-box u-ph-code-top'>
          <div class='input-field flex-1'>
            <textarea class='input-base w-100p fb-detail' required placeholder='Details...'></textarea>
          </div>
        </div>

        <div class='setting-section-row-btn warning mt-m' onClick={submitFeedback}>
          <i class='ifc-icon ma-email-outline'></i>
          <div>Submit Form</div>
        </div>
      </div>
    </div>
  );
};

export const NestedDemoMock = (props: { sliderFrameHook: SliderFrameHookProps }) => {
  props.sliderFrameHook.addClass!('desktop-slide-right');

  return (
    <HeaderWithBackFrame
      title={`Nested Demo`}
      onBack={(event: any) => {
        if (props.sliderFrameHook.close) props.sliderFrameHook.close(event);
      }}
    >
      <NestedDemoMockContent />
    </HeaderWithBackFrame>
  );
};

const UserSettingsMockContent = () => {
  const sliderFrameHook: SliderFrameHookProps = {};
  const renderContent = () => {
    const css: CssProps = {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      padding: '0 16px',
      backgroundColor: 'var(--secondary-bg-color, #f5f5f5)',
      // Minimal settings UI styles ported from what was expected in original UI
      '.setting-section-group': {
        marginTop: '16px',
      },
      '.setting-section-title': {
        padding: '0 16px 8px 16px',
        fontSize: '13px',
        color: 'var(--secondary-text-color, #666)',
      },
      '.setting-section-block': {
        backgroundColor: 'var(--primary-bg-color, white)',
        borderRadius: '12px',
        overflow: 'hidden',
      },
      '.setting-section-item': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        borderBottom: '1px solid var(--primary-border-color, #eee)',
        cursor: 'pointer',
      },
      '.setting-section-item:last-child': {
        borderBottom: 'none',
      },
      '.setting-section-item-text': {
        fontSize: '15px',
        color: 'var(--primary-text-color)',
      },
      '.setting-section-item-icon': {
        color: 'var(--secondary-text-color, #ccc)',
        display: 'flex',
      },
      '.setting-section-item-icon i': {
        fontSize: '20px',
      },
      '.setting-section-row-btn': {
        backgroundColor: 'var(--primary-bg-color, white)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        color: '#ff3b30',
        fontSize: '15px',
        cursor: 'pointer',
        fontWeight: 'bold',
      },
      '.setting-section-row-btn i': {
        fontSize: '20px',
      },
    };

    const openNestedDemo = () => {
      sliderFrameHook.load!(<NestedDemoMock sliderFrameHook={sliderFrameHook} />);
    };

    return (
      <div css={css} class='user-settings-top'>
        <SliderFrame hook={sliderFrameHook} />
        <div class='setting-section-group'>
          <div class='setting-section-title'>Account Settings</div>
          <div class='setting-section-block'>
            <div class='setting-section-item' onClick={openNestedDemo}>
              <div class='setting-section-item-text'>Phone Number</div>
              <div class='setting-section-item-icon'>
                <i class='ifc-icon ma-chevron-right'></i>
              </div>
            </div>
            <div class='setting-section-item' onClick={openNestedDemo}>
              <div class='setting-section-item-text'>Email Address</div>
              <div class='setting-section-item-icon'>
                <i class='ifc-icon ma-chevron-right'></i>
              </div>
            </div>
            <div class='setting-section-item' onClick={openNestedDemo}>
              <div class='setting-section-item-text'>Delete Account</div>
              <div class='setting-section-item-icon'>
                <i class='ifc-icon ma-chevron-right'></i>
              </div>
            </div>
          </div>
        </div>

        <div class='setting-section-group'>
          <div class='setting-section-title'>Other Settings</div>
          <div class='setting-section-block'>
            <div class='setting-section-item' onClick={openNestedDemo}>
              <div class='setting-section-item-text'>Feedback Request</div>
              <div class='setting-section-item-icon'>
                <i class='ifc-icon ma-chevron-right'></i>
              </div>
            </div>
            <div class='setting-section-item' onClick={openNestedDemo}>
              <div class='setting-section-item-text'>Clear Cache</div>
              <div class='setting-section-item-icon'>
                <i class='ifc-icon ma-chevron-right'></i>
              </div>
            </div>
          </div>
        </div>

        <div class='setting-section-group'>
          <div
            class='setting-section-row-btn'
            onClick={() => NotificationMessage.sendMessage('Logged out demo!', NotificationColor.Success)}
          >
            <i class='ifc-icon ma-logout'></i>
            <div>Logout Session</div>
          </div>
        </div>
      </div>
    );
  };

  const dom = new HtmlVar(renderContent());
  return <div style={{ height: '100%', overflow: 'auto' }}>{dom.node}</div>;
};

export const UserSettingsMock = (props: { sliderFrameHook: SliderFrameHookProps }) => {
  props.sliderFrameHook.addClass!('desktop-slide-left');

  return (
    <HeaderWithBackFrame
      title='Settings (Demo)'
      onBack={(event: any) => {
        props.sliderFrameHook.close!(event);
      }}
    >
      <UserSettingsMockContent />
    </HeaderWithBackFrame>
  );
};
