const { app, net } = require('electron');
const http = require('http');
const nodeUrl = require('node:url');
const fs = require('node:fs/promises');
const path = require('node:path');
const fsSync = require('node:fs');
const https = require('https');

const cfgFile = 'cfg.json';
const _savedStore = {
  init: false,
  cfgFile: cfgFile,
  store: {},
};
const loadConfig = async () => {
  if (!_savedStore.init) {
    _savedStore.init = true;
    _savedStore.cfgFile = path.join(app.getPath('userData'), cfgFile);
    try {
      _savedStore.store = JSON.parse(await fs.readFile(_savedStore.cfgFile, 'utf8'));
    } catch (ex) {
      console.log('Error: ', ex);
    }
  }
  return _savedStore.store;
};
const saveConfig = async () => {
  try {
    await fs.writeFile(_savedStore.cfgFile, JSON.stringify(_savedStore.store));
  } catch (ex) {
    console.log('Error: ', ex);
  }
};

const pathStat = (path) => {
  try {
    return fsSync.statSync(path);
  } catch {}
  return false;
};

const logFile = 'log.log';
const log = (msg) => {
  try {
    const logPath = path.join(app.getPath('logs'), logFile);
    const stat = pathStat(logPath);
    if (stat && stat.size > 100 * 1024) {
      fsSync.writeFileSync(logPath, msg + '\r\n');
      return;
    }
    fsSync.writeFileSync(logPath, msg + '\r\n', { flag: 'a+' });
  } catch (err) {
    console.error(err);
  }
};

let startUpdateStateTimer = null;
const updateWinSize = async (mainWindow) => {
  try {
    if (mainWindow && !mainWindow.isMaximized() && !mainWindow.isMinimized() && !mainWindow.isFullScreen()) {
      var cfg = await utils.loadConfig();
      const winBounds = mainWindow.getBounds();
      cfg['win.x'] = winBounds.x;
      cfg['win.y'] = winBounds.y;
      cfg['win.w'] = winBounds.width;
      cfg['win.h'] = winBounds.height;
      await utils.saveConfig();
    }
  } catch (err) {}
};
const startUpdateState = () => {
  clearTimeout(startUpdateStateTimer);
  startUpdateStateTimer = setTimeout(updateWinSize, 100);
};

const windowLocation = (mainWindow) => {
  mainWindow.on('resize', startUpdateState);
  mainWindow.on('move', startUpdateState);
};

