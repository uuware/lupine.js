export const replaceInnerhtml = async (el: Element, newHtml: string) => {
  // keep <style id="sty-${newProps._id}">...</style>
  const firstDom = el.firstChild as Element;
  if (firstDom && firstDom.tagName === 'STYLE') {
    firstDom.parentNode?.removeChild(firstDom);
  }

  await callUnload(el);
  el.innerHTML = newHtml;

  if (firstDom && firstDom.tagName === 'STYLE') {
    el.insertBefore(firstDom, el.firstChild);
  }
};
export const replaceBetweenComments = async (startComment: Comment, newHtml: string) => {
  const targetEndText = `/${startComment.nodeValue}`;
  let endComment: Node | null = startComment.nextSibling;
  const nodesToRemove: Node[] = [];

  while (endComment) {
    if (endComment.nodeType === 8 && endComment.nodeValue === targetEndText) {
      break;
    }
    nodesToRemove.push(endComment);
    endComment = endComment.nextSibling;
  }

  // Handle unload for any components in nodesToRemove
  const promises: Promise<void>[] = [];
  nodesToRemove.forEach((node) => {
    if (node.nodeType === 1) {
      const el = node as Element;
      if ((el as any)._lj && (el as any)._lj.onUnload) {
        promises.push((el as any)._lj.onUnload());
      }
      el.querySelectorAll('[data-ref]').forEach((child: any) => {
        if (child._lj && child._lj.onUnload) {
          promises.push(child._lj.onUnload());
        }
      });
    }
  });
  await Promise.all(promises);

  nodesToRemove.forEach((node) => node.parentNode?.removeChild(node));

  if (endComment && endComment.parentNode) {
    const template = document.createElement('template');
    template.innerHTML = newHtml;
    endComment.parentNode.insertBefore(template.content, endComment);
  }
};

export const callUnload = async (el: Element) => {
  const promises: Promise<void>[] = [];
  if (el) {
    if ((el as any)._lj && (el as any)._lj.onUnload) {
      promises.push((el as any)._lj.onUnload());
    }
    el.querySelectorAll('[data-ref]').forEach((child: any) => {
      if (child._lj && child._lj.onUnload) {
        promises.push(child._lj.onUnload());
      }
    });

    await Promise.all(promises);
  }
};

export const refreshPage = async (url?: string) => {
  await callUnload(document.querySelector('.lupine-root') as Element);
  window.location.href = url || window.location.href;
};
