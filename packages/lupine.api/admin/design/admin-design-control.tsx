import { CssProps, HtmlVar, RefProps, PopupMenu, NotificationMessage, NotificationColor, FloatWindow, PopupMenuWithButton, HEditor } from 'lupine.components';
import { DesignStore } from './design-store';
import { LayerTreePanel } from './layer-tree-panel';
import { DesignUtils } from './design-utils';
import { ComponentRegistry } from './component-registry';
import { AdminSelectPage } from '../admin-page-list';

let _storeInstance: DesignStore | null = null;
let activeSidebarTab: 'components' | 'layers' = 'components';
let currentContextName = 'New Page';
let currentContextIsComponent = false;
let savedComponents: any[] = [];
// HtmlVars remain inside because they might belong strictly to the render cycle, but wait..
// Using HtmlVar inside the render cycle means it generates new ones?
// Actually if they are recreated, their `.node` is new. If it's pure SPA, we'll keep them inside first.

export const AdminDesignControl = (props: { pageId?: string }) => {
  if (!_storeInstance) _storeInstance = new DesignStore();
  const store = _storeInstance;

  const handleDragStart = (e: any, type: string) => {
    const comp = ComponentRegistry[type];
    const payload = JSON.stringify({
      action: 'add-component',
      type: comp.type,
      defaultProps: comp.defaultProps,
      isContainer: comp.isContainer,
    });
    e.dataTransfer.setData('text/plain', payload);
  };
  
  const savedComponentsListDom = new HtmlVar(<div class="p-m" style={{ color: '#aaa', fontSize: '12px', textAlign: 'center' }}>Loading...</div>);

  const removePinnedComponent = async (pageid: string, e: Event) => {
      e.stopPropagation();
      e.preventDefault();
      try {
          const savedStr = localStorage.getItem('lupine_design_pinned_components');
          let ids: string[] = savedStr ? JSON.parse(savedStr) : [];
          ids = ids.filter(id => id !== pageid);
          localStorage.setItem('lupine_design_pinned_components', JSON.stringify(ids));
          await fetchSavedComponents();
      } catch (err) {}
  };

  const loadMoreComponents = async () => {
      try {
          const savedStr = localStorage.getItem('lupine_design_pinned_components');
          let ids: string[] = savedStr ? JSON.parse(savedStr) : [];
          
          await AdminSelectPage({
             isMultiple: true,
             selectedIds: [...ids], // pre-populate currently pinned ones
             isComponentOnly: true,
             handleSelectedIds: async (newIds) => {
                 localStorage.setItem('lupine_design_pinned_components', JSON.stringify(newIds));
                 await fetchSavedComponents();
             }
          });
      } catch (err) {}
  };

  const renderSavedComponents = () => {
     savedComponentsListDom.value = (
        <>
            {savedComponents.map((saved: any) => (
              <div key={saved.name} class='tool-item' style={{ borderLeft: '3px solid var(--primary-color)', position: 'relative', paddingRight: '24px' }} draggable={true} onDragStart={(e: any) => {
                 e.dataTransfer.setData('text/plain', JSON.stringify({
                    action: 'add-saved-component',
                    tree: saved.tree
                 }));
              }}>
                <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{saved.name}</span>
                <span 
                   style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#999', fontSize: '14px', fontWeight: 'bold' }}
                   onClick={(e) => removePinnedComponent(saved.pageid, e)}
                   title="Remove from sidebar">✕</span>
              </div>
            ))}
            {savedComponents.length === 0 && (
                <div style={{ padding: '16px', textAlign: 'center', fontSize: '12px', color: '#aaa' }}>No components pinned manually.</div>
            )}
            <button class="button-base button-d mt-m" style={{ width: '100%' }} onClick={loadMoreComponents}>
               Load More
            </button>
        </>
     );
  };

  const fetchSavedComponents = async () => {
     savedComponents = await DesignUtils.getSavedComponents();
     renderSavedComponents();
  };
  
  const historyNavDom = new HtmlVar(<></>);
  const propertyPanelDom = new HtmlVar(<></>);
  const sidebarTabsDom = new HtmlVar(<></>);
  const sidebarContentDom = new HtmlVar(<></>);

  const renderSidebarState = () => {
    sidebarTabsDom.value = (
      <div class="sidebar-tabs">
        <div 
           class={`tab-btn ${activeSidebarTab === 'components' ? 'active' : ''}`} 
           onClick={() => { activeSidebarTab = 'components'; renderSidebarState(); }}
        >Components</div>
        <div 
           class={`tab-btn ${activeSidebarTab === 'layers' ? 'active' : ''}`} 
           onClick={() => { activeSidebarTab = 'layers'; renderSidebarState(); }}
        >Layer Tree</div>
      </div>
    );

    sidebarContentDom.value = (
      <>
        {activeSidebarTab === 'components' && (
          <div class='toolbox'>
            <div class="sidebar-section-title" style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 'bold', color: '#999', backgroundColor: '#f9f9f9', textTransform: 'uppercase' }}>Built-in Primitives</div>
            {Object.values(ComponentRegistry)
              .filter(comp => comp.type !== 'block-page')
              .map((comp) => (
              <div class='tool-item' draggable={true} onDragStart={(e: any) => handleDragStart(e, comp.type)}>
                {comp.label}
              </div>
            ))}
            
            <div class="sidebar-section-title" style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 'bold', color: '#999', backgroundColor: '#f9f9f9', textTransform: 'uppercase' }}>My Components</div>
            {savedComponentsListDom.node}
          </div>
        )}
        
        {activeSidebarTab === 'layers' && (
          <div class='toolbox' style={{ padding: '0' }}>
             <LayerTreePanel store={store} />
          </div>
        )}
      </>
    );
  };

  const renderHistoryNav = () => {
    const canUndo = store.historyIndex > 0;
    const canRedo = store.historyIndex < store.history.length - 1;
    
    historyNavDom.value = (
      <div class="row-box" style={{ gap: '4px', marginRight: '16px', borderRight: '1px solid #ddd', paddingRight: '16px' }}>
         <button 
           style={{ 
              background: 'transparent', 
              border: '1px solid #ccc',
              padding: '4px 8px',
              borderRadius: '4px',
              cursor: canUndo ? 'pointer' : 'not-allowed',
              opacity: canUndo ? 1 : 0.4
           }}
           onClick={() => canUndo && store.undo()}
           title="Undo (Ctrl+Z)"
         >
           ↶ Undo
         </button>
         <button 
           style={{ 
              background: 'transparent', 
              border: '1px solid #ccc',
              padding: '4px 8px',
              borderRadius: '4px',
              cursor: canRedo ? 'pointer' : 'not-allowed',
              opacity: canRedo ? 1 : 0.4
           }}
           onClick={() => canRedo && store.redo()}
           title="Redo (Ctrl+Shift+Z)"
         >
           ↷ Redo
         </button>
      </div>
    );
  };

  const renderPropertyPanel = () => {
    if (!store.selectedNodeId) {
      propertyPanelDom.value = <div class='p-m text-center color-gray'>Select a component to edit properties</div>;
      return;
    }

    const node = store.findNode(store.tree, store.selectedNodeId);
    if (!node) {
      propertyPanelDom.value = <div class='p-m text-center'>Node not found</div>;
      return;
    }

    const compDef = ComponentRegistry[node.type];
    if (!compDef) {
      propertyPanelDom.value = <div class='p-m'>Unknown component type</div>;
      return;
    }

    const handlePropChange = (key: string, val: any, requiresRender: boolean = false, silentAst: boolean = false) => {
      store.updateNodeProps(node.id, { [key]: val }, silentAst);
      if (requiresRender) {
        renderPropertyPanel();
      }
    };

    propertyPanelDom.value = (
      <div class='property-form'>
        <div class='property-header'>
          <strong>{compDef.label}</strong>
          <div class='property-id'>#{node.id}</div>
        </div>
        {(node.type === 'block-grid' || node.type === 'block-flex') && node.id !== 'root-page' && (
          <div class='prop-row' style={{ paddingBottom: '16px', borderBottom: '1px solid var(--primary-border, #eee)', marginBottom: '16px' }}>
            <label style={{ color: 'var(--primary-color, #1890ff)', fontWeight: 'bold' }}>Component Type</label>
            <div class='prop-control'>
              <select 
                class='prop-input'
                value={node.type} 
                onChange={(e: any) => store.morphNodeType(node.id, e.target.value)}
              >
                <option value="block-flex" selected={node.type === 'block-flex'}>Flex Container</option>
                <option value="block-grid" selected={node.type === 'block-grid'}>Grid Layout</option>
              </select>
            </div>
          </div>
        )}
        {(() => {
          const MediaRanges = [
            { label: '< ExtraSmall (Max 479px)', value: 'ExtraSmallBelow' },
            { label: '< Mobile (Max 767px)', value: 'MobileBelow' },
            { label: '< Tablet (Max 1024px)', value: 'TabletBelow' },
            { label: '< Desktop (Max 1440px)', value: 'DesktopBelow' },
            { label: '> ExtraSmall', value: 'ExtraSmallAbove' },
            { label: '> Mobile', value: 'MobileAbove' },
            { label: '> Tablet', value: 'TabletAbove' },
            { label: '> Desktop', value: 'DesktopAbove' },
            { label: 'Hover State (:hover)', value: '_Hover' },
            { label: 'Active State (:active)', value: '_Active' },
          ];

          const activeMediaRanges = MediaRanges.filter(m => 
            compDef.propEditors.some((editor: any) => editor.responsive && typeof node.props[editor.key + m.value] !== 'undefined')
          );
          const inactiveMediaRanges = MediaRanges.filter(m => !activeMediaRanges.includes(m));

          const renderEditorMap = (mediaValue: string) => {
            return compDef.propEditors.map((editor: any) => {
              if (mediaValue !== '' && !editor.responsive) return null;
              if (editor.showIf && !editor.showIf(node.props)) return null;

              const actualKey = editor.key + mediaValue;
              const val = node.props[actualKey] ?? (mediaValue === '' ? (compDef.defaultProps?.[actualKey] ?? '') : '');

              let inputEl;
              if (editor.type === 'select' && editor.options) {
                inputEl = (
                  <select
                    class='prop-input'
                    value={val}
                    onChange={(e: any) => handlePropChange(actualKey, e.target.value, true)}
                  >
                    {editor.options.map((o: any) => (
                      <option value={o.value} selected={val === o.value}>{o.label}</option>
                    ))}
                  </select>
                );
              } else if (editor.type === 'checkbox') {
                inputEl = (
                  <input
                    type='checkbox'
                    checked={val}
                    onChange={(e: any) => handlePropChange(actualKey, e.target.checked, true)}
                  />
                );
              } else if (editor.type === 'textarea') {
                inputEl = (
                  <textarea
                    class='prop-input'
                    rows={4}
                    value={val}
                    onInput={(e: any) => handlePropChange(actualKey, e.target.value, false, true)}
                    onBlur={() => store.emit('TREE_UPDATE')}
                  />
                );
              } else if (editor.type === 'html' || editor.type === 'css') {
                const openEditor = () => {
                   const latestVal = node.props[actualKey] ?? (mediaValue === '' ? (compDef.defaultProps?.[actualKey] ?? '') : '');
                   const handleSave = (updatedSource: string) => {
                       handlePropChange(actualKey, updatedSource, true);
                   };
                   
                   if (editor.type === 'html') {
                       DesignUtils.openHtmlEditor(latestVal, handleSave);
                   } else {
                       DesignUtils.openCssEditor(latestVal, handleSave);
                   }
                };

                inputEl = (
                  <div style={{ display: 'flex', gap: '4px', width: '100%' }}>
                    <input
                      type='text'
                      class='prop-input'
                      value={val}
                      onInput={(e: any) => handlePropChange(actualKey, e.target.value, false, true)}
                      onBlur={() => store.emit('TREE_UPDATE')}
                      onKeyDown={(e: any) => e.key === 'Enter' && e.target.blur()}
                      style={{ flex: 1, minWidth: 0 }}
                    />
                    <button class='button-base' onClick={openEditor} style={{ padding: '0 8px', fontSize: '14px', lineHeight: '1' }}>...</button>
                  </div>
                );
              } else {
                inputEl = (
                  <input
                    type={editor.type === 'color' ? 'color' : 'text'}
                    class='prop-input'
                    value={val}
                    onInput={(e: any) => handlePropChange(actualKey, e.target.value, false, true)}
                    onBlur={() => store.emit('TREE_UPDATE')}
                    onKeyDown={(e: any) => e.key === 'Enter' && e.target.blur()}
                  />
                );
              }

              return (
                <div class='prop-row'>
                  <label>{editor.label}</label>
                  <div class='prop-control'>{inputEl}</div>
                </div>
              );
            });
          };

          return (
            <div>
              {/* Base Properties */}
              {renderEditorMap('')}

              {/* Active Overrides */}
              {activeMediaRanges.map(m => (
                <div class="media-group" style={{marginTop: '16px', borderTop: '2px solid var(--primary-border)', paddingTop: '12px', paddingBottom: '4px'}}>
                  <div class="row-box" style={{justifyContent: 'space-between', marginBottom: '12px'}}>
                    <div class="font-bold" style={{fontSize: '12px', color: 'var(--primary-accent-color, #1890ff)'}}>
                      {m.label} Override
                    </div>
                    <button 
                      class="color-red cursor-pointer" 
                      style="border:none;background:none;font-size:12px;padding:0;" 
                      onClick={() => {
                        const newProps = {...node.props};
                        compDef.propEditors.forEach((editor: any) => {
                          if (editor.responsive) delete newProps[editor.key + m.value];
                        });
                        node.props = newProps;
                        store.emit('TREE_UPDATE');
                        renderPropertyPanel();
                      }}
                    >✕ Remove</button>
                  </div>
                  {renderEditorMap(m.value)}
                </div>
              ))}

              {/* Add Override Dropdown */}
              <div style={{marginTop: '20px', textAlign: 'center', backgroundColor: 'var(--secondary-bg-color)', padding: '8px', borderRadius: '4px'}}>
                <PopupMenu 
                  defaultValue="+ Add Media Override" 
                  noTriangleIcon={true}
                  noUpdateLabel={true}
                  list={MediaRanges.map(m => m.label)} 
                  handleSelected={(label: string) => {
                      const m = MediaRanges.find(x => x.label === label);
                      if (m) {
                         if (activeMediaRanges.includes(m)) {
                           NotificationMessage.sendMessage('Same responsive configuration (Query) already exists!', NotificationColor.Error);
                           return;
                         }

                         // init first responsive prop to trigger display immediately
                         const firstResp = compDef.propEditors.find((e: any) => e.responsive);
                         if (firstResp) handlePropChange(firstResp.key + m.value, '');
                         renderPropertyPanel();
                      }
                  }}
                />
              </div>
            </div>
          );
        })()}

        {(() => {
           const path = store.getNodePath(node.id);
           let isChildOfGrid = false;
           if (path && path.length > 1) {
              const parent = path[path.length - 2];
              if (parent.type === 'block-grid' || parent.type === 'block-page') {
                 isChildOfGrid = true;
              }
           }
           
           if (node.id === 'root-page' || isChildOfGrid) return null;

           return (
             <button class='btn-delete mt-l' onClick={() => store.removeNode(node.id)}>
               Delete Component
             </button>
           );
        })()}
      </div>
    );
  };

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    '.sidebar': {
      width: '300px',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid var(--primary-border)',
      backgroundColor: 'var(--secondary-bg-color)',
    },
    '.sidebar-tabs': {
      display: 'flex',
      flexDirection: 'row',
      borderBottom: '1px solid var(--primary-border)',
    },
    '.tab-btn': {
      flex: 1,
      padding: '12px',
      textAlign: 'center',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '13px',
      backgroundColor: 'var(--secondary-bg-color)',
      color: 'var(--primary-color-dim, #666)',
      borderBottom: '2px solid transparent',
      '&.active': {
        color: 'var(--primary-color, #1890ff)',
        borderBottom: '2px solid var(--primary-color, #1890ff)',
      }
    },
    '.toolbox': {
      flex: '1',
      borderBottom: '1px solid var(--primary-border)',
      overflowY: 'auto',
      padding: '16px',
    },
    '.toolbox-title': {
      fontWeight: 'bold',
      marginBottom: '16px',
      fontSize: '14px',
      textTransform: 'uppercase',
      color: 'var(--primary-color)',
    },
    '.tool-item': {
      padding: '8px 12px',
      border: '1px solid var(--primary-border)',
      borderRadius: '4px',
      marginBottom: '8px',
      backgroundColor: 'var(--primary-bg-color)',
      cursor: 'grab',
      '&:active': {
        cursor: 'grabbing',
      },
    },
    '.properties': {
      flex: '1',
      overflowY: 'auto',
      padding: '16px',
    },
    '.canvas': {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#eeeeee',
    },
    '.canvas-header': {
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      backgroundColor: 'var(--secondary-bg-color)',
      borderBottom: '1px solid var(--primary-border)',
      justifyContent: 'space-between',
    },
    '.canvas-body': {
      flex: '1',
      padding: '16px',
      overflow: 'auto',
      display: 'flex',
      justifyContent: 'center',
    },
    '.iframe-wrapper': {
      width: '100%',
      // Can be dynamic via state later for media query testing
      maxWidth: '100%',
      height: '100%',
      backgroundColor: 'white',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      border: '1px solid var(--primary-border)',
      transition: 'width 0.3s ease',
    },
    '.property-form': {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    '.property-header': {
      marginBottom: '8px',
      paddingBottom: '8px',
      borderBottom: '1px solid var(--primary-border)',
      display: 'flex',
      justifyContent: 'space-between',
    },
    '.property-id': {
      fontSize: '11px',
      color: '#888',
    },
    '.prop-row': {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      fontSize: '13px',
    },
    '.prop-input': {
      width: '100%',
      padding: '6px',
      border: '1px solid var(--primary-border)',
      borderRadius: '4px',
    },
    '.btn-delete': {
      backgroundColor: 'var(--error-color, #ff4d4f)',
      color: 'white',
      border: 'none',
      padding: '8px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  const handleDeviceChange = (device: string) => {
    const wrapper = document.querySelector('.iframe-wrapper') as HTMLElement;
    if (!wrapper) return;
    if (device === 'Desktop') wrapper.style.maxWidth = '100%';
    if (device === 'Tablet') wrapper.style.maxWidth = '768px';
    if (device === 'Mobile') wrapper.style.maxWidth = '375px';
  };

  const ref: RefProps = {
    onLoad: async () => {
      const ifr = ref.$('.iframe-wrapper iframe') as HTMLIFrameElement;
      ifr.onload = () => {
        const cw = ifr.contentWindow as any;
        cw._lj_designStore = store;
        if (typeof cw._lj_designInit === 'function') {
          cw._lj_designInit(store);
        }
      };
      ifr.src = `/admin_dev/design`;
      store.on('NODE_SELECTED', renderPropertyPanel);
      store.on('HISTORY_CHANGED', renderHistoryNav);
      store.on('COMPONENT_SAVED', fetchSavedComponents);
      // Remove TREE_UPDATE to prevent focus loss during typing
      renderPropertyPanel();
      renderHistoryNav();
      renderSidebarState();
      fetchSavedComponents();
      
      if (props.pageId) {
         fetch(`/api/admin/page/get/${props.pageId}`)
           .then(r => r.json())
           .then(data => {
              if (data.status === 'ok' && data.result && data.result.json) {
                 try {
                    const tree = JSON.parse(data.result.json);
                    store.tree = tree;
                    currentContextName = data.result.name;
                    currentContextIsComponent = data.result.is_component === 1;
                    store.emit('TREE_UPDATE');
                 } catch(e) {
                    console.error("Failed to parse page json", e);
                 }
              }
           })
           .catch(e => console.error("Failed to fetch page", e));
      }
    },
    onUnload: async () => {
      store.off('NODE_SELECTED', renderPropertyPanel);
      store.off('HISTORY_CHANGED', renderHistoryNav);
      store.off('COMPONENT_SAVED', fetchSavedComponents);
    },
  };

  return (
    <div css={css} ref={ref}>
      <div class='sidebar'>
        {sidebarTabsDom.node}
        {sidebarContentDom.node}

        <div class='properties'>
          <div class='toolbox-title'>Properties</div>
          {propertyPanelDom.node}
        </div>
      </div>
      <div class='canvas'>
        <div class='canvas-header'>
          <div class='font-bold'>Design Canvas</div>
          <div class='row-box' style={{ gap: '12px' }}>
            {historyNavDom.node}
            <button
              style={{ backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
              onClick={() => {
                DesignUtils.showSaveDialog(
                  currentContextName,
                  currentContextIsComponent,
                  JSON.parse(JSON.stringify(store.tree)),
                  (newName: string, isComponent: boolean) => {
                     currentContextName = newName;
                     currentContextIsComponent = isComponent;
                     if (isComponent) {
                        activeSidebarTab = 'components';
                        renderSidebarState();
                        store.emit('COMPONENT_SAVED');
                     }
                  }
                );
              }}
            >
              Save View...
            </button>
            <button
              onClick={() => {
                store.isPreviewMode = !store.isPreviewMode;
                store.emit('PREVIEW_TOGGLED');
              }}
            >
              Toggle Preview
            </button>
            <PopupMenu
              list={['Desktop', 'Tablet', 'Mobile']}
              defaultValue={'Desktop'}
              handleSelected={handleDeviceChange}
            />
            <PopupMenuWithButton 
              label="Page Options" 
              list={['Page Properties', 'View JSON']} 
              noUpdateLabel={true}
              handleSelected={(label: string) => {
                if (label === 'Page Properties') {
                  store.selectNode('root-page');
                } else if (label === 'View JSON') {
                  DesignUtils.showJsonTree(store.tree);
                }
              }}
            />
          </div>
        </div>
        <div class='canvas-body'>
          <div class='iframe-wrapper'>
            <iframe class='w-100p h-100p' style='border:none'></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
