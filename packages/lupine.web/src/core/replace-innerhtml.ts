export const replaceInnerhtml = async (el: Element, newHtml: string) => {
  // keep <style id="sty-${newProps._id}">...</style>
  const firstDom = el.firstChild as Element;
  if (firstDom && firstDom.tagName === 'STYLE') {
    firstDom.parentNode?.removeChild(firstDom);
  }

  const promises: Promise<void>[] = [];
  el.querySelectorAll('[data-ref]').forEach((child: any) => {
    if (child._lj && child._lj.onUnload) {
      promises.push(child._lj.onUnload());
    }
  });
  await Promise.all(promises);
  el.innerHTML = newHtml;

  if (firstDom && firstDom.tagName === 'STYLE') {
    el.insertBefore(firstDom, el.firstChild);
  }
};
