import cluster from 'cluster';
import { Logger, LogWriter, LogWriterMessageId } from '../lib';
import { processDebugMessage } from './process-dev-requests';
import { cleanupAndExit } from './cleanup-exit';

export type AppMessageProps = {
  id: string;
  message: string;
  appName?: string;
  [id: string]: any;
};
const _savedMessageHandler: {
  fromPrimary: { [messageId: string]: (msgObject: AppMessageProps) => void };
  fromWorker: { [messageId: string]: (msgObject: AppMessageProps) => void };
} = {
  fromPrimary: {},
  fromWorker: {},
};

export const registerMessageHandlerFromPrimary = (messageId: string, handler: (msgObject: AppMessageProps) => void) => {
  _savedMessageHandler.fromPrimary[messageId] = handler;
};

export const registerMessageHandlerFromWorker = (messageId: string, handler: (msgObject: AppMessageProps) => void) => {
  _savedMessageHandler.fromWorker[messageId] = handler;
};

const logger = new Logger('app-message');
// send msg to all clients
const broadcast = (msgObject: AppMessageProps) => {
  for (let i in cluster.workers) {
    if (cluster.workers[i]) cluster.workers[i].send(msgObject);
  }
};

// this is a worker and msg is from Primary
// when debug is on, it's in primary, but it shouldn't receive those msgs
export const processMessageFromPrimary = (msgObject: AppMessageProps) => {
  if (!msgObject || !msgObject.id) {
    logger.warn(`Unknown message from master in work: ${cluster.worker?.id}`);
    return;
  }

  const primaryFn = _savedMessageHandler.fromPrimary[msgObject.id];
  if (primaryFn) {
    primaryFn(msgObject);
    return;
  }

  if (msgObject.id == 'debug') {
    processDebugMessage(msgObject);
    // } else if (msgObject.id == AppSharedStorageMessageId) {
    //   appStorage.messageFromPrimaryProcess(msgObject);
  } else {
    logger.warn(`Unknown message: ${msgObject.id}`);
  }
};

// this is primary, msg is from a client
export const processMessageFromWorker = (msgObject: AppMessageProps) => {
  if (!msgObject || !msgObject.id) {
    if (msgObject['watch:require']) return;
    logger.warn(`Unknown message from work: ${cluster.worker?.id}`);
    return;
  }

  const workerFn = _savedMessageHandler.fromWorker[msgObject.id];
  if (workerFn) {
    workerFn(msgObject);
    return;
  }

  if (msgObject.id == LogWriterMessageId) {
    LogWriter.messageFromSubProcess(msgObject as any);
    // } else if (msgObject.id == AppSharedStorageMessageId) {
    //   appStorage.messageFromSubProcess(msgObject);
  } else if (msgObject.id == 'debug') {
    logger.debug(
      `Message from worker ${cluster.worker?.id}, message: ${msgObject.message}, appName: ${msgObject.appName}`
    );
    broadcast(msgObject);
    // if it's suspend, the primary process will exit
    if (msgObject.message === 'suspend') {
      setTimeout(() => {
        console.log(`[server primary] Received suspend command.`, cluster.workers);
        cleanupAndExit();
      }, 100);
    }
  } else {
    logger.warn(`Unknown message: ${msgObject.id}`);
  }
};
