import { bindAttributes } from './bind-attributes';
import { bindLinks } from './bind-links';
// import { Logger } from '../lib/logger';
// import { bindPageResetEvent } from './page-reset-events';
import { callUnload, replaceInnerhtml, replaceBetweenComments } from './replace-innerhtml';
import { renderComponentAsync } from './render-component';
import { VNode } from '../jsx';

// const logger = new Logger('mount-components');
export const mountInnerComponent = async (selector: string | null | Element | Node, jsxNodes: VNode<any>) => {
  const el = selector && (typeof selector === 'string' ? document.querySelector(selector) : selector) as Element | Node;
  const uniqueClassName = el && (el as any)._lj?.ref?._cssName;
  const referToCssId = el && (el as any)._lj?.ref?._refCssId;
  await renderComponentAsync(jsxNodes.type, jsxNodes.props, uniqueClassName, referToCssId);
  if (el) {
    if (el.nodeType === 8) {
      await replaceBetweenComments(el as Comment, jsxNodes.props._html.join(''));
      if (el.parentNode) {
        bindAttributes(el.parentNode, jsxNodes.type, jsxNodes.props, { mountInnerComponent, mountOuterComponent });
        bindLinks(el.parentNode as Element);
      }
    } else {
      // call unload before releace innerHTML
      await replaceInnerhtml(el as Element, jsxNodes.props._html.join(''));

      bindAttributes(el as Element, jsxNodes.type, jsxNodes.props, { mountInnerComponent, mountOuterComponent });
      bindLinks(el as Element);
    }
  }
};

// suggest to use HtmlVar.
export const mountOuterComponent = async (selector: string | Element | Node, jsxNodes: VNode<any>) => {
  let el = selector && (typeof selector === 'string' ? document.querySelector(selector) : selector) as Element | Node;
  const uniqueClassName = el && (el as any)._lj?.ref?._cssName;
  const referToCssId = el && (el as any)._lj?.ref?._refCssId;
  await renderComponentAsync(jsxNodes.type, jsxNodes.props, uniqueClassName, referToCssId);
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
    if (el.nodeType === 8) {
      console.warn('mountOuterComponent on Comment node is not fully supported yet');
    } else {
      await callUnload(el as Element);
    }
    el.parentNode?.replaceChild(newEl, el);
    bindAttributes(newEl, jsxNodes.type, jsxNodes.props, { mountInnerComponent, mountOuterComponent });
    bindLinks(newEl);
  }
};
