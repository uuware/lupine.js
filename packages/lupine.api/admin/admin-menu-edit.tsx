import {
  CssProps,
  getRenderPageProps,
  RefProps,
  HtmlVar,
  NotificationMessage,
  NotificationColor,
  ActionSheetSelect,
  createDragUtil,
  DomUtils,
  ActionSheetSelectPromise,
  FloatWindow,
} from 'lupine.components';

// Access level constants
const ACCESS_LEVELS = [
  { value: '0', label: 'Public' },
  { value: '2', label: 'Logged In' },
  { value: '3', label: 'Admin' },
  { value: '9', label: 'Site Admin' },
];
const getAccessLabel = (val: string) => ACCESS_LEVELS.find((a) => a.value === val)?.label || 'Public';

// Menu item data structure: [level, nav, access, link, text]
interface MenuItem {
  id: number; // unique client-side id for rendering
  level: number;
  nav: string; // 0=same window, 1=new window
  access: string;
  link: string;
  text: string;
  expanded: boolean;
}

let _nextId = 1;
const createMenuItem = (
  level: number,
  nav: string,
  access: string,
  link: string,
  text: string,
  expanded = false
): MenuItem => ({
  id: _nextId++,
  level,
  nav,
  access,
  link,
  text,
  expanded,
});


