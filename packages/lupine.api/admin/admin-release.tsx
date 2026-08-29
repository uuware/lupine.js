import {
  CssProps,
  getRenderPageProps,
  RefProps,
  DomUtils,
  HtmlVar,
  NotificationColor,
  NotificationMessage,
  formatBytes,
  downloadStream,
  ActionSheetSelectPromise,
  ActionSheetInputPromise,
  encodeHtml,
} from 'lupine.components';

interface ReleaseListProps {
  result: any;
  onUpdate: () => void;
  onLogClick: (logName: string) => Promise<void>;
}
const ReleaseList = (props: ReleaseListProps) => {
  const ref: RefProps = {
    onLoad: async () => {
      const data = JSON.parse(localStorage.getItem('admin-release') || '{}');
      DomUtils.setValue('.from-list', data.fromList || '');
    },
  };
  return (
    <div ref={ref}>
      <div class='row-box mt-m'>
        <label class='label mr-m release-label'>From:</label>
        <div class='w-50p'>
          <select type='text' class='input-base w-100p from-list'>
            {props.result.appsFrom.map((app: string) => (
              <option key={app} value={app}>
                {app}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div class='row-box mt-m'>
        <label class='label mr-m release-label'>To:</label>
        <div class='w-50p'>
          <select type='text' class='input-base w-100p to-list'>
            {props.result.apps.map((app: string) => (
              <option key={app} value={app}>
                {app}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div class='row-box mt-m'>
        <label class='label mr-m release-label'>Release:</label>
        <label class='label mr-m' for='chk-server'>
          Server:
        </label>
        <div class='mr-l'>
          <input type='checkbox' class='base-css chk-server' id='chk-server' />
        </div>
        <label class='label mr-m' for='chk-api'>
          Api:
        </label>
        <div class='mr-l'>
          <input type='checkbox' class='base-css chk-api' id='chk-api' />
        </div>
        {/* <label class='label mr-m' for='chk-web'>
          Web:
        </label>
        <div class='mr-l'>
          <input type='checkbox' class='base-css chk-web' id='chk-web' />
        </div> */}

        <label class='label mr-m' for='chk-env'>
          Env:
        </label>
        <div class='mr-l'>
          <input type='checkbox' class='base-css chk-env' id='chk-env' />
        </div>
        <label class='label mr-m' for='chk-backup'>
          ( Backup:
        </label>
        <div class=''>
          <input type='checkbox' class='base-css chk-backup' id='chk-backup' /> )
        </div>
      </div>
      <div class='row-box mt-m'>
        <label class='label mr-m release-label'>Web Sub-folder:</label>
        <div class='w-50p mr-l'>
          {/* <input type='text' class='input-base w-100p input-web-sub' placeholder='The Sub-folder you want to update' /> */}

          {props.result.webSub.map((folder: string) => (
            <div>
              <label>
                <input type='checkbox' class={'chk-web-sub input-' + folder} value={folder} /> {folder}
              </label>
            </div>
          ))}
          <label class='label mr-m release-label'>(Skip *.js.map, *.css.map files)</label>
        </div>
      </div>
      <LogList logs={props.result.logs} onLogClick={props.onLogClick} />
      <div class='row-box mt-m'>
        <button onClick={props.onUpdate} class='button-base release-update-btn'>
          Update
        </button>
      </div>
    </div>
  );
};

const LogList = (props: {
  logs: { name: string; size: number; time: string }[];
  onLogClick: (logName: string) => Promise<void>;
}) => {
  return (
    <div>
      <div class='row-box mt-m'>
        <label class='label mr-m release-label'>Logs:</label>
        <div type='text'>
          {props.logs &&
            props.logs.map((log: { name: string; size: number; time: string }) => (
              <div>
                <label class='release-log' onClick={() => props.onLogClick(log.name)}>{`${log.name}`}</label> (
                {log.time}; {formatBytes(log.size)}){' '}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

interface ReleaseTargetPreset {
  name: string;
  targetUrl: string;
  accessToken: string;
}

const STORAGE_PRESETS_KEY = 'admin-release-targets';

export const AdminReleasePage = () => {
  const fetchData = async (options: { targetUrl: string; accessToken: string; log?: boolean }) => {
    const data = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/release/check', options);
    console.log('release/check', data);
    return data.json;
  };
  const css: CssProps = {
    '.release-label': {
      width: '130px',
    },
    '.release-log': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
    '.preset-chip': {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
    },
    '&-btn-box': {
      display: 'flex',
      gap: '6px',
    },
    '&-monitor-panel': {
      marginTop: '16px',
      marginBottom: '20px',
      borderRadius: '8px',
      border: '1px solid #334155',
      background: '#0f172a',
      color: '#f8fafc',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      overflow: 'hidden',
    },
    '&-monitor-header': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 12px',
      background: '#1e293b',
      borderBottom: '1px solid #334155',
      flexWrap: 'wrap',
      gap: '8px',
    },
    '&-monitor-terminal': {
      maxHeight: '600px',
      height: '520px',
      overflowY: 'auto',
      overflowX: 'auto',
      background: '#090d16',
      color: '#e2e8f0',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      fontSize: '12px',
      lineHeight: '1.5',
      padding: '12px 14px',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      boxSizing: 'border-box',
    },
    '&-monitor-footer': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6px 12px',
      background: '#1e293b',
      borderTop: '1px solid #334155',
      fontSize: '12px',
      color: '#94a3b8',
      flexWrap: 'wrap',
      gap: '6px',
    },
    '&-status-dot': {
      display: 'inline-block',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      marginRight: '6px',
    },
  };
  const domLog = new HtmlVar('');
  const domUpdate = new HtmlVar('');
  const domPresets = new HtmlVar('');
  const domProgressMsg = new HtmlVar('');
  const monitorLog = new HtmlVar('');

  const setProgressText = (msg: string, color: string = '#2563eb') => {
    if (!msg) {
      domProgressMsg.value = '';
      return;
    }
    domProgressMsg.value = (
      <div class='row-box mt-m' style={{ alignItems: 'center' }}>
        <label class='label mr-m release-label'>Progress:</label>
        <div style={{ color, fontSize: '13px', fontWeight: '500', wordBreak: 'break-all' }}>{msg}</div>
      </div>
    );
  };

  const getPresets = (): ReleaseTargetPreset[] => {
    try {
      const saved = localStorage.getItem(STORAGE_PRESETS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return [];
  };

  const savePresets = (presets: ReleaseTargetPreset[]) => {
    localStorage.setItem(STORAGE_PRESETS_KEY, JSON.stringify(presets));
  };

  const onAddPreset = async () => {
    const targetUrl = (ref.$('.target-url') as HTMLInputElement)?.value?.trim() || '';
    const accessToken = (ref.$('.access-token') as HTMLInputElement)?.value?.trim() || '';
    if (!targetUrl || !accessToken) {
      NotificationMessage.sendMessage('Please fill in Target Url and Access token first', NotificationColor.Warning);
      return;
    }

    const name = await ActionSheetInputPromise({
      title: 'Please enter a name for this target',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    });

    if (!name || !name.trim()) {
      return;
    }

    const trimmedName = name.trim();
    const presets = getPresets();
    const existingIndex = presets.findIndex((p) => p.name === trimmedName);
    if (existingIndex >= 0) {
      presets[existingIndex] = { name: trimmedName, targetUrl, accessToken };
    } else {
      presets.push({ name: trimmedName, targetUrl, accessToken });
    }
    savePresets(presets);
    renderPresets();
    NotificationMessage.sendMessage(`Target preset "${trimmedName}" saved`, NotificationColor.Success);
  };

  const onSelectPreset = (preset: ReleaseTargetPreset) => {
    DomUtils.setValue('.target-url', preset.targetUrl);
    DomUtils.setValue('.access-token', preset.accessToken);
    const curData = JSON.parse(localStorage.getItem('admin-release') || '{}');
    localStorage.setItem(
      'admin-release',
      JSON.stringify({
        ...curData,
        targetUrl: preset.targetUrl,
        accessToken: preset.accessToken,
      })
    );
    NotificationMessage.sendMessage(`Loaded preset: ${preset.name}`, NotificationColor.Success);
  };

  const onDeletePreset = (index: number) => {
    const presets = getPresets();
    if (index >= 0 && index < presets.length) {
      const deleted = presets.splice(index, 1);
      savePresets(presets);
      renderPresets();
      NotificationMessage.sendMessage(`Deleted preset "${deleted[0]?.name}"`, NotificationColor.Success);
    }
  };

  const renderPresets = () => {
    const presets = getPresets();
    domPresets.value = (
      <div class='row-box mt-m' style={{ alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <label class='label mr-m release-label'>Presets:</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', flex: 1 }}>
          <button
            type='button'
            class='button-base'
            onClick={onAddPreset}
            title='Save current Target Url and Access token'
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px 10px',
              fontSize: '13px',
              fontWeight: 'bold',
              borderRadius: '6px',
            }}
          >
            +
          </button>
          {presets.map((preset, index) => (
            <div
              key={preset.name + '_' + index}
              class='preset-chip'
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <button
                type='button'
                class='button-base'
                onClick={() => onSelectPreset(preset)}
                style={{
                  padding: '4px 22px 4px 10px',
                  fontSize: '13px',
                  borderRadius: '6px',
                  background: '#f3f4f6',
                  color: '#1f2937',
                  border: '1px solid #d1d5db',
                }}
              >
                {preset.name}
              </button>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onDeletePreset(index);
                }}
                title='Delete'
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#9ca3af',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  lineHeight: '1',
                  padding: '1px 3px',
                  userSelect: 'none',
                }}
                onMouseEnter={(e: any) => {
                  e.target.style.color = '#ef4444';
                }}
                onMouseLeave={(e: any) => {
                  e.target.style.color = '#9ca3af';
                }}
              >
                ×
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getDomData = () => {
    const domFromList = ref.$('.from-list');
    let fromValue = '';
    if (!domFromList) {
      const dataOld = JSON.parse(localStorage.getItem('admin-release') || '{}');
      fromValue = dataOld.fromList;
    } else {
      fromValue = domFromList.value;
    }
    const data = {
      targetUrl: ref.$('.target-url').value,
      accessToken: ref.$('.access-token').value,
      fromList: fromValue,
    };
    localStorage.setItem('admin-release', JSON.stringify(data));
    return data;
  };

  const onUpdate = async () => {
    const data = getDomData();
    if (!data.targetUrl || !data.accessToken) {
      NotificationMessage.sendMessage('Please fill in all fields', NotificationColor.Error);
      return;
    }

    const fromList = ref.$('.from-list').value;
    const toList = ref.$('.to-list').value;
    const chkServer = ref.$('.chk-server').checked;
    const chkApi = ref.$('.chk-api').checked;
    const chkWeb = true; //ref.$('.chk-web').checked;
    // const webSub = ref.$('.input-web-sub').value;
    const webSubs = ref.$all('.chk-web-sub') as HTMLInputElement[];
    const webSubsChecked = Array.from(webSubs)
      .filter((input) => input.checked)
      .map((input) => input.value);
    const wrongWebSubs = webSubsChecked.filter((s) => !s.startsWith(fromList + '_web/'));
    if (wrongWebSubs.length > 0) {
      NotificationMessage.sendMessage(`Some web sub folder is not under ${fromList}`, NotificationColor.Error);
      return;
    }
    const chkEnv = ref.$('.chk-env').checked;
    const chkBackup = ref.$('.chk-backup').checked;
    if (!chkServer && !chkApi && webSubsChecked.length < 1 && !chkEnv) {
      NotificationMessage.sendMessage('Please select the release options', NotificationColor.Error);
      return;
    }

    if (fromList !== toList) {
      const fromToIndex = await ActionSheetSelectPromise({
        title: 'The From and To are not the same, are you sure?',
        options: ['OK'],
        cancelButtonText: 'Cancel',
      });
      if (fromToIndex !== 0) {
        return;
      }
    }
    const updateIndex = await ActionSheetSelectPromise({
      title: 'Are you sure you want to update the release? (Assets are not copied, so it may cause issues)',
      options: ['OK'],
      cancelButtonText: 'Cancel',
    });
    if (updateIndex !== 0) {
      return;
    }
    
    const toggleControls = (disabled: boolean) => {
      const els = document.querySelectorAll('.admin-release-top input, .admin-release-top select, .admin-release-top button');
      els.forEach((el: any) => { el.disabled = disabled; });
    };

    const pollReleaseProgress = async (stepTitle: string) => {
      const startTime = Date.now();
      const MAX_WAIT_MS = 15 * 60 * 1000; // max wait 15 minutes

      return new Promise<void>((resolve, reject) => {
        const intervalId = setInterval(async () => {
          try {
            const res = await getRenderPageProps().renderPageFunctions.fetchData(
              '/api/admin/release/progress'
            );
            const data = res?.json?.data || res?.data;

            if (data) {
              if (data.status === 'processing') {
                const msg = `[${stepTitle}] ${data.message || 'Processing...'}`;
                setProgressText(msg, '#2563eb');
              } else if (data.status === 'ok') {
                clearInterval(intervalId);
                setProgressText(`[${stepTitle}] Completed`, '#2563eb');
                resolve();
                return;
              } else if (data.status === 'error') {
                clearInterval(intervalId);
                const errMsg = data.message || `${stepTitle} failed.`;
                setProgressText(`[${stepTitle}] Failed: ${errMsg}`, '#dc2626');
                reject(new Error(errMsg));
                return;
              }
            }

            if (Date.now() - startTime > MAX_WAIT_MS) {
              clearInterval(intervalId);
              const timeoutMsg = `Timeout waiting for release update step: ${stepTitle}`;
              setProgressText(timeoutMsg, '#dc2626');
              reject(new Error(timeoutMsg));
            }
          } catch (e: any) {
            console.error('Failed to query release progress:', e);
          }
        }, 1000);
      });
    };

    toggleControls(true);

    try {
      if (chkServer || chkApi || chkEnv) {
        setProgressText('Updating Server/API/Env in background...', '#2563eb');
        const response = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/release/update', {
          ...data,
          fromList,
          toList,
          chkServer,
          chkApi,
          chkWeb,
          webSubs: [],
          chkEnv,
          chkBackup,
        });
        const dataResponse = await response.json;
        if (!dataResponse || dataResponse.status !== 'ok') {
          throw new Error(dataResponse.message || 'Failed to start Server/API/Env update');
        }
        await pollReleaseProgress('Server/API/Env');
      }

      for (let i = 0; i < webSubsChecked.length; i++) {
        const sub = webSubsChecked[i];
        const stepTitle = `Web Sub (${i + 1}/${webSubsChecked.length}): ${sub}`;
        setProgressText(`Updating ${stepTitle}...`, '#2563eb');
        const response = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/release/update', {
          ...data,
          fromList,
          toList,
          chkServer: false,
          chkApi: false,
          chkWeb,
          webSubs: [sub],
          chkEnv: false,
          chkBackup: false,
        });
        const dataResponse = await response.json;
        if (!dataResponse || dataResponse.status !== 'ok') {
          throw new Error(dataResponse.message || `Failed to start ${stepTitle}`);
        }
        await pollReleaseProgress(stepTitle);
      }

      setProgressText('Release updated successfully', '#16a34a');
      NotificationMessage.sendMessage('Release updated successfully', NotificationColor.Success);
    } catch (error: any) {
      setProgressText(error.message, '#dc2626');
      NotificationMessage.sendMessage(error.message, NotificationColor.Error);
    } finally {
      toggleControls(false);
    }
  };

  const onLogClick = async (logName: string) => {
    const data = getDomData();
    if (!data.targetUrl || !data.accessToken) {
      NotificationMessage.sendMessage('Please fill in all fields', NotificationColor.Error);
      return;
    }

    const responseText = await getRenderPageProps().renderPageFunctions.fetchData(
      '/api/admin/release/view-log',
      {
        ...data,
        logName,
      },
      true
    );
    const blob = await responseText.blob();
    downloadStream(blob, logName);
  };
  const onCheck = async () => {
    const data = getDomData();
    if (!data.targetUrl || !data.accessToken) {
      NotificationMessage.sendMessage('Please fill in all fields', NotificationColor.Error);
      return;
    }
    const result = await fetchData(data);
    if (!result || result.status !== 'ok') {
      NotificationMessage.sendMessage(result.message || 'Failed to get release list', NotificationColor.Error);
      return;
    }
    console.log(result);

    domUpdate.value = <ReleaseList result={result} onUpdate={onUpdate} onLogClick={onLogClick} />;
    domLog.value = <pre>{JSON.stringify(result, null, 2)}</pre>;

    if (result.releaseProgress) {
      try {
        const prog = typeof result.releaseProgress === 'string' ? JSON.parse(result.releaseProgress) : result.releaseProgress;
        if (prog && typeof prog === 'object') {
          if (prog.status === 'ok' || (prog.progress === 100 && prog.status !== 'error')) {
            // Normal 100% completion: do not show any prompt
            setProgressText('');
          } else if (prog.status === 'processing') {
            setProgressText(`[Ongoing] ${prog.message || 'Processing...'}`, '#2563eb');
            NotificationMessage.sendMessage('Release in progress: ' + (prog.message || 'Processing...'), NotificationColor.Warning);
          } else if (prog.status === 'error') {
            setProgressText(`[Last Failed] ${prog.message || 'Error'}`, '#dc2626');
            NotificationMessage.sendMessage('Last update failed: ' + (prog.message || 'Error'), NotificationColor.Error);
          }
        } else if (typeof prog === 'string') {
          if (!prog.includes('completed') && !prog.includes('100%')) {
            NotificationMessage.sendMessage('Release progress: ' + prog, NotificationColor.Warning);
          }
        }
      } catch {
        if (typeof result.releaseProgress === 'string' && !result.releaseProgress.includes('completed') && !result.releaseProgress.includes('100%')) {
          NotificationMessage.sendMessage('Release progress: ' + result.releaseProgress, NotificationColor.Warning);
        }
      }
    } else {
      setProgressText('');
    }
  };

  const onRefreshCacheLocal = async () => {
    return onRefreshCache(true);
  };
  const onRefreshCacheRemote = async () => {
    return onRefreshCache(false);
  };
  const onRefreshCache = async (isLocal?: boolean) => {
    const data = getDomData();
    if (!isLocal) {
      if (!data.targetUrl || !data.accessToken) {
        NotificationMessage.sendMessage('Please fill in all fields', NotificationColor.Error);
        return;
      }
    }

    const response = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/release/refresh-cache', {
      ...data,
      isLocal,
    });
    const dataResponse = await response.json;
    console.log('refresh-cache', dataResponse);
    if (!dataResponse || dataResponse.status !== 'ok') {
      NotificationMessage.sendMessage(dataResponse.message || 'Failed to refresh cache', NotificationColor.Error);
      return;
    }
    domLog.value = <pre>{encodeHtml(JSON.stringify(dataResponse, null, 2))}</pre>;
    NotificationMessage.sendMessage('Cache refreshed successfully', NotificationColor.Success);
  };

  const onRestartAppLocal = async () => {
    return onRestartApp(true);
  };
  const onRestartAppRemote = async () => {
    return onRestartApp(false);
  };
  const onRestartApp = async (isLocal?: boolean) => {
    const data = getDomData();
    if (!isLocal) {
      if (!data.targetUrl || !data.accessToken) {
        NotificationMessage.sendMessage('Please fill in all fields', NotificationColor.Error);
        return;
      }
    }

    const index = await ActionSheetSelectPromise({
      title: 'Restart App (users may get disconnected errors) ?',
      options: ['OK'],
      cancelButtonText: 'Cancel',
    });
    if (index !== 0) {
      return;
    }

    const response = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/release/restart-app', {
      ...data,
      isLocal,
    });
    const dataResponse = await response.json;
    console.log('restart-app', dataResponse);
    if (!dataResponse || dataResponse.status !== 'ok') {
      NotificationMessage.sendMessage(dataResponse.message || 'Failed to Restart App', NotificationColor.Error);
      return;
    }
    domLog.value = <pre>{JSON.stringify(dataResponse, null, 2)}</pre>;
    NotificationMessage.sendMessage('Restart App successfully', NotificationColor.Success);
  };

  const onReloadCertsLocal = async () => {
    return onReloadCerts(true);
  };
  const onReloadCertsRemote = async () => {
    return onReloadCerts(false);
  };
  const onReloadCerts = async (isLocal?: boolean) => {
    const data = getDomData();
    if (!isLocal) {
      if (!data.targetUrl || !data.accessToken) {
        NotificationMessage.sendMessage('Please fill in all fields', NotificationColor.Error);
        return;
      }
    }

    const index = await ActionSheetSelectPromise({
      title: 'Reload Certificates Zero-Downtime?',
      options: ['OK'],
      cancelButtonText: 'Cancel',
    });
    if (index !== 0) {
      return;
    }

    const response = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/release/reload-certs', {
      ...data,
      isLocal,
    });
    const dataResponse = await response.json;
    console.log('reload-certs', dataResponse);
    if (!dataResponse || dataResponse.status !== 'ok') {
      NotificationMessage.sendMessage(dataResponse.message || 'Failed to Reload Certs', NotificationColor.Error);
      return;
    }
    domLog.value = <pre>{JSON.stringify(dataResponse, null, 2)}</pre>;
    NotificationMessage.sendMessage('Reload Certs successfully', NotificationColor.Success);
  };

  const onShellLocal = async () => {
    return onShell(true);
  };
  const onShellRemote = async () => {
    return onShell(false);
  };
  const onShell = async (isLocal?: boolean) => {
    const data = getDomData();
    if (!isLocal) {
      if (!data.targetUrl || !data.accessToken) {
        NotificationMessage.sendMessage('Please fill in all fields', NotificationColor.Error);
        return;
      }
    }

    const index = await ActionSheetSelectPromise({
      title: 'Run Cmd ?',
      options: ['OK'],
      cancelButtonText: 'Cancel',
    });
    if (index !== 0) {
      return;
    }

    const response = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/release/shell', {
      ...data,
      isLocal,
      cmd: ref.$('.release-cmd').value,
    });
    const dataResponse = await response.json;
    console.log('shell', dataResponse);
    if (!dataResponse || dataResponse.status !== 'ok') {
      NotificationMessage.sendMessage(dataResponse.message || 'Failed to run cmd', NotificationColor.Error);
      return;
    }
    domLog.value = <pre>{encodeHtml(dataResponse.message) + '\r\n<br>' + encodeHtml(dataResponse.result)}</pre>;
    NotificationMessage.sendMessage('Run cmd successfully', NotificationColor.Success);
  };

  const MAX_LOG_BUFFER_BYTES = 500 * 1024; // 500KB buffer cap
  let monitorTimer: any = null;
  let monitorIsPaused = false;
  let monitorOffset = -1;
  let monitorFileId = '';
  let monitorLogBuffer = '';
  let monitorIsLocal = false;
  let isFetchingLog = false;
  let monitorLogName = 'log-0.log';

  const formatLogText = (raw: string): string => {
    if (!raw) return '';
    // Strip ANSI escape codes
    const cleaned = raw.replace(/\u001b\[[0-9;]*m/g, '');
    const escaped = encodeHtml(cleaned);
    return escaped
      .replace(/(ERROR|FATAL)/g, '<span style="color:#ef4444;font-weight:600;">$1</span>')
      .replace(/(WARN(?:ING)?)/g, '<span style="color:#f59e0b;font-weight:600;">$1</span>')
      .replace(/(INFO)/g, '<span style="color:#38bdf8;font-weight:600;">$1</span>')
      .replace(/(DEBUG)/g, '<span style="color:#94a3b8;">$1</span>')
      .replace(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z)/g, '<span style="color:#64748b;">$1</span>');
  };

  const stopLogMonitor = () => {
    if (monitorTimer) {
      clearInterval(monitorTimer);
      monitorTimer = null;
    }
    monitorLog.value = '';
    monitorLogBuffer = '';
    monitorOffset = -1;
    monitorFileId = '';
  };

  const togglePauseLogMonitor = () => {
    monitorIsPaused = !monitorIsPaused;
    const btn = ref.$('.&-monitor-pause-btn') as HTMLButtonElement;
    const dot = ref.$('.&-monitor-dot') as HTMLSpanElement;
    const statusText = ref.$('.&-monitor-status-text') as HTMLSpanElement;
    if (btn) {
      btn.textContent = monitorIsPaused ? 'Resume' : 'Pause';
    }
    if (dot) {
      dot.style.background = monitorIsPaused ? '#f59e0b' : '#22c55e';
    }
    if (statusText) {
      statusText.textContent = monitorIsPaused ? 'Paused' : 'Streaming';
    }
  };

  const clearLogMonitor = () => {
    monitorLogBuffer = '';
    const terminal = ref.$('.&-monitor-terminal');
    if (terminal) {
      terminal.innerHTML = '<div style="color:#64748b;font-style:italic;">[Console cleared]</div>';
    }
    updateMonitorStats(0);
  };

  const updateMonitorStats = (addedBytes = 0) => {
    const statsEl = ref.$('.&-monitor-stats');
    if (statsEl) {
      const bufferKb = (monitorLogBuffer.length / 1024).toFixed(1);
      const offsetKb = monitorOffset >= 0 ? (monitorOffset / 1024).toFixed(1) : '0.0';
      statsEl.textContent = `Buffer: ${bufferKb} KB / 500 KB | Offset: ${offsetKb} KB | Last: +${addedBytes} B`;
    }
  };

  const fetchLogChunk = async () => {
    if (monitorIsPaused || isFetchingLog) return;
    isFetchingLog = true;

    try {
      const data = getDomData();
      const payload: any = {
        ...data,
        isLocal: monitorIsLocal,
        logName: monitorLogName,
        offset: monitorOffset,
        fileId: monitorFileId,
        maxBytes: 64 * 1024,
      };

      const response = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/release/tail-log', payload);
      const resData = await response.json;

      if (!resData || resData.status !== 'ok') {
        const statusText = ref.$('.&-monitor-status-text') as HTMLSpanElement;
        const dot = ref.$('.&-monitor-dot') as HTMLSpanElement;
        if (statusText) statusText.textContent = resData?.message || 'Fetch error';
        if (dot) dot.style.background = '#ef4444';
        return;
      }

      // Update offset and fileId
      monitorOffset = resData.offset;
      if (resData.fileId) {
        monitorFileId = resData.fileId;
      }

      const statusText = ref.$('.&-monitor-status-text') as HTMLSpanElement;
      const dot = ref.$('.&-monitor-dot') as HTMLSpanElement;
      if (!monitorIsPaused && dot && statusText) {
        dot.style.background = '#22c55e';
        statusText.textContent = 'Streaming' + (resData.rotated ? ' (Rotated)' : '');
      }

      if (resData.content) {
        monitorLogBuffer += resData.content;
        if (monitorLogBuffer.length > MAX_LOG_BUFFER_BYTES) {
          const cutIndex = monitorLogBuffer.indexOf('\n', monitorLogBuffer.length - MAX_LOG_BUFFER_BYTES);
          monitorLogBuffer = cutIndex >= 0 ? monitorLogBuffer.substring(cutIndex + 1) : monitorLogBuffer.substring(monitorLogBuffer.length - MAX_LOG_BUFFER_BYTES);
        }

        const terminal = ref.$('.&-monitor-terminal');
        if (terminal) {
          terminal.innerHTML = formatLogText(monitorLogBuffer);
          const autoScroll = ref.$('.&-monitor-autoscroll') as HTMLInputElement;
          if (autoScroll && autoScroll.checked) {
            terminal.scrollTop = terminal.scrollHeight;
          }
        }
        updateMonitorStats(resData.content.length);
      } else {
        updateMonitorStats(0);
      }
    } catch (e: any) {
      console.error('fetchLogChunk failed', e);
    } finally {
      isFetchingLog = false;
    }
  };

  const onLogFileSelectChange = (e: any) => {
    monitorLogName = e.target.value || 'log-0.log';
    monitorOffset = -1;
    monitorFileId = '';
    monitorLogBuffer = '';
    const terminal = ref.$('.&-monitor-terminal');
    if (terminal) {
      terminal.innerHTML = `<div style="color:#64748b;font-style:italic;">[Switched to ${monitorLogName}, loading...]</div>`;
    }
    fetchLogChunk();
  };

  const startLogMonitor = (isLocal: boolean) => {
    if (monitorTimer) {
      clearInterval(monitorTimer);
      monitorTimer = null;
    }
    monitorIsLocal = isLocal;
    monitorIsPaused = false;
    monitorOffset = -1;
    monitorFileId = '';
    monitorLogBuffer = '';
    monitorLogName = 'log-0.log';

    const targetLabel = isLocal ? 'Local Server' : (ref.$('.target-url') as HTMLInputElement)?.value || 'Remote Server';

    monitorLog.value = (
      <div class='&-monitor-panel'>
        <div class='&-monitor-header'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span class='&-status-dot &-monitor-dot' style={{ background: '#22c55e' }}></span>
            <span style={{ fontWeight: '600', fontSize: '13px' }}>Monitor: {targetLabel}</span>
            <span class='&-monitor-status-text' style={{ fontSize: '12px', color: '#94a3b8' }}>
              Connecting...
            </span>
            <select
              class='input-base'
              style={{ padding: '2px 6px', fontSize: '12px', height: '24px', marginLeft: '6px' }}
              onChange={onLogFileSelectChange}
            >
              <option value='log-0.log' selected>
                log-0.log (Active)
              </option>
              <option value='log-1.log'>log-1.log</option>
              <option value='log-2.log'>log-2.log</option>
              <option value='log-3.log'>log-3.log</option>
              <option value='log-4.log'>log-4.log</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', cursor: 'pointer' }}>
              <input type='checkbox' class='&-monitor-autoscroll' checked={true} /> Auto-scroll
            </label>
            <button
              type='button'
              class='button-base &-monitor-pause-btn'
              onClick={togglePauseLogMonitor}
              style={{ padding: '2px 8px', fontSize: '12px' }}
            >
              Pause
            </button>
            <button
              type='button'
              class='button-base'
              onClick={clearLogMonitor}
              style={{ padding: '2px 8px', fontSize: '12px' }}
            >
              Clear
            </button>
            <button
              type='button'
              class='button-base color-red'
              onClick={stopLogMonitor}
              style={{ padding: '2px 8px', fontSize: '12px' }}
            >
              Close
            </button>
          </div>
        </div>
        <div class='&-monitor-terminal'>
          <div style={{ color: '#64748b', fontStyle: 'italic' }}>[Connecting to log stream...]</div>
        </div>
        <div class='&-monitor-footer'>
          <span class='&-monitor-stats'>Buffer: 0 KB / 500 KB | Offset: 0 KB | Interval: 1.0s</span>
          <span>Max Buffer: 500KB | Seamless Rotation Recovery</span>
        </div>
      </div>
    );

    // Initial fetch immediately, then repeat every 1000ms
    fetchLogChunk();
    monitorTimer = setInterval(fetchLogChunk, 1000);
  };

  const onLocalConsole = () => {
    startLogMonitor(true);
  };

  const onRemoteConsole = () => {
    const data = getDomData();
    if (!data.targetUrl || !data.accessToken) {
      NotificationMessage.sendMessage('Please fill in Target Url and Access token first', NotificationColor.Error);
      return;
    }
    startLogMonitor(false);
  };

  const ref: RefProps = {
    onLoad: async () => {
      const data = JSON.parse(localStorage.getItem('admin-release') || '{}');
      DomUtils.setValue('.target-url', data.targetUrl || '');
      DomUtils.setValue('.access-token', data.accessToken || '');
      renderPresets();
    },
    onUnload: async () => {
      if (monitorTimer) {
        clearInterval(monitorTimer);
        monitorTimer = null;
      }
    },
  };
  return (
    <div ref={ref} css={css} class='admin-release-top'>
      <div class='row-box mt-m'>
        <label class='label mr-m release-label'>Target Url:</label>
        <div class='w-50p'>
          <input type='text' class='input-base w-100p target-url' placeholder='Target Url' />
        </div>
      </div>
      <div class='row-box mt-m'>
        <label class='label mr-m release-label'>Access token:</label>
        <div class='w-50p'>
          <input type='text' class='input-base w-100p access-token' placeholder='Access token' />
        </div>
      </div>
      {domPresets.node}
      {domProgressMsg.node}
      <div class='&-btn-box row-box mt-m'>
        <button onClick={onCheck} class='button-base'>
          Check
        </button>
        <button onClick={onRefreshCacheRemote} class='button-base'>
          Refresh Cache (Remote)
        </button>
        <button onClick={onReloadCertsRemote} class='button-base'>
          Reload Certs (Remote)
        </button>
        <button onClick={onRestartAppRemote} class='button-base color-red'>
          Restart App (Remote)
        </button>
        <button onClick={onRefreshCacheLocal} class='button-base'>
          Refresh Cache (Local)
        </button>
        <button onClick={onReloadCertsLocal} class='button-base'>
          Reload Certs (Local)
        </button>
        <button onClick={onRestartAppLocal} class='button-base color-red'>
          Restart App (Local)
        </button>

        <button onClick={onRemoteConsole} class='button-base color-red'>
          Console (Remote)
        </button>
        <button onClick={onLocalConsole} class='button-base'>
          Console (Local)
        </button>
      </div>
      <div class='&-btn-box row-box mt-m mb-m'>
        <input type='text' class='input-base w-50p release-cmd mr-m' placeholder='Command' />
        <button onClick={onShellRemote} class='button-base color-red'>
          Run Cmd (Remote)
        </button>
        <button onClick={onShellLocal} class='button-base'>
          Run Cmd (Local)
        </button>
      </div>
      {domUpdate.node}
      {domLog.node}
      {monitorLog.node}
    </div>
  );
};
