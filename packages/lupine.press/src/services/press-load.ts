import { initializePage } from 'lupine.components';
import { getPressSubDir, setSidebarScroll } from './cache';

export const pressLoad = (url: string) => {
  const sidemenu = document.querySelector('.press-frame-sidemenu');
  if (sidemenu) {
    setSidebarScroll(sidemenu.scrollTop);
  }

  initializePage(pressProcessUrl(url));
};

export const pressProcessUrl = (url: string) => {
  const subDir = getPressSubDir();
  let target = url;
  if (subDir && !target.startsWith(subDir + '/') && !target.includes('//')) {
    target = `${subDir}${target}`;
  }
  return target || '/';
};
