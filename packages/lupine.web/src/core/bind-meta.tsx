// import { bindPageResetEvent } from '../core/page-reset-events';

import { getRequestContext } from './use-request-context';
// import { bindPageResetEvent } from '../core/page-reset-events';

export const setPageTitle = (title: string) => {
  getRequestContext().pageTitle.value = title;
};

export const getPageTitle = () => {
  const _pageTitle = getRequestContext().pageTitle;
  return _pageTitle.value || _pageTitle.defaultValue;
};

export const setDefaultPageTitle = (title: string) => {
  getRequestContext().pageTitle.defaultValue = title;
};

export const setMetaDescription = (description: string) => {
  getRequestContext().metaDescription.value = description;
};

export const getMetaDescription = () => {
  const _description = getRequestContext().metaDescription;
  return _description.value || _description.defaultValue;
};

export const setDefaultMetaDescription = (description: string) => {
  getRequestContext().metaDescription.defaultValue = description;
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
  const metaDescription = getMetaDescription();
  const _metaData = getRequestContext().metaData;
  return metaDescription
    ? Object.assign(
        {
          'name:description': `<meta name="description" content="${metaDescription}">`,
        },
        _metaData
      )
    : _metaData;
};
