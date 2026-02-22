import { CssProps, RefProps, VNode } from 'lupine.components';

export type DemoContainerProps = {
  demoUrl: string;
  onIframeLoad?: (iframeWindow: Window) => void;
  controlBox: VNode<any>;
};
export const DemoContainer = (props: DemoContainerProps) => {
  const css: CssProps = {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '.&-iframe-box': {
      flex: 1,
      minHeight: '200px', // Ensure it has some height
    },
    '.&-iframe': {
      width: '100%',
      height: '100%',
      // backgroundColor: 'white', // Default background for preview
      border: 'dotted 1px red',
    },
    '.&-control-box': {
      // Allow it to grow if needed, or scroll
      minHeight: '50px',
      maxHeight: '50%',
      overflowY: 'auto',
      borderTop: '1px solid var(--border-color, #ccc)',
      padding: 'var(--space-m, 8px)',
    },
  };

  const findIframe = () => {
    const iframe = ref.$('&-iframe') as HTMLIFrameElement;
    return iframe;
  };

  const onLoad = () => {
    if (props.onIframeLoad) {
      const iframe = findIframe();
      if (iframe.contentWindow) {
        props.onIframeLoad(iframe.contentWindow);
      }
    }
  };

  const ref: RefProps = {};
  return (
    <div css={css} ref={ref} class='demo-container-top'>
      <div class='&-iframe-box'>
        <iframe class='&-iframe' src={props.demoUrl} frameBorder='0' onLoad={onLoad}></iframe>
      </div>
      <div class='&-control-box'>{props.controlBox}</div>
    </div>
  );
};
