import { RefProps, CssProps, callUnload, mountInnerComponent } from 'lupine.web';
import { Spinner02, SpinnerSize } from './spinner';

export type LoadingSpinHookProps = {
  show?: () => void;
  close?: () => void;
};
export type LoadingSpinProps = {
  hook?: LoadingSpinHookProps;
  text?: string;
};
export const LoadingSpinComponent = (props: LoadingSpinProps) => {
  const css: CssProps = {
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--cover-mask-bg-color)',
    zIndex: 'var(--layer-guide)',
    '.loading-gif': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      margin: 'auto',
    },
    '.loading-gif-text': {
      color: '#fff',
      fontSize: '15px',
      fontWeight: '500',
      lineHeight: '22px',
      padding: '0 24px',
      textAlign: 'center',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.35)',
    },
  };
  if (props.hook) {
    props.hook.show = () => {
      const dom = ref.current as HTMLDivElement;
      dom.classList.remove('d-none');
    };
    props.hook.close = () => {
      const dom = ref.current as HTMLDivElement;
      dom.classList.add('d-none');
    };
  }

  const ref: RefProps = {};
  return (
    <div ref={ref} css={css} class='loading-gif-box'>
      <div class='loading-gif'>
        <Spinner02 size={SpinnerSize.Large} />
        {props.text && <div class='loading-gif-text'>{props.text}</div>}
      </div>
    </div>
  );
};

export class LoadingSpin {
  static async show(text?: string): Promise<() => void> {
    const handleClose = async () => {
      await callUnload(base);
      base.remove();
    };

    const base = document.createElement('div');
    document.body.appendChild(base);
    await mountInnerComponent(base, <LoadingSpinComponent text={text} />);
    return handleClose;
  }
}
0;
