import { CssProps, VNode, RefProps } from 'lupine.components';
import { DemoContainer } from './demo-container';
import { DemoStory } from './demo-types';

export type DemoPageProps<T> = {
  story: DemoStory<T>;
};

export const DemoPage = <T,>(props: DemoPageProps<T>) => {
  const { story } = props;
  let currentArgs = { ...story.args };
  let iframeWindow: any = null;

  const updatePreview = () => {
    if (iframeWindow && iframeWindow._lj_demo_hook) {
      iframeWindow._lj_demo_hook.updateArgs(currentArgs);
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
      '.&-title': {
        margin: '0 0 16px 0',
        fontSize: '16px',
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
    return (
      <div css={controlCss}>
        <h3 class='&-title'>Controls</h3>
        {Object.keys(story.argTypes).map((key) => {
          const argType = (story.argTypes as any)[key];
          return renderControl(key, argType);
        })}
      </div>
    );
  };

  return <DemoContainer demoUrl={`/demo?id=${story.id}`} onIframeLoad={onIframeLoad} controlBox={renderControlBox()} />;
};
