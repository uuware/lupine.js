import {
  CssProps,
  RefProps,
  HtmlVar,
  NotificationColor,
  NotificationMessage,
  getRenderPageProps,
  ActionSheetSelect,
  getDefaultPageLimit,
  PagingLink,
  PopupMenu,
  SearchInput,
  ActionSheetSelectPromise,
} from 'lupine.components';
import { adminFrameHelper } from './admin-frame-helper';
import { AdminProcessEditPage } from './admin-process-edit';

const tableName = '$__s_process';

export const getProcessList = async (
  searchValue?: string,
  pg_i?: number,
  pg_limit?: number,
  sortKey?: string
): Promise<{ status: string; message: string; results: any[]; pageIndex: number; count: number }> => {
  const result = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/process/list', {
    pg_i,
    pg_l: pg_limit,
    searchValue,
    sortKey,
  });
  return result.json;
};

const fetchProcessDelete = async (id: string) => {
  const data = await getRenderPageProps().renderPageFunctions.fetchData(`/api/admin/process/delete/${id}`);
  return data.json;
};

const ContentOneRow = (props: {
  item: any;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}) => {
  const ref: RefProps = {};

  const onEditLocal = async (ev: any) => {
    props.onEdit && props.onEdit(props.item.processid);
  };

  const onRemoveLocal = async (ev: MouseEvent) => {
    props.onDelete && props.onDelete(props.item.processid);
  };

  const makeDom = (item: any) => {
    return (
      <>
        <td>
          <span style={{ fontWeight: 'bold' }}>{item.processid}</span>
        </td>
        <td>
          <span style={{ fontWeight: 'bold' }}>{item.name || '-'}</span>
        </td>
        <td>
          <span class='a-process-lst-gray'>{item.package || '-'}</span>
        </td>
        <td>{item.accesslevel}</td>
        <td>{item.remark || '-'}</td>
        <td>
          {/* item.updatetime is timestamp integer */}
          <span class='a-process-lst-gray'>
            {item.updatetime ? new Date(item.updatetime).toLocaleString() : '-'}
          </span>
        </td>
        <td class='a-process-lst-row-ctl'>
          <div class='ctl-box'>
            <i class='ifc-icon ma-pencil-outline mr-m' onClick={onEditLocal} title='Edit'></i>
            <i class='ifc-icon ma-close color-red' onClick={onRemoveLocal} title='Delete'></i>
          </div>
        </td>
      </>
    );
  };
  return (
    <tr ref={ref} class={`a-process-lst-row-${props.item.processid}`}>
      {makeDom(props.item)}
    </tr>
  );
};

export interface AdminProcessListPageProps {
  css?: CssProps;
}

export const AdminProcessPage = () => <AdminProcessListPage />;

export const AdminProcessListPage = (props: AdminProcessListPageProps) => {
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
      title: `Are you sure you want to delete process ${id}?`,
      options: ['Confirm'],
      cancelButtonText: 'Cancel'
    });
    if (idx === 0) {
      const result = await fetchProcessDelete(id);
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
      alert('You are opening too many tabs');
      return;
    }
    if (refUpdate?.findAndActivate && refUpdate.findAndActivate('Process: ' + id)) {
      return;
    }
    refUpdate?.newPage && (await refUpdate.newPage('Process: ' + id, AdminProcessEditPage(id)));
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

  const onNewProcess = async () => {
    if (refUpdate?.getCount && refUpdate.getCount() > adminFrameHelper.getMaxTabsCount()) {
      alert('You are opening too many tabs');
      return;
    }
    if (refUpdate?.findAndActivate && refUpdate.findAndActivate('New Process')) {
      return;
    }
    refUpdate?.newPage && (await refUpdate.newPage('New Process', AdminProcessEditPage('')));
  };

  const makeList = async () => {
    const pageLimit = Number(getRenderPageProps().query['pg_l'] || '0') || getDefaultPageLimit();
    const result = await getProcessList(searchValue, pageIndex, pageLimit, sortKey);
    if (result.status !== 'ok') {
      NotificationMessage.sendMessage(result.message || 'Error loading', NotificationColor.Error);
      return '';
    }
    pageIndex = result.pageIndex;

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
        <table class='main-data-list a-process-lst-main-tbl'>
          <tr>
            <th class='a-process-lst-id'>Process ID</th>
            <th>Name</th>
            <th>Package</th>
            <th>Access Level</th>
            <th>Remark</th>
            <th>Update Time</th>
            <th>Action</th>
          </tr>
          {result.results.map((item) => (
            <ContentOneRow
              item={item}
              onDelete={onDeleteLocal}
              onEdit={onEditLocal}
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

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 8px',
    '.a-process-lst-row-ctl': {
      cursor: 'pointer',
      width: '70px',
    },
    '.a-process-lst-row-ctl .ctl-box': {
      display: 'flex',
      whiteSpace: 'nowrap',
    },
    '.a-process-lst-main-tbl': {
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
    '.a-process-lst-main-tbl tr:hover': {
      backgroundColor: 'var(--secondary-bg-color)',
    },
    '.a-process-lst-header-sort': {
      fontSize: '12px',
    },
    '.a-process-lst-gray': {
      color: 'var(--secondary-color)',
      fontSize: '12px',
    },
    ...props.css,
  };

  return (
    <div ref={ref} css={css}>
      <div class='admin-sub-title' style={{ marginBottom: '16px' }}>
        Process Management
      </div>
      <div class='row-box pb-m' style={{ gap: '16px', alignItems: 'center' }}>
        <SearchInput placeholder='Search...' onSearch={onSearch} onClear={onSearch} />
        <div class='a-process-lst-header-sort' style={{ display: 'flex', alignItems: 'center' }}>
          Sort By: &nbsp;
          <PopupMenu
            list={['Updated Time', 'Process ID']}
            defaultValue={'Updated Time'}
            handleSelected={(text: string) => {
              if (text === 'Updated Time') {
                sortKey = 'updatetime';
              } else if (text === 'Process ID') {
                sortKey = 'processid';
              }
              onSearch(searchValue);
            }}
          ></PopupMenu>
        </div>
        <button onClick={onNewProcess} class='button-base'>
          New Process
        </button>
      </div>
      <div class='list'>{listDom.node}</div>
    </div>
  );
};
