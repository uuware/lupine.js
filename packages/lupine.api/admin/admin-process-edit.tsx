import {
  CssProps,
  RefProps,
  HtmlVar,
  NotificationColor,
  NotificationMessage,
  getRenderPageProps,
  ActionSheetInputPromise,
  bindGlobalStyle,
  getGlobalStylesId,
  VNode,
  ActionSheetSelectPromise,
  FloatWindow,
} from 'lupine.components';
import { adminFrameHelper } from './admin-frame-helper';

// --- Interfaces based on CONVERSION-GUIDE.md ---
export interface ItemDef {
  name: string;
  type: string;
  flags: string;
  defaultValue: string;
  ext?: {
    physicalId?: string;
    tableId?: string;
    filter?: string;
  };
  children?: ItemDef[];
  _uid?: string; // unique UI identifier
}

export interface ClassFieldDef {
  setter: string;
  value: string | string[];
}

export interface ClassDef {
  name: string;
  group: string;
  runType?: string;
  comment?: string;
  fields: ClassFieldDef[];
  isList?: boolean;
  listName?: string;
  listClasses?: ClassDef[];
  _uid?: string;
}

// Global UI state for the editor
class ProcessEditorState {
  processId: string = '';
  name: string = '';
  packageId: string = 'default';
  remark: string = '';
  accesslevel: string = '0';
  updatetime: number = 0;

  items: ItemDef[] = [];
  classes: ClassDef[] = [];

  selectedItemUid: string | null = null;
  selectedClassUid: string | null = null;
  selectedClassFieldIdx: number = -1;
}

