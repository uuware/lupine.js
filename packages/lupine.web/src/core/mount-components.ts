import { bindAttributes } from './bind-attributes';
import { bindLinks } from './bind-links';
import { VNode } from '../jsx';
// import { Logger } from '../lib/logger';
// import { bindPageResetEvent } from './page-reset-events';
import { replaceInnerhtml } from './replace-innerhtml';
import { renderComponents } from './render-components';

// const logger = new Logger('mount-components');
export const mountComponents = async (selector: string | null | Element, jsxNodes: VNode<any>) => {
  renderComponents(jsxNodes.type, jsxNodes.props);
  const el = selector && (typeof selector === 'string' ? document.querySelector(selector) : selector);
  if (el) {
    // call unload before releace innerHTML
    await replaceInnerhtml(el, jsxNodes.props._html.join(''));

    bindAttributes(el, jsxNodes.type, jsxNodes.props);
    bindLinks(el);
  }
};

// // suggest to use HtmlVar.
// export const mountSelfComponents = async (selector: string | null | Element, jsxNodes: VNode<any>) => {
//   renderComponents(jsxNodes.type, jsxNodes.props);
//   let el = selector && (typeof selector === 'string' ? document.querySelector(selector) : selector);
//   if (el) {
//     const parentNode = el.parentElement;
//     // Can't do outerHTML directly because it will lose attributes
//     const template = document.createElement('template');
//     // template.innerHTML = jsxNodes.props._html.join("");
//     // call unload before releace innerHTML
//     await replaceInnerhtml(template, jsxNodes.props._html.join(''));

//     // renderComponent should only have one element
//     template.content.children.length > 1 &&
//       console.error('renderComponent should only have one element: ', template.content.children.length);
//     el.replaceWith(template.content.firstChild as Element);
//     el = parentNode as Element;
//     bindAttributes(el, jsxNodes.type, jsxNodes.props);
//     bindLinks(el);
//   }
// };
