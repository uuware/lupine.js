import { getCurrentLang, initializePage } from 'lupine.components';
import { setSidebarScroll } from './cache';

export const pressLoad = (url: string) => {
  const sidemenu = document.querySelector('.press-frame-sidemenu');
  if (sidemenu) {
    setSidebarScroll(sidemenu.scrollTop);
  }

  let target = url;
  if (target.startsWith('/') && !target.startsWith('/en/') && !target.startsWith('/zh/')) {
    const { langName } = getCurrentLang();
    target = `/${langName}${target}`;
  }
  if (target.endsWith('/') && target.length > 1) target = target.substring(0, target.length - 1);
  initializePage(target || '/');
};
