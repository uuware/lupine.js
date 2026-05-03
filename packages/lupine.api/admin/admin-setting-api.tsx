import {
  CssProps,
  getRenderPageProps,
  MediaQueryMaxWidth,
  NotificationColor,
  NotificationMessage,
  RefProps,
  FloatWindow,
} from 'lupine.components';
import { SettingGroup, SettingItem, SettingItemRender } from './admin-setting-props';

const cfgApiGroups: SettingGroup[] = [
  {
    groupName: 'Maintenance',
    items: [
      { label: 'Enable Maintenance Mode', type: 'checkbox', name: 'isMaintenance' },
      { label: 'Maintenance Message', type: 'html', name: 'maintenanceInfo' },
    ],
  },
  {
    groupName: 'Email Settings',
    items: [
      { label: 'Email Sender Type', type: 'select', name: 'sendEmailType', options: [{ value: 'gmail', label: 'Gmail' }, { value: 'qq', label: 'QQ' }] },
      { label: 'Email Display Name', type: 'text', name: 'sendEmailUser' },
      { label: 'Email Auth User', type: 'text', name: 'sendEmailAuthUser' },
      { label: 'Email Auth Secret', type: 'text', name: 'sendEmailSecret' },
    ],
  },
];

export const settingApiInsertGroup = (groups: SettingGroup[], beforeGroupName?: string) => {
  if (!beforeGroupName) {
    cfgApiGroups.push(...groups);
    return;
  }
  const idx = cfgApiGroups.findIndex(g => g.groupName === beforeGroupName);
  if (idx >= 0) {
    cfgApiGroups.splice(idx, 0, ...groups);
  } else {
    cfgApiGroups.push(...groups);
  }
};

export const settingApiInsertGroupItem = (targetGroupName: string, items: SettingItem[], beforeItemName?: string) => {
  const group = cfgApiGroups.find(g => g.groupName === targetGroupName);
  if (!group) return;
  
  if (!beforeItemName) {
    group.items.push(...items);
    return;
  }
  
  const idx = group.items.findIndex(i => i.name === beforeItemName);
  if (idx >= 0) {
    group.items.splice(idx, 0, ...items);
  } else {
    group.items.push(...items);
  }
};

export const AdminApiSettingPage = () => {

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
    '.html-editor-btn': {
      marginLeft: '8px',
      cursor: 'pointer',
      padding: '0 8px',
      height: '32px',
    }
  };

  const onSave = async () => {
    const cfgItemsOnly: { [key: string]: any } = {};
    for (const group of cfgApiGroups) {
      for (const item of group.items) {
        const key = item.name;
        const el = ref.$('.f-' + key);
        if (el) {
          if (item.type === 'checkbox') {
            cfgItemsOnly[key] = (el as HTMLInputElement).checked;
          } else {
            cfgItemsOnly[key] = el.value;
          }
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
      for (const group of cfgApiGroups) {
        for (const item of group.items) {
          const key = item.name;
          const el = ref.$('.f-' + key);
          if (el) {
            if (item.type === 'checkbox') {
              (el as HTMLInputElement).checked = cfg.json.result[key];
            } else {
               el.value = cfg.json.result[key] || '';
            }
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
      
      {cfgApiGroups.map((group) => (
        <fieldset class='m-fieldset'>
          <legend>{group.groupName}:</legend>
          {group.items.map((item) => (
            <SettingItemRender item={item} ref={ref} />
          ))}
        </fieldset>
      ))}

    </div>
  );
};
