import { CssProps } from 'lupine.web';
import { DesignNode, getDesignStore } from './design-store';

const buttonTypes = ['button', 'submit', 'reset'];

export const BlockButton = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props || {};
  const safeType = buttonTypes.includes(p.buttonType) ? p.buttonType : 'button';
  const sizeClass = p.size ? ` button-${p.size}` : '';
  const isDisabled = isPreview && p.disabled === true;

  const shouldFill = p.flex === '1';
  const css: CssProps = {
    margin: p.margin || '0',
    padding: p.padding || '0',
    minWidth: '0',
    flex: shouldFill ? '1 1 0' : '0 0 auto',
    width: p.width || (shouldFill ? '100%' : 'auto'),
    boxSizing: 'border-box',
    textAlign: p.textAlign || 'left',
    ...(p._sys_css || {}),
    '.block-button-control': {
      width: shouldFill ? '100%' : '',
      color: p.color || '',
      // because button-base has background, so we need to overwrite it
      background: p.backgroundColor || '',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.65 : 1,
      pointerEvents: isPreview ? 'auto' : 'none',
    },
  };

  const handleClick = (e: any) => {
    if (!isPreview) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (isDisabled) {
      e.preventDefault();
      return;
    }

    const script = String(p.script || '').trim();
    if (!script) return;

    try {
      const action = new Function('event', 'node', 'props', 'store', script);
      action.call(e.currentTarget, e, props.node, p, store);
    } catch (err) {
      console.error('BlockButton script error:', err);
    }
  };

  return (
    <div css={css} class='block-button' data-design-id={props.node.id}>
      <button
        class={`button-base block-button-control${sizeClass}`}
        type={safeType}
        disabled={isDisabled}
        onClick={handleClick}
      >
        {p.text || 'Button'}
      </button>
    </div>
  );
};
