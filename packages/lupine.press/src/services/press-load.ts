import { getCurrentLang, initializePage } from 'lupine.components';
import { getPressSubDir, getPressLangs, setSidebarScroll } from './cache';

export const pressLoad = (url: string) => {
  const sidemenu = document.querySelector('.press-frame-sidemenu');
  if (sidemenu) {
    setSidebarScroll(sidemenu.scrollTop);
  }

  initializePage(pressProcessUrl(url));
};

export const pressProcessUrl = (url: string) => {
  const langs = getPressLangs();
  const subDir = getPressSubDir();
  let target = url;
  if (subDir && !target.startsWith(subDir + '/') && !target.includes('//')) {
    if (target.startsWith('/') && !langs.some((l) => target.startsWith(`/${l.id}/`))) {
      const { langName } = getCurrentLang();
      target = `/${langName}${target}`;
    }
    target = `${subDir}${target}`;
  }
  return target || '/';
};
