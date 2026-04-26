import {
  CssProps,
  RefProps,
  HtmlVar,
  NotificationColor,
  NotificationMessage,
  getRenderPageProps,
  ActionSheetSelect,
  ActionSheet,
  getDefaultPageLimit,
  PagingLink,
  PopupMenu,
  SearchInput,
  PageProps,
  ActionSheetSelectPromise,
} from 'lupine.components';
import { adminFrameHelper } from './admin-frame-helper';
import { AdminMenuEditPage } from './admin-menu-edit';

const tableName = '$__s_menu';

export const getMenuList = async (
  searchValue?: string,
  pg_i?: number,
  pg_limit?: number,
  sortKey?: string
): Promise<{ status: string; message: string; results: any[]; pageIndex: number; count: number }> => {
  const result = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/menu/list', {
    pg_i,
    pg_l: pg_limit,
    searchValue,
    sortKey,
  });
  return result.json;
};

const fetchTableDelete = async (tableName: string, id: string) => {
  const data = await getRenderPageProps().renderPageFunctions.fetchData(`/api/admin/menu/delete/${id}`);
  return data.json;
};

const ContentOneRow = (props: {
  item: any;
  onSelectedId?: (id: string, name: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}) => {
  const isSelectMode = !!props.onSelectedId;
  const ref: RefProps = {};

  const onEditLocal = async (ev: any) => {
    props.onEdit && props.onEdit(props.item.menuid);
  };

  const onRemoveLocal = async (ev: MouseEvent) => {
    props.onDelete && props.onDelete(props.item.menuid);
  };

  const makeDom = (item: any) => {
    return (
      <>
        <td>
          {props.onSelectedId ? (
            <div
              class='a-menu-sel-link cursor-pointer underline'
              onClick={() => props.onSelectedId!(item.menuid, item.name)}
            >
              {item.menuid}
            </div>
          ) : (
            item.menuid
          )}
        </td>
        <td class='a-menu-lst-row-name'>
          <span style={{ fontWeight: 'bold' }}>{item.name || '(No Name)'}</span>
        </td>
        <td>
          <span class='a-menu-lst-gray'>{item.package || '-'}</span>
        </td>
        {!isSelectMode && <td>{item.remark || '-'}</td>}
        {!isSelectMode && (
          <td>
            <span class='a-menu-lst-gray'>
              {item.updatetime ? new Date(item.updatetime).toLocaleString() : '-'}
            </span>
          </td>
        )}
        {!isSelectMode && (
          <td class='a-menu-lst-row-ctl'>
            <div class='ctl-box'>
              <i class='ifc-icon ma-pencil-outline mr-m' onClick={onEditLocal} title='Edit'></i>
              <i class='ifc-icon ma-close color-red' onClick={onRemoveLocal} title='Delete'></i>
            </div>
          </td>
        )}
      </>
    );
  };
  return (
    <tr ref={ref} class={`a-menu-lst-row-${props.item.menuid}`}>
      {makeDom(props.item)}
    </tr>
  );
};

export const AdminMenuSinglePage = async (props: PageProps) => {
  return <AdminMenuPage />;
};

export const AdminMenuPage = () => <AdminMenuListPage />;

export interface AdminMenuListPageProps {
  isMultiple?: boolean;
  selectedIds?: string[];
  handleSelectedIds?: (ids: string[]) => void;
  css?: CssProps;
}

export const AdminMenuListPage = (props: AdminMenuListPageProps) => {
  const isSelectMode = !!props.handleSelectedIds;
  const itemNameMap: Record<string, string> = {};

  let searchValue: string = '';
  let sortKey = 'updatetime';
  const refUpdate = adminFrameHelper.getTabsHook();

  const ref: RefProps = {
    onLoad: async (self: Element) => {
      await onSearch();
    },
  };

  const onDeleteLocal = async (id: string) => {
    const idx = await ActionSheetSelectPromise({
      title: `Are you sure you want to delete menu "${id}"?`,
      options: ['Confirm'],
      cancelButtonText: 'Cancel'
    });
    if (idx === 0) {
      const result = await fetchTableDelete(tableName, id);
      if (result.status === 'ok') {
        await onSearch(searchValue);
        NotificationMessage.sendMessage('Deleted: ' + id, NotificationColor.Success);
      } else {
        NotificationMessage.sendMessage(result.message || 'Error deleting', NotificationColor.Error);
      }
    }
  };

  const onEditLocal = async (id: string) => {
    if (refUpdate?.getCount && refUpdate.getCount() > adminFrameHelper.getMaxTabsCount()) {
      alert('You are opening too many pages');
      return;
    }
    if (refUpdate?.findAndActivate && refUpdate.findAndActivate('Menu: ' + id)) {
      return;
    }
    refUpdate?.newPage && (await refUpdate.newPage('Menu: ' + id, AdminMenuEditPage(id)));
  };

  const onSelectedId = (id: string, name: string) => {
    itemNameMap[id] = name;
    if (props.isMultiple) {
      if (props.selectedIds && !props.selectedIds.includes(id)) {
        props.selectedIds.push(id);
        selectedDom.value = makeSelectedList();
      }
    } else {
      props.handleSelectedIds && props.handleSelectedIds([id]);
    }
  };

  const onSelectedMultiIds = () => {
    const ids = (props.selectedIds || []).filter((id) => !!id);
    props.handleSelectedIds && props.handleSelectedIds(ids);
  };

  const onUnSelectedId = (id: string) => {
    if (props.selectedIds) {
      props.selectedIds.splice(props.selectedIds.indexOf(id), 1);
      selectedDom.value = makeSelectedList();
    }
  };

  const makeSelectedList = () => {
    return (
      <div class='row-box pb-m a-menu-sel-box'>
        Selected:
        {props.selectedIds?.filter(Boolean).map((id) => (
          <span class='a-menu-sel-tag'>
            {id + ': ' + (itemNameMap[id] || id)}
            <i class='ifc-icon ma-close-circle-outline' onClick={() => onUnSelectedId(id)}></i>
          </span>
        ))}
        <button class='button-base button-s ml-m' onClick={onSelectedMultiIds}>
          Confirm
        </button>
      </div>
    );
  };

  const onSearch = async (search?: string) => {
    searchValue = (search || '').trim();
    listDom.value = await makeList();
  };

  let pageIndex = 0;
  const onPageClick = async (index: number) => {
    pageIndex = index;
    listDom.value = await makeList();
  };

  const onNewMenu = async () => {
    if (refUpdate?.getCount && refUpdate.getCount() > adminFrameHelper.getMaxTabsCount()) {
      alert('You are opening too many pages');
      return;
    }
    if (refUpdate?.findAndActivate && refUpdate.findAndActivate('Menu: new')) {
      return;
    }
    refUpdate?.newPage && (await refUpdate.newPage('Menu: new', AdminMenuEditPage('')));
  };

  const makeList = async () => {
    const pageLimit = Number(getRenderPageProps().query['pg_l'] || '0') || getDefaultPageLimit();
    const result = await getMenuList(searchValue, pageIndex, pageLimit, sortKey);
    if (result.status !== 'ok') {
      NotificationMessage.sendMessage(result.message || 'Error loading', NotificationColor.Error);
      return '';
    }
    pageIndex = result.pageIndex;
    result.results.forEach((u) => (itemNameMap[u.menuid] = u.name));

    return (
      <div>
        <PagingLink
          itemsCount={result.count}
          pageIndex={pageIndex}
          baseLink=''
          onClick={onPageClick}
          textPage='Page'
          textPerpage='Per Page'
          textTo='To'
          textOk='Go'
          showControl={true}
        ></PagingLink>
        <table class='main-data-list a-menu-lst-main-tbl'>
          <tr>
            <th class='a-menu-lst-id'>ID</th>
            <th>Name</th>
            <th>Package</th>
            {!isSelectMode && <th>Remark</th>}
            {!isSelectMode && <th>Update Time</th>}
            {!isSelectMode && <th>Action</th>}
          </tr>
          {result.results.map((item) => (
            <ContentOneRow
              item={item}
              onSelectedId={isSelectMode ? onSelectedId : undefined}
              onDelete={isSelectMode ? undefined : onDeleteLocal}
              onEdit={isSelectMode ? undefined : onEditLocal}
            />
          ))}
        </table>
        <PagingLink
          itemsCount={result.count}
          pageIndex={pageIndex}
          baseLink=''
          onClick={onPageClick}
          textPage='Page'
          textPerpage='Per Page'
          textTo='To'
          textOk='Go'
          showControl={true}
        ></PagingLink>
      </div>
    );
  };

  const listDom = new HtmlVar('');
  const selectedDom = new HtmlVar('');

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 8px',
    '.a-menu-lst-row-name': {
      textAlign: 'left',
    },
    '.a-menu-lst-row-ctl': {
      cursor: 'pointer',
      width: '70px',
    },
    '.a-menu-lst-row-ctl .ctl-box': {
      display: 'flex',
      whiteSpace: 'nowrap',
    },
    '.a-menu-lst-main-tbl': {
      width: '100%',
      borderCollapse: 'collapse',
      border: 'var(--primary-border)',
      borderSpacing: '10px',
      'td, th': {
        border: 'var(--primary-border)',
        padding: '5px',
        verticalAlign: 'middle',
        textAlign: 'center',
      },
      th: {
        backgroundColor: 'var(--secondary-bg-color)',
      },
    },
    '.a-menu-lst-main-tbl tr:hover': {
      backgroundColor: 'var(--secondary-bg-color)',
    },
    '.a-menu-lst-header-sort': {
      fontSize: '12px',
    },
    '.a-menu-lst-gray': {
      color: 'var(--secondary-color)',
      fontSize: '12px',
    },
    '.a-menu-sel-box': {
      display: 'flex',
      alignItems: 'center',
      lineHeight: 2,
      flexWrap: 'wrap',
      gap: '8px',
    },
    '.a-menu-sel-tag': {
      padding: '2px 8px',
      borderRadius: '4px',
      backgroundColor: 'var(--secondary-bg-color)',
      position: 'relative',
      fontSize: '12px',
    },
    '.a-menu-sel-tag i': {
      position: 'absolute',
      right: '-5px',
      top: '-4px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    ...props.css,
  };

  return (
    <div ref={ref} css={css}>
      <div class='admin-sub-title' style={{ marginBottom: '16px' }}>
        {isSelectMode ? 'Select Menu' : 'Menu Management'}
      </div>
      <div class='row-box pb-m' style={{ gap: '16px', alignItems: 'center' }}>
        <SearchInput placeholder='Search...' onSearch={onSearch} onClear={onSearch} />
        <div class='a-menu-lst-header-sort' style={{ display: 'flex', alignItems: 'center' }}>
          Sort By: &nbsp;
          <PopupMenu
            list={['Updated Time', 'Name', 'ID']}
            defaultValue={'Updated Time'}
            handleSelected={(text: string) => {
              if (text === 'Updated Time') {
                sortKey = 'updatetime';
              } else if (text === 'Name') {
                sortKey = 'name';
              } else if (text === 'ID') {
                sortKey = 'menuid';
              }
              onSearch(searchValue);
            }}
          ></PopupMenu>
        </div>
        {!isSelectMode && (
          <button onClick={onNewMenu} class='button-base'>
            New Menu
          </button>
        )}
      </div>
      {props.isMultiple && selectedDom.node}
      <div class='list'>{listDom.node}</div>
    </div>
  );
};

export interface AdminSelectMenuProps {
  isMultiple?: boolean;
  selectedIds?: string[];
  handleSelectedIds: (ids: string[]) => void;
}

export const AdminSelectMenu = async (props: AdminSelectMenuProps) => {
  const handleSelectedIds = async (ids: string[]) => {
    closeFn();
    props.handleSelectedIds(ids);
  };
  const content = (
    <AdminMenuListPage
      isMultiple={props.isMultiple}
      selectedIds={props.selectedIds}
      handleSelectedIds={handleSelectedIds}
      css={{ padding: '0 8px 8px 8px' }}
    />
  );

  const closeFn = await ActionSheet.show({
    title: 'Select Menu',
    children: content,
    cancelButtonText: 'Cancel',
    contentMaxHeight: '90%',
    contentMaxWidth: '90%',
  });
};
