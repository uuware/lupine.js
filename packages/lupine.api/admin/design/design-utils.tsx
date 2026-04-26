import { FloatWindow, HEditor, RefProps, NotificationMessage, NotificationColor, MediaQueryRange, ActionSheetSelectPromise } from 'lupine.components';
import { DesignNode } from './design-store';

export const DesignUtils = {

  getHiddenCss: (p: any, mq: string, defaultDisplay?: string) => {
    const val = p[`hidden${mq}`];
    return val !== undefined ? { display: val ? 'none' : defaultDisplay } : {};
  },

  parseInlineCss: (cssStr?: string) => {
    if (!cssStr) return {};
    const obj: any = {};
    cssStr.split(';').forEach(rule => {
      const idx = rule.indexOf(':');
      if (idx > 0) {
        const key = rule.substring(0, idx).trim();
        const val = rule.substring(idx + 1).trim();
        if (key && val) obj[key] = val;
      }
    });
    return obj;
  },

  getResponsiveCss: (p: any, mq: string, defaultDisplay?: string) => {
    return {
      ...DesignUtils.getHiddenCss(p, mq, defaultDisplay),
      ...DesignUtils.parseInlineCss(p[`customCss${mq}`])
    };
  },

  compileResponsiveCssForNode: (node: DesignNode, defaultDisplay?: string) => {
    const p = node.props || {};
    const sysCss = {
      ...DesignUtils.parseInlineCss(p.customCss),
      [MediaQueryRange.DesktopBelow]: DesignUtils.getResponsiveCss(p, 'DesktopBelow', defaultDisplay),
      [MediaQueryRange.TabletBelow]: DesignUtils.getResponsiveCss(p, 'TabletBelow', defaultDisplay),
      [MediaQueryRange.MobileBelow]: DesignUtils.getResponsiveCss(p, 'MobileBelow', defaultDisplay),
      [MediaQueryRange.ExtraSmallBelow]: DesignUtils.getResponsiveCss(p, 'ExtraSmallBelow', defaultDisplay),
    };
    p._sys_css = sysCss;
    return sysCss;
  },

  showJsonTree: (tree: DesignNode) => {
    FloatWindow.show({
      title: 'Node Tree JSON',
      buttons: ['OK'],
      contentMinWidth: '80%',
      noModal: false,
      closeWhenClickOutside: true,
      handleClicked: (index: number, close: any) => {
        close();
      },
      children: (
        <textarea
          readonly
          style="width:100%;height:400px;background:#f5f5f5;border:1px solid #ddd;padding:12px;font-family:monospace;font-size:13px;outline:none;resize:none;"
        >
          {JSON.stringify(tree, null, 2)}
        </textarea>
      ),
    });
  },

  openHtmlEditor: (initialValue: string, onSave: (html: string) => void) => {
    let edt: HEditor | undefined;
    const ref: RefProps = {
      onLoad: async () => {
        const container = ref.$('.edit-view-box');
        if (container) {
          edt = HEditor.getEditor(container, initialValue);
        }
      },
    };

    FloatWindow.show({
      title: 'Edit HTML Content',
      contentMinWidth: '80%',
      buttons: ['Cancel', 'Save'],
      handleClicked: (index: number, close: any) => {
        if (index === 1 && edt) {
          onSave(edt.getHtml());
        }
        close();
      },
      children: (
        <div ref={ref} style={{ width: '100%', boxSizing: 'border-box', height: '500px', display: 'flex', flexDirection: 'column' }}>
          <div
            class="edit-view-box"
            style={{ flex: 1, border: '1px solid var(--primary-border)', borderRadius: '4px', overflow: 'hidden' }}
          ></div>
        </div>
      ),
    });
  },

  openCssEditor: (initialValue: string, onSave: (css: string) => void) => {
    let currentVal = initialValue;
    FloatWindow.show({
      title: 'Edit Custom Inline CSS',
      contentMinWidth: '80%',
      buttons: ['Cancel', 'Save'],
      handleClicked: (index: number, close: any) => {
        if (index === 1) {
          onSave(currentVal);
        }
        close();
      },
      children: (
        <textarea
          onInput={(e: any) => (currentVal = e.target.value)}
          style="width:100%;box-sizing:border-box;height:400px;background:#1e1e1e;color:#d4d4d4;border:1px solid #333;padding:16px;font-family:'Courier New', Courier, monospace;font-size:14px;outline:none;resize:none;line-height:1.6;"
        >
          {initialValue}
        </textarea>
      ),
    });
  },

  saveComponent: async (pageid: string, name: string, packageId: string, remark: string, tree: DesignNode, isComponent: boolean = true, overwrite: boolean = false, originalUpdatetime?: number): Promise<{status: 'ok' | 'ID_EXISTS' | 'MODIFIED_BY_OTHER' | 'error', newUpdatetime?: number}> => {
    try {
      const payload = {
        pageid: pageid.trim(),
        name: name.trim() || 'Untitled',
        package: packageId.trim() || 'default',
        remark: remark,
        is_component: isComponent ? 1 : 0,
        json: tree,
        checkExists: !overwrite,
        originalUpdatetime: originalUpdatetime
      };

      const res = await fetch('/api/admin/page/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.status === 'ok') return { status: 'ok', newUpdatetime: data.newUpdatetime };
      if (data.status === 'ID_EXISTS') return { status: 'ID_EXISTS' };
      if (data.status === 'MODIFIED_BY_OTHER') return { status: 'MODIFIED_BY_OTHER' };
      return { status: 'error' };
    } catch (e) {
      console.error('Failed to save component', e);
      return { status: 'error' };
    }
  },

  showSaveDialog: (initialId: string, initialName: string, initialPackage: string, initialRemark: string, initialIsComponent: boolean, initialUpdatetime: number, astClone: any, onSuccess: (newId: string, newName: string, newPackage: string, newRemark: string, isComponent: boolean, newStamp: number) => void) => {
    let compId = initialId;
    let compName = initialName;
    let compPackage = initialPackage || 'default';
    let compRemark = initialRemark || '';
    let isComponentCtx = initialIsComponent;

    FloatWindow.show({
      title: 'Save Page',
      buttons: ['Cancel', 'Save'],
      contentMinWidth: '400px',
      handleClicked: (index: number, close: any) => {
        if (index === 1) {
          compId = compId.trim().toLowerCase();
          if (!compId) {
            NotificationMessage.sendMessage('Page ID is required', NotificationColor.Warning);
            return;
          }
          if (!/^[a-z0-9_]+$/.test(compId)) {
            NotificationMessage.sendMessage('Page ID can only contain lowercase letters, numbers, and underscores.', NotificationColor.Warning);
            return;
          }

          const executeSave = async (overwrite: boolean) => {
              const isSameId = (compId.trim() === initialId.trim() && initialUpdatetime !== 0);
              const passUpdatetime = isSameId ? initialUpdatetime : undefined;

              const result = await DesignUtils.saveComponent(compId, compName, compPackage, compRemark, astClone, isComponentCtx, overwrite, passUpdatetime);
              if (result.status === 'ok') {
                 NotificationMessage.sendMessage(`${isComponentCtx ? 'Component' : 'Page'} saved!`, NotificationColor.Success);
                 onSuccess(compId, compName, compPackage, compRemark, isComponentCtx, result.newUpdatetime || 0);
                 close();
              } else if (result.status === 'ID_EXISTS') {
                 const idx = await ActionSheetSelectPromise({
                   title: `A record with ID "${compId}" already exists. Overwrite?`,
                   options: ['Overwrite'],
                   cancelButtonText: 'Cancel'
                 });
                 if (idx === 0) {
                    executeSave(true);
                 }
              } else if (result.status === 'MODIFIED_BY_OTHER') {
                 const idx = await ActionSheetSelectPromise({
                   title: `The page "${compId}" has just been modified by someone else! Do you want to force overwrite?`,
                   options: ['Force Overwrite'],
                   cancelButtonText: 'Cancel'
                 });
                 if (idx === 0) {
                    executeSave(true);
                 }
              } else {
                 NotificationMessage.sendMessage(`Failed to save ${isComponentCtx ? 'Component' : 'Page'}.`, NotificationColor.Error);
                 close();
              }
          };
          
          executeSave(false);
          return;
        }
        close();
      },
      children: (
        <div style={{ padding: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold' }}>Page ID:</label>
          <input 
            type="text" 
            value={compId} 
            onInput={(e: any) => compId = e.target.value}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '16px' }}
          />
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold' }}>Page Name:</label>
          <input 
            type="text" 
            value={compName} 
            onInput={(e: any) => compName = e.target.value}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '16px' }}
          />
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold' }}>Package:</label>
          <input 
            type="text" 
            value={compPackage} 
            onInput={(e: any) => compPackage = e.target.value}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '16px' }}
          />
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold' }}>Remark:</label>
          <input 
            type="text" 
            value={compRemark} 
            onInput={(e: any) => compRemark = e.target.value}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '16px' }}
          />
          <div class="row-box" style={{ gap: '8px' }}>
             <input type="checkbox" id="chkcmp" checked={isComponentCtx} onChange={(e: any) => isComponentCtx = e.target.checked} />
             <label for="chkcmp" style={{ fontSize: '13px' }}>Save as Reusable Component</label>
          </div>
        </div>
      )
    });
  },

  getSavedComponents: async (): Promise<{ name: string; tree: DesignNode; savedAt: number; pageid: string }[]> => {
    try {
      const savedStr = localStorage.getItem('lupine_design_pinned_components');
      if (!savedStr) return [];
      let ids: string[] = [];
      try {
        ids = JSON.parse(savedStr);
      } catch (e) {}
      if (!Array.isArray(ids) || ids.length === 0) return [];

      const res = await fetch('/api/admin/page/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: ids })
      });
      const data = await res.json();
      if (data.status === 'ok' && Array.isArray(data.results)) {
         return data.results.map((row: any) => {
            let tree: any = {};
            try { tree = JSON.parse(row.json); } catch(err) {}
            return {
               pageid: row.pageid,
               name: row.name,
               tree: tree,
               savedAt: row.updatetime || 0
            };
         });
      }
      return [];
    } catch (e) {
      console.error('Failed to fetch pinned components', e);
      return [];
    }
  },
};
