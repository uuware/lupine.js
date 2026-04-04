import { bindRef } from './bind-ref';
import { MounterProps } from '../models/mounter-props';

export const bindAttributesChildren = (topEl: Element, children: any, mounters: MounterProps) => {
  for (let i = 0; i < children.length; i++) {
    const item = children[i];
    if (item && item.type && item.props) {
      bindAttributes(topEl, item.type, item.props, mounters);
    } else if (item && Array.isArray(item)) {
      bindAttributesChildren(topEl, item, mounters);
    } else if (
      typeof item !== 'undefined' &&
      item !== null &&
      typeof item !== 'string' &&
      typeof item !== 'number' &&
      typeof item !== 'boolean'
    ) {
      console.warn(`Unexpected children:`, item);
    }
  }
};

export const bindAttributes = (topEl: Element, type: any, props: any, mounters: MounterProps) => {
  const newProps = (props._result && props._result.props) || props;
  if (newProps._id) {
    let el = topEl.querySelector(`[${newProps._id}]`);
    if (!el && topEl.getAttribute(newProps._id) === '') {
      el = topEl;
    }
    if (el) {
      for (let i in newProps) {
        if (i === 'ref') {
          bindRef(type, newProps, el, mounters);
          // } else if (i === "css") {
          //     mountStyles(`[${newProps._id}]`, `[${newProps._id}]`, newProps[i]);
        } else if (i[0] === 'o' && i[1] === 'n') {
          let name = i;
          if (name.toLowerCase() in el) name = name.toLowerCase().slice(2);
          else name = name.slice(2);
          // console.log('===bind event', name, el);
          el.addEventListener(name, newProps[i]);
        }
      }
    }
  }

  if (newProps.children && Array.isArray(newProps.children)) {
    bindAttributesChildren(topEl, newProps.children, mounters);
  } else if (newProps._result && newProps._result.type !== 'Fragment' && newProps._result.props) {
    bindAttributes(topEl, newProps._result.type, newProps._result.props, mounters);
  } else if (newProps.children && newProps.children.type && newProps.children.props) {
    bindAttributes(topEl, newProps.children.type, newProps.children.props, mounters);
  } else if (
    !newProps.children ||
    typeof newProps.children === 'string' ||
    typeof newProps.children === 'number' ||
    typeof newProps.children === 'boolean'
  ) {
  } else {
    console.warn(`Unexpected children:`, newProps.children, type, props);
  }
};