// Single menu item card component
const MenuItemCard = (props: {
  item: MenuItem;
  itemIndex: number;
  onToggle: () => void;
  onUpdate: (field: string, value: string) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onIndent: () => void;
  onOutdent: () => void;
  onDragStart: (e: any) => void;
}) => {
  const { item } = props;

  return (
    <div class='menu-item-card' style={{ marginLeft: `${item.level * 40}px` }} data-index={props.itemIndex}>
      <div class='menu-item-header'>
        <div
          class='menu-item-drag'
          onMouseDown={(e: any) => {
            e.stopPropagation();
            props.onDragStart(e);
          }}
          onTouchStart={(e: any) => {
            e.stopPropagation();
            props.onDragStart(e);
          }}
        >
          <i class='ifc-icon ma-drag-horizontal-variant'></i>
        </div>
        <div class='menu-item-title-bar' onClick={props.onToggle}>
          <span class='menu-item-title'>{item.text || '(untitled)'}</span>
          <div class='menu-item-badges'>
            <span class={`menu-item-access-badge access-${item.access}`}>{getAccessLabel(item.access)}</span>
            {item.link && (
              <span class='menu-item-link-badge' title={item.link}>
                {item.link}
              </span>
            )}
          </div>
        </div>
        <div class='menu-item-header-actions'>
          <i class='ifc-icon ma-arrow-up' onClick={props.onMoveUp} title='Move Up'></i>
          <i class='ifc-icon ma-arrow-down' onClick={props.onMoveDown} title='Move Down'></i>
          <i class='ifc-icon ma-arrow-left' onClick={props.onOutdent} title='Outdent'></i>
          <i class='ifc-icon ma-arrow-right' onClick={props.onIndent} title='Indent'></i>
          <i class='ifc-icon ma-close color-red' onClick={props.onDelete} title='Delete'></i>
        </div>
        <div class='menu-item-toggle' onClick={props.onToggle}>
          <i class={`ifc-icon ${item.expanded ? 'ma-chevron-up' : 'ma-chevron-down'}`}></i>
        </div>
      </div>

      {item.expanded && (
        <div class='menu-item-body'>
          <div class='menu-item-field-row'>
            <div class='menu-item-field'>
              <label>Title</label>
              <input
                type='text'
                class='input-base'
                value={item.text}
                onInput={(e: any) => props.onUpdate('text', e.target.value)}
              />
            </div>
            <div class='menu-item-field'>
              <label>Link / URL</label>
              <input
                type='text'
                class='input-base'
                value={item.link}
                onInput={(e: any) => props.onUpdate('link', e.target.value)}
              />
            </div>
          </div>
          <div class='menu-item-field-row'>
            <div class='menu-item-field'>
              <label>Target</label>
              <select class='input-base' value={item.nav} onChange={(e: any) => props.onUpdate('nav', e.target.value)}>
                <option value='0'>Same Window</option>
                <option value='1'>New Window</option>
              </select>
            </div>
            <div class='menu-item-field'>
              <label>Access Level</label>
              <select
                class='input-base'
                value={item.access}
                onChange={(e: any) => props.onUpdate('access', e.target.value)}
              >
                {ACCESS_LEVELS.map((al) => (
                  <option value={al.value}>{al.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const AdminMenuEditPage = (menuId: string) => {
  let savedMenuId = menuId || '';
  let savedName = '';
  let savedRemark = '';
  let savedPackage = '';
  let savedUpdatetime: number = 0;
  let items: MenuItem[] = [];

  const itemsDom = new HtmlVar('');
  const titleDom = new HtmlVar('');

  const renderHeader = () => {
    const css: CssProps = {
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
      }
    };
    titleDom.value = (
      <div css={css}>
        <div>
          <span class='hdr-label'>Id: </span>
          <span class='hdr-value'>{savedMenuId || '(New Menu)'}</span>
        </div>
        <div>
          <span class='hdr-label'>Name: </span>
          <span class='hdr-value'>{savedName || '(none)'}</span>
        </div>
        <div>
          <span class='hdr-label'>Package: </span>
          <span class='hdr-value'>{savedPackage || '(none)'}</span>
        </div>
      </div>
    );
  };

  // ── Helpers ──
  const renderItems = () => {
    itemsDom.value = (
      <div class='menu-items-list'>
        {items.length === 0 && <div class='menu-items-empty'>No menu items yet. Click "Add Item" to get started.</div>}
        {items.map((item, index) => (
          <MenuItemCard
            item={item}
            itemIndex={index}
            onToggle={() => {
              item.expanded = !item.expanded;
              renderItems();
            }}
            onUpdate={(field, value) => {
              (item as any)[field] = value;
              renderItems();
            }}
            onDelete={() => doDelete(index)}
            onMoveUp={() => doMoveUp(index)}
            onMoveDown={() => doMoveDown(index)}
            onIndent={() => doIndent(index)}
            onOutdent={() => doOutdent(index)}
            onDragStart={(e: any) => {
              dragUtil.onMouseDown ? dragUtil.onMouseDown(e) : dragUtil.onTouchStart(e);
            }}
          />
        ))}
      </div>
    );
  };

  const getItemGroup = (index: number): { start: number; end: number } => {
    // Returns the range [start, end) of the item and all its children
    const level = items[index].level;
    let end = index + 1;
    while (end < items.length && items[end].level > level) {
      end++;
    }
    return { start: index, end };
  };

  // ── Item operations ──
  const doDelete = async (index: number) => {
    const group = getItemGroup(index);
    const count = group.end - group.start;
    const msg = count > 1 ? `Delete this item and ${count - 1} sub-item(s)?` : 'Delete this item?';
    await ActionSheetSelect.show({
      title: msg,
      options: ['Remove'],
      cancelButtonText: 'Cancel',
      handleClicked: async (btnIndex: number, close: () => void) => {
        close();
        if (btnIndex === 0) {
          items.splice(group.start, count);
          renderItems();
        }
      },
    });
  };

  const doMoveUp = (index: number) => {
    if (index <= 0) return;
    const level = items[index].level;
    // Find previous sibling (same level)
    let prevSiblingIndex = -1;
    for (let i = index - 1; i >= 0; i--) {
      if (items[i].level < level) break;
      if (items[i].level === level) {
        prevSiblingIndex = i;
        break;
      }
    }
    if (prevSiblingIndex < 0) return;

    const group = getItemGroup(index);
    const prevGroup = getItemGroup(prevSiblingIndex);
    // Extract current group
    const currentChunk = items.splice(group.start, group.end - group.start);
    // Insert before previous group
    items.splice(prevGroup.start, 0, ...currentChunk);
    renderItems();
  };

  const doMoveDown = (index: number) => {
    const level = items[index].level;
    const group = getItemGroup(index);
    // Find next sibling (same level)
    let nextSiblingIndex = -1;
    for (let i = group.end; i < items.length; i++) {
      if (items[i].level < level) break;
      if (items[i].level === level) {
        nextSiblingIndex = i;
        break;
      }
    }
    if (nextSiblingIndex < 0) return;

    const nextGroup = getItemGroup(nextSiblingIndex);
    // Extract next group
    const nextChunk = items.splice(nextGroup.start, nextGroup.end - nextGroup.start);
    // Insert before current group
    items.splice(group.start, 0, ...nextChunk);
    renderItems();
  };

  const doIndent = (index: number) => {
    // Cannot indent if no previous sibling to become parent
    if (index <= 0) return;
    const prevLevel = items[index - 1].level;
    const currentLevel = items[index].level;
    if (currentLevel > prevLevel) return; // already a child of previous

    const group = getItemGroup(index);
    for (let i = group.start; i < group.end; i++) {
      items[i].level++;
    }
    renderItems();
  };

  const doOutdent = (index: number) => {
    const currentLevel = items[index].level;
    if (currentLevel <= 0) return;

    const group = getItemGroup(index);
    for (let i = group.start; i < group.end; i++) {
      items[i].level--;
    }
    renderItems();
  };

  const doAddItem = () => {
    items.push(createMenuItem(0, '0', '0', '', 'New Item', true));
    renderItems();
  };

  // ── Load data ──
  const doLoad = (result: any) => {
    savedMenuId = result.menuid || '';
    savedName = result.name || '';
    savedRemark = result.remark || '';
    savedPackage = result.package || '';
    savedUpdatetime = result.updatetime || 0;

    items = [];
    if (Array.isArray(result.items)) {
      for (const arr of result.items) {
        // arr = [level, nav, access, link, text]
        items.push(
          createMenuItem(
            Number(arr[0]) || 0,
            String(arr[1] || '0'),
            String(arr[2] || '0'),
            String(arr[3] || ''),
            String(arr[4] || ''),
            false
          )
        );
      }
    }
    renderHeader();
    renderItems();
  };

  // ── Save ──
  const doSave = async () => {
    let id = savedMenuId || '';
    let name = savedName || '';
    let remark = savedRemark || '';
    let pkg = savedPackage || '';

    FloatWindow.show({
      title: 'Save Menu',
      buttons: ['Cancel', 'Save'],
      contentMinWidth: '400px',
      handleClicked: async (index: number, close: any) => {
        if (index === 1) {
          id = id.trim().toLowerCase();

          const regex = /^[a-z0-9_]+$/;
          if (!id || !regex.test(id)) {
            NotificationMessage.sendMessage('Menu ID can only contain lowercase letters, numbers, and underscores.', NotificationColor.Warning);
            return;
          }

          const menuItems = items.map((item) => [item.level, item.nav, item.access, item.link, item.text]);

          const isRenamed = savedMenuId && id !== savedMenuId;
          const isNew = !savedMenuId;

          const executeSave = async (overwrite: boolean) => {
            const post: any = {
              menuid: id,
              name,
              remark,
              package: pkg,
              json: menuItems,
              checkExists: !overwrite,
              idReadonly: false,
            };

            if (!isNew && !isRenamed) {
              // Saving to the same ID — pass originalUpdatetime for conflict check
              post.originalUpdatetime = savedUpdatetime;
              post.idReadonly = true;
            }

            const data = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/menu/save', post);
            const json = data.json;

            if (json && json.status === 'ok') {
              savedMenuId = id;
              savedName = name;
              savedRemark = remark;
              savedPackage = pkg;
              savedUpdatetime = json.newUpdatetime;
              renderHeader();
              NotificationMessage.sendMessage('Menu saved.', NotificationColor.Success);
              close();
            } else if (json && json.status === 'ID_EXISTS') {
              const idx = await ActionSheetSelectPromise({
                title: `Menu ID "${id}" already exists.\n\nDo you want to overwrite it?`,
                options: ['Overwrite'],
                cancelButtonText: 'Cancel'
              });
              if (idx === 0) {
                executeSave(true);
              }
            } else if (json && json.status === 'MODIFIED_BY_OTHER') {
              const idx = await ActionSheetSelectPromise({
                title: `${json.message}\n\nDo you want to overwrite anyway?`,
                options: ['Force Overwrite'],
                cancelButtonText: 'Cancel'
              });
              if (idx === 0) {
                executeSave(true);
              }
            } else {
              NotificationMessage.sendMessage(`Error: ${json?.message || 'Unknown error'}`, NotificationColor.Error);
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
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold' }}>Menu ID:</label>
          <input 
            type="text" 
            value={id} 
            onInput={(e: any) => id = e.target.value}
            class="input-base"
            style={{ width: '100%', marginBottom: '16px', padding: '8px' }}
          />
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold' }}>Name:</label>
          <input 
            type="text" 
            value={name} 
            onInput={(e: any) => name = e.target.value}
            class="input-base"
            style={{ width: '100%', marginBottom: '16px', padding: '8px' }}
          />
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold' }}>Package:</label>
          <input 
            type="text" 
            value={pkg} 
            onInput={(e: any) => pkg = e.target.value}
            class="input-base"
            style={{ width: '100%', marginBottom: '16px', padding: '8px' }}
          />
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold' }}>Remark:</label>
          <input 
            type="text" 
            value={remark} 
            onInput={(e: any) => remark = e.target.value}
            class="input-base"
            style={{ width: '100%', marginBottom: '16px', padding: '8px' }}
          />
        </div>
      )
    });
  };

  // ── Delete menu ──
  const doDeleteMenu = async () => {
    if (!savedMenuId) {
      NotificationMessage.sendMessage('This menu has not been saved yet.', NotificationColor.Warning);
      return;
    }
    const idx = await ActionSheetSelectPromise({
      title: `Are you sure you want to delete menu "${savedMenuId}"?`,
      options: ['Delete'],
      cancelButtonText: 'Cancel'
    });
    if (idx === 0) {
      await getRenderPageProps().renderPageFunctions.fetchData(`/api/admin/menu/delete/${savedMenuId}`);
      savedMenuId = '';
      savedName = '';
      savedRemark = '';
      savedPackage = '';
      savedUpdatetime = 0;
      items = [];
      renderHeader();
      renderItems();
      NotificationMessage.sendMessage('Menu deleted.', NotificationColor.Success);
    }
  };

  // ── Clear all items ──
  const doClearAll = async () => {
    if (items.length === 0) return;
    const idx = await ActionSheetSelectPromise({
      title: 'Clear all menu items? This cannot be undone.',
      options: ['Clear All'],
      cancelButtonText: 'Cancel'
    });
    if (idx !== 0) return;
    items = [];
    renderItems();
  };

  // ── Drag to reorder ──
  const dragUtil = createDragUtil();
  dragUtil.setOnMoveCallback((clientX, clientY, movedX, movedY) => {
    const dragDom = dragUtil.getDraggingDom();
    if (!dragDom) return;
    if (!dragDom.classList.contains('menu-item-drag')) return;

    const card = dragDom.closest('.menu-item-card') as HTMLDivElement;
    if (!card) return;

    // Visual feedback
    card.style.opacity = '0.85';
    card.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
    card.style.outline = '2px solid var(--primary-accent-color, #1890ff)';
    card.style.zIndex = '100';
    card.style.position = 'relative';

    const container = DomUtils.bySelector('.menu-items-list') as HTMLDivElement;
    if (!container) return;

    const cards = ref.$all('.menu-item-card') as NodeListOf<HTMLDivElement>;
    if (cards.length <= 1) return;
    const rect = container.getBoundingClientRect();
    const relativeY = clientY - rect.top + container.scrollTop;

    let targetIndex = -1;
    for (let i = 0; i < cards.length; i++) {
      const cardTop = cards[i].offsetTop;
      const cardBottom = cardTop + cards[i].offsetHeight;
      if (relativeY >= cardTop && relativeY <= cardBottom) {
        targetIndex = i;
        break;
      }
    }

    if (targetIndex >= 0) {
      const targetCard = cards[targetIndex];
      if (card !== targetCard) {
        let currentIdx = -1;
        for (let i = 0; i < cards.length; i++) {
          if (cards[i] === card) {
            currentIdx = i;
            break;
          }
        }
        if (currentIdx >= 0) {
          if (currentIdx < targetIndex) {
            targetCard.parentNode?.insertBefore(card, targetCard.nextSibling);
          } else {
            targetCard.parentNode?.insertBefore(card, targetCard);
          }
        }
      }
    }
  });

  dragUtil.setOnMoveEndCallback(() => {
    const dragDom = dragUtil.getDraggingDom();
    if (!dragDom) return;
    if (!dragDom.classList.contains('menu-item-drag')) return;

    const card = dragDom.closest('.menu-item-card') as HTMLDivElement;
    if (card) {
      card.style.opacity = '1';
      card.style.boxShadow = '';
      card.style.outline = '';
      card.style.zIndex = '';
      card.style.position = '';
    }

    // Read new order from DOM
    const container = DomUtils.bySelector('.menu-items-list') as HTMLDivElement;
    if (!container) return;
    const cards = ref.$all('.menu-item-card') as NodeListOf<HTMLDivElement>;
    const newOrder: number[] = [];
    cards.forEach((c) => newOrder.push(parseInt(c.getAttribute('data-index') || '-1')));

    // Rebuild items array in new order
    const reordered: MenuItem[] = [];
    for (const idx of newOrder) {
      if (idx >= 0 && idx < items.length) {
        reordered.push(items[idx]);
      }
    }
    if (reordered.length === items.length) {
      items = reordered;
      renderItems();
    }
  });

  // ── Init ──
  const ref: RefProps = {
    onLoad: async () => {
      if (menuId) {
        const response = await getRenderPageProps().renderPageFunctions.fetchData(`/api/admin/menu/get/${menuId}`);
        if (response.json?.result) {
          doLoad(response.json.result);
        }
      } else {
        renderHeader();
        renderItems();
      }
    },
  };

  const css: CssProps = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

    '.menu-edit-header': {
      padding: '8px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      // borderBottom: 'var(--primary-border)',
      flexShrink: '0',
    },

    '.menu-edit-body': {
      flex: '1',
      overflow: 'auto',
      padding: '12px',
      backgroundColor: 'var(--secondary-bg-color)',
      border: 'var(--primary-border)',
    },

    // ── Item card styles ──
    '.menu-items-list': {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    '.menu-items-empty': {
      padding: '40px 20px',
      textAlign: 'center',
      color: 'var(--secondary-color)',
      fontSize: '14px',
      border: '2px dashed var(--border-color, #ddd)',
      borderRadius: '8px',
    },

    '.menu-item-card': {
      border: 'var(--primary-border)',
      borderRadius: '6px',
      backgroundColor: 'var(--primary-bg-color)',
      transition: 'box-shadow 0.15s ease',
    },
    '.menu-item-card:hover': {
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    },

    '.menu-item-header': {
      display: 'flex',
      alignItems: 'center',
      padding: '6px 10px',
      cursor: 'pointer',
      gap: '8px',
      userSelect: 'none',
      backgroundColor: 'var(--secondary-bg-color)',
      borderRadius: '6px',
    },
    '.menu-item-header:hover': {
      backgroundColor: 'var(--hover-bg-color, var(--secondary-bg-color))',
    },

    '.menu-item-drag': {
      cursor: 'grab',
      color: 'var(--secondary-color)',
      fontSize: '16px',
      flexShrink: '0',
    },
    '.menu-item-title-bar': {
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      overflow: 'hidden',
      flexWrap: 'wrap',
    },
    '.menu-item-title': {
      fontWeight: '600',
      fontSize: '13px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '.menu-item-badges': {
      display: 'flex',
      gap: '6px',
      alignItems: 'center',
      flexShrink: '0',
    },
    '.menu-item-access-badge': {
      fontSize: '11px',
      padding: '1px 6px',
      borderRadius: '3px',
      fontWeight: '500',
      whiteSpace: 'nowrap',
    },
    '.menu-item-access-badge.access-0': {
      backgroundColor: '#e8f5e9',
      color: '#2e7d32',
    },
    '.menu-item-access-badge.access-2': {
      backgroundColor: '#e3f2fd',
      color: '#1565c0',
    },
    '.menu-item-access-badge.access-3': {
      backgroundColor: '#fff3e0',
      color: '#e65100',
    },
    '.menu-item-access-badge.access-9': {
      backgroundColor: '#fce4ec',
      color: '#c62828',
    },
    '.menu-item-link-badge': {
      fontSize: '11px',
      color: 'var(--secondary-color)',
      maxWidth: '200px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '.menu-item-toggle': {
      flexShrink: '0',
      fontSize: '14px',
      color: 'var(--secondary-color)',
    },

    '.menu-item-body': {
      padding: '10px 12px',
      borderTop: 'var(--primary-border)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    '.menu-item-field': {
      display: 'flex',
      flexDirection: 'column',
      gap: '3px',
      flex: '1',
      label: {
        fontSize: '12px',
        fontWeight: '500',
        color: 'var(--secondary-color)',
      },
    },
    '.menu-item-field-row': {
      display: 'flex',
      gap: '12px',
    },
    '.menu-item-header-actions': {
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
      flexShrink: '0',
      i: {
        cursor: 'pointer',
        fontSize: '16px',
        padding: '2px',
        borderRadius: '3px',
        opacity: '0.6',
        transition: 'opacity 0.15s ease',
      },
      'i:hover': {
        opacity: '1',
      },
    },

    '.menu-edit-add-btn': {
      marginTop: '12px',
      display: 'flex',
      justifyContent: 'center',
    },
  };

  return (
    <div
      css={css}
      ref={ref}
      onMouseMove={dragUtil.onMouseMove}
      onMouseUp={dragUtil.onMouseUp}
      onTouchMove={dragUtil.onTouchMove}
      onTouchEnd={dragUtil.onTouchEnd}
    >
      <div class='menu-edit-header'>
        <div class='admin-sub-title' style={{ margin: '0', flex: '1' }}>
          {titleDom.node}
        </div>
        <button onClick={doSave} class='button-base'>
          Save
        </button>
        <button onClick={doClearAll} class='button-base'>
          Clear All
        </button>
        {savedMenuId && (
          <button onClick={doDeleteMenu} class='button-base red'>
            Delete
          </button>
        )}
      </div>
      <div class='menu-edit-body'>
        {itemsDom.node}
        <div class='menu-edit-add-btn'>
          <button onClick={doAddItem} class='button-base'>
            + Add Menu Item
          </button>
        </div>
      </div>
    </div>
  );
};
