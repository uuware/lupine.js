// some events need to be done before the page is rendered
const _pageLoadedEvents: Function[] = [];
export const callPageLoadedEvent = () => {
  _pageLoadedEvents.forEach((i) => {
    try {
      i();
    } catch (e) {
      console.error(e);
    }
  });
};

// The fn is called when the page is first time loaded
export const bindPageLoadedEvent = (fn: Function) => {
  _pageLoadedEvents.push(fn);
};
