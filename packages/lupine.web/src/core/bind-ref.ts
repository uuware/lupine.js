import { VNode } from '../jsx';
import { replaceInnerhtml } from './replace-innerhtml';
import { MounterProps } from '../models/mounter-props';

export const bindRef = (type: any, newProps: any, el: Element | Node, mounters: MounterProps) => {
  // console.log('========', newProps, el);
  const id = newProps.id || newProps._id;
  // newProps["ref"].id = id; // this is set at bindAttributes
  (el as any)._lj = (el as any)._lj || {};
  (el as any)._lj.ref = newProps['ref'];

  newProps['ref'].current = el;
  if (newProps['ref'].onLoad) {
    // setTimeout(() => newProps['ref'].onLoad(el), 0);
    // Promise.resolve().then(fn) will be called in the end of current event loop (quicker than setTimeout)
    const defer = Promise.prototype.then.bind(Promise.resolve());
    defer(() => newProps['ref'].onLoad(el));
  }
  if (newProps['ref'].onUnload) {
    (el as any)._lj.onUnload = async () => {
      await newProps['ref'].onUnload(el);
    };
  }

  /**
   * ref.$('selector')
   * @param selector
   * @returns Element
   */
  newProps['ref'].$ = (selector: string) => {
    if (!selector || selector === '&') return el;
    if (el.nodeType === 8) {
      console.warn('Cannot use querySelector on a Comment node');
      return null;
    }

    if (newProps['ref'].referToCssId) {
      const gId = newProps['ref'].referToCssId;
      if (selector.startsWith('&')) {
        // top node may not have the gId classname
        return (el as Element).querySelector(`.${id}${selector.substring(1).replace(/&/g, gId)}`);
      }
      return (el as Element).querySelector(selector.replace(/&/g, gId));
    }

    if (selector.startsWith('&')) {
      return (el as Element).querySelector(`.${id}${selector.substring(1).replace(/&/g, id)}`);
    }
    return (el as Element).querySelector(selector.replace(/&/g, id));
  };
  newProps['ref'].$all = (selector: string) => {
    if (!selector || selector === '&') return [el];
    if (el.nodeType === 8) {
      console.warn('Cannot use querySelectorAll on a Comment node');
      return [];
    }

    if (newProps['ref'].referToCssId) {
      const gId = newProps['ref'].referToCssId;
      if (selector.startsWith('&')) {
        // top node may not have the gId classname
        return (el as Element).querySelectorAll(`.${id}${selector.substring(1).replace(/&/g, gId)}`);
      }
      return (el as Element).querySelectorAll(selector.replace(/&/g, gId));
    }

    if (selector.startsWith('&')) {
      return (el as Element).querySelectorAll(`.${id}${selector.substring(1).replace(/&/g, id)}`);
    }
    return (el as Element).querySelectorAll(selector.replace(/&/g, id));
  };

  newProps['ref'].mountInnerComponent = async (content: string | VNode<any>) => {
    if (typeof content === 'object' && content.type && content.props) {
      mounters.mountInnerComponent && await mounters.mountInnerComponent(el as Element, content);
    } else {
      await replaceInnerhtml(el as Element, content as string);
    }
  };
  newProps['ref'].mountOuterComponent = async (content: VNode<any>) => {
    mounters.mountOuterComponent && await mounters.mountOuterComponent(el as Element, content);
  };

  if (!newProps['ref'].refresh) {
    newProps['ref'].refresh = async () => {
      console.warn('refresh() not available: This ref is not attached to a functional component root.');
    };
  }
};
