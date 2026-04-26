import {
  CssProps,
  HtmlVar,
  RefProps,
  PopupMenu,
  NotificationMessage,
  NotificationColor,
  PopupMenuWithButton,
  ActionSheetColorPicker,
  ToggleButton,
} from 'lupine.components';
import { DesignStore } from './design-store';
import { LayerTreePanel } from './layer-tree-panel';
import { DesignUtils } from './design-utils';
import { ComponentRegistry } from './component-registry';
import { AdminSelectPage } from '../admin-page-list';
import { AdminSelectMenu } from '../admin-menu-list';

// HtmlVars remain inside because they might belong strictly to the render cycle.
// State must be within AdminDesignControl to allow multiple instances (tabs) to isolate data.

export const AdminDesignControl = (props: { pageId?: string }) => {
  const store = new DesignStore();
  let activeSidebarTab: 'components' | 'layers' = 'components';
  let currentContextId = '';
  let currentContextName = 'New Page';
  let currentContextPackage = 'default';
  let currentContextRemark = '';
  let currentContextIsComponent = false;
  let currentUpdatetime = 0;
  let savedComponents: any[] = [];

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

  const savedComponentsListDom = new HtmlVar(
    (
      <div class='p-m' style={{ color: '#aaa', fontSize: '12px', textAlign: 'center' }}>
        Loading...
      </div>
    )
  );

  const removePinnedComponent = async (pageid: string, e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const savedStr = localStorage.getItem('lupine_design_pinned_components');
      let ids: string[] = savedStr ? JSON.parse(savedStr) : [];
      ids = ids.filter((id) => id !== pageid);
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
        },
      });
    } catch (err) {}
  };

  const renderSavedComponents = () => {
    savedComponentsListDom.value = (
      <>
        {savedComponents.map((saved: any) => (
          <div
            key={saved.name}
            class='tool-item'
            style={{ borderLeft: '3px solid var(--primary-color)', position: 'relative', paddingRight: '24px' }}
            draggable={true}
            onDragStart={(e: any) => {
              e.dataTransfer.setData(
                'text/plain',
                JSON.stringify({
                  action: 'add-saved-component',
                  tree: saved.tree,
                })
              );
            }}
          >
            <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {saved.name}
            </span>
            <span
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#999',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
              onClick={(e) => removePinnedComponent(saved.pageid, e)}
              title='Remove from sidebar'
            >
              ✕
            </span>
          </div>
        ))}
        {savedComponents.length === 0 && (
          <div style={{ padding: '16px', textAlign: 'center', fontSize: '12px', color: '#aaa' }}>
            No components pinned manually.
          </div>
        )}
        <button class='button-base button-d mt-m' style={{ width: '100%' }} onClick={loadMoreComponents}>
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
  const headerDom = new HtmlVar('');

  const renderHeader = () => {
    headerDom.value = (
      <div
        class='admin-sub-title'
        style={{ margin: '0', flex: '1', display: 'flex', alignItems: 'center', gap: '16px' }}
      >
        <div>
          <span style={{ fontSize: '12px', color: '#666' }}>ID: </span>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{currentContextId || '(New Page)'}</span>
        </div>
        <div>
          <span style={{ fontSize: '12px', color: '#666' }}>Name: </span>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{currentContextName || '(none)'}</span>
        </div>
        <div>
          <span style={{ fontSize: '12px', color: '#666' }}>Package: </span>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{currentContextPackage || '(none)'}</span>
        </div>
      </div>
    );
  };

  const renderSidebarState = () => {
    sidebarTabsDom.value = (
      <div class='sidebar-tabs'>
        <div
          class={`tab-btn ${activeSidebarTab === 'components' ? 'active' : ''}`}
          onClick={() => {
            activeSidebarTab = 'components';
            renderSidebarState();
          }}
        >
          Components
        </div>
        <div
          class={`tab-btn ${activeSidebarTab === 'layers' ? 'active' : ''}`}
          onClick={() => {
            activeSidebarTab = 'layers';
            renderSidebarState();
          }}
        >
          Layer Tree
        </div>
      </div>
    );

    sidebarContentDom.value = (
      <>
        {activeSidebarTab === 'components' && (
          <div class='toolbox'>
            <div
              class='sidebar-section-title'
              style={{
                padding: '8px 12px',
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#999',
                backgroundColor: '#f9f9f9',
                textTransform: 'uppercase',
              }}
            >
              Built-in Primitives
            </div>
            {Object.values(ComponentRegistry)
              .filter((comp) => comp.type !== 'block-page')
              .map((comp) => (
                <div class='tool-item' draggable={true} onDragStart={(e: any) => handleDragStart(e, comp.type)}>
                  {comp.label}
                </div>
              ))}

            <div
              class='sidebar-section-title'
              style={{
                padding: '8px 12px',
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#999',
                backgroundColor: '#f9f9f9',
                textTransform: 'uppercase',
              }}
            >
              My Components
            </div>
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
      <div
        class='row-box'
        style={{ gap: '4px', marginRight: '16px', borderRight: '1px solid #ddd', paddingRight: '16px' }}
      >
        <button
          style={{
            background: 'transparent',
            border: '1px solid #ccc',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: canUndo ? 'pointer' : 'not-allowed',
            opacity: canUndo ? 1 : 0.4,
          }}
          onClick={() => canUndo && store.undo()}
          title='Undo (Ctrl+Z)'
        >
          ↶
        </button>
        <button
          style={{
            background: 'transparent',
            border: '1px solid #ccc',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: canRedo ? 'pointer' : 'not-allowed',
            opacity: canRedo ? 1 : 0.4,
          }}
          onClick={() => canRedo && store.redo()}
          title='Redo (Ctrl+Shift+Z)'
        >
          ↷
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
          <div
            class='prop-row'
            style={{
              paddingBottom: '16px',
              borderBottom: '1px solid var(--primary-border, #eee)',
              marginBottom: '16px',
            }}
          >
            <label style={{ color: 'var(--primary-color, #1890ff)', fontWeight: 'bold' }}>Component Type</label>
            <div class='prop-control'>
              <select
                class='prop-input'
                value={node.type}
                onChange={(e: any) => store.morphNodeType(node.id, e.target.value)}
              >
                <option value='block-flex' selected={node.type === 'block-flex'}>
                  Flex Container
                </option>
                <option value='block-grid' selected={node.type === 'block-grid'}>
                  Grid Layout
                </option>
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

          const activeMediaRanges = MediaRanges.filter((m) =>
            compDef.propEditors.some(
              (editor: any) => editor.responsive && typeof node.props[editor.key + m.value] !== 'undefined'
            )
          );
          const inactiveMediaRanges = MediaRanges.filter((m) => !activeMediaRanges.includes(m));

          const renderEditorMap = (mediaValue: string) => {
            return compDef.propEditors.map((editor: any) => {
              if (mediaValue !== '' && !editor.responsive) return null;
              if (editor.showIf && !editor.showIf(node.props)) return null;

              const actualKey = editor.key + mediaValue;
              const val = node.props[actualKey] ?? (mediaValue === '' ? compDef.defaultProps?.[actualKey] ?? '' : '');

              let inputEl;
              if (editor.type === 'select' && editor.options) {
                inputEl = (
                  <select
                    class='prop-input'
                    value={val}
                    onChange={(e: any) => handlePropChange(actualKey, e.target.value, true)}
                  >
                    {editor.options.map((o: any) => (
                      <option value={o.value} selected={val === o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                );
              } else if (editor.type === 'checkbox') {
                inputEl = (
                  <input
                    type='checkbox'
                    checked={val === true || val === 'true'}
                    onChange={(e: any) => handlePropChange(actualKey, e.target.checked, true)}
                  />
                );
              } else if (editor.type === 'textarea') {
                let isDirty = false;
                inputEl = (
                  <textarea
                    class='prop-input'
                    rows={4}
                    value={val}
                    onInput={(e: any) => {
                      isDirty = true;
                      handlePropChange(actualKey, e.target.value, false, true);
                    }}
                    onBlur={() => {
                      if (isDirty) {
                        isDirty = false;
                        setTimeout(() => {
                          store.commitHistory();
                          store.emit('TREE_UPDATE');
                        }, 150);
                      }
                    }}
                  />
                );
              } else if (editor.type === 'html' || editor.type === 'css') {
                const openEditor = () => {
                  const latestVal =
                    node.props[actualKey] ?? (mediaValue === '' ? compDef.defaultProps?.[actualKey] ?? '' : '');
                  const handleSave = (updatedSource: string) => {
                    handlePropChange(actualKey, updatedSource, true);
                  };

                  if (editor.type === 'html') {
                    DesignUtils.openHtmlEditor(latestVal, handleSave);
                  } else {
                    DesignUtils.openCssEditor(latestVal, handleSave);
                  }
                };

                let isDirty = false;
                inputEl = (
                  <div style={{ display: 'flex', gap: '4px', width: '100%' }}>
                    <input
                      type='text'
                      class='prop-input'
                      value={val}
                      onInput={(e: any) => {
                        isDirty = true;
                        handlePropChange(actualKey, e.target.value, false, true);
                      }}
                      onBlur={() => {
                        if (isDirty) {
                          isDirty = false;
                          setTimeout(() => {
                            store.commitHistory();
                            store.emit('TREE_UPDATE');
                          }, 150);
                        }
                      }}
                      onKeyDown={(e: any) => e.key === 'Enter' && e.target.blur()}
                      style={{ flex: 1, minWidth: 0 }}
                    />
                    <button
                      class='button-base'
                      onClick={openEditor}
                      style={{ padding: '0 8px', fontSize: '14px', lineHeight: '1' }}
                    >
                      ...
                    </button>
                  </div>
                );
              } else if (editor.type === 'color') {
                const openColorPicker = async () => {
                  const result = await ActionSheetColorPicker({
                    value: val,
                    title: `Select ${editor.label}`,
                  });
                  if (result !== undefined) {
                    handlePropChange(actualKey, result, true);
                    setTimeout(() => {
                      store.commitHistory();
                      store.emit('TREE_UPDATE');
                    }, 150);
                  }
                };

                let isDirty = false;
                inputEl = (
                  <div style={{ display: 'flex', gap: '4px', width: '100%', alignItems: 'center' }}>
                    <input
                      type='text'
                      class='prop-input'
                      value={val}
                      onInput={(e: any) => {
                        isDirty = true;
                        handlePropChange(actualKey, e.target.value, false, true);
                      }}
                      onBlur={() => {
                        if (isDirty) {
                          isDirty = false;
                          setTimeout(() => {
                            store.commitHistory();
                            store.emit('TREE_UPDATE');
                          }, 150);
                        }
                      }}
                      onKeyDown={(e: any) => e.key === 'Enter' && e.target.blur()}
                      style={{ flex: 1, minWidth: 0 }}
                    />
                    <div
                      style={{
                        width: '28px',
                        height: '24px',
                        backgroundColor: val || 'transparent',
                        borderRadius: '4px',
                        border: '1px solid #dae1e7',
                        cursor: 'pointer',
                        flexShrink: 0,
                        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
                      }}
                      onClick={openColorPicker}
                      title='Pick Color'
                    />
                  </div>
                );
              } else if (editor.type === 'menu-select') {
                let isDirty = false;
                const openMenuSelect = async () => {
                  await AdminSelectMenu({
                    isMultiple: false,
                    handleSelectedIds: (ids: string[]) => {
                      if (ids.length > 0) {
                        handlePropChange(actualKey, ids[0], true);
                        setTimeout(() => {
                          store.commitHistory();
                          store.emit('TREE_UPDATE');
                        }, 150);
                      }
                    },
                  });
                };

                inputEl = (
                  <div style={{ display: 'flex', gap: '4px', width: '100%', alignItems: 'center' }}>
                    <input
                      type='text'
                      class='prop-input'
                      value={val}
                      onInput={(e: any) => {
                        isDirty = true;
                        handlePropChange(actualKey, e.target.value, false, true);
                      }}
                      onBlur={() => {
                        if (isDirty) {
                          isDirty = false;
                          setTimeout(() => {
                            store.commitHistory();
                            store.emit('TREE_UPDATE');
                          }, 150);
                        }
                      }}
                      onKeyDown={(e: any) => e.key === 'Enter' && e.target.blur()}
                      style={{ flex: 1, minWidth: 0 }}
                    />
                    <button
                      class='button-base'
                      onClick={openMenuSelect}
                      style={{ padding: '0 8px', fontSize: '14px', lineHeight: '1', height: '28px' }}
                    >
                      ...
                    </button>
                  </div>
                );
              } else {
                let isDirty = false;
                inputEl = (
                  <input
                    type='text'
                    class='prop-input'
                    value={val}
                    onInput={(e: any) => {
                      isDirty = true;
                      handlePropChange(actualKey, e.target.value, false, true);
                    }}
                    onBlur={() => {
                      if (isDirty) {
                        isDirty = false;
                        setTimeout(() => {
                          store.commitHistory();
                          store.emit('TREE_UPDATE');
                        }, 150);
                      }
                    }}
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
              {activeMediaRanges.map((m) => (
                <div
                  class='media-group'
                  style={{
                    marginTop: '16px',
                    borderTop: '2px solid var(--primary-border)',
                    paddingTop: '12px',
                    paddingBottom: '4px',
                  }}
                >
                  <div class='row-box' style={{ justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div class='font-bold' style={{ fontSize: '12px', color: 'var(--primary-accent-color, #1890ff)' }}>
                      {m.label} Override
                    </div>
                    <button
                      class='color-red cursor-pointer'
                      style='border:none;background:none;font-size:12px;padding:0;'
                      onClick={() => {
                        const newProps = { ...node.props };
                        compDef.propEditors.forEach((editor: any) => {
                          if (editor.responsive) delete newProps[editor.key + m.value];
                        });
                        node.props = newProps;
                        store.emit('TREE_UPDATE');
                        renderPropertyPanel();
                      }}
                    >
                      ✕ Remove
                    </button>
                  </div>
                  {renderEditorMap(m.value)}
                </div>
              ))}

              {/* Add Override Dropdown */}
              <div
                style={{
                  marginTop: '20px',
                  textAlign: 'center',
                  backgroundColor: 'var(--secondary-bg-color)',
                  padding: '8px',
                  borderRadius: '4px',
                }}
              >
                <PopupMenu
                  defaultValue='+ Add Media Override'
                  noTriangleIcon={true}
                  noUpdateLabel={true}
                  list={MediaRanges.map((m) => m.label)}
                  handleSelected={(label: string) => {
                    const m = MediaRanges.find((x) => x.label === label);
                    if (m) {
                      if (activeMediaRanges.includes(m)) {
                        NotificationMessage.sendMessage(
                          'Same responsive configuration (Query) already exists!',
                          NotificationColor.Error
                        );
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
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    '.admin-design-body': {
      display: 'flex',
      flex: '1',
      overflow: 'hidden',
    },
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
      },
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
      renderHeader();
      fetchSavedComponents();

      currentContextName = 'New Page';
      currentContextIsComponent = false;
      currentUpdatetime = 0;

      if (props.pageId) {
        fetch(`/api/admin/page/get/${props.pageId}`)
          .then((r) => r.json())
          .then((data) => {
            if (data.status === 'ok' && data.result) {
              // Set the name and component type unconditionally if the page exists in db
              currentContextId = data.result.pageid || '';
              currentContextName = data.result.name || '';
              currentContextPackage = data.result.package || 'default';
              currentContextRemark = data.result.remark || '';
              currentContextIsComponent = data.result.is_component === 1;
              currentUpdatetime = data.result.updatetime || 0;
              renderHeader();

              // Then try loading the nodes tree
              if (data.result.json) {
                try {
                  const tree = typeof data.result.json === 'string' ? JSON.parse(data.result.json) : data.result.json;
                  store.tree = tree;
                  store.emit('TREE_UPDATE');
                } catch (e) {
                  console.error('Failed to parse page json', e);
                }
              }
            }
          })
          .catch((e) => console.error('Failed to fetch page', e));
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
      <div
        class='admin-design-header'
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          borderBottom: '1px solid var(--primary-border)',
        }}
      >
        {headerDom.node}
        <div class='row-box' style={{ gap: '12px' }}>
          {historyNavDom.node}
          <button
            class='button-base'
            onClick={() => {
              DesignUtils.showSaveDialog(
                currentContextId,
                currentContextName,
                currentContextPackage,
                currentContextRemark,
                currentContextIsComponent,
                currentUpdatetime,
                JSON.parse(JSON.stringify(store.tree)),
                (
                  newId: string,
                  newName: string,
                  newPackage: string,
                  newRemark: string,
                  isComponent: boolean,
                  newStamp: number
                ) => {
                  currentContextId = newId;
                  currentContextName = newName;
                  currentContextPackage = newPackage;
                  currentContextRemark = newRemark;
                  currentContextIsComponent = isComponent;
                  currentUpdatetime = newStamp;
                  renderHeader();
                  if (isComponent) {
                    activeSidebarTab = 'components';
                    renderSidebarState();
                    store.emit('COMPONENT_SAVED');
                  }
                }
              );
            }}
          >
            Save...
          </button>
          <ToggleButton
            text='Preview'
            checked={store.isPreviewMode}
            onClick={() => {
              store.isPreviewMode = !store.isPreviewMode;
              store.emit('PREVIEW_TOGGLED');
            }}
          />
          <PopupMenuWithButton
            label='View'
            list={['Desktop', 'Tablet', 'Mobile']}
            noUpdateLabel={true}
            handleSelected={(device: string) => {
              const wrapper = ref.$('.iframe-wrapper') as HTMLElement;
              if (!wrapper) return;
              if (device === 'Desktop') wrapper.style.maxWidth = '100%';
              if (device === 'Tablet') wrapper.style.maxWidth = '768px';
              if (device === 'Mobile') wrapper.style.maxWidth = '375px';
            }}
          />
          <PopupMenuWithButton
            label='Page Options'
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
      <div class='admin-design-body'>
        <div class='sidebar'>
          {sidebarTabsDom.node}
          {sidebarContentDom.node}

          <div class='properties'>
            <div class='toolbox-title'>Properties</div>
            {propertyPanelDom.node}
          </div>
        </div>
        <div class='canvas'>
          <div class='canvas-body'>
            <div class='iframe-wrapper'>
              <iframe class='w-100p h-100p' style='border:none'></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
