import { CssProps, HeaderWithBackFrame, SliderFrameHookProps } from 'lupine.components';

export const MineAboutContent = () => {
  const css: CssProps = {
    flex: 1,
    overflowY: 'auto',
    padding: '32px 24px',
    backgroundColor: 'var(--primary-bg-color)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '.about-logo': {
      width: '80px',
      height: '80px',
      borderRadius: '20px',
      backgroundColor: 'var(--primary-accent-color)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      marginBottom: '16px',
      boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
    },
    '.about-title': {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'var(--primary-color)',
      marginBottom: '8px',
    },
    '.about-version': {
      fontSize: '14px',
      color: 'var(--secondary-color)',
      marginBottom: '32px',
    },
    '.about-content': {
      fontSize: '16px',
      color: 'var(--primary-color)',
      lineHeight: '1.8',
      textAlign: 'center',
      marginBottom: '32px',
      maxWidth: '500px',
      whiteSpace: 'pre-wrap',
    },
    '.about-link': {
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
Using this template alongside AI, you can rapidly build and deploy cross-platform applications.`;

  return (
    <div css={css} class='about-page-wrapper no-scrollbar-container flex-col h-100'>
      <div class='about-logo'>
        <i class='ifc-icon ma-text-box-outline'></i>
      </div>
      <div class='about-title'>Lupine Note Starter</div>
      <div class='about-version'>Version 1.0.0</div>

      <div class='about-content'>{textContent}</div>

      <a class='about-link' href='https://github.com/uuware/lupine.js' target='_blank'>
        Learn More
      </a>
    </div>
  );
};

export const MineAboutPage = (props: { sliderFrameHook?: SliderFrameHookProps }) => {
  return (
    <HeaderWithBackFrame title='About' onBack={(e: Event) => props.sliderFrameHook?.close!(e)}>
      <MineAboutContent />
    </HeaderWithBackFrame>
  );
};
