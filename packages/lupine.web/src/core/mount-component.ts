import { bindAttributes } from './bind-attributes';
import { bindLinks } from './bind-links';
// import { Logger } from '../lib/logger';
// import { bindPageResetEvent } from './page-reset-events';
import { callUnload, replaceInnerhtml } from './replace-innerhtml';
import { renderComponentAsync } from './render-component';
import { VNode } from 'lupine.components';

// const logger = new Logger('mount-components');
export const mountInnerComponent = async (selector: string | null | Element, jsxNodes: VNode<any>) => {
  await renderComponentAsync(jsxNodes.type, jsxNodes.props);
  const el = selector && (typeof selector === 'string' ? document.querySelector(selector) : selector);
  if (el) {
    // call unload before releace innerHTML
    await replaceInnerhtml(el, jsxNodes.props._html.join(''));

    bindAttributes(el, jsxNodes.type, jsxNodes.props);
    bindLinks(el);
  }
};

// suggest to use HtmlVar.
export const mountOuterComponent = async (selector: string | Element, jsxNodes: VNode<any>) => {
  await renderComponentAsync(jsxNodes.type, jsxNodes.props);
  let el = selector && (typeof selector === 'string' ? document.querySelector(selector) : selector);
  if (el) {
    // Can't do outerHTML directly because it will lose attributes
    const template = document.createElement('template');
    // template.innerHTML = jsxNodes.props._html.join("");
    // call unload before releace innerHTML
    await replaceInnerhtml(template, jsxNodes.props._html.join(''));
    // renderComponent should only have one element
    template.content.children.length > 1 &&
      console.error('renderComponent should only have one element: ', template.content.children.length);
    const newEl = template.content.firstChild as Element;
    // el.replaceWith(newEl);
    await callUnload(el);
    el.parentNode?.replaceChild(newEl, el);
    bindAttributes(newEl, jsxNodes.type, jsxNodes.props);
    bindLinks(newEl);
  }
};

// suggest to use HtmlVar.
export const mountSiblingComponent = async (
  selector: string | Element,
  jsxNodes: VNode<any>,
  position: 'before' | 'after' = 'after'
) => {
  await renderComponentAsync(jsxNodes.type, jsxNodes.props);
  let el = selector && (typeof selector === 'string' ? document.querySelector(selector) : selector);
  if (el) {
    // Can't do outerHTML directly because it will lose attributes
    const template = document.createElement('template');
    // template.innerHTML = jsxNodes.props._html.join("");
    // call unload before releace innerHTML
    await replaceInnerhtml(template, jsxNodes.props._html.join(''));
    // renderComponent should only have one element
    template.content.children.length > 1 &&
      console.error('renderComponent should only have one element: ', template.content.children.length);
    const newEl = template.content.firstChild as Element;
    // el.replaceWith(newEl);
    await callUnload(el);
    if (el.nextSibling || position === 'before') {
      el.parentNode?.insertBefore(newEl, position === 'after' ? el.nextSibling : el);
    } else {
      el.parentNode?.appendChild(newEl);
    }
    bindAttributes(newEl, jsxNodes.type, jsxNodes.props);
    bindLinks(newEl);
  }
};
