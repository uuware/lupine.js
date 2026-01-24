import { _lupineJs } from './export-lupine';

export function bindLinks(el: Element | Document) {
  const links = el.getElementsByTagName('a');
  for (var i = 0, l = links.length; i < l; i++) {
    let originalHref = links[i].getAttribute('href');
    if (!originalHref || originalHref.startsWith('javascript:')) continue;
    if (originalHref.startsWith('#')) {
      links[i].onclick = () => {
        const id = decodeURIComponent(originalHref!.substring(1));
        document.getElementById(id)?.scrollIntoView(true);
        return false;
      };
      continue;
    }
    let href = new URL(links[i].href, document.baseURI).href;
    if (links[i].target !== '_blank' && href.startsWith(document.location.origin)) {
      href = href.substring(document.location.origin.length);
      // console.log(`====${href}, javascript:init('${document.links[i].href}')`);
      links[i].onclick = () => {
        _lupineJs.initializePage(href);
        return false;
      };
    }
  }
}
