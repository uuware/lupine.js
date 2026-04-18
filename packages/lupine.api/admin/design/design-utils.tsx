import { FloatWindow, HEditor, RefProps, NotificationMessage, NotificationColor } from 'lupine.components';
import { DesignNode } from './design-store';

export const DesignUtils = {
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
      buttons: ['Cancel', 'Save'],
      handleClicked: (index: number, close: any) => {
        if (index === 1 && edt) {
          onSave(edt.getHtml());
        }
        close();
      },
      children: (
        <div ref={ref} style={{ width: '800px', height: '500px', display: 'flex', flexDirection: 'column' }}>
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
          style="width:800px;height:400px;background:#1e1e1e;color:#d4d4d4;border:1px solid #333;padding:16px;font-family:'Courier New', Courier, monospace;font-size:14px;outline:none;resize:none;line-height:1.6;"
        >
          {initialValue}
        </textarea>
      ),
    });
  },

  saveComponent: async (name: string, tree: DesignNode, isComponent: boolean = true, overwrite: boolean = false): Promise<'ok' | 'ID_EXISTS' | 'error'> => {
    try {
      const payload = {
        pageid: name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: name,
        is_component: isComponent ? 1 : 0,
        json: tree,
        checkExists: !overwrite
      };

      const res = await fetch('/api/admin/page/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.status === 'ok') return 'ok';
      if (data.status === 'ID_EXISTS') return 'ID_EXISTS';
      return 'error';
    } catch (e) {
      console.error('Failed to save component', e);
      return 'error';
    }
  },

  showSaveDialog: (initialName: string, initialIsComponent: boolean, astClone: any, onSuccess: (newName: string, isComponent: boolean) => void) => {
    let compName = initialName;
    let isComponentCtx = initialIsComponent;

    FloatWindow.show({
      title: 'Save Page',
      buttons: ['Cancel', 'Save'],
      handleClicked: (index: number, close: any) => {
        if (index === 1) {
          const executeSave = async (overwrite: boolean) => {
              const status = await DesignUtils.saveComponent(compName, astClone, isComponentCtx, overwrite);
              if (status === 'ok') {
                 NotificationMessage.sendMessage(`${isComponentCtx ? 'Component' : 'Page'} "${compName}" saved!`, NotificationColor.Success);
                 onSuccess(compName, isComponentCtx);
                 close();
              } else if (status === 'ID_EXISTS') {
                 if (confirm(`A record named "${compName}" already exists in the database. Overwrite?`)) {
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
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold' }}>Page Name:</label>
          <input 
            type="text" 
            value={compName} 
            onInput={(e: any) => compName = e.target.value}
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
               savedAt: new Date(row.updatedstamp).getTime()
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
