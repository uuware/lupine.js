import {
  CssProps,
  RefProps,
  HtmlVar,
  NotificationColor,
  NotificationMessage,
  getRenderPageProps,
  ActionSheet,
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
  onSelectedId?: (id: string, name: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}) => {
  const isSelectMode = !!props.onSelectedId;
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {!isSelectMode && <input type='checkbox' class='admin-check-box' value={item.processid} />}
            {props.onSelectedId ? (
              <div
                class='a-process-sel-link cursor-pointer underline'
                onClick={() => props.onSelectedId!(item.processid, item.name)}
              >
                {item.processid}
              </div>
            ) : (
              <span style={{ fontWeight: 'bold' }}>{item.processid}</span>
            )}
          </div>
        </td>
        <td class='a-process-lst-row-name'>
          <span style={{ fontWeight: 'bold' }}>{item.name || '-'}</span>
        </td>
        <td>
          <span class='a-process-lst-gray'>{item.package || '-'}</span>
        </td>
        <td>{item.accesslevel}</td>
        {!isSelectMode && <td>{item.remark || '-'}</td>}
        {!isSelectMode && (
          <td>
            {/* item.updatetime is timestamp integer */}
            <span class='a-process-lst-gray'>{item.updatetime ? new Date(item.updatetime).toLocaleString() : '-'}</span>
          </td>
        )}
        {!isSelectMode && (
          <td class='a-process-lst-row-ctl'>
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
    <tr ref={ref} class={`a-process-lst-row-${props.item.processid}`}>
      {makeDom(props.item)}
    </tr>
  );
};

export interface AdminProcessListPageProps {
  isMultiple?: boolean;
  selectedIds?: string[];
  handleSelectedIds?: (ids: string[]) => void;
  css?: CssProps;
}

export const AdminProcessPage = () => <AdminProcessListPage />;

export const AdminProcessListPage = (props: AdminProcessListPageProps) => {
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
      title: `Are you sure you want to delete process ${id}?`,
      options: ['Confirm'],
      cancelButtonText: 'Cancel',
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
      <div class='row-box pb-m a-process-sel-box'>
        Selected:
        {props.selectedIds?.filter(Boolean).map((id) => (
          <span class='a-process-sel-tag'>
            {id + ': ' + (itemNameMap[id] || id)}
            <i class='ifc-icon ma-close' onClick={() => onUnSelectedId(id)}></i>
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

    result.results.forEach((u) => (itemNameMap[u.processid] = u.name));

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
  const selectedDom = new HtmlVar(makeSelectedList());

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 8px',
    '&.admin-lst-hide-more .admin-control-box, &.admin-lst-hide-more .admin-check-box': {
      display: 'none',
    },
    '.a-process-lst-row-name': {
      textAlign: 'left',
    },
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
    '.a-process-sel-box': {
      display: 'flex',
      alignItems: 'center',
      lineHeight: 2,
      flexWrap: 'wrap',
      gap: '8px',
    },
    '.a-process-sel-tag': {
      padding: '2px 8px',
      borderRadius: '4px',
      backgroundColor: 'var(--secondary-bg-color)',
      position: 'relative',
      fontSize: '12px',
    },
    '.a-process-sel-tag i': {
      position: 'absolute',
      right: '-5px',
      top: '-4px',
      color: 'red',
      cursor: 'pointer',
      width: '16px',
      height: '16px',
    },
    '.a-process-test-box': {
      maxWidth: '900px',
    },
    '.a-process-test-box textarea': {
      minHeight: '180px',
      fontFamily: 'monospace',
      resize: 'vertical',
    },
    '.a-process-test-result': {
      minHeight: '180px',
      padding: '8px',
      border: 'var(--primary-border)',
      backgroundColor: 'var(--secondary-bg-color)',
      overflow: 'auto',
      whiteSpace: 'pre-wrap',
    },
    ...props.css,
  };

  const onExport = () => {
    ref.current?.classList.toggle('admin-lst-hide-more');
  };

  const onTestProcess = async () => {
    if (refUpdate?.getCount && refUpdate.getCount() > adminFrameHelper.getMaxTabsCount()) {
      alert('You are opening too many tabs');
      return;
    }
    if (refUpdate?.findAndActivate && refUpdate.findAndActivate('Process Test')) {
      return;
    }
    refUpdate?.newPage && (await refUpdate.newPage('Process Test', AdminProcessTestPage()));
  };

  const onExportSelected = () => {
    const checkboxes = ref.current?.querySelectorAll('.list .admin-check-box') as NodeListOf<HTMLInputElement>;
    if (!checkboxes) return;
    const ids = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);
    if (ids.length === 0) {
      NotificationMessage.sendMessage('Please select items to export.', NotificationColor.Warning);
      return;
    }
    const idsParam = encodeURIComponent(ids.join(','));
    const url = `/api/admin/process/export?ids=${idsParam}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div ref={ref} css={css} class='admin-lst-hide-more'>
      <div class='admin-sub-title' style={{ marginBottom: '16px' }}>
        {isSelectMode ? 'Select Process' : 'Process Management'}
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
        {!isSelectMode && (
          <button onClick={onNewProcess} class='button-base'>
            New Process
          </button>
        )}
        {!isSelectMode && (
          <PopupMenu
            list={['Export', 'Test']}
            defaultValue={'More...'}
            noUpdateLabel={true}
            handleSelected={(text: string) => {
              if (text === 'Export') {
                onExport();
              } else if (text === 'Test') {
                onTestProcess();
              }
            }}
          ></PopupMenu>
        )}
      </div>
      <div class='row-box pb-m admin-control-box'>
        {!isSelectMode && (
          <button onClick={onExportSelected} class='button-base'>
            Export Selected
          </button>
        )}
      </div>
      {props.isMultiple && selectedDom.node}
      <div class='list'>{listDom.node}</div>
    </div>
  );
};

export const AdminProcessTestPage = (defaultProcessId = '') => {
  const ref: RefProps = {};
  const resultDom = new HtmlVar('');
  const refUpdate = adminFrameHelper.getTabsHook();
  const defaultBody = '{\n  "processmode": "3"\n}';

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 8px',
    '.a-process-test-box': {
      maxWidth: '900px',
    },
    '.a-process-test-row': {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px',
    },
    '.a-process-test-label': {
      width: '120px',
      fontWeight: 'bold',
    },
    '.a-process-test-body': {
      minHeight: '180px',
      fontFamily: 'monospace',
      resize: 'vertical',
    },
    '.a-process-test-result': {
      minHeight: '180px',
      padding: '8px',
      border: 'var(--primary-border)',
      backgroundColor: 'var(--secondary-bg-color)',
      overflow: 'auto',
      whiteSpace: 'pre-wrap',
    },
  };

  const onSelectProcess = async () => {
    const currentId = (ref.$('.a-process-test-id')?.value || '').trim();
    await AdminSelectProcess({
      isMultiple: false,
      selectedIds: currentId ? [currentId] : [],
      handleSelectedIds: (ids: string[]) => {
        ref.$('.a-process-test-id').value = ids[0] || '';
      },
    });
  };

  const onEditProcess = async () => {
    const processId = (ref.$('.a-process-test-id')?.value || '').trim();
    if (!processId) {
      NotificationMessage.sendMessage('Please input process id.', NotificationColor.Warning);
      return;
    }
    if (refUpdate?.getCount && refUpdate.getCount() > adminFrameHelper.getMaxTabsCount()) {
      alert('You are opening too many tabs');
      return;
    }
    if (refUpdate?.findAndActivate && refUpdate.findAndActivate('Process: ' + processId)) {
      return;
    }
    refUpdate?.newPage && (await refUpdate.newPage('Process: ' + processId, AdminProcessEditPage(processId)));
  };

  const onRunProcess = async () => {
    const processId = (ref.$('.a-process-test-id')?.value || '').trim();
    const bodyText = (ref.$('.a-process-test-body')?.value || '').trim();

    if (!processId) {
      NotificationMessage.sendMessage('Please input process id.', NotificationColor.Warning);
      return;
    }

    let body: Record<string, any> = {};
    if (bodyText) {
      try {
        const parsed = JSON.parse(bodyText);
        if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') {
          NotificationMessage.sendMessage('Post body must be a JSON object.', NotificationColor.Warning);
          return;
        }
        body = parsed;
      } catch (e: any) {
        NotificationMessage.sendMessage('Invalid JSON: ' + (e?.message || e), NotificationColor.Error);
        return;
      }
    }

    resultDom.value = <pre class='a-process-test-result'>Running...</pre>;
    const response = await getRenderPageProps().renderPageFunctions.fetchData(
      `/api/admin/process/run/${encodeURIComponent(processId)}`,
      body
    );
    const result = response?.json ?? { text: response?.text ?? '' };
    resultDom.value = <pre class='a-process-test-result'>{JSON.stringify(result, null, 2)}</pre>;
  };

  return (
    <div ref={ref} css={css}>
      <div class='admin-sub-title' style={{ marginBottom: '16px' }}>
        Process Test
      </div>
      <div class='a-process-test-box'>
        <div class='a-process-test-row'>
          <label class='a-process-test-label'>Process ID:</label>
          <input class='input-base flex-1 a-process-test-id' type='text' value={defaultProcessId} />
          <button class='button-base' onClick={onSelectProcess}>
            Select
          </button>
          <button class='button-base' onClick={onEditProcess}>
            Edit
          </button>
        </div>
        <div class='mb-m'>
          <label class='a-process-test-label'>Post Body JSON:</label>
          <textarea class='input-base w-100p a-process-test-body'>{defaultBody}</textarea>
        </div>
        <div class='row-box pb-m'>
          <button class='button-base' onClick={onRunProcess}>
            Run
          </button>
        </div>
        <div class='mb-m'>Result:</div>
        {resultDom.node || <pre class='a-process-test-result'></pre>}
      </div>
    </div>
  );
};

export interface AdminSelectProcessProps {
  isMultiple?: boolean;
  selectedIds?: string[];
  handleSelectedIds: (ids: string[]) => void;
}

export const AdminSelectProcess = async (props: AdminSelectProcessProps) => {
  const handleSelectedIds = async (ids: string[]) => {
    closeFn();
    props.handleSelectedIds(ids);
  };
  const content = (
    <AdminProcessListPage
      isMultiple={props.isMultiple}
      selectedIds={props.selectedIds}
      handleSelectedIds={handleSelectedIds}
      css={{ padding: '0 8px 8px 8px' }}
    />
  );

  const closeFn = await ActionSheet.show({
    title: 'Select Process',
    children: content,
    cancelButtonText: 'Cancel',
    contentMaxHeight: '90%',
    contentMaxWidth: '90%',
  });
};
