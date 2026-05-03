import {
  CssProps,
  RefProps,
  HtmlVar,
  NotificationColor,
  NotificationMessage,
  getRenderPageProps,
} from 'lupine.components';

const EXPORT_OPTIONS = [
  { key: 'menu', label: 'Menu', table: '$__s_menu' },
  { key: 'page', label: 'Page', table: '$__s_page' },
  { key: 'process', label: 'Process', table: '$__s_process' },
];

export const AdminDataPage = () => {
  const importResultDom = new HtmlVar(<span></span>);

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 8px 24px 8px',
    gap: '24px',
    maxWidth: '720px',

    '.&-section': {
      backgroundColor: 'var(--secondary-bg-color)',
      border: 'var(--primary-border)',
      borderRadius: '8px',
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },

    '.&-section-title': {
      fontSize: '15px',
      fontWeight: '600',
      color: 'var(--primary-color)',
      marginBottom: '4px',
      paddingBottom: '10px',
      borderBottom: 'var(--primary-border)',
    },

    '.&-file-row': {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
    },

    '.&-file-input': {
      flex: '1',
      minWidth: '0',
      padding: '8px 10px',
      border: 'var(--primary-border)',
      borderRadius: '6px',
      backgroundColor: 'var(--primary-bg-color)',
      color: 'var(--primary-color)',
      fontSize: '13px',
    },

    '.&-result': {
      fontSize: '13px',
      color: 'var(--secondary-color)',
      minHeight: '20px',
    },

    '.&-result .ok': {
      color: 'var(--success-color)',
    },
    '.&-result .error': {
      color: 'var(--error-color)',
    },

    '.&-checkboxes': {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },

    '.&-checkbox-row': {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      fontSize: '14px',
      color: 'var(--primary-color)',
    },

    '.&-checkbox-row input[type=checkbox]': {
      width: '16px',
      height: '16px',
      accentColor: 'var(--primary-accent-color)',
      cursor: 'pointer',
    },

    '.&-hint': {
      fontSize: '12px',
      color: 'var(--secondary-color)',
    },
  };

  const ref: RefProps = {
    onLoad: async () => {
      // set all checkboxes to checked by default
      for (const opt of EXPORT_OPTIONS) {
        const cb = ref.$(`#data-export-cb-${opt.key}`);
        if (cb) cb.checked = true;
      }
    },
  };

  const doImport = async () => {
    const fileInput = ref.$('.&-file-input');
    const file = fileInput?.files?.[0];
    if (!file) {
      NotificationMessage.sendMessage('Please select a .ljcsv file first.', NotificationColor.Warning);
      return;
    }

    importResultDom.value = <span>Uploading...</span>;

    const text: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target!.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file, 'utf-8');
    });

    const lines = text.split(/(?:\r\n|\r|\n)/g);

    const overwriteCb = ref.$('#data-import-overwrite') as HTMLInputElement;
    const overwrite = overwriteCb ? overwriteCb.checked : false;

    try {
      const result = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/data/import', {
        lines,
        overwrite,
      });
      const json = result.json;
      if (json.status === 'ok') {
        const tableResults = json.result as Record<string, { succeeded: number; failed: number; errorMessage: string[] }>;
        importResultDom.value = (
          <div class='ok' style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
            <div><strong>✓ Import complete</strong></div>
            {Object.entries(tableResults).map(([tbl, r]) => (
              <div style={{ paddingLeft: '8px' }}>
                <div>{tbl}: {r.succeeded} succeeded, {r.failed} failed.</div>
                {r.errorMessage && r.errorMessage.length > 0 && (
                  <div class='error' style={{ fontSize: '12px', paddingLeft: '8px', marginTop: '2px' }}>
                    {r.errorMessage.map(msg => <div>• {msg}</div>)}
                  </div>
                )}
              </div>
            ))}
            <div>{json.message}</div>
          </div>
        );
        NotificationMessage.sendMessage('Import successful!', NotificationColor.Success);
      } else {
        importResultDom.value = <span class='error'>✗ {json.message}</span>;
        NotificationMessage.sendMessage(json.message || 'Import failed', NotificationColor.Error);
      }
    } catch (e: any) {
      importResultDom.value = <span class='error'>✗ {e.message}</span>;
      NotificationMessage.sendMessage(e.message, NotificationColor.Error);
    }
  };

  const doExport = () => {
    const selected = EXPORT_OPTIONS.filter((opt) => {
      const cb = ref.$(`#data-export-cb-${opt.key}`);
      return cb?.checked;
    }).map((opt) => opt.key);

    if (selected.length === 0) {
      NotificationMessage.sendMessage('Please select at least one table to export.', NotificationColor.Warning);
      return;
    }

    const tablesParam = selected.join(',');
    const url = `/api/admin/data/export?tables=${encodeURIComponent(tablesParam)}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div ref={ref} css={css}>
      <div class='admin-sub-title' style={{ marginBottom: '4px' }}>
        Content Data Management
      </div>

      {/* ── Import Section ── */}
      <div class='&-section'>
        <div class='&-section-title'>📥 Import Content Data</div>
        <p class='&-hint'>
          Select a <strong>.ljcsv</strong> file exported from this system. The data will be merged into the current database.
        </p>
        <div class='&-file-row'>
          <input
            class='&-file-input'
            type='file'
            accept='.ljcsv,.stcsv,.csv'
            id='data-import-file'
          />
          <button class='button-base' onClick={doImport}>
            Upload &amp; Import
          </button>
        </div>
        <label class='&-checkbox-row' style={{ marginTop: '8px' }}>
          <input type='checkbox' id='data-import-overwrite' />
          <span>Overwrite existing records on conflict (Delete &amp; Re-insert)</span>
        </label>
        <div class='&-result'>{importResultDom.node}</div>
      </div>

      {/* ── Export Section ── */}
      <div class='&-section'>
        <div class='&-section-title'>📤 Export Content Data</div>
        <p class='&-hint'>
          Select the content types you want to export. The file will be downloaded as a <strong>.ljcsv</strong> file.
        </p>
        <div class='&-checkboxes'>
          {EXPORT_OPTIONS.map((opt) => (
            <label class='&-checkbox-row'>
              <input type='checkbox' id={`data-export-cb-${opt.key}`} />
              <span>{opt.label}</span>
              <span class='&-hint' style={{ marginLeft: 'auto' }}>
                ({opt.table})
              </span>
            </label>
          ))}
        </div>
        <div>
          <button class='button-base' onClick={doExport}>
            Export Selected
          </button>
        </div>
      </div>
    </div>
  );
};