const cssTheme: CssProps = {
  '&.&-editor-container': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'var(--primary-bg-color)',
  },
  '.&-header': {
    display: 'flex',
    padding: '16px',
    borderBottom: 'var(--primary-border)',
    alignItems: 'center',
    gap: '16px',
  },
  '.&-body': {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  '.&-left-pane': {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    borderRight: 'var(--primary-border)',
  },
  '.&-pane-half': {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    borderBottom: 'var(--primary-border)',
  },
  '.&-right-pane': {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  '.&-col': {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    padding: '8px',
    height: '100%',
  },
  '.&-col-items': {
    width: '30%',
    backgroundColor: 'var(--secondary-bg-color)',
  },
  '.&-col-classes': {
    width: '30%',
    borderLeft: 'var(--primary-border)',
    backgroundColor: 'var(--secondary-bg-color)',
  },
  '.&-col-mid': {
    flex: 1,
    position: 'relative',
    minWidth: '50px',
  },
  '.&-toolbar-col': {
    display: 'flex',
    flexDirection: 'column',
    width: '32px',
    padding: '4px',
    gap: '4px',
    borderRight: 'var(--primary-border)',
    backgroundColor: 'var(--secondary-bg-color)',
    alignItems: 'center',
    border: 'solid 1px #797979',
  },
  '.&-toolbar-btn': {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '1px solid var(--primary-border)',
    borderRadius: '4px',
    backgroundColor: 'var(--primary-bg-color)',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  '.&-toolbar-btn:hover': {
    backgroundColor: 'var(--primary-border)',
  },
  '.&-toolbar-line': {
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translate(-50%, 0)',
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
  },
  '.&-toolbar-line:hover': {
    backgroundColor: 'var(--primary-border)',
  },
  // SVG Canvas
  '.&-svg-canvas': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  '.&-svg-path': {
    fill: 'none',
    stroke: 'red',
    strokeWidth: '1px',
    opacity: 0.8,
  },
  // Cards / Nodes
  '.&-node-card': {
    backgroundColor: 'var(--primary-bg-color)',
    border: '1px solid var(--primary-border)',
    borderRadius: '0',
    padding: '4px',
    marginBottom: '2px',
    cursor: 'pointer',
    position: 'relative',
    userSelect: 'none',
  },
  '.&-node-card.selected': {
    backgroundColor: '#0000ff',
    color: '#ffffff',
    borderColor: '#0000ff',
  },
  '.&-node-card.selected .&-node-sub': {
    color: '#ddddff',
  },
  '.&-node-title': {
    fontWeight: 'bold',
    fontSize: '13px',
  },
  '.&-node-sub': {
    fontSize: '11px',
    color: 'var(--secondary-color)',
  },
  // Connection Ports
  '.&-port-right': {
    position: 'absolute',
    right: '-4px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '8px',
    height: '8px',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  '.&-port-left': {
    position: 'absolute',
    left: '-4px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '8px',
    height: '8px',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  // Class Fields List
  '.&-field-item': {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    padding: '2px 0',
    borderTop: '1px solid var(--primary-border)',
    marginTop: '2px',
    position: 'relative',
    cursor: 'pointer',
  },
  '.&-field-item.selected': {
    backgroundColor: '#ffdddd',
    color: '#000',
  },
  // Forms
  '.&-form-row': {
    display: 'flex',
    marginBottom: '8px',
    alignItems: 'center',
  },
  '.&-form-label': {
    width: '100px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  '.&-form-input': {
    flex: 1,
    padding: '4px',
    border: '1px solid var(--primary-border)',
    fontSize: '12px',
  },
  '.&-form-check': {
    marginRight: '16px',
    fontSize: '12px',
  },
};

const fetchProcessData = async (id: string) => {
  const data = await getRenderPageProps().renderPageFunctions.fetchData(`/api/admin/process/get/${id}`);
  return data.json;
};

const saveProcessData = async (payload: any) => {
  const data = await getRenderPageProps().renderPageFunctions.fetchData(`/api/admin/process/save`, payload);
  return data.json;
};

export const AdminProcessEditPage = (processId: string) => {
  const gCssId = getGlobalStylesId(cssTheme);
  bindGlobalStyle(gCssId, cssTheme);

  const state = new ProcessEditorState();
  state.processId = processId;

  const headerDom = new HtmlVar('');
  const itemPropsDom = new HtmlVar('');
  const classPropsDom = new HtmlVar('');
  const itemsTreeDom = new HtmlVar('');
  const classesListDom = new HtmlVar('');
  const itemsToolbarDom = new HtmlVar('');
  const classesToolbarDom = new HtmlVar('');
  const svgDom = new HtmlVar('');

  const genUid = () => Math.random().toString(36).substring(2, 9);

  // Deep clone array to find/move items easier
  const findItemRef = (uid: string): { parent: ItemDef[] | null; idx: number; item: ItemDef } | null => {
    for (let i = 0; i < state.items.length; i++) {
      if (state.items[i]._uid === uid) return { parent: null, idx: i, item: state.items[i] };
      if (state.items[i].children) {
        for (let j = 0; j < state.items[i].children!.length; j++) {
          if (state.items[i].children![j]._uid === uid) {
            return { parent: state.items[i].children!, idx: j, item: state.items[i].children![j] };
          }
        }
      }
    }
    return null;
  };

  const renderHeader = () => {
    const css: CssProps = {
      margin: '0',
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      '.hdr-label': {
        fontSize: '12px',
        color: '#666',
      },
      '.hdr-value': {
        fontSize: '14px',
        fontWeight: 'bold',
      },
    };
    headerDom.value = (
      <div css={css} class='admin-sub-title'>
        <div>
          <span class='hdr-label'>ID: </span>
          <span class='hdr-value'>{state.processId || '(New Process)'}</span>
        </div>
        <div>
          <span class='hdr-label'>Name: </span>
          <span class='hdr-value'>{state.name || '(none)'}</span>
        </div>
        <div>
          <span class='hdr-label'>Package: </span>
          <span class='hdr-value'>{state.packageId || '(none)'}</span>
        </div>
      </div>
    );
  };

  const reRenderAll = () => {
    renderHeader();
    renderItemProps();
    renderClassProps();
    renderItemsTree();
    renderClassesList();
    renderToolbars();
    setTimeout(() => drawConnections(), 10);
  };

  const loadData = async () => {
    if (state.processId) {
      const result = await fetchProcessData(state.processId);
      if (result.status === 'ok' && result.result) {
        state.name = result.result.name || '';
        state.packageId = result.result.package || 'default';
        state.remark = result.result.remark || '';
        state.accesslevel = result.result.accesslevel || '0';
        state.updatetime = result.result.updatetime || 0;

        const json = result.result.json || {};

        // Recursive uid assigner
        const assignUids = (arr: ItemDef[]) => {
          arr.forEach((a) => {
            a._uid = genUid();
            if (a.children) assignUids(a.children);
          });
        };

        state.items = json.items || [];
        assignUids(state.items);

        state.classes = (json.classes || []).map((c: any) => ({ ...c, _uid: genUid() }));
      }
    }
    reRenderAll();
  };

  const showSaveDialog = () => {
    let processId = state.processId || '';
    let name = state.name || '';
    let packageId = state.packageId || 'default';
    let remark = state.remark || '';

    FloatWindow.show({
      title: 'Save Process',
      buttons: ['Cancel', 'Save'],
      contentMinWidth: '400px',
      handleClicked: (index: number, close: any) => {
        if (index === 1) {
          processId = processId.trim().toLowerCase();
          if (!processId) {
            NotificationMessage.sendMessage('Process ID is required', NotificationColor.Warning);
            return;
          }
          if (!/^[a-z0-9_]+$/.test(processId)) {
            NotificationMessage.sendMessage(
              'Process ID can only contain lowercase letters, numbers, and underscores.',
              NotificationColor.Warning
            );
            return;
          }

          const executeSave = async (overwrite: boolean) => {
            const isSameName = processId.trim() === state.processId.trim() && state.updatetime !== 0;
            const passUpdatetime = isSameName ? state.updatetime : undefined;

            const cleanUids = (arr: any[]) => {
              return arr.map((i) => {
                const { _uid, children, ...rest } = i;
                if (children && children.length > 0) {
                  rest.children = cleanUids(children);
                }
                return rest;
              });
            };

            const cleanItems = cleanUids(state.items);
            const cleanClasses = state.classes.map((c) => {
              const { _uid, ...rest } = c;
              return rest;
            });

            const payload = {
              processid: processId.trim(),
              name: name.trim(),
              package: packageId.trim(),
              remark: remark,
              accesslevel: state.accesslevel,
              json: { items: cleanItems, classes: cleanClasses },
              checkExists: !overwrite,
              originalUpdatetime: passUpdatetime,
            };

            const result = await saveProcessData(payload);
            if (result.status === 'ok') {
              NotificationMessage.sendMessage('Saved successfully', NotificationColor.Success);
              state.processId = processId.trim();
              state.name = name.trim();
              state.packageId = packageId.trim();
              state.remark = remark;
              state.updatetime = result.newUpdatetime || 0;
              reRenderAll();

              const tabsHook = adminFrameHelper.getTabsHook();
              if (tabsHook && tabsHook.updateTitle) {
                tabsHook.updateTitle(-1, 'Process: ' + state.processId);
              }
              close();
            } else if (result.status === 'ID_EXISTS') {
              const idx = await ActionSheetSelectPromise({
                title: `A record named "${processId}" already exists. Overwrite?`,
                options: ['Overwrite'],
                cancelButtonText: 'Cancel',
              });
              if (idx === 0) {
                executeSave(true);
              }
            } else if (result.status === 'MODIFIED_BY_OTHER') {
              const idx = await ActionSheetSelectPromise({
                title: `The process "${processId}" has just been modified by someone else! Do you want to force overwrite?`,
                options: ['Force Overwrite'],
                cancelButtonText: 'Cancel',
              });
              if (idx === 0) {
                executeSave(true);
              }
            } else {
              NotificationMessage.sendMessage(result.message || 'Error saving', NotificationColor.Error);
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
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold' }}>
            Process ID:
          </label>
          <input
            type='text'
            value={processId}
            onInput={(e: any) => (processId = e.target.value)}
            class='input-base'
            style={{ width: '100%', marginBottom: '16px', padding: '8px' }}
          />
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold' }}>Name:</label>
          <input
            type='text'
            value={name}
            onInput={(e: any) => (name = e.target.value)}
            class='input-base'
            style={{ width: '100%', marginBottom: '16px', padding: '8px' }}
          />
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold' }}>
            Package:
          </label>
          <input
            type='text'
            value={packageId}
            onInput={(e: any) => (packageId = e.target.value)}
            class='input-base'
            style={{ width: '100%', marginBottom: '16px', padding: '8px' }}
          />
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold' }}>Remark:</label>
          <input
            type='text'
            value={remark}
            onInput={(e: any) => (remark = e.target.value)}
            class='input-base'
            style={{ width: '100%', marginBottom: '16px', padding: '8px' }}
          />
        </div>
      ),
    });
  };

  // --- Left Pane: Item Properties ---
  const renderItemProps = () => {
    let content = <div style={{ color: '#999', fontSize: '12px' }}>Select an item to edit properties.</div>;

    if (state.selectedItemUid) {
      const ref = findItemRef(state.selectedItemUid);
      if (ref) {
        const item = ref.item;
        const isField = item.flags.includes('F,');
        const isEntity = item.flags.includes('E,');
        const isList = item.flags.includes('L,');

        content = (
          <div
            ref={{ globalCssId: gCssId }}
            style={{
              padding: '8px',
              border: '1px solid blue',
              backgroundColor: 'var(--secondary-bg-color)',
            }}
          >
            <div
              style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: '4px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              Item Setting
            </div>
            <div class='&-form-row'>
              <div class='&-form-label'>Item id:</div>
              <input
                class='&-form-input'
                value={item.name}
                onChange={(e: any) => {
                  const oldName = item.name;
                  item.name = e.target.value;
                  // cascade rename
                  state.classes.forEach((c) =>
                    c.fields.forEach((f) => {
                      if (f.value === oldName) f.value = item.name;
                      else if (Array.isArray(f.value)) f.value = f.value.map((v) => (v === oldName ? item.name : v));
                    })
                  );
                  reRenderAll();
                }}
              />
            </div>
            <div class='&-form-row'>
              <div class='&-form-label'>Item Value:</div>
              <input
                class='&-form-input'
                value={item.defaultValue}
                onChange={(e: any) => {
                  item.defaultValue = e.target.value;
                  reRenderAll();
                }}
              />
            </div>
            <div class='&-form-row'>
              <div class='&-form-label'>Comment:</div>
              <input
                class='&-form-input'
                value={item.ext?.filter || ''}
                onChange={(e: any) => {
                  item.ext = { ...item.ext, filter: e.target.value };
                  reRenderAll();
                }}
              />
            </div>
            <div class='&-form-row'>
              <label class='&-form-check'>
                <input
                  type='checkbox'
                  checked={isField}
                  onChange={(e: any) => toggleFlag(item, 'F,', e.target.checked)}
                />{' '}
                Field
              </label>
              <label class='&-form-check'>
                <input
                  type='checkbox'
                  checked={isEntity}
                  onChange={(e: any) => toggleFlag(item, 'E,', e.target.checked)}
                />{' '}
                Entity
              </label>
              <label class='&-form-check'>
                <input
                  type='checkbox'
                  checked={isList}
                  onChange={(e: any) => toggleFlag(item, 'L,', e.target.checked)}
                />{' '}
                List
              </label>
            </div>
            <div class='&-form-row'>
              <div class='&-form-label'>Table id:</div>
              <input
                class='&-form-input'
                value={item.ext?.tableId || ''}
                onChange={(e: any) => {
                  item.ext = { ...item.ext, tableId: e.target.value };
                  reRenderAll();
                }}
              />
            </div>
            <button class='button-base mt-s' onClick={reRenderAll} style={{ padding: '2px 8px' }}>
              Update
            </button>
          </div>
        );
      }
    }
    itemPropsDom.value = content;
  };

  const toggleFlag = (item: ItemDef, flag: string, checked: boolean) => {
    let f = item.flags.replace(flag, '');
    if (checked) f += flag;
    item.flags = f;
    reRenderAll();
  };

  // --- Left Pane: Class Properties ---
  const renderClassProps = () => {
    let content = <div style={{ color: '#999', fontSize: '12px' }}>Select a class to edit properties.</div>;

    if (state.selectedClassUid) {
      const cls = state.classes.find((c) => c._uid === state.selectedClassUid);
      if (cls) {
        content = (
          <div
            ref={{ globalCssId: gCssId }}
            style={{ padding: '8px', border: '1px solid green', backgroundColor: 'var(--secondary-bg-color)' }}
          >
            <div
              style={{
                backgroundColor: 'green',
                color: 'white',
                padding: '4px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              Class Setting
            </div>
            <div class='&-form-row'>
              <div class='&-form-label'>Class name:</div>
              <input class='&-form-input' value={cls.name} readOnly style={{ backgroundColor: '#eee' }} />
            </div>
            <div class='&-form-row'>
              <div class='&-form-label'>Run type:</div>
              <select
                class='&-form-input'
                value={cls.runType || 'Check'}
                onChange={(e: any) => {
                  cls.runType = e.target.value;
                  reRenderAll();
                }}
              >
                <option value='Check'>Check</option>
                <option value='Logic'>Logic</option>
                <option value='View'>View</option>
              </select>
            </div>
            <div class='&-form-row'>
              <div class='&-form-label'>Class group:</div>
              <input
                class='&-form-input'
                value={cls.group || ''}
                onChange={(e: any) => {
                  cls.group = e.target.value;
                  reRenderAll();
                }}
              />
            </div>
            <div class='&-form-row'>
              <div class='&-form-label'>Comment:</div>
              <input
                class='&-form-input'
                value={cls.comment || ''}
                onChange={(e: any) => {
                  cls.comment = e.target.value;
                  reRenderAll();
                }}
              />
            </div>
            <button class='button-base mt-s' onClick={reRenderAll} style={{ padding: '2px 8px' }}>
              Update
            </button>
          </div>
        );
      }
    }
    classPropsDom.value = content;
  };

  // --- Right Pane: Items Tree ---
  const renderItemsTree = () => {
    const renderNodes = (items: ItemDef[], level: number = 0): any[] => {
      return items.map((item) => {
        const isSelected = state.selectedItemUid === item._uid;
        const paddingLeft = `${level * 16}px`;
        const icon = item.children && item.children.length > 0 ? '[-]' : level === 0 ? '[+]' : '';

        return (
          <div ref={{ globalCssId: gCssId }}>
            <div
              class={`&-node-card ${isSelected ? 'selected' : ''}`}
              id={`item-node-${item._uid}`}
              data-uid={item._uid}
              onClick={() => {
                state.selectedItemUid = item._uid!;
                reRenderAll();
              }}
              style={{ paddingLeft }}
            >
              <div class='&-node-title'>
                {icon} {item.name || '(unnamed)'}
              </div>
              {item.flags && <div class='&-node-sub'>{item.flags}</div>}
              <div class='&-port-right' id={`port-right-${item._uid}`}></div>
            </div>
            {item.children && renderNodes(item.children, level + 1)}
          </div>
        );
      });
    };

    itemsTreeDom.value = <div style={{ position: 'relative' }}>{renderNodes(state.items)}</div>;
  };

  // --- Right Pane: Classes List ---
  const renderClassesList = () => {
    classesListDom.value = (
      <div style={{ position: 'relative' }}>
        {state.classes.map((cls) => {
          const isSelectedClass = state.selectedClassUid === cls._uid;

          return (
            <div
              ref={{ globalCssId: gCssId }}
              class={`&-node-card ${isSelectedClass ? 'selected' : ''}`}
              id={`class-node-${cls._uid}`}
              data-uid={cls._uid}
              onClick={() => {
                state.selectedClassUid = cls._uid!;
                state.selectedClassFieldIdx = -1;
                reRenderAll();
              }}
              style={{ borderColor: 'green' }}
            >
              <div
                class='&-node-title'
                style={{ backgroundColor: isSelectedClass ? 'blue' : 'blue', color: 'white', padding: '2px' }}
              >
                {cls.name}
              </div>
              <div style={{ backgroundColor: '#fff', color: '#000' }}>
                {cls.fields.map((field, idx) => {
                  const isSelectedField = isSelectedClass && state.selectedClassFieldIdx === idx;
                  return (
                    <div
                      class={`&-field-item ${isSelectedField ? 'selected' : ''}`}
                      id={`class-field-${cls._uid}-${idx}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        state.selectedClassUid = cls._uid!;
                        state.selectedClassFieldIdx = idx;
                        reRenderAll();
                      }}
                    >
                      <div class='&-port-left' id={`port-left-${cls._uid}-${idx}`}></div>
                      <span style={{ paddingLeft: '4px', color: '#cc5500' }}>▶ {field.setter}</span>
                      <span style={{ color: '#000', textAlign: 'right', opacity: 0.5, paddingRight: '4px' }}>
                        {Array.isArray(field.value) ? `[${field.value.join(',')}]` : field.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // --- Toolbars ---
  const renderToolbars = () => {
    itemsToolbarDom.value = (
      <div ref={{ globalCssId: gCssId }}>
        <div class='&-toolbar-btn' title='Add Group' onClick={onAddGroup}>
          [+]
        </div>
        <div class='&-toolbar-btn' title='Add Item (under selected)' onClick={onAddItem} style={{ color: 'red' }}>
          [+]
        </div>
        <div class='&-toolbar-btn' title='Delete' onClick={onDeleteSelectedItem}>
          [-]
        </div>
        <div style={{ height: '8px' }}></div>
        <div class='&-toolbar-btn' title='Move Up' onClick={() => moveItem('up')}>
          ↑
        </div>
        <div class='&-toolbar-btn' title='Move Down' onClick={() => moveItem('down')}>
          ↓
        </div>
        <div
          class='&-toolbar-btn'
          title='Move Right (make child)'
          onClick={() => moveItem('right')}
          style={{ color: 'blue' }}
        >
          →
        </div>
        <div
          class='&-toolbar-btn'
          title='Move Left (make sibling)'
          onClick={() => moveItem('left')}
          style={{ color: 'blue' }}
        >
          ←
        </div>
      </div>
    );

    classesToolbarDom.value = (
      <div ref={{ globalCssId: gCssId }}>
        <div class='&-toolbar-btn' title='Add Class' onClick={onAddClass}>
          [+]
        </div>
        <div class='&-toolbar-btn' title='Delete Class' onClick={onDeleteSelectedClass}>
          [-]
        </div>
        <div style={{ height: '8px' }}></div>
        <div class='&-toolbar-btn' title='Move Up' onClick={() => moveClass('up')}>
          ↑
        </div>
        <div class='&-toolbar-btn' title='Move Down' onClick={() => moveClass('down')}>
          ↓
        </div>
      </div>
    );
  };

  // --- Interactions ---
  const onAddGroup = async () => {
    const name = await ActionSheetInputPromise({ title: 'Enter Group Name' });
    if (name) {
      state.items.push({ name, type: '', flags: '', defaultValue: '', _uid: genUid() });
      reRenderAll();
    }
  };

  const onAddItem = async () => {
    if (!state.selectedItemUid) {
      NotificationMessage.sendMessage('Please select a parent group first.', NotificationColor.Warning);
      return;
    }
    const ref = findItemRef(state.selectedItemUid);
    if (!ref) return;

    let targetGroup: ItemDef;
    let targetIndex: number;

    if (ref.parent === null) {
      // It's a top-level group
      targetGroup = ref.item;
      if (!targetGroup.children) targetGroup.children = [];
      targetIndex = targetGroup.children.length; // Add to end
    } else {
      // It's a child item, find its parent group
      const parentGroup = state.items.find((i) => i.children === ref.parent);
      if (!parentGroup) return;
      targetGroup = parentGroup;
      targetIndex = ref.idx + 1; // Add immediately after the selected child item
    }

    const name = await ActionSheetInputPromise({ title: 'Enter Item Name' });
    if (name) {
      targetGroup.children!.splice(targetIndex, 0, {
        name,
        type: 'FieldObject',
        flags: 'F,',
        defaultValue: '',
        _uid: genUid(),
      });
      reRenderAll();
    }
  };

  const onDeleteSelectedItem = async () => {
    if (!state.selectedItemUid) return;
    const ref = findItemRef(state.selectedItemUid);
    if (ref) {
      const confirm = await ActionSheetSelectPromise({
        title: `Delete ${ref.item.name}?`,
        options: ['Delete'],
        cancelButtonText: 'Cancel',
      });
      if (confirm === 0) {
        const arr = ref.parent || state.items;
        arr.splice(ref.idx, 1);
        state.selectedItemUid = null;
        reRenderAll();
      }
    }
  };

  const moveItem = (dir: 'up' | 'down' | 'left' | 'right') => {
    if (!state.selectedItemUid) return;
    const ref = findItemRef(state.selectedItemUid);
    if (!ref) return;

    const arr = ref.parent || state.items;

    if (dir === 'up' && ref.idx > 0) {
      [arr[ref.idx - 1], arr[ref.idx]] = [arr[ref.idx], arr[ref.idx - 1]];
    } else if (dir === 'down' && ref.idx < arr.length - 1) {
      [arr[ref.idx + 1], arr[ref.idx]] = [arr[ref.idx], arr[ref.idx + 1]];
    } else if (dir === 'right') {
      // Make child of previous sibling
      if (ref.idx > 0 && ref.parent === null) {
        const prev = arr[ref.idx - 1];
        if (!prev.children) prev.children = [];
        prev.children.push(ref.item);
        arr.splice(ref.idx, 1);
      }
    } else if (dir === 'left') {
      // Make sibling (pop out)
      if (ref.parent !== null) {
        // find parent index in root
        const parentIdx = state.items.findIndex((i) => i.children === ref.parent);
        if (parentIdx >= 0) {
          ref.parent.splice(ref.idx, 1);
          state.items.splice(parentIdx + 1, 0, ref.item);
        }
      }
    }
    reRenderAll();
  };

  const onAddClass = async () => {
    const classData = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/process/classes');
    const classNames = classData.json.results || [];

    const idx = await ActionSheetSelectPromise({
      title: 'Select Class',
      options: classNames,
      cancelButtonText: 'Cancel',
    });
    if (idx >= 0) {
      const className = classNames[idx];
      const infoData = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/process/class-info', {
        name: className,
      });
      const fields = (infoData.json.results || []).map((setter: string) => ({ setter, value: '' }));

      state.classes.push({
        name: className,
        group: '',
        fields,
        _uid: genUid(),
      });
      reRenderAll();
    }
  };

  const onDeleteSelectedClass = async () => {
    if (!state.selectedClassUid) return;
    const idx = state.classes.findIndex((c) => c._uid === state.selectedClassUid);
    if (idx >= 0) {
      const confirm = await ActionSheetSelectPromise({
        title: `Delete Class?`,
        options: ['Delete'],
        cancelButtonText: 'Cancel',
      });
      if (confirm === 0) {
        state.classes.splice(idx, 1);
        state.selectedClassUid = null;
        state.selectedClassFieldIdx = -1;
        reRenderAll();
      }
    }
  };

  const moveClass = (dir: 'up' | 'down') => {
    if (!state.selectedClassUid) return;
    const idx = state.classes.findIndex((c) => c._uid === state.selectedClassUid);
    if (idx < 0) return;

    if (dir === 'up' && idx > 0) {
      [state.classes[idx - 1], state.classes[idx]] = [state.classes[idx], state.classes[idx - 1]];
    } else if (dir === 'down' && idx < state.classes.length - 1) {
      [state.classes[idx + 1], state.classes[idx]] = [state.classes[idx], state.classes[idx + 1]];
    }
    reRenderAll();
  };

  const onConnect = () => {
    if (!state.selectedItemUid || !state.selectedClassUid || state.selectedClassFieldIdx < 0) {
      NotificationMessage.sendMessage('Select an Item and a Class Field to connect.', NotificationColor.Warning);
      return;
    }
    const ref = findItemRef(state.selectedItemUid);
    const cls = state.classes.find((c) => c._uid === state.selectedClassUid);
    if (ref && cls) {
      const field = cls.fields[state.selectedClassFieldIdx];
      if (!field) {
        // if field is not yet defined, wait we can't select undefined fields.
        // Actually, the legacy JGraph adds fields dynamically. If we select a class but no field, we need to prompt.
        // For now, I only render fields that exist. To add a new field mapping:
      } else {
        field.value = ref.item.name;
        reRenderAll();
      }
    }
  };

  const onDeleteConnection = () => {
    if (!state.selectedClassUid || state.selectedClassFieldIdx < 0) return;
    const cls = state.classes.find((c) => c._uid === state.selectedClassUid);
    if (cls) {
      cls.fields[state.selectedClassFieldIdx].value = '';
      reRenderAll();
    }
  };

  const drawConnections = () => {
    const paths: VNode<any>[] = [];
    const midColEl = ref.$(`.${gCssId}-col-mid`);
    if (!midColEl) return;
    const midRect = midColEl.getBoundingClientRect();

    // Flatten items to easily find by name
    const flatItems: ItemDef[] = [];
    state.items.forEach((i) => {
      flatItems.push(i);
      if (i.children) flatItems.push(...i.children);
    });

    state.classes.forEach((cls) => {
      cls.fields.forEach((field, idx) => {
        let values = Array.isArray(field.value) ? field.value : [field.value];
        values.forEach((val) => {
          if (!val) return;
          const item = flatItems.find((i) => i.name === val);
          if (item) {
            const startEl = document.getElementById(`port-right-${item._uid}`);
            const endEl = document.getElementById(`port-left-${cls._uid}-${idx}`);

            // In real world, we'd need to trace actual DOM positions even if scrolled
            // Assuming they are in DOM
            if (startEl && endEl) {
              const startRect = startEl.getBoundingClientRect();
              const endRect = endEl.getBoundingClientRect();

              // Only draw if both are visible vertically (roughly) or just draw it and let overflow hidden hide it
              const startX = startRect.right - midRect.left;
              const startY = startRect.top + startRect.height / 2 - midRect.top;

              const endX = endRect.left - midRect.left;
              const endY = endRect.top + endRect.height / 2 - midRect.top;

              const d = `M ${startX} ${startY} L ${endX} ${endY}`;
              paths.push(<path class='&-svg-path' d={d}></path>);
            }
          }
        });
      });
    });

    svgDom.value = (
      <svg ref={{ globalCssId: gCssId }} class='&-svg-canvas'>
        {paths}
      </svg>
    );
  };

  const ref: RefProps = {
    globalCssId: gCssId,
    onLoad: async () => {
      await loadData();
      window.addEventListener('resize', drawConnections);
    },
    onUnload: async () => {
      window.removeEventListener('resize', drawConnections);
    },
  };

  return (
    <div ref={ref} class='&-editor-container'>
      <div class='&-header'>
        {headerDom.node}
        <button class='button-base button-outline' onClick={loadData}>
          Reload
        </button>
        <button class='button-base' onClick={showSaveDialog}>
          Save...
        </button>
      </div>
      <div class='&-body'>
        <div class='&-left-pane'>
          <div class='&-pane-half'>{itemPropsDom.node}</div>
          <div class='&-pane-half'>{classPropsDom.node}</div>
        </div>
        <div class='&-right-pane'>
          <div class='&-col &-col-items' onScroll={drawConnections}>
            {itemsTreeDom.node}
          </div>
          <div class='&-toolbar-col'>{itemsToolbarDom.node}</div>
          <div class='&-col &-col-mid'>
            {svgDom.node}
            <div class='&-toolbar-line'>
              <div
                class='&-toolbar-btn'
                title='Connect Selected Item to Selected Field'
                onClick={onConnect}
                style={{ borderColor: 'green', color: 'green', fontSize: '18px' }}
              >
                ⮂
              </div>
              <div
                class='&-toolbar-btn'
                title='Delete Connection'
                onClick={onDeleteConnection}
                style={{ borderColor: 'red', color: 'red', fontSize: '16px' }}
              >
                ✖
              </div>
            </div>{' '}
          </div>
          <div class='&-col &-col-classes' onScroll={drawConnections}>
            {classesListDom.node}
          </div>
          <div class='&-toolbar-col'>{classesToolbarDom.node}</div>
        </div>
      </div>
    </div>
  );
};