const _serverInfo = {
  port: 0,
  webRoot: '',
};
const startLocalServer = (webRoot) => {
  if (!webRoot.endsWith('/')) {
    webRoot += '/';
  }
  _serverInfo.webRoot = webRoot;
  const httpsOptions = {
    key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/JTeAUH2FaiTe
oJC3VsRTCtkC47R6v13WTOli53nPJn0FCWLLpSuz8PUaX6B+EeCy46CKuBPKjdQZ
mOasYnkndxnneM0YjjNe9BaamS0U08casaBvfxjUR2Dxf5RnCoBvzu9qI+4qVW2t
TN10TW8OnzKOIBlfKZlg82cml2zuPfe7A0e2jTgpEYLrUIfr6Wi+UsU0K0f9lY5g
7luCtx7mTZcj5CkCJ2lzLrDS6QdBN8eHjuqsepA2m6B2pxXshm29VvKZCYJM/VfW
ZkFedlrwwv7llwkMagbn0c5KMwVds/DJj+N2XrWN9mzt+UBli+74ds64r0ExrN1V
krNrD1DPAgMBAAECggEASFcqeSp9RtfUGlmES47QAGmzlc9dx7LTLb6v+VmHlSmI
2TYjKNVbA9/ms1OLpwrXEnzpjnZ6LwecRQ/EBWvDVHdT23GxlWCD+qTARURBdodr
7CNbh7b/S5+0BdH19UVZNHeJzo7InUb1mkfj7Bc+N7dyZ62oTIau4K1d1ZIrjMJJ
PnJcUT2X/OBVKWoOonqnHy1q9PVOie0HOwmDs1Lwir/Bf0temd/pwdBD2jzgD07T
2zZ88vWIVcz+KTHdreNS8xQVbWnSft47cpqgW4dtrloOJK2+Dyk/3qC/TYYKvUsY
xtEtSh3MsH+NZ+uBC7DADRYbeRkRjJ3TDlWjsPTweQKBgQDtJGazG2GMUe/1wObS
dZsc5R+xXJdhi5qYf3K6BCrSJ+UoLJ/hn7wPLOPYJRS4wnbpYEtGC9ETP4qDhcnf
NdY0djHyF+58XKzu5MMZta5T9NfitIvCR6egiret9rxmtlGNJpEcPapp22VCpS4v
/QQJ5wCpIzpDiMtwgdf6rZ6jcwKBgQDOWHClH9eHhmo5OZKcnPdyRskt46amHst7
EQvX28OCjVZWbnq+3zrbQ1m+WBfDht37iayxIeabqEU50WosZ7hGq7xj2jJcVNtk
y+GRg2ZSyUOW/Ln1FikYx4zGvpBzicYs1NEYSuO5Zl9a/GAAU1/MkSpsepsJ90mx
0C6WsbAeNQKBgC7/E8tTFdX1NxUBEb2LyR3E2q8PpoCSZiTqvRXYVZQoi+WWUmko
euCXCOCBGMY049QEXWaYWOrzoMPH8+XkiXsEIYnU7FKBG1SMyY2Cz/WbhF1NYpUy
Fipe02AKkfPZFfhfOErcfbVU4ZB/o9Om1PIRcbQTYyyXI5o8YU0ws0u5AoGAbNap
U++ft5RmoxiDBKimvFgp9VKGrEjB+3/aR1lbnpj+WUic5eDJIq47v/KnVjLlE7Bi
rmu7P49aNE0JO7LZuC0NiX2l4p2/u0LvD9nHNxOB2zoiu+uccb2Pu6T4fHjHVw5J
3A5kX35n/Y3w9TsE5NoNDnr9HBybenbcnA/NXaECgYEA27fsYNolFZcYCh+HzQYC
GB9RW6y/54PnwMqCByJyh/LEG/Ck4vqwLicNDj+eoXvN2vtn+ijtLgbY0dbFPT15
c5ydD1D+GMBpOpOZn0Xkm0ReN8TM9iQX1MPkrudgCWTle0UhTMX4D9fLDDRG/uR4
mfslnjqoq0hwx3Z32aJ1c9U=
-----END PRIVATE KEY-----`,
    cert: `-----BEGIN CERTIFICATE-----
MIIDSzCCAjOgAwIBAgIUTbij2or6sYGFZUHBDIDuMapUAFIwDQYJKoZIhvcNAQEL
BQAwNTELMAkGA1UEBhMCQVUxEzARBgNVBAgMClNvbWUtU3RhdGUxETAPBgNVBAoM
CFNvbWUgTHRkMB4XDTI1MDQyNzAxMDMyMloXDTM1MDQyNTAxMDMyMlowNTELMAkG
A1UEBhMCQVUxEzARBgNVBAgMClNvbWUtU3RhdGUxETAPBgNVBAoMCFNvbWUgTHRk
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvyU3gFB9hWok3qCQt1bE
UwrZAuO0er9d1kzpYud5zyZ9BQliy6Urs/D1Gl+gfhHgsuOgirgTyo3UGZjmrGJ5
J3cZ53jNGI4zXvQWmpktFNPHGrGgb38Y1Edg8X+UZwqAb87vaiPuKlVtrUzddE1v
Dp8yjiAZXymZYPNnJpds7j33uwNHto04KRGC61CH6+lovlLFNCtH/ZWOYO5bgrce
5k2XI+QpAidpcy6w0ukHQTfHh47qrHqQNpugdqcV7IZtvVbymQmCTP1X1mZBXnZa
8ML+5ZcJDGoG59HOSjMFXbPwyY/jdl61jfZs7flAZYvu+HbOuK9BMazdVZKzaw9Q
zwIDAQABo1MwUTAdBgNVHQ4EFgQUMeiWo70PIsn5WG/b2oQtM/KRDwswHwYDVR0j
BBgwFoAUMeiWo70PIsn5WG/b2oQtM/KRDwswDwYDVR0TAQH/BAUwAwEB/zANBgkq
hkiG9w0BAQsFAAOCAQEAFfuUEcXdI0316B/1BcavoPeM56PkyutgVJB9jR5M6PT+
GJ1FlKVW0oXStp5ByCUt4oNDQs1KHOsUEMPnSW39oqNVKtvkoh3YAyz04orFZeHC
K4JX1Bsb//NfKW0/IT5XTR08+2n9greV7ZWClbuYVactLIvqRz6g3XK9QKFI7fw8
1BVjnvmyVfm4cxtEo0j4+4KcI1/dwyMcGje36AYOZoQIv6JEubTEkTNrk5foYLuF
i202/NpWSVP0t/ef9jYGF7gNntV21tGSL8qOF1tkDzNYYaCaXRpXMy7a32Y5bCha
Csw/ODifIQhY+RUrkm4NlvM5pGpC8TAZZunSUsivSQ==
-----END CERTIFICATE-----`,
  };
  log('aaa');
  const server = https.createServer(httpsOptions, async (req, res) => {
    let reqURL = (req.url || '').split('?')[0];
    if (reqURL.endsWith('/')) {
      reqURL += 'index.html';
    }
    let srcPath = path.join(webRoot, reqURL);
    const stat = pathStat(srcPath);
    if (!stat) {
      srcPath = path.join(webRoot, '/index.html');
    }
    log(`request ${nodeUrl.pathToFileURL(srcPath).toString()}`);
    try {
      const response = await net.fetch(nodeUrl.pathToFileURL(srcPath).toString());
      res.writeHead(200, { 'Content-Type': response.headers.get('Content-Type') || 'text/html' });
      res.end(await response.text());
    } catch (error) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<h1>Error: ${error.message}</h1><br />Url: ${req.url}`);
    }
  });
  server.listen(0, 'localhost', () => {
    log('aaa2');
    _serverInfo.port = server.address().port;
  });
};
const getServerPort = () => {
  return _serverInfo.port;
};

module.exports = {
  loadConfig,
  saveConfig,
  log,
  windowLocation,
  startLocalServer,
  getServerPort,
};
