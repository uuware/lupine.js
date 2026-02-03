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

// start with /, end without /
export const setPressSubDir = (val: string) => {
  _cache.subDir = val;
};

export const getPressSubDir = () => {
  return _cache.subDir || '';
};

export const setPressLangs = (val: { title: string; id: string }[]) => {
  _cache.langs = val;
};

export const getPressLangs = (): { title: string; id: string }[] => {
  return (
    _cache.langs || [
      { title: 'English', id: 'en' },
      { title: 'Chinese', id: 'zh' },
    ]
  );
};
