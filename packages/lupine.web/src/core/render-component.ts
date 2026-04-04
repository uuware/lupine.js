import { processStyle } from './bind-styles';
import { VNodeType, VNodeProps } from '../jsx';
import { ComponentStateStore, evaluateComponentWithStore } from './use-state';
import { renderAttribute, genUniqueId } from './render-attribute';

const selfClosingTags = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
];

// shared state, global throttle for requests but safe
let _yieldCounter = 0;
const YIELD_THRESHOLD = 50;

async function renderChildrenAsync(html: string[], children: any, uniqueClassName?: string, globalCssId?: string) {
  if (typeof children === 'string') {
    html.push(children);
  } else if (children === false || children === null || typeof children === 'undefined') {
    // add nothing
  } else if (typeof children === 'number' || typeof children === 'boolean') {
    // true will be added
    html.push(children.toString());
  } else if (Array.isArray(children)) {
    for (const item of children) {
      await renderChildrenAsync(html, item, uniqueClassName, globalCssId);
    }
  } else if (children.type && children.props) {
    await renderComponentAsync(children.type, children.props, uniqueClassName, globalCssId);
    html.push(...children.props._html);
    children.props._html.length = 0;
  } else {
    console.warn('Unexpected', children);
  }
}

export const renderComponentAsync = async (type: VNodeType<any>, props: VNodeProps<any>, uniqueClassName?: string, globalCssId?: string) => {
  _yieldCounter++;
  if (_yieldCounter >= YIELD_THRESHOLD) {
    _yieldCounter = 0;
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  }

  if (Array.isArray(props)) {
    const jsxNodes = { type: 'Fragment', props: { children: props } } as any;
    await renderComponentAsync(jsxNodes.type, jsxNodes.props, uniqueClassName, globalCssId);
    return;
  }

  props._html = [];
  if (typeof type === 'function') {
    const store = new ComponentStateStore(type, props);
    props._result = await evaluateComponentWithStore(store);

    if (props._result === null || props._result === undefined || props._result === false) {
      props._result = { type: 'Fragment', props };
    }

    if (typeof props._result.type === 'function') {
      await renderComponentAsync(props._result.type, props._result.props, uniqueClassName, globalCssId);
      if (props._result.props._html) {
        props._html.push(...props._result.props._html);
        props._result.props._html.length = 0;
      }
      return;
    }
  }

  const newType = (props._result && props._result.type) || type;
  const newProps = (props._result && props._result.props) || props;

  if (typeof newType === 'string') {
    // if (newProps._id) {
    //   console.warn('This component reference is used more than once:', newProps);
    // }

    let newUniqueClassName = uniqueClassName;
    // if having css, we need to replace & for mapping css and classnames
    // if having ref, we still need to replace & for searching
    if (newProps['css'] || newProps['ref']) {
      newUniqueClassName = genUniqueId(newProps);
      if (!newProps['class'] && !newProps['className']) newProps['class'] = newUniqueClassName;
    }

    let newGlobalCssId = globalCssId;
    if (newProps['ref'] && newProps['ref'].globalCssId) newGlobalCssId = newProps['ref'].globalCssId;

    const attrs = renderAttribute(newType, newProps, { type, props }, newUniqueClassName, newGlobalCssId);

    if (selfClosingTags.includes(newType.toLowerCase())) {
      if (newType !== 'Fragment' || newProps.ref) {
        props._html.push(`<${newType}${attrs ? ' ' : ''}${attrs} />`);
      }
    } else {
      if (newType !== 'Fragment' || newProps.ref) {
        props._html.push(`<${newType}${attrs ? ' ' : ''}${attrs}>`);
      }

      if (newProps['css']) {
        // notice: if globalCssId is provided, it will be used to replace & in css
        const realCssId = newProps['ref']?.globalCssId || newUniqueClassName;
        const cssText = processStyle(realCssId, newProps['css']).join('');
        props._html.push(`<style id="sty-${newUniqueClassName}">${cssText}</style>`);
      }

      if (newProps.children || newProps.children === 0) {
        await renderChildrenAsync(props._html, newProps.children, newUniqueClassName, newGlobalCssId);
      } else if (newProps['dangerouslySetInnerHTML']) {
        props._html.push(newProps['dangerouslySetInnerHTML']);
      }

      if (newType !== 'Fragment' || newProps.ref) {
        props._html.push(`</${newType}>`);
      }
    }
  } else if (newType.name === 'Fragment') {
    await renderChildrenAsync(props._html, newProps.children, uniqueClassName, globalCssId);
  } else {
    console.warn('Unknown type: ', type, props, newType, newProps);
  }
};
