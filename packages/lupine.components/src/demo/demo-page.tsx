import { CssProps, VNode, RefProps } from 'lupine.components';
import { DemoContainer } from './demo-container';
import { DemoStory } from './demo-types';

export type DemoPageProps<T> = {
  story: DemoStory<T>;
};

export const DemoPage = <T,>(props: DemoPageProps<T>) => {
  const { story } = props;
  let currentArgs = { ...story.args };
  let currentMode: 'preview' | 'code' = 'preview';
  let iframeWindow: any = null;

  const updatePreview = () => {
    if (iframeWindow && iframeWindow._lj_demo_hook) {
      iframeWindow._lj_demo_hook.updateArgs(currentArgs, currentMode === 'code');
    }
  };

  const onIframeLoad = (win: Window) => {
    iframeWindow = win;
    updatePreview();
  };

  const updateArg = (key: keyof T, value: any) => {
    currentArgs[key] = value;
    updatePreview();
  };

  const renderControl = (key: string, argType: any) => {
    const val = (currentArgs as any)[key];
    const { control, options, description } = argType;

    let inputNode: VNode = <span>Unknown control: {control}</span>;

    if (control === 'text') {
      inputNode = (
        <input
          class='&-ctl-input input-base'
          type='text'
          value={val || ''}
          onInput={(e) => updateArg(key as keyof T, (e.target as HTMLInputElement).value)}
        />
      );
    } else if (control === 'boolean') {
      inputNode = (
        <label class='&-ctl-check'>
          <input
            type='checkbox'
            checked={!!val}
            onChange={(e) => updateArg(key as keyof T, (e.target as HTMLInputElement).checked)}
          />
        </label>
      );
    } else if (control === 'select' && options) {
      inputNode = (
        <select
          class='&-ctl-input input-base'
          onChange={(e) => updateArg(key as keyof T, (e.target as HTMLSelectElement).value)}
        >
          {options.map((opt: string) => (
            <option value={opt} selected={opt === val}>
              {opt}
            </option>
          ))}
        </select>
      );
    } else if (control === 'number') {
      inputNode = (
        <input
          class='&-ctl-input input-base'
          type='number'
          value={val || 0}
          onInput={(e) => updateArg(key as keyof T, Number((e.target as HTMLInputElement).value))}
        />
      );
    }

    return (
      <div class='&-ctl-item'>
        <div class='&-ctl-label'>{key}</div>
        {inputNode}
        {description && <div class='&-ctl-desc'>{description}</div>}
      </div>
    );
  };

  const renderControlBox = () => {
    if (!story.argTypes) {
      return <div>No argTypes defined for this story.</div>;
    }

    const controlCss: CssProps = {
      padding: '8px',
      '.&-header': {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'space-between',
        margin: '0 0 16px 0',
      },
      '.&-title': {
        margin: 0,
        fontSize: '16px',
      },
      '.&-modes': {
        display: 'flex',
        gap: '4px',
        backgroundColor: '#f5f5f5',
        padding: '2px',
        borderRadius: '4px',
        marginLeft: '16px',
      },
      '.&-mode-btn': {
        border: 'none',
        background: 'transparent',
        padding: '4px 12px',
        fontSize: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        borderRadius: '2px',
        color: '#666',
        '&.active': {
          background: 'white',
          color: '#000',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        },
      },
      '.&-ctl-check': {
        display: 'flex',
        alignItems: 'center',
      },
      '.&-ctl-item': {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
      },
      '.&-ctl-label': {
        width: '120px',
        fontWeight: 'bold',
        fontSize: '14px',
      },
      '.&-ctl-input': {
        flex: 1,
        maxWidth: '300px',
        padding: '4px 8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
      },
      '.&-ctl-desc': {
        marginLeft: '8px',
        fontSize: '12px',
        color: '#666',
      },
    };
    const ref: RefProps = {};
    return (
      <div css={controlCss} ref={ref}>
        <div class='&-header'>
          <h3 class='&-title'>Controls</h3>
          <div class='&-modes'>
            <button
              class={`&-mode-btn ${currentMode === 'preview' ? 'active' : ''}`}
              onClick={() => {
                currentMode = 'preview';
                updatePreview();
                ref.$('&-mode-btn', true).forEach((btn: HTMLElement) => btn.classList.remove('active'));
                (ref.$('&-mode-btn')[0] as HTMLElement).classList.add('active');
              }}
            >
              Preview
            </button>
            <button
              class={`&-mode-btn ${currentMode === 'code' ? 'active' : ''}`}
              onClick={() => {
                currentMode = 'code';
                updatePreview();
                ref.$('&-mode-btn', true).forEach((btn: HTMLElement) => btn.classList.remove('active'));
                (ref.$('&-mode-btn')[1] as HTMLElement).classList.add('active');
              }}
            >
              Code
            </button>
          </div>
        </div>
        {story.argTypes &&
          Object.keys(story.argTypes).map((key) => {
            const argType = (story.argTypes as any)[key];
            return renderControl(key, argType);
          })}
      </div>
    );
  };

  const url =
    typeof location !== 'undefined' ? location.pathname + `/demo?id=${story.id}` : `/demo/demo?id=${story.id}`;
  return <DemoContainer demoUrl={url} onIframeLoad={onIframeLoad} controlBox={renderControlBox()} />;
};
