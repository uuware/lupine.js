const { app, net, BrowserWindow, session, protocol, screen } = require('electron');
const path = require('node:path');
const nodeUrl = require('node:url');
const utils = require('./utils');

utils.startLocalServer('resources/app.asar/dist/server_root/xiaotiqinpu.com_web/');
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true);
});
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

// const { autoUpdater } = require('electron-updater');
// const log = require('electron-log');
// autoUpdater.logger = log;

// Set a CSP up for our application based on the custom scheme
function setupContentSecurityPolicy(customScheme) {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    if (details.referrer && details.referrer.startsWith(`https://localhost:${utils.getServerPort()}`)) {
      details.responseHeaders['Access-Control-Allow-Origin'] = [`https://localhost:${utils.getServerPort()}`];
      details.responseHeaders['Access-Control-Allow-Credentials'] = [`true`];
    }
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        // 'Content-Security-Policy': [
        //   !app.isPackaged
        //     ? `default-src 'self' script-src 'self' 'unsafe-inline' devtools://* 'unsafe-eval' data:`
        //     : `default-src 'self' http://localhost:4000/ http://127.0.0.1:4000/ script-src 'self' 'unsafe-inline' devtools://* 'unsafe-eval' data:`,
        // ],
      },
    });
  });
}

// autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
//   const dialogOpts = {
//     type: 'info',
//     buttons: ['Restart', 'Later'],
//     title: 'Update Ready',
//     message: process.platform === 'win32' ? releaseNotes : releaseName,
//     detail: 'A new update is ready!',
//   };
//   dialog.showMessageBox(dialogOpts).then((returnValue) => {
//     if (returnValue.response === 0) autoUpdater.quitAndInstall();
//   });
// });

var mainWindow;

async function createWindow() {
  const cfg = await utils.loadConfig();
  mainWindow = new BrowserWindow({
    x: cfg['win.x'],
    y: cfg['win.y'],
    width: cfg['win.w'] || 1000,
    height: cfg['win.h'] || 800,
    webPreferences: {
      // preload: 'apps/xiaotiqinpu.com/electron/builder.json',
      enableRemoteModule: true,
      webSecurity: false,
    },
  });

  utils.windowLocation(mainWindow);

  // Security - Set Content-Security-Policy based on whether or not we are in dev mode.
  setupContentSecurityPolicy('self');

  // and load the index.html of the app.
  // await mainWindow.loadFile('dist/server_root/xiaotiqinpu.com_web/index.html')
  await mainWindow.loadURL(`https://localhost:${utils.getServerPort()}`);
  log('bbb 1');
}
// autoUpdater.on('update-available', (info) => {
//   sendStatusToWindow('New update downloading...');
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// // pass a command sent from frontend to backend
// ipcMain.on('synchronous-command', async (event, arg) => {
// });

// const processRequest = async (req) => {
//   const reqURL = new URL(req.url);
//   let filePath = reqURL.pathname || '/';
//   if (filePath.endsWith('/')) {
//     filePath += 'index.html';
//   }
//   let srcPath = path.join('resources/app.asar/dist/server_root/xiaotiqinpu.com_web/', filePath);
//   try {
//     return net.fetch(nodeUrl.pathToFileURL(srcPath).toString());
//   } catch (error) {
//     console.error(error);
//     return new Response(`<h1>Error: ${error.message}</h1><br />Url: ${req.url}`, {
//       headers: { 'content-type': 'text/html' },
//     });
//   }
// };

// protocol.registerSchemesAsPrivileged([
//   {
//     scheme: 'loc',
//     privileges: {
//       standard: true,
//       secure: true,
//       bypassCSP: true,
//       // allowServiceWorkers: true,
//       supportFetchAPI: true, // Add this if you want to use fetch with this protocol.
//       // stream: true, // Add this if you intend to use the protocol for streaming i.e. in video/audio html tags.
//       corsEnabled: true, // Add this if you need to enable cors for this protocol.
//     },
//   },
// ]);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // session.defaultSession.setPluginEnabled(scheme => scheme.startsWith('loc://'), true);
  // session.defaultSession.enableNetworkInterception(true);
  // session.defaultSession.protocol.handle('loc', (req) => {
  //   return processRequest(req);
  // });

  // Menu.setApplicationMenu(。。。);
  await createWindow();

  app.on('activate', async () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

// mainWindow.getBrowserView().webContents.executeJavaScript(`window.demoprotocol.receive("clear", null)`);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
