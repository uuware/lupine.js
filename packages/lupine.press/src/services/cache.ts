import { HtmlVar, VNode } from 'lupine.components';

const _cache: any = {};
export const bindPressData = (pressData: any) => {
  _cache.data = pressData;
};

export const getPressData = () => {
  return _cache.data;
};

export const getSidebarScroll = () => {
  return _cache.sidebarScroll || 0;
};

export const setSidebarScroll = (val: number) => {
  _cache.sidebarScroll = val;
};
