// import { bindPageResetEvent } from '../core/page-reset-events';

import { appData, getRequestContext } from './use-request-context';
// import { bindPageResetEvent } from '../core/page-reset-events';

export const setPageTitle = (title: string) => {
  getRequestContext().pageTitle = title;
};

export const getPageTitle = () => {
  return getRequestContext().pageTitle || appData.defaultPageTitle;
};

export const setDefaultPageTitle = (title: string) => {
  appData.defaultPageTitle = title;
};

export const addMetaDataTags = (key: string, value: string) => {
  const _metaData = getRequestContext().metaData;
  if (typeof value === 'undefined') {
    delete _metaData[key];
  } else {
    _metaData[key] = value;
  }
};

export const getMetaDataTags = () => {
  return Object.values(getMetaDataObject()).join('\n');
};

export const getMetaDataObject = () => {
  return getRequestContext().metaData;
};
