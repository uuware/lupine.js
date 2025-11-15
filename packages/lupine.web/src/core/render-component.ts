import { Logger } from '../lib/logger';
import { uniqueIdGenerator } from '../lib/unique-id';
import { processStyle } from './bind-styles';
// import { bindPageResetEvent } from './page-reset-events';
import { camelToHyphens } from './camel-to-hyphens';

const logger = new Logger('render-components');
export const domUniqueId = uniqueIdGenerator('l'); // l means label
// bindPageResetEvent(() => {
//   // reset unique id
//   domUniqueId(true);
// });

function renderChildren(html: string[], children: any, uniqueClassName?: string, globalCssId?: string) {
  if (typeof children === 'string') {
    html.push(children);
  } else if (children === false || children === null || typeof children === 'undefined') {
    // add nothing
  } else if (typeof children === 'number' || typeof children === 'boolean') {
    // true will be added
    html.push(children.toString());
  } else if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const item = children[i];
      renderChildren(html, item, uniqueClassName, globalCssId);
    }
  } else if (children.type && children.props) {
    renderComponent(children.type, children.props, uniqueClassName, globalCssId);
    html.push(...children.props._html);
    children.props._html.length = 0;
  } else {
    logger.warn('Unexpected', children);
  }
}

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

const genUniqueId = (props: any) => {
  if (!props._id) {
    props._id = domUniqueId();
  }
  return props._id;
};
// data-refid will be assigned with a ref.id
function renderAttribute(type: any, props: any, jsxNodes: any, uniqueClassName?: string, globalCssId?: string) {
  const html = [];
  // data-refid is used for nested components like this:
  //    <div class='class-name' ref={ref} ...>...
  //      <div data-refid={ref}>
  // then data-refid can be located:
  //   ref.$(`.class-name[data-refid=${ref.id}]`)
  // if (props['data-refid'] && props['data-refid'].id) {
  //   props['data-refid'] = props['data-refid'].id;
  // }
  for (let i in props) {
    if (i === 'ref') {
      if (props[i]) {
        props[i].id = genUniqueId(props);
        html.push('data-ref');
      }
    } else if (!['children', 'key', '_result', '_html', '_id'].includes(i)) {
      //, "_lb"
      // , "value", "checked"
      // style is a  string, in-line style
      if (i === 'style') {
        if (typeof props[i] === 'object') {
          let attrs = `${i}="`;
          for (let j in props[i]) {
            attrs += `${camelToHyphens(j)}:${props[i][j]};`;
          }
          attrs += `"`;
          html.push(attrs);
        } else {
          html.push(`${i}="${props[i]}"`);
        }
      } else if (i === 'css') {
        // css is a <style> tag, and is the first element in html
        genUniqueId(props);
        // props._lb = props._id;
      } else if (i[0] === 'o' && i[1] === 'n') {
        genUniqueId(props);
      } else if (i === 'defaultChecked') {
        if (props[i] === true || props[i] === 'checked') {
          html.push(`checked="true"`);
        }
      } else if (i === 'readonly' || i === 'disabled' || i === 'selected' || i === 'checked') {
        if (props[i] !== undefined && props[i] !== false && props[i] !== 'false') {
          html.push(`${i}="${props[i]}"`);
        }
      } else if (i === 'class' || i === 'className') {
        let classNameList = props[i].split(' ').filter((item: string) => item && item !== '');
        if ((props['css'] || props['ref']) && !classNameList.includes(props._id)) {
          // add as the first
          classNameList.unshift(props._id);
        }
        if (props['ref'] && props['ref'].globalCssId && !classNameList.includes(props['ref'].globalCssId)) {
          // add as the first
          classNameList.unshift(props['ref'].globalCssId);
        }
        if (globalCssId && uniqueClassName) {
          // &xx -> globalCssId + xx and uniqueClassName+xx
          classNameList = classNameList.flatMap((item: string) => {
            if (item.includes('&')) {
              return [item.replace(/&/g, globalCssId), item.replace(/&/g, uniqueClassName)];
            }
            return [item];
          });
        } else if (globalCssId) {
          classNameList = classNameList.map((item: string) => item.replace(/&/g, globalCssId));
        } else if (uniqueClassName) {
          classNameList = classNameList.map((item: string) => item.replace(/&/g, uniqueClassName));
        }
        html.push(`class="${classNameList.join(' ')}"`);
      } else if (i !== 'dangerouslySetInnerHTML') {
        html.push(`${i}="${props[i]}"`);
      }
    }
  }
  if (props._id) {
    // tag id will be after all attributes
    html.push(props._id);
  }
  return html.join(' ');
}

