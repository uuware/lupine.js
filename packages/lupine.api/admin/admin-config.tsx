import { CssProps, getRenderPageProps, NotificationColor, NotificationMessage, RefProps } from 'lupine.components';

export const AdminConfigPage = () => {
  const css: CssProps = {
    '.input-cfg': {
      height: '400px',
      maxHeight: '100%',
    },
  };
  const onSave = async () => {
    try {
      const json = JSON.parse(ref.$('.input-cfg').value);
      const data = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/config/save', { json });
      if (data.json && data.json.status === 'ok') {
        NotificationMessage.sendMessage('Saved, and please refresh the page to load new configs', NotificationColor.Success);
      }
    } catch (e) {
      NotificationMessage.sendMessage('Config is not valid JSON', NotificationColor.Error);
    }
  };
  const ref: RefProps = {
    onLoad: async () => {
      const data = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/config/load');
      if (data.json && data.json.result) {
        ref.$('.input-cfg').value = JSON.stringify(data.json.result, null, 4);
        ref.$('.cfg-btn').disabled = false;
      } else {
        NotificationMessage.sendMessage('Failed to load config', NotificationColor.Error);
      }
    },
  };
  return (
    <div css={css} class='admin-cfg-top' ref={ref}>
      <div class='row-box pb-m'>
        <button onClick={onSave} class='button-base cfg-btn' disabled={true}>
          Save
        </button>
      </div>
      <div class='row-box'>
        <textarea class='input-base input-cfg w-100p'></textarea>
      </div>
    </div>
  );
};
