// import { mountSelfComponents, renderComponent } from "./mount-components";

import { VNode } from "../jsx";
import { bindAttributes } from "./bind-attributes";
import { bindLinks } from "./bind-links";
import { renderComponents } from "./render-components";
import { replaceInnerhtml } from "./replace-innerhtml";

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
    return el.querySelector(`[${id}] ` + selector);
    // const dom = LiteDom.queryOne(el);
    // return dom && dom.$(selector, value);
  };
  newProps['ref'].$all = (selector: string) => {
    return el.querySelectorAll(`[${id}] ` + selector);
  };

  newProps['ref'].loadContent = async (content: string | VNode<any>) => {
    if (typeof content === 'object' && content.type && content.props) {
      // await mountComponents(el, content);
      renderComponents(content.type, content.props);
      await replaceInnerhtml(el, content.props._html.join(''));
      bindAttributes(el, content.type, content.props);
      bindLinks(el);
    } else {
      await replaceInnerhtml(el, content as string);
    }
  };
};