// The result has only one element
export const renderComponent = (type: any, props: any, uniqueClassName?: string, globalCssId?: string) => {
  //   logger.log("==================renderComponent", type);
  if (Array.isArray(props)) {
    const jsxNodes = { type: 'Fragment', props: { children: props } } as any;
    renderComponent(jsxNodes.type, jsxNodes.props, uniqueClassName, globalCssId);
    return;
  }

  props._html = [];
  if (typeof type === 'function') {
    props._result = type.call(null, props);
    if (props._result === null || props._result === undefined || props._result === false) {
      // placeholder for sub components
      props._result = { type: 'Fragment', props };
    }
    // if (props._fragment_ref && props._result && props._result.props) {
    //   // pass the ref to the sub Fragment tag
    //   props._result.props.ref = props._fragment_ref;
    //   props._result.props._id = genUniqueId(props._result.props);
    // }
    // logger.log('==========props._result', props._result);
    if (typeof props._result.type === 'function') {
      renderComponent(props._result.type, props._result.props, uniqueClassName, globalCssId);
      if (props._result.props._html) {
        props._html.push(...props._result.props._html);
        props._result.props._html.length = 0;
      }
      // function component doesn't have any attributes
      return;
    }
  }
  const newType = (props._result && props._result.type) || type;
  const newProps = (props._result && props._result.props) || props;
  if (newType === 'div' && newProps.class === 'answer-box') {
    console.log('renderComponent', newType, newProps);
  }
  if (typeof newType === 'string') {
    if (newProps._id) {
      console.warn('This component reference is used more than once and will have binding issues: ', newProps);
    }
    let newUniqueClassName = uniqueClassName;
    if (newProps['css'] || newProps['ref']) {
      newUniqueClassName = genUniqueId(newProps);
      if (!newProps['class'] && !newProps['className']) {
        newProps['class'] = newUniqueClassName;
      }
    }
    let newGlobalCssId = globalCssId;
    if (newProps['ref'] && newProps['ref'].globalCssId) {
      newGlobalCssId = newProps['ref'].globalCssId;
    }
    const attrs = renderAttribute(newType, newProps, { type, props }, newUniqueClassName, newGlobalCssId);
    if (selfClosingTags.includes(newType.toLowerCase())) {
      // for Fragment, only needs this tag when Ref is assigned
      if (newType !== 'Fragment' || newProps.ref) {
        props._html.push(`<${newType}${attrs ? ' ' : ''}${attrs} />`);
      }
      if (newProps['css']) {
        console.warn(`ClosingTag [${newType}] doesn't support 'css', please use 'style' instead.`);
      }
    } else {
      if (newType !== 'Fragment' || newProps.ref) {
        props._html.push(`<${newType}${attrs ? ' ' : ''}${attrs}>`);
      }

      if (newProps['css']) {
        const cssText = processStyle(newUniqueClassName!, newProps['css']).join('');
        props._html.push(`<style id="sty-${newUniqueClassName}">${cssText}</style>`); // sty means style, and updateStyles has the same name
      }

      if (newProps.children || newProps.children === 0) {
        // if (newProps._lb) {
        //     assignLabels(newProps._lb, newProps.children);
        // }

        renderChildren(props._html, newProps.children, newUniqueClassName, newGlobalCssId);
      } else if (newProps['dangerouslySetInnerHTML']) {
        props._html.push(newProps['dangerouslySetInnerHTML']);
      } else {
        // single element
      }

      if (newType !== 'Fragment' || newProps.ref) {
        props._html.push(`</${newType}>`);
      }
    }
  } else if (newType.name === 'Fragment') {
    renderChildren(props._html, newProps.children, uniqueClassName, globalCssId);
  } else {
    logger.warn('Unknown type: ', type, props, newType, newProps);
  }
};
