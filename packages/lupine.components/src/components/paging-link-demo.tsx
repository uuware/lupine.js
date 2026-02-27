import { CssProps, RefProps, mountInnerComponent } from 'lupine.web';
import {
  HtmlVar,
  NotificationColor,
  NotificationMessage,
  ActionSheetSelect,
  PagingLink,
  ModalWindow,
  getDefaultPageLimit,
} from 'lupine.components';
import { DemoStory } from '../demo/demo-types';
import { SearchInput } from '../component-pool/search-input';

// -------------------------------------------------------------
// 1. Mock Database & API
// -------------------------------------------------------------
export interface MockUserRecord {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const db: MockUserRecord[] = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : 'User',
  status: i % 5 === 0 ? 'Inactive' : 'Active',
}));

// Auto-increment ID counter
let nextId = 46;

// Simulated API Calls
const mockApi = {
  async getList(
    searchValue: string = '',
    pageIndex: number = 0,
    pageLimit: number = 10
  ): Promise<{ status: string; results: MockUserRecord[]; pageIndex: number; count: number }> {
    await new Promise((resolve) => setTimeout(resolve, 300)); // simulate network delay

    let filtered = db;
    if (searchValue) {
      filtered = db.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.email.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    const totalCount = filtered.length;
    let maxPages = Math.ceil(totalCount / pageLimit);
    if (maxPages === 0) maxPages = 1;

    if (pageIndex >= maxPages) {
      pageIndex = 0;
    }

    const start = pageIndex * pageLimit;
    const end = start + pageLimit;
    const results = filtered.slice(start, end);

    return {
      status: 'ok',
      results,
      pageIndex,
      count: totalCount,
    };
  },

  async save(record: MockUserRecord): Promise<{ status: string; id?: number; message?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (!record.name || !record.email) {
      return { status: 'error', message: 'Name and Email are required.' };
    }

    if (record.id === -1) {
      // Create
      record.id = nextId++;
      db.unshift(record); // Add to top
    } else {
      // Update
      const index = db.findIndex((item) => item.id === record.id);
      if (index > -1) {
        db[index] = { ...record };
      }
    }
    return { status: 'ok', id: record.id };
  },

  async remove(id: number): Promise<{ status: string; message?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const index = db.findIndex((item) => item.id === id);
    if (index > -1) {
      db.splice(index, 1);
      return { status: 'ok' };
    }
    return { status: 'error', message: 'Record not found.' };
  },
};

// -------------------------------------------------------------
// 2. Edit Modal Component
// -------------------------------------------------------------
type UpdateRecordHookProps = {
  save?: () => Promise<MockUserRecord | null>;
  cancel?: () => void;
};

const ContentEditItem = (props: { item: MockUserRecord; hook: UpdateRecordHookProps }) => {
  const ref: RefProps = {};
  const css: CssProps = {
    padding: '10px 0',
    '.pg-edit-label': {
      width: '80px',
      fontWeight: 'bold',
    },
  };

  props.hook.save = async () => {
    const name = ref.$('input.pg-e-name').value;
    const email = ref.$('input.pg-e-email').value;
    const role = ref.$('select.pg-e-role').value;
    const status = ref.$('select.pg-e-status').value as 'Active' | 'Inactive';

    const newItem = {
      ...props.item,
      name,
      email,
      role,
      status,
    };

    const res = await mockApi.save(newItem);
    if (res.status !== 'ok') {
      NotificationMessage.sendMessage(res.message || 'Error saving record', NotificationColor.Error);
      return null;
    }

    newItem.id = res.id!;
    return newItem;
  };

  return (
    <div ref={ref} css={css}>
      <div class='row-box mt-m'>
        <div class='pg-edit-label'>Name: </div>
        <div class='flex-1'>
          <input type='text' class='input-base pg-e-name w-100p' value={props.item.name} placeholder='Enter name' />
        </div>
      </div>
      <div class='row-box mt-m'>
        <div class='pg-edit-label'>Email: </div>
        <div class='flex-1'>
          <input type='text' class='input-base pg-e-email w-100p' value={props.item.email} placeholder='Enter email' />
        </div>
      </div>
      <div class='row-box mt-m'>
        <div class='pg-edit-label'>Role: </div>
        <div class='flex-1'>
          <select class='input-base pg-e-role'>
            <option value='Admin' selected={props.item.role === 'Admin'}>
              Admin
            </option>
            <option value='User' selected={props.item.role === 'User'}>
              User
            </option>
          </select>
        </div>
      </div>
      <div class='row-box mt-m'>
        <div class='pg-edit-label'>Status: </div>
        <div class='flex-1'>
          <select class='input-base pg-e-status'>
            <option value='Active' selected={props.item.status === 'Active'}>
              Active
            </option>
            <option value='Inactive' selected={props.item.status === 'Inactive'}>
              Inactive
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

const showEditModal = async (item: MockUserRecord, onUpdate: (item: MockUserRecord) => void) => {
  const updateFn: UpdateRecordHookProps = {};

  const handleClicked = async (index: number) => {
    if (index === 1) {
      // Cancel
      updateFn.cancel?.();
      modalClose();
    }
    if (index === 0) {
      // Save
      const newItem = await updateFn.save?.();
      if (newItem) {
        onUpdate(newItem);
        modalClose();
      }
    }
  };

  const modalClose = await ModalWindow.show({
    title: item.id === -1 ? 'Add New User' : 'Edit User',
    buttons: ['Save', 'Cancel'],
    handleClicked,
    children: <ContentEditItem item={item} hook={updateFn} />,
    closeWhenClickOutside: false,
  });
};

// -------------------------------------------------------------
// 3. Row Component
// -------------------------------------------------------------
const ContentOneRow = (props: {
  item: MockUserRecord;
  onRefreshList: () => void; // call parent to refresh when delete
}) => {
  const ref: RefProps = {};

  const makeDom = (item: MockUserRecord) => {
    const onEdit = () => {
      const update = async (updatedItem: MockUserRecord) => {
        // re-render just this row entirely
        await ref.mountInnerComponent!(makeDom(updatedItem));
        NotificationMessage.sendMessage('Record saved successfully.', NotificationColor.Success);
      };
      showEditModal(item, update);
    };

    const onRemove = async () => {
      await ActionSheetSelect.show({
        title: `Are you sure you want to delete ${item.name}?`,
        options: ['Delete'],
        cancelButtonText: 'Cancel',
        handleClicked: async (idx: number, close: any) => {
          close();
          if (idx === 0) {
            const res = await mockApi.remove(item.id);
            if (res.status === 'ok') {
              NotificationMessage.sendMessage('Record deleted.', NotificationColor.Success);
              // Trigger a full list refresh from the parent
              props.onRefreshList();
            } else {
              NotificationMessage.sendMessage(res.message || 'Error deleting.', NotificationColor.Error);
            }
          }
        },
      });
    };

    return (
      <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.role}</td>
        <td>
          <span style={{ color: item.status === 'Active' ? 'green' : 'red' }}>{item.status}</span>
        </td>
        <td class='pg-lst-row-ctl'>
          <i
            class='ifc-icon ma-pencil-outline mr-m'
            onClick={onEdit}
            title='Edit'
            style={{ color: 'var(--primary-color)' }}
          ></i>
          <i class='ifc-icon ma-close color-red' onClick={onRemove} title='Delete'></i>
        </td>
      </>
    );
  };

  return <tr ref={ref}>{makeDom(props.item)}</tr>;
};

// -------------------------------------------------------------
// 4. Main Page Component
// -------------------------------------------------------------
export const PagingLinkPage = () => {
  let searchValue: string = '';
  let pageIndex = 0;
  const listDom = new HtmlVar('');

  const ref: RefProps = {
    onLoad: async () => {
      await onSearch('');
    },
  };

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    '.pg-main-tbl': {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px',
      marginBottom: '10px',
    },
    '.pg-main-tbl th, .pg-main-tbl td': {
      border: '1px solid var(--primary-border, #eee)',
      padding: '8px',
      textAlign: 'left',
    },
    '.pg-main-tbl th': {
      backgroundColor: 'var(--secondary-bg-color, #f9f9f9)',
    },
    '.pg-main-tbl tr:nth-child(odd)': {
      backgroundColor: 'var(--secondary-bg-color, #f9f9f9)',
    },
    '.pg-main-tbl tr:hover': {
      backgroundColor: 'var(--info-bg-color, #e6f7ff)',
    },
    '.pg-lst-row-ctl i': {
      cursor: 'pointer',
    },
  };

  const onSearch = async (search?: string) => {
    searchValue = (search || '').trim();
    pageIndex = 0; // reset to first page on new search
    listDom.value = await makeList();
  };

  const onPageClick = async (index: number) => {
    pageIndex = index;
    listDom.value = await makeList();
  };

  const onAdd = async () => {
    const newItem: MockUserRecord = {
      id: -1,
      name: '',
      email: '',
      role: 'User',
      status: 'Active',
    };

    const update = async () => {
      // Re-fetch the list to show the new record on top
      listDom.value = await makeList();
      NotificationMessage.sendMessage('User added successfully.', NotificationColor.Success);
    };

    showEditModal(newItem, update);
  };

  // Callback to refresh the list from children
  const refreshList = async () => {
    listDom.value = await makeList();
  };

  const makeList = async () => {
    const pageLimit = getDefaultPageLimit();
    const result = await mockApi.getList(searchValue, pageIndex, pageLimit);
    if (result.status !== 'ok') {
      return <div>Error loading data.</div>;
    }

    pageIndex = result.pageIndex;

    if (result.results.length === 0) {
      return <div style={{ padding: '20px', textAlign: 'center' }}>No results found.</div>;
    }

    return (
      <div>
        {/* Pagination Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <PagingLink
            itemsCount={result.count}
            pageIndex={pageIndex}
            baseLink=''
            onClick={onPageClick}
            textPage='Page'
            textPerpage='items per page'
            textTo='Go to'
            textOk='OK'
            showControl={true}
          />
        </div>

        <table class='pg-main-tbl'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          {result.results.map((item) => (
            <ContentOneRow item={item} onRefreshList={refreshList} />
          ))}
        </table>

        {/* Pagination Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <PagingLink
            itemsCount={result.count}
            pageIndex={pageIndex}
            baseLink=''
            onClick={onPageClick}
            textPage='Page'
            textPerpage='items per page'
            textTo='Go to'
            textOk='OK'
            showControl={true}
          />
        </div>
      </div>
    );
  };

  return (
    <div ref={ref} css={css} style={{ padding: '15px' }}>
      <div class='row-box pb-m' style={{ display: 'flex', gap: '10px' }}>
        <SearchInput placeholder='Search by Name/Email...' onSearch={onSearch} onClear={onSearch} class='flex-1' />
        <button class='button-base' onClick={onAdd}>
          Add User
        </button>
      </div>
      <div class='list'>{listDom.node}</div>
    </div>
  );
};

// -------------------------------------------------------------
// 5. Demo Export
// -------------------------------------------------------------
export const pagingLinkDemo: DemoStory<any> = {
  id: 'paging-link-demo',
  text: 'Data List & Paging',
  args: {},
  argTypes: {},
  render: () => {
    return <PagingLinkPage />;
  },
};
