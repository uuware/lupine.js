import { RefProps, Spinner02, SpinnerSize } from 'lupine.components';
import { CssProps, mountInnerComponent } from 'lupine.components';

export type LoadingSpinHookProps = {
  show?: () => void;
  close?: () => void;
};
export type LoadingSpinProps = {
  hook?: LoadingSpinHookProps;
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
      margin: 'auto',
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
      </div>
    </div>
  );
};

export class LoadingSpin {
  static async show(): Promise<() => void> {
    const handleClose = () => {
      base.remove();
    };

    const base = document.createElement('div');
    document.body.appendChild(base);
    await mountInnerComponent(base, <LoadingSpinComponent />);
    return handleClose;
  }
}
0;
