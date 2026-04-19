import {
  CssProps,
  getRenderPageProps,
  MediaQueryMaxWidth,
  NotificationColor,
  NotificationMessage,
  RefProps,
  WebConfig,
} from 'lupine.components';

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
  };

  const cfgItems: { [key: string]: { label: string; type: string; group?: string; name: string } } = {
    siteTitle: { label: 'Site Title', type: 'text', group: 'Website Settings', name: 'siteTitle' },
    siteSubTitle: { label: 'Site Subtitle', type: 'text', group: 'Website Settings', name: 'siteSubTitle' },
    siteFooter: { label: 'Site Footer', type: 'text', group: 'Website Settings', name: 'siteFooter' },
    musicTags: { label: 'Music Tags', type: 'text', group: 'Website Settings', name: 'musicTags' },
    lessonHomeSub: { label: 'Lesson Sub Menu', type: 'text', group: 'Website Settings', name: 'lessonHomeSub' },
    lessonTags: { label: 'Lesson Tags', type: 'text', group: 'Website Settings', name: 'lessonTags' },
    shopTags: { label: 'Shop Tags', type: 'text', group: 'Website Settings', name: 'shopTags' },
    shopProductIds: { label: 'Product IDs', type: 'text', group: 'Shop Settings', name: 'shopProductIds' },
    pageLimit: { label: 'Page Limit', type: 'number', group: 'Paging Settings', name: 'pageLimit' },
    siteEmail: { label: 'Email address', type: 'text', group: 'Email Sending Info', name: 'siteEmail' },
    siteUrl: { label: 'Website Url', type: 'text', group: 'Email Sending Info', name: 'siteUrl' },
    weixinAppId: { label: 'Wechat AppId', type: 'text', group: 'Frontend Auth Settings', name: 'weixinAppId' },
    weixinWebAppId: { label: 'Wechat WebAppId', type: 'text', group: 'Frontend Auth Settings', name: 'weixinWebAppId' },
    googleClientIdWeb: { label: 'Google Web AppId', type: 'text', group: 'Frontend Auth Settings', name: 'googleClientIdWeb' },
    afterAuthUrl: { label: 'Post-Auth Redirect URL', type: 'text', group: 'Frontend Auth Settings', name: 'afterAuthUrl' },
  };

  const onSave = async () => {
    const cfgItemsOnly: { [key: string]: string } = {};
    for (const key in cfgItems) {
      if (ref.$('.f-' + key)) {
        cfgItemsOnly[key] = ref.$('.f-' + key).value;
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
       for (const key in cfgItems) {
         if (ref.$('.f-' + key)) {
           ref.$('.f-' + key).value = resData[key] || '';
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
            </div>
          ))}
        </fieldset>
      ))}
    </div>
  );
};
