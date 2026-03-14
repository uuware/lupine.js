import {
  CssProps,
  getRenderPageProps,
  RefProps,
  EditableLabel,
  ModalWindow,
  NotificationColor,
  NotificationMessage,
  PagingLink,
  useState,
} from 'lupine.components';

export type TokenProps = {
  token: string;
  description: string;
  timestamp?: number;
};

const getTokenData = async (pageIndex = 0, searchText: string = '') => {
  const response = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/tokens/list', {
    q: searchText,
  });
  const dataResponse = await response.json;
  let pageLimit = 15;
  let tokenList: TokenProps[] = [];
  if (dataResponse && dataResponse.status === 'ok') {
    tokenList = dataResponse.result;
    pageLimit = dataResponse.pageLimit;
    tokenList;
  }

  const itemsCount = tokenList.length;
  let maxPages = Math.floor(itemsCount / pageLimit);
  if (itemsCount % pageLimit !== 0) {
    maxPages++;
  }
  if (pageIndex > maxPages - 1) {
    pageIndex = maxPages - 1;
  }
  const offset = pageIndex * pageLimit;
  return {
    status: 'ok',
    itemsCount,
    pageIndex,
    pageLimit,
    result: tokenList.slice(offset, offset + pageLimit),
  };
};
const generateToken = async () => {
  const response = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/tokens/generate');
  const dataResponse = await response.json;
  if (dataResponse && dataResponse.status === 'ok') {
    NotificationMessage.sendMessage(dataResponse.message || 'Token generated successfully', NotificationColor.Success);
  } else {
    NotificationMessage.sendMessage(dataResponse.message || 'Failed to generate token', NotificationColor.Error);
  }
  return dataResponse.result;
};
const addTokenData = async (item: TokenProps) => {
  const response = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/tokens/add', { ...item });
  const dataResponse = await response.json;
  if (dataResponse && dataResponse.status === 'ok') {
    NotificationMessage.sendMessage(dataResponse.message || 'Token added successfully', NotificationColor.Success);
  } else {
    NotificationMessage.sendMessage(dataResponse.message || 'Failed to add token', NotificationColor.Error);
  }
  return { ...item };
};

const removeTokenData = async (token: string) => {
  const response = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/tokens/remove', { token });
  const dataResponse = await response.json;
  if (dataResponse && dataResponse.status === 'ok') {
    NotificationMessage.sendMessage(dataResponse.message || 'Token removed successfully', NotificationColor.Success);
  } else {
    NotificationMessage.sendMessage(dataResponse.message || 'Failed to remove token', NotificationColor.Error);
  }
};
const updateTokenData = async (item: TokenProps) => {
  const response = await getRenderPageProps().renderPageFunctions.fetchData('/api/admin/tokens/update', { ...item });
  const dataResponse = await response.json;
  if (dataResponse && dataResponse.status === 'ok') {
    NotificationMessage.sendMessage(dataResponse.message || 'Token updated successfully', NotificationColor.Success);
  } else {
    NotificationMessage.sendMessage(dataResponse.message || 'Failed to update token', NotificationColor.Error);
  }
  return { ...item };
};

type TokenDataUpdateProps = {
  save?: (isNew: boolean) => Promise<TokenProps | null>;
  cancel?: () => void;
};
// show dialog to edit one item, and call update when save the result
const showTokenEditItem = async (item: TokenProps, update: (item: TokenProps) => void, isNew: boolean) => {
  const handleClicked = async (index: number) => {
    if (index === 1) {
      updateFn.cancel?.();
      modalClose();
    }
    if (index === 0) {
      const newItem = await updateFn.save?.(isNew);
      if (newItem) {
        update(newItem);
        modalClose();
      }
    }
  };
  const updateFn: TokenDataUpdateProps = {};
  const modalClose = await ModalWindow.show({
    title: 'Edit Token Data',
    buttons: ['Save', 'Cancel'],
    // contentMaxHeight: '400px',
    handleClicked,
    children: <TokenEditItem item={item} update={updateFn}></TokenEditItem>,
    closeWhenClickOutside: false,
  });
};

// edit one item
export const TokenEditItem = (props: { item: TokenProps; update: TokenDataUpdateProps }) => {
  const ref: RefProps = { id: '' };
  const css: CssProps = {
    padding: '10px',
    border: 'solid 1px gray',
    margin: '1px',
    position: 'relative',
    '.lable': {
      width: '90px',
    },
  };
  props.update.save = async (isNew: boolean) => {
    const token = ref.$('input.token').value;
    const description = ref.$('input.description').value;
    if (token && description) {
      const newItem = isNew
        ? await addTokenData({ token, description })
        : await updateTokenData({ token, description });
      props.item.token = newItem.token;
      props.item.description = newItem.description;
      return newItem;
    }
    NotificationMessage.sendMessage('Please input token and description', NotificationColor.Error);
    return null;
  };
  return (
    <div ref={ref} css={css} class='sample-data'>
      <div class='row-box mt-m'>
        <div class='lable'>Token: </div>
        <div>
          <input type='text' class='input-base token' value={props.item.token} readonly={true} />
        </div>
      </div>
      <div class='row-box'>
        <div class='lable'>Description: </div>
        <div>
          <input type='text' class='input-base description' value={props.item.description} />
        </div>
      </div>
    </div>
  );
};

