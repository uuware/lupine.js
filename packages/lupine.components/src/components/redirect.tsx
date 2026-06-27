import { RefProps, refreshPaeg } from 'lupine.web';

export type RedirectProps = {
  title?: string;
  url: string;
  delaySeconds?: number;
};
export const Redirect = ({ title = 'redirect...', url, delaySeconds = 0 }: RedirectProps) => {
  // if SSR is disabled, then MetaData will not be working
  // MetaData({ httpEquiv: 'refresh', content: delaySeconds + ';URL=' + url });
  const ref: RefProps = {
    onLoad: async (el: Element) => {
      setTimeout(async () => {
        await refreshPaeg(url);
      }, delaySeconds * 1000);
    },
  };
  return <div ref={ref}>{title}</div>;
};
