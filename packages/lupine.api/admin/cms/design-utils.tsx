import { FloatWindow, HEditor, RefProps, NotificationMessage, NotificationColor, MediaQueryRange, ActionSheetSelectPromise } from 'lupine.components';
import { DesignNode } from './design-store';
import { getAccessLevelOptions } from '../admin-props';
import { ComponentRegistry } from './component-registry';
import { buildCssVariables } from './css-variable-utils';

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

  getStandardCss: (p: any, mq: string = '') => {
    const css: any = {};
    if (p[`position${mq}`]) css.position = p[`position${mq}`];
    if (p[`top${mq}`]) css.top = p[`top${mq}`];
    if (p[`bottom${mq}`]) css.bottom = p[`bottom${mq}`];
    if (p[`left${mq}`]) css.left = p[`left${mq}`];
    if (p[`right${mq}`]) css.right = p[`right${mq}`];
    if (p[`zIndex${mq}`]) css.zIndex = p[`zIndex${mq}`];
    if (p[`alignSelf${mq}`]) css.alignSelf = p[`alignSelf${mq}`];
    if (p[`margin${mq}`]) css.margin = p[`margin${mq}`];
    if (p[`padding${mq}`]) css.padding = p[`padding${mq}`];
    if (p[`overflowX${mq}`]) css.overflowX = p[`overflowX${mq}`];
    if (p[`overflowY${mq}`]) css.overflowY = p[`overflowY${mq}`];
    return css;
  },

  getResponsiveCss: (p: any, mq: string, defaultDisplay?: string) => {
    return {
      ...DesignUtils.getHiddenCss(p, mq, defaultDisplay),
      ...DesignUtils.getStandardCss(p, mq),
      ...DesignUtils.parseInlineCss(p[`customCss${mq}`])
    };
  },

  compileResponsiveCssForNode: (node: DesignNode, defaultDisplay?: string) => {
    const defaultProps = ComponentRegistry[node.type]?.defaultProps || {};
    const p = node.props = { ...defaultProps, ...(node.props || {}) };
    const sysCss: any = {
      ...DesignUtils.getStandardCss(p, ''),
      ...DesignUtils.parseInlineCss(p.customCss),
    };
    
    const pruneInheritedCss = (css: any, inheritedCss: any) => {
      const optimizedCss: any = {};
      Object.keys(css).forEach((key) => {
        if (css[key] !== inheritedCss[key]) {
          optimizedCss[key] = css[key];
        }
      });
      return optimizedCss;
    };
    let inheritedResponsiveCss = { ...sysCss };
    
    const mqs = [
      { key: MediaQueryRange.DesktopBelow, suffix: 'DesktopBelow' },
      { key: MediaQueryRange.TabletBelow, suffix: 'TabletBelow' },
      { key: MediaQueryRange.MobileBelow, suffix: 'MobileBelow' },
      { key: MediaQueryRange.ExtraSmallBelow, suffix: 'ExtraSmallBelow' },
    ];

    const isFlex = node.type === 'block-flex';
    const isGrid = node.type === 'block-grid';
    const isPage = node.type === 'block-page';
    const isScrollableX = (overflowX: any) => overflowX === 'auto' || overflowX === 'scroll';
    const isScrollableY = (overflowY: any) => overflowY === 'auto' || overflowY === 'scroll';
    const hasScrollablePlaceholderChildX = (mq: string = '') => node.children?.some((child) => {
      if (child.type !== 'block-placeholder') return false;
      const childProps = child.props || {};
      return isScrollableX(childProps[`overflowX${mq}`] || childProps.overflowX || childProps._sys_css?.overflowX);
    }) === true;
    const hasScrollablePlaceholderChildY = (mq: string = '') => node.children?.some((child) => {
      if (child.type !== 'block-placeholder') return false;
      const childProps = child.props || {};
      return isScrollableY(childProps[`overflowY${mq}`] || childProps.overflowY || childProps._sys_css?.overflowY);
    }) === true;
    const normalizeGridTemplate = (template: any, shouldConstrainRows: boolean) => (
      shouldConstrainRows && typeof template === 'string'
        ? template.replace(/\b(\d*\.?\d+)fr\b/g, 'minmax(0, $1fr)')
        : template
    );

    if (isFlex) {
      sysCss.flexDirection = p.flexDirection || 'column';
      sysCss.alignItems = p.alignItems || 'stretch';
      sysCss.justifyContent = p.justifyContent || 'flex-start';
      sysCss.gap = p.gap || '0';
    } else if (isGrid || isPage) {
      const isNestedPage = isPage && p.isRoot !== true;
      // const rootOverflowY = p.overflowY || sysCss.overflowY;
      // const shouldConstrainRootY = rootOverflowY === 'auto' || rootOverflowY === 'scroll' || rootOverflowY === 'hidden';
      // const hasScrollableDirectChild = isPage && p.isRoot === true && node.children?.some((child) => {
      //   const childOverflowY = child.props?.overflowY || child.props?._sys_css?.overflowY;
      //   return childOverflowY === 'auto' || childOverflowY === 'scroll';
      // }) === true;
      // const normalizeRootRows = (rows: any) => typeof rows === 'string' ? rows.replace(/(^|\s)1fr(?=\s|$)/g, '$1auto') : rows;
      const isVertical = isGrid ? (p.layoutDirection === 'vertical') : (p.layoutDirection === 'vertical' || !p.layoutDirection);
      const defaultLayout = isGrid ? '1fr 1fr' : '100px 1fr 50px';
      const shouldConstrainRows = !isScrollableY(sysCss.overflowY || p.overflowY) && hasScrollablePlaceholderChildY();
      const shouldConstrainColumns = !isScrollableX(sysCss.overflowX || p.overflowX) && hasScrollablePlaceholderChildX();
      
      sysCss.gridTemplateRows = normalizeGridTemplate(isVertical ? (p.gridTemplate || defaultLayout) : '1fr', shouldConstrainRows);
      sysCss.gridTemplateColumns = normalizeGridTemplate(!isVertical ? (p.gridTemplate || defaultLayout) : '1fr', shouldConstrainColumns);
      if (isNestedPage) {
        sysCss.gridTemplateRows = 'auto';
        sysCss.height = 'auto';
        sysCss.gridAutoRows = 'max-content';
        sysCss.alignContent = 'start';
        sysCss.alignSelf = 'flex-start';
        sysCss.overflowY = 'visible';
      }
    }

    mqs.forEach(mq => {
       const mqCss: any = {
         ...DesignUtils.getResponsiveCss(p, mq.suffix, defaultDisplay),
         ...buildCssVariables(p[`cssVars${mq.suffix}`]),
       };

       if (isFlex) {
         const getFlexCascade = (propName: string, defaultVal: string) => {
            if (mq.suffix === 'DesktopBelow') return p[`${propName}DesktopBelow`] || p[propName] || defaultVal;
            if (mq.suffix === 'TabletBelow') return p[`${propName}TabletBelow`] || p[`${propName}DesktopBelow`] || p[propName] || defaultVal;
            if (mq.suffix === 'MobileBelow') return p[`${propName}MobileBelow`] || p[`${propName}TabletBelow`] || p[`${propName}DesktopBelow`] || p[propName] || defaultVal;
            if (mq.suffix === 'ExtraSmallBelow') return p[`${propName}ExtraSmallBelow`] || p[`${propName}MobileBelow`] || p[`${propName}TabletBelow`] || p[`${propName}DesktopBelow`] || p[propName] || defaultVal;
         };
         mqCss.flexDirection = getFlexCascade('flexDirection', 'column');
         mqCss.alignItems = getFlexCascade('alignItems', 'stretch');
         mqCss.justifyContent = getFlexCascade('justifyContent', 'flex-start');
         mqCss.gap = getFlexCascade('gap', '0');
       } else if (isGrid || isPage) {
          const isNestedPage = isPage && p.isRoot !== true;
          const defaultLayout = isGrid ? '1fr 1fr' : '100px 1fr 50px';
         
         const getGridCascade = (propName: string, defaultVal: string) => {
            if (mq.suffix === 'DesktopBelow') return p[`${propName}DesktopBelow`] || p[propName] || defaultVal;
            if (mq.suffix === 'TabletBelow') return p[`${propName}TabletBelow`] || p[`${propName}DesktopBelow`] || p[propName] || defaultVal;
            if (mq.suffix === 'MobileBelow') return p[`${propName}MobileBelow`] || p[`${propName}TabletBelow`] || p[`${propName}DesktopBelow`] || p[propName] || defaultVal;
            if (mq.suffix === 'ExtraSmallBelow') return p[`${propName}ExtraSmallBelow`] || p[`${propName}MobileBelow`] || p[`${propName}TabletBelow`] || p[`${propName}DesktopBelow`] || p[propName] || defaultVal;
         };
         
         const cascadeDirection = getGridCascade('layoutDirection', isGrid ? 'horizontal' : 'vertical');
         const cascadeLayout = getGridCascade('gridTemplate', defaultLayout);
         const cascadeOverflowX = getGridCascade('overflowX', '');
         const cascadeOverflowY = getGridCascade('overflowY', '');
         const mqIsVertical = isGrid ? (cascadeDirection === 'vertical') : (cascadeDirection === 'vertical' || !cascadeDirection);
         const shouldConstrainRows = !isScrollableY(mqCss.overflowY || cascadeOverflowY) && hasScrollablePlaceholderChildY(mq.suffix);
         const shouldConstrainColumns = !isScrollableX(mqCss.overflowX || cascadeOverflowX) && hasScrollablePlaceholderChildX(mq.suffix);
         
         mqCss.gridTemplateRows = normalizeGridTemplate(mqIsVertical ? cascadeLayout : '1fr', shouldConstrainRows);
         mqCss.gridTemplateColumns = normalizeGridTemplate(!mqIsVertical ? cascadeLayout : '1fr', shouldConstrainColumns);
         if (isNestedPage) {
           mqCss.gridTemplateRows = 'auto';
           mqCss.height = 'auto';
           mqCss.gridAutoRows = 'max-content';
           mqCss.alignContent = 'start';
           mqCss.alignSelf = 'flex-start';
           mqCss.overflowY = 'visible';
         }
       }

       const optimizedMqCss = pruneInheritedCss(mqCss, inheritedResponsiveCss);
       inheritedResponsiveCss = { ...inheritedResponsiveCss, ...mqCss };
       if (Object.keys(optimizedMqCss).length > 0) {
          sysCss[mq.key] = optimizedMqCss;
       }
    });

    if (Object.keys(sysCss).length > 0) {
      p._sys_css = sysCss;
      return sysCss;
    } else {
      delete p._sys_css;
      return undefined;
    }
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

  stripSavedComponentTrees: (node: DesignNode): DesignNode => {
    const componentRef = node.props?._componentRef;
    if (componentRef?.id) {
      return {
        id: node.id,
        type: 'block-component-ref',
        props: {
          _componentRef: {
            id: componentRef.id,
            name: componentRef.name || componentRef.id,
          },
        },
      };
    }

    return {
      ...node,
      props: { ...(node.props || {}) },
      children: node.children?.map((child) => DesignUtils.stripSavedComponentTrees(child)),
    };
  },

  saveComponent: async (pageid: string, name: string, packageId: string, accesslevel: string, remark: string, tree: DesignNode, isComponent: boolean = true, overwrite: boolean = false, originalUpdatetime?: number): Promise<{status: 'ok' | 'ID_EXISTS' | 'MODIFIED_BY_OTHER' | 'error', newUpdatetime?: number}> => {
    try {
      const payload = {
        pageid: pageid.trim(),
        name: name.trim() || 'Untitled',
        package: packageId.trim() || 'default',
        accesslevel: accesslevel || '0',
        remark: remark,
        is_component: isComponent ? 1 : 0,
        json: DesignUtils.stripSavedComponentTrees(tree),
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

  showSaveDialog: (initialId: string, initialName: string, initialPackage: string, initialAccesslevel: string, initialRemark: string, initialIsComponent: boolean, initialUpdatetime: number, astClone: any, onSuccess: (newId: string, newName: string, newPackage: string, newAccesslevel: string, newRemark: string, isComponent: boolean, newStamp: number) => void) => {
    let compId = initialId;
    let compName = initialName;
    let compPackage = initialPackage || 'default';
    let compAccesslevel = initialAccesslevel || '0';
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
          if (!/^[a-z0-9_\-#]+$/.test(compId)) {
            NotificationMessage.sendMessage('Page ID can only contain lowercase letters, numbers, and underscores.', NotificationColor.Warning);
            return;
          }

          const executeSave = async (overwrite: boolean) => {
              const isSameId = (compId.trim() === initialId.trim() && initialUpdatetime !== 0);
              const passUpdatetime = isSameId ? initialUpdatetime : undefined;

              const result = await DesignUtils.saveComponent(compId, compName, compPackage, compAccesslevel, compRemark, astClone, isComponentCtx, overwrite, passUpdatetime);
              if (result.status === 'ok') {
                 NotificationMessage.sendMessage(`${isComponentCtx ? 'Component' : 'Page'} saved!`, NotificationColor.Success);
                 onSuccess(compId, compName, compPackage, compAccesslevel, compRemark, isComponentCtx, result.newUpdatetime || 0);
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
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold' }}>Access Level:</label>
          <select
            value={compAccesslevel}
            onChange={(e: any) => compAccesslevel = e.target.value}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '16px' }}
          >
            {getAccessLevelOptions(compAccesslevel).map((al) => (
              <option value={al.value} selected={al.selected}>{al.label}</option>
            ))}
          </select>
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

  getSavedComponents: async (): Promise<{ name: string; savedAt: number; pageid: string }[]> => {
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
         return data.results.map((row: any) => ({
            pageid: row.pageid,
            name: row.name,
            savedAt: row.updatetime || 0
         }));
      }
      return [];
    } catch (e) {
      console.error('Failed to fetch pinned components', e);
      return [];
    }
  },
};
