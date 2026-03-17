import { CssProps, HeaderWithBackFrame, SliderFrameHookProps } from 'lupine.components';

export const MinePremiumPage = (props: { sliderFrameHook: SliderFrameHookProps }) => {
  const css: CssProps = {
    flex: 1,
    overflowY: 'auto',
    padding: '32px 24px',
    backgroundColor: 'var(--primary-bg-color)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '.premium-logo': {
      width: '80px',
      height: '80px',
      borderRadius: '20px',
      background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)',
      color: '#FFD700',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      marginBottom: '16px',
      boxShadow: '0 4px 12px rgba(255, 154, 158, 0.3)',
    },
    '.premium-title': {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'var(--primary-color)',
      marginBottom: '8px',
    },
    '.premium-version': {
      fontSize: '14px',
      color: 'var(--secondary-color)',
      marginBottom: '32px',
    },
    '.premium-content': {
      fontSize: '16px',
      color: 'var(--primary-color)',
      lineHeight: '1.8',
      textAlign: 'center',
      marginBottom: '32px',
      maxWidth: '500px',
      whiteSpace: 'pre-wrap',
    },
    '.premium-link': {
      color: 'var(--primary-accent-color)',
      textDecoration: 'none',
      fontWeight: 'bold',
      padding: '12px 24px',
      border: '1px solid var(--primary-accent-color)',
      borderRadius: '24px',
      transition: 'all 0.2s',
      '&:active': {
        backgroundColor: 'rgba(24, 144, 255, 0.1)',
      },
    },
  };

  const textContent = `This is a demo application built for the full-stack framework Lupine.js.
If you need customized special functions or premium features, please click the button below to open the github open source link and raise an issue.`;

  return (
    <HeaderWithBackFrame title='Premium Demo' onBack={(e: Event) => props.sliderFrameHook.close!(e)}>
      <div css={css} class='premium-page-wrapper no-scrollbar-container flex-col h-100'>
        <div class='premium-logo'>
          <i class='ifc-icon ma-star'></i>
        </div>
        <div class='premium-title'>Premium Features</div>
        <div class='premium-version'>Unlock the Full Potential</div>

        <div class='premium-content'>{textContent}</div>

        <a class='premium-link' href='https://github.com/uuware/lupine.js/issues/new' target='_blank'>
          Request Custom Features
        </a>
      </div>
    </HeaderWithBackFrame>
  );
};
