// some events need to be done before the page is rendered
export type PageLoadedEventProps = () => void;
const _pageLoadedEvents: PageLoadedEventProps[] = [];
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
export const bindPageLoadedEvent = (fn: PageLoadedEventProps) => {
  if (typeof document === 'undefined') {
    throw new Error('bindPageLoadedEvent can only be called in the browser');
  }

  _pageLoadedEvents.push(fn);
};
