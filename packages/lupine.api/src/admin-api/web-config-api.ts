import { ServerResponse } from 'http';
import { Logger } from '../lib';
import { ServerRequest } from '../models';
import { langHelper } from '../lang';
import { ApiHelper, apiStorage } from '../api';

// only used by mobile app. For web, it's injected in the html by server-side render
const logger = new Logger('web-cfg-api');
export const readWebConfig = async (req: ServerRequest, res: ServerResponse) => {
  logger.info('readWebConfig');

  const response = {
    status: 'ok',
    result: await apiStorage.getWebAll(),
    message: langHelper.getLang('shared:operation_success'),
  };
  ApiHelper.sendJson(req, res, response);
  return true;
};
