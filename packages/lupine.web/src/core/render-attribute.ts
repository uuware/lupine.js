import { uniqueIdGenerator } from '../lib/unique-id';
import { camelToHyphens } from './camel-to-hyphens';

export const domUniqueId = uniqueIdGenerator('l'); // l means label

const escapeAttr = (val: any) => {
  if (typeof val === 'string') {
    return val.replace(/"/g, '&quot;');
  }
  return val;
};

export const genUniqueId = (props: any) => {
  if (!props._id) {
    props._id = domUniqueId();
  }
  return props._id;
};
// data-refid will be assigned with a ref.id
export const renderAttribute = (
  type: any,
  props: any,
  jsxNodes: any,
  uniqueClassName?: string,
  globalCssId?: string
) => {
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
        // used in callUnload
        html.push('data-ref');
      }
    } else if (!['children', 'key', '_result', '_html', '_id'].includes(i)) {
      //, "_lb"
      // , "value", "checked"
      // style is a  string, in-line style
      if (i === 'style') {
        if (typeof props[i] === 'object') {
          let attrs = '';
          for (let j in props[i]) {
            attrs += `${camelToHyphens(j)}:${escapeAttr(props[i][j])};`;
          }
          if (attrs) {
            html.push(`${i}="${attrs}"`);
          }
        } else if (props[i]) {
          html.push(`${i}="${escapeAttr(props[i])}"`);
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
          html.push(`${i}="${escapeAttr(props[i])}"`);
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
        html.push(`${i}="${escapeAttr(props[i])}"`);
      }
    }
  }
  if (props._id) {
    // tag id will be after all attributes
    html.push(props._id);
  }
  return html.join(' ');
};