// show one item
export const TokenShowItem = (props: { item: TokenProps }) => {
  const [item, setItem] = useState(props.item);
  const ref: RefProps = {};
  const css: CssProps = {
    padding: '10px',
    border: 'solid 1px gray',
    margin: '1px',
    position: 'relative',
    '.control-box': {
      display: 'none',
      position: 'absolute',
      right: '10px',
      top: '10px',
    },
    '&:hover .control-box': {
      display: 'block',
    },
    '.lable': {
      width: '85px',
    },
    '.token': {
      lineBreak: 'anywhere',
      wordBreak: 'break-all',
    },
  };

  const onEdit = (ev: any) => {
    showTokenEditItem(item, (updatedItem) => setItem({ ...updatedItem }), false);
  };

  const onRemove = async (ev: any) => {
    if (!confirm('Are you sure you want to delete this token?')) {
      return;
    }
    await removeTokenData(item.token);
    ref.current!.remove();
  };

  const saveText = (text: string) => {
    const updated = { ...item, description: text };
    updateTokenData(updated);
    setItem(updated);
  };

  return (
    <div ref={ref} css={css} class='sample-data'>
      <div class='control-box'>
        <button class='button-base button-ss' onClick={onEdit}>
          Edit
        </button>
        <button class='button-base button-ss' onClick={onRemove}>
          Delete
        </button>
      </div>
      <div class='row-box'>
        <div class='lable'>Token: </div>
        <div class='token'>{item.token}</div>
      </div>
      <div class='row-box'>
        <div class='lable'>Description: </div>
        <div class='flex-1'>
          <EditableLabel text={item.description} save={saveText} type='text' />
        </div>
      </div>
      <div class='row-box'>
        <div class='lable'>Timestamp: </div>
        <div>{new Date(item.timestamp || 0).toLocaleString()}</div>
      </div>
    </div>
  );
};

// show the list
type TokenListState = {
  pageIndex: number;
  searchText: string;
  data: Awaited<ReturnType<typeof getTokenData>> | null;
};
const TokenList = () => {
  const [state, setState] = useState<TokenListState>({ pageIndex: 0, searchText: '', data: null });
  const ref: RefProps = {
    onLoad: async () => {
      const data = await getTokenData(0, '');
      setState((prev) => ({ ...prev, data }));
    },
  };

  const onAdd = async () => {
    showTokenEditItem(
      { token: await generateToken(), description: '' },
      async () => {
        // navigate to last page after add
        const fresh = await getTokenData(0, state.searchText);
        const lastPage = Math.max(0, Math.floor((fresh.itemsCount - 1) / fresh.pageLimit));
        const lastData = await getTokenData(lastPage, state.searchText);
        setState({ pageIndex: lastPage, searchText: state.searchText, data: lastData });
      },
      true
    );
  };

  const onSearch = async () => {
    const text = ref.$?.('input.search')?.value?.trim() ?? '';
    const data = await getTokenData(0, text);
    setState({ pageIndex: 0, searchText: text, data });
  };

  const onLinkClick = async (index: number) => {
    const data = await getTokenData(index, state.searchText);
    setState((prev) => ({ ...prev, pageIndex: index, data }));
  };

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    '.label': {
      width: '70px',
    },
  };
  return (
    <div ref={ref} css={css}>
      <div>
        <div class='row-box'>
          <div class='label'>Search: </div>
          <input type='text' class='input-base search' value={state.searchText} />
          <button class='button-base mr-s' onClick={onSearch}>
            Search
          </button>
          <button class='button-base' onClick={onAdd}>
            Add
          </button>
        </div>
      </div>
      <div class='list'>
        {state.data && (
          <>
            <PagingLink
              itemsCount={state.data.itemsCount}
              pageIndex={state.data.pageIndex}
              pageLimit={state.data.pageLimit}
              onClick={onLinkClick}
              baseLink=''
            />
            {state.data.result.map((item) => (
              <TokenShowItem item={item} />
            ))}
            <PagingLink
              itemsCount={state.data.itemsCount}
              pageIndex={state.data.pageIndex}
              pageLimit={state.data.pageLimit}
              onClick={onLinkClick}
              baseLink=''
            />
          </>
        )}
      </div>
    </div>
  );
};

export const AdminTokensPage = () => {
  return (
    <div>
      <div>
        <div>Tokens management</div>
        <TokenList />
      </div>
    </div>
  );
};
