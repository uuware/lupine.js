import {
  CssProps,
  getRenderPageProps,
  MediaQueryMaxWidth,
  NotificationColor,
  NotificationMessage,
  RefProps,
  WebConfig,
} from 'lupine.components';
import { SettingGroup, SettingItem, SettingItemRender } from './admin-setting-props';

const cfgGroups: SettingGroup[] = [
  {
    groupName: 'CMS Settings',
    items: [
      { label: 'Languages', type: 'text', name: 'siteLangs', tip: 'Languages separated by commas. Format: code:title,code:title. First is default language. Example: en:English,cn:Chinese,ja:Japanese' },
      { label: 'Default Page', type: 'cms-page', name: 'cmsPageDefault' },
      { label: 'Default Content', type: 'cms-page', name: 'cmsContentDefault' },
      { label: 'Maintenance Mode', type: 'checkbox', name: 'cmsMaintenanceMode' },
      { label: 'Maintenance Message', type: 'html', name: 'cmsMaintenanceMsg' },
    ],
  },
  {
    groupName: 'Paging Settings',
    items: [
      { label: 'Page Limit', type: 'number', name: 'pageLimit' },
    ],
  },
  {
    groupName: 'Email Sending Info',
    items: [
      { label: 'Email address', type: 'text', name: 'siteEmail' },
      { label: 'Website Url', type: 'text', name: 'siteUrl' },
    ],
  },
];

export const settingWebInsertGroup = (groups: SettingGroup[], beforeGroupName?: string) => {
  if (!beforeGroupName) {
    cfgGroups.push(...groups);
    return;
  }
  const idx = cfgGroups.findIndex(g => g.groupName === beforeGroupName);
  if (idx >= 0) {
    cfgGroups.splice(idx, 0, ...groups);
  } else {
    cfgGroups.push(...groups);
  }
};

export const settingWebInsertGroupItem = (targetGroupName: string, items: SettingItem[], beforeItemName?: string) => {
  const group = cfgGroups.find(g => g.groupName === targetGroupName);
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

export const AdminWebSettingPage = () => {
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: MediaQueryMaxWidth.DesktopMax,
    margin: '0 auto',
    padding: '16px',
    '.cfg-label': {
      width: '150px',
    },
    '.cfg-control': {
      display: 'flex',
      flexDirection: 'column',
    },
    '.cfg-input': {
      flex: 1,
    },
    '.cfg-tip': {
      color: 'var(--secondary-text, #777)',
      fontSize: '12px',
      lineHeight: '18px',
    },
    '.m-fieldset': {
      margin: '10px 0',
      border: '1px solid #aaa',
      borderRadius: '8px',
      padding: '10px',
    },
  };

  const onSave = async () => {
    const cfgItemsOnly: { [key: string]: string } = {};
    for (const group of cfgGroups) {
      for (const item of group.items) {
        const key = item.name;
        const el = ref.$('.f-' + key);
        if (el) {
          if (item.type === 'checkbox') {
            cfgItemsOnly[key] = (el as HTMLInputElement).checked ? '1' : '';
          } else {
            cfgItemsOnly[key] = el.value;
          }
        }
      }
    }

    const result = await getRenderPageProps().renderPageFunctions.fetchData(
      '/api/admin/settings/write-web',
      cfgItemsOnly
    );

    WebConfig.init(true);
    NotificationMessage.sendMessage(
      result.json?.message || 'Done',
      result.json?.status === 'ok' ? NotificationColor.Success : NotificationColor.Error
    );
  };

  const onLoad = async () => {
    const result = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/settings/read-web');
    if (result.json && result.json.status === 'ok') {
      const resData = result.json.result || {};
      for (const group of cfgGroups) {
        for (const item of group.items) {
          const key = item.name;
          const el = ref.$('.f-' + key);
          if (el) {
            if (item.type === 'checkbox') {
              (el as HTMLInputElement).checked = resData[key] === '1' || resData[key] === 1 || resData[key] === true;
            } else {
              el.value = resData[key] || '';
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
    <div css={css} class='management-cfg-page-box' ref={ref}>
      <div class='row-box'>
        <button class='button-base' onClick={onSave}>
          Save
        </button>
      </div>

      {cfgGroups.map((group) => (
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
