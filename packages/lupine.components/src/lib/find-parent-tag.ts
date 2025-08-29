export const findParentTag = (dom: HTMLElement, tag: string) => {
  const tagUpper = tag.toUpperCase();
  let parent = dom.parentElement;
  while (parent && parent.tagName !== tagUpper && parent.tagName !== 'BODY') {
    parent = parent.parentElement;
  }
  return parent;
};
