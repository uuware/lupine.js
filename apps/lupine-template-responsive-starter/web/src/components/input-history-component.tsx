import { bindGlobalStyle, CssProps } from 'lupine.components';

export const getHistoryList = (key: string): string[] => {
  try {
    const hist = localStorage.getItem(`search_history_${key}`);
    return hist ? JSON.parse(hist) : [];
  } catch (e) {
    return [];
  }
};

export const addHistoryItem = (key: string, item: string) => {
  const current = getHistoryList(key);
  const filtered = current.filter((x) => x !== item);
  filtered.unshift(item);
  // keep max 20
  if (filtered.length > 20) {
    filtered.pop();
  }
  localStorage.setItem(`search_history_${key}`, JSON.stringify(filtered));
};

export const clearHistoryList = (key: string) => {
  localStorage.removeItem(`search_history_${key}`);
};

export const InputHistoryComponent = (props: {
  label?: string;
  historyKey: string;
  onClearHistory: () => void;
  onItemClick: (item: string) => void;
}) => {
  const list = getHistoryList(props.historyKey);
  const css: CssProps = {
    padding: '4px 0',
    '.history-c-header': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '4px 0',
    },
    '.history-c-h-title': {
      fontSize: '12px',
    },
    '.history-c-h-icon': {
      fontSize: '16px',
      cursor: 'pointer',
    },
    '.history-c-body': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '8px',
    },
    '.history-c-item': {
      padding: '4px 12px',
      borderRadius: '6px',
      border: '1px solid var(--secondary-border-color)',
      backgroundColor: 'var(--secondary-bg-color)',
      color: 'var(--primary-color)',
      fontSize: '13px',
      width: 'fit-content',
      cursor: 'pointer',
    },
    '.history-c-item:hover': {
      backgroundColor: 'var(--activatable-bg-color-hover, rgba(0,0,0,0.04))',
    },
  };
  bindGlobalStyle('history-c-box', css);

  if (list.length === 0) {
    return <></>;
  }

  return (
    <div css={css} class='history-c-box'>
      <div class='history-c-header'>
        <div class='history-c-h-title'>{props.label || 'History Search List'}</div>
        <div class='history-c-h-icon'>
          <i class='ifc-icon ma-delete-off-outline' onClick={props.onClearHistory}></i>
        </div>
      </div>
      <div class='history-c-body'>
        {list.map((item) => (
          <div class='history-c-item' onClick={() => props.onItemClick(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
