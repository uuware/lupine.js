// some events need to be done after the dom is loaded
export type DomLoadedEventProps = () => void;
const _domLoadedEvents: DomLoadedEventProps[] = [];
export const callDomLoadedEvent = () => {
  if (typeof document !== 'undefined') {
    _domLoadedEvents.forEach((i) => {
      try {
        i();
      } catch (e) {
        console.error(e);
      }
    });
  }
};

// Not for SSR: This fn is called when the dom is first time loaded
export const bindDomLoadedEvent = (fn: DomLoadedEventProps) => {
  if (typeof document !== 'undefined') {
    _domLoadedEvents.push(fn);
  }
};
