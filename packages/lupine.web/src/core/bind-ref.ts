import { VNode } from '../jsx';
import { mountInnerComponent, mountOuterComponent } from './mount-component';
import { replaceInnerhtml } from './replace-innerhtml';

export const bindRef = (type: any, newProps: any, el: Element) => {
  // console.log('========', newProps, el);
  const id = newProps._id;
  // newProps["ref"].id = id; // this is set at bindAttributes
  newProps['ref'].current = el;
  if (newProps['ref'].onLoad) {
    // setTimeout(() => newProps['ref'].onLoad(el), 0);
    // Promise.resolve().then(fn) will be called in the end of current event loop (quicker than setTimeout)
    const defer = Promise.prototype.then.bind(Promise.resolve());
    defer(() => newProps['ref'].onLoad(el));
  }
  if (newProps['ref'].onUnload) {
    (el as any)._lj = (el as any)._lj || {};
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
    if (selector.startsWith('&')) {
      return el.querySelector(`.${id}${selector.substring(1).replace(/&/g, id)}`);
    }
    return el.querySelector(`.${id} ${selector.replace(/&/g, id)}`);
  };
  newProps['ref'].$all = (selector: string) => {
    if (selector.startsWith('&')) {
      return el.querySelectorAll(`.${id}${selector.substring(1).replace(/&/g, id)}`);
    }
    return el.querySelectorAll(`.${id} ${selector.replace(/&/g, id)}`);
  };

  newProps['ref'].mountInnerComponent = async (content: string | VNode<any>) => {
    if (typeof content === 'object' && content.type && content.props) {
      await mountInnerComponent(el, content);
    } else {
      await replaceInnerhtml(el, content as string);
    }
  };
  newProps['ref'].mountOuterComponent = async (content: VNode<any>) => {
    await mountOuterComponent(el, content);
  };
};
