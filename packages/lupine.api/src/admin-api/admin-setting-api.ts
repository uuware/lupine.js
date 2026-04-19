import { ServerResponse } from 'http';
import { ServerRequest, ApiHelper, langHelper, apiStorage } from 'lupine.api';

export const readWebSetting = async (req: ServerRequest, res: ServerResponse) => {
  const response = {
    status: 'ok',
    result: await apiStorage.getWebAll(),
    message: langHelper.getLang('shared:operation_success'),
  };
  ApiHelper.sendJson(req, res, response);
  return true;
};

export const writeWebSetting = async (req: ServerRequest, res: ServerResponse) => {
  const data = req.locals.json();
  if (!data || Array.isArray(data) || typeof data !== 'object') {
    const response = {
      status: 'error',
      message: langHelper.getLang('shared:wrong_data'),
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  for (const key in data) {
    apiStorage.setWeb(key, data[key]);
  }
  await apiStorage.save();

  const response = {
    status: 'ok',
    message: langHelper.getLang('shared:configuration_updated'),
  };
  ApiHelper.sendJson(req, res, response);
  return true;
};

export const readApiSetting = async (req: ServerRequest, res: ServerResponse) => {
  const data = req.locals.json() || {};
  if (Array.isArray(data) || typeof data !== 'object') {
    const response = {
      status: 'error',
      message: langHelper.getLang('shared:wrong_data'),
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  for (const key in data) {
    data[key] = await apiStorage.getApi(key);
  }

  const response = {
    status: 'ok',
    message: 'Configuration loaded successfully.',
    result: data,
  };
  ApiHelper.sendJson(req, res, response);
  return true;
};

export const writeApiSetting = async (req: ServerRequest, res: ServerResponse) => {
  const data = req.locals.json();
  if (!data || Array.isArray(data) || typeof data !== 'object') {
    const response = {
      status: 'error',
      message: langHelper.getLang('shared:wrong_data'),
    };
    ApiHelper.sendJson(req, res, response);
    return true;
  }

  for (const key in data) {
    apiStorage.setApi(key, data[key]);
  }
  await apiStorage.save();

  const response = {
    status: 'ok',
    message: 'Configuration saved successfully.',
  };
  ApiHelper.sendJson(req, res, response);
  return true;
};
