import {
  CssProps,
  getRenderPageProps,
  MediaQueryMaxWidth,
  NotificationColor,
  NotificationMessage,
  RefProps,
  FloatWindow,
} from 'lupine.components';

export const AdminApiSettingPage = () => {
  const cfgItems: { [key: string]: { label: string; type: string; group?: string; options?: {value: string; label: string}[]; name: string } } = {
    isMaintenance: { label: 'Enable Maintenance Mode', type: 'checkbox', group: 'Maintenance', name: 'isMaintenance' },
    maintenanceInfo: { label: 'Maintenance Message', type: 'html', group: 'Maintenance', name: 'maintenanceInfo' },
    sendEmailType: { label: 'Email Sender Type', type: 'select', group: 'Email Settings', name: 'sendEmailType', options: [{ value: 'gmail', label: 'Gmail' }, { value: 'qq', label: 'QQ' }] },
    sendEmailUser: { label: 'Email Display Name', type: 'text', group: 'Email Settings', name: 'sendEmailUser' },
    sendEmailAuthUser: { label: 'Email Auth User', type: 'text', group: 'Email Settings', name: 'sendEmailAuthUser' },
    sendEmailSecret: { label: 'Email Auth Secret', type: 'text', group: 'Email Settings', name: 'sendEmailSecret' },
    weixinAppSecret: { label: 'Wechat AppSecret', type: 'text', group: 'Auth Settings', name: 'weixinAppSecret' },
    weixinWebAppSecret: { label: 'Wechat WebAppSecret', type: 'text', group: 'Auth Settings', name: 'weixinWebAppSecret' },
    weixinMchId: { label: 'Wechat MchId', type: 'text', group: 'Auth Settings', name: 'weixinMchId' },
    weixinMchKey: { label: 'Wechat MchKey', type: 'text', group: 'Auth Settings', name: 'weixinMchKey' },
    googleClientSecretWeb: { label: 'Google Web AppSecret', type: 'text', group: 'Auth Settings', name: 'googleClientSecretWeb' },
    aliAccessKeyId: { label: 'Aliyun AccessKeyId', type: 'text', group: 'Ali SMS Settings', name: 'aliAccessKeyId' },
    aliAccessKeySecret: { label: 'Aliyun AccessKeySecret', type: 'text', group: 'Ali SMS Settings', name: 'aliAccessKeySecret' },
    aliSignName: { label: 'Aliyun SignName', type: 'text', group: 'Ali SMS Settings', name: 'aliSignName' },
    aliTemplateCode: { label: 'Aliyun TemplateCode', type: 'text', group: 'Ali SMS Settings', name: 'aliTemplateCode' },
    allowedDayRegisterCount: { label: 'Daily Registration Limit', type: 'number', group: 'Security', name: 'allowedDayRegisterCount' },
  };

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: MediaQueryMaxWidth.DesktopMax,
    margin: '0 auto',
    padding: '16px',
    '.cfg-label': {
      width: '150px',
      marginBottom: '20px',
    },
    '.cfg-input': {
      flex: 1,
    },
    '.m-fieldset': {
      margin: '10px 0',
      border: '1px solid #aaa',
      borderRadius: '8px',
      padding: '10px',
    },
    '.m-text': {
      marginBottom: '10px',
    },
    '.html-editor-btn': {
      marginLeft: '8px',
      cursor: 'pointer',
      padding: '0 8px',
      height: '32px',
    }
  };

  const openHtmlEditor = (key: string, title: string) => {
    const currentValue = ref.$(`.f-${key}`).value;
    let editValue = currentValue;

    const content = (
      <div style={{ padding: '10px', width: '100%', height: '300px' }}>
        <textarea 
          style={{ width: '100%', height: '100%', padding: '8px', boxSizing: 'border-box' }}
          onChange={(e: any) => editValue = e.target.value}
        >{currentValue}</textarea>
      </div>
    );

    FloatWindow.show({
      title: `Edit ${title}`,
      children: content,
      buttons: ['OK', 'Cancel'],
      contentMinWidth: '500px',
      handleClicked: (index, close) => {
        if (index === 0) {
          ref.$(`.f-${key}`).value = editValue;
        }
        close();
      }
    });
  };

  const onSave = async () => {
    const cfgItemsOnly: { [key: string]: any } = {};
    for (const key in cfgItems) {
      const el = ref.$('.f-' + key);
      if (el) {
        if (cfgItems[key].type === 'checkbox') {
          cfgItemsOnly[key] = (el as HTMLInputElement).checked;
        } else {
          cfgItemsOnly[key] = el.value;
        }
      }
    }

    const result = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/settings/write-api', cfgItemsOnly);
    NotificationMessage.sendMessage(
      result.json?.message || 'Done',
      result.json?.status === 'ok' ? NotificationColor.Success : NotificationColor.Error
    );
  };

  const onLoad = async () => {
    const cfg = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/settings/read-api');
    if (cfg && cfg.json && cfg.json.status === 'ok' && cfg.json.result) {
      for (const key in cfgItems) {
        const el = ref.$('.f-' + key);
        if (el) {
          if (cfgItems[key].type === 'checkbox') {
            (el as HTMLInputElement).checked = cfg.json.result[key];
          } else {
             el.value = cfg.json.result[key] || '';
          }
        }
      }
    }
  };

  const ref: RefProps = {
    onLoad,
  };

  return (
    <div ref={ref} css={css} class='management-cfg-page-box'>
      <div class='row-box'>
        <button class='button-base' onClick={onSave}>
          Save
        </button>
      </div>
      
      {Object.entries(
        Object.entries(cfgItems).reduce((acc: any, [key, item]) => {
          const group = item.group || 'Other Settings';
          if (!acc[group]) acc[group] = [];
          acc[group].push({ key, item });
          return acc;
        }, {})
      ).map(([group, items]: [string, any]) => (
        <fieldset class='m-fieldset'>
          <legend>{group}:</legend>
          {items.map(({ key, item }: any) => (
            <div class='row-box'>
              <label class='cfg-label'>{item.label}:</label>
              
              {(item.type === 'text' || item.type === 'number' || item.type === 'color') && (
                <input type={item.type} class={`cfg-input input-base m-text f-${key}`} />
              )}

              {item.type === 'select' && (
                <select class={`cfg-input input-base m-text f-${key}`}>
                  {item.options?.map((opt: any) => (
                    <option value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              )}

              {item.type === 'checkbox' && (
                <div class="row-box flex-1">
                   <input type="checkbox" class={`f-${key}`} style={{ marginRight: '8px' }} />
                </div>
              )}

              {item.type === 'html' && (
                <div class="row-box flex-1">
                  <input type='text' class={`cfg-input input-base m-text f-${key}`} />
                  <button class='button-base html-editor-btn' onClick={() => openHtmlEditor(key, item.label)}>
                    ...
                  </button>
                </div>
              )}

            </div>
          ))}
        </fieldset>
      ))}

    </div>
  );
};
