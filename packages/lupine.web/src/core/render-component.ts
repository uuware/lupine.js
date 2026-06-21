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

import { encodeHtml } from '../lib/encode-html';

async function renderChildrenAsync(html: string[], children: any, uniqueClassName?: string, referToCssId?: string) {
  if (typeof children === 'string') {
    html.push(encodeHtml(children));
  } else if (children === false || children === null || typeof children === 'undefined') {
    // add nothing
  } else if (typeof children === 'number' || typeof children === 'boolean') {
    // true will be added
    html.push(children.toString());
  } else if (Array.isArray(children)) {
    for (const item of children) {
      await renderChildrenAsync(html, item, uniqueClassName, referToCssId);
    }
  } else if (children.type && children.props) {
    await renderComponentAsync(children.type, children.props, uniqueClassName, referToCssId);
    html.push(...children.props._html);
    children.props._html.length = 0;
  } else {
    console.warn('Unexpected', children);
  }
}

export const renderComponentAsync = async (type: VNodeType<any>, props: VNodeProps<any>, uniqueClassName?: string, referToCssId?: string) => {
  _yieldCounter++;
  if (_yieldCounter >= YIELD_THRESHOLD) {
    _yieldCounter = 0;
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  }

  if (Array.isArray(props)) {
    const jsxNodes = { type: 'Fragment', props: { children: props } } as any;
    await renderComponentAsync(jsxNodes.type, jsxNodes.props, uniqueClassName, referToCssId);
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
      await renderComponentAsync(props._result.type, props._result.props, uniqueClassName, referToCssId);
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
    if (newProps['class'] && newProps['className']) {
      console.warn(`One tag can't have both class and className, and className will be ignored.`, newProps);
      delete newProps['className'];
    } else if (newProps['className']) {
      newProps['class'] = newProps['className'];
      delete newProps['className'];
    }

    let newUniqueClassName = uniqueClassName;
    // if having css, we need to replace & for mapping css and classnames
    // if having ref, we still need to replace & for searching
    if (newProps['css'] || newProps['ref']) {
      newUniqueClassName = genUniqueId(newProps);
      if (!newProps['class']) newProps['class'] = newUniqueClassName;
      if (newProps['css'] || !referToCssId) referToCssId = newUniqueClassName;
    }

    let newReferToCssId = referToCssId;
    if (newProps['ref']) {
      if (newProps['ref'].referToCssId) {
        newReferToCssId = newProps['ref'].referToCssId;
      }

      // save for outerComponent/innerComponent loading
      newProps['ref']._refCssId = newReferToCssId;
      newProps['ref']._cssName = newUniqueClassName;
    }

    const attrs = renderAttribute(newType, newProps, { type, props }, newUniqueClassName, newReferToCssId);

    if (selfClosingTags.includes(newType.toLowerCase())) {
      if (newType !== 'Fragment' || newProps.ref) {
        props._html.push(`<${newType}${attrs ? ' ' : ''}${attrs} />`);
      }
    } else {
      if (newType !== 'Fragment' || newProps.ref) {
        props._html.push(`<${newType}${attrs ? ' ' : ''}${attrs}>`);
      }

      if (newProps['css'] && newUniqueClassName) {
        // notice: if referToCssId is provided, it should be only used in classnames.
        const cssText = processStyle(newUniqueClassName, newProps['css'], false).join('');
        props._html.push(`<style id="sty-${newUniqueClassName}">${cssText}</style>`);
      }

      if (newProps.children || newProps.children === 0) {
        await renderChildrenAsync(props._html, newProps.children, newUniqueClassName, newReferToCssId);
      } else if (newProps['dangerouslySetInnerHTML']) {
        props._html.push(newProps['dangerouslySetInnerHTML']);
      }

      if (newType !== 'Fragment' || newProps.ref) {
        props._html.push(`</${newType}>`);
      }
    }
  } else if (newType.name === 'Fragment') {
    await renderChildrenAsync(props._html, newProps.children, uniqueClassName, referToCssId);
  } else {
    console.warn('Unknown type: ', type, props, newType, newProps);
  }
};
