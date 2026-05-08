import { PopupMenuWithButton, PopupMenuWithLabel } from 'lupine.components';
import { CssProps } from 'lupine.web';
import { DesignNode, getDesignStore } from './design-store';

type PopupListItem = {
  text?: string;
  url?: string;
};

const normalizeList = (list: any): PopupListItem[] => {
  if (Array.isArray(list)) {
    return list.map((item) => {
      if (typeof item === 'string') {
        return { text: item, url: '' };
      }
      return { text: item?.text || item?.label || '', url: item?.url || item?.href || '' };
    }).filter((item) => item.text || item.url);
  }

  if (typeof list === 'string') {
    try {
      return normalizeList(JSON.parse(list));
    } catch (e) {
      return list
        .split('\n')
        .map((line) => {
          const [text, url = ''] = line.split('|');
          return { text: text.trim(), url: url.trim() };
        })
        .filter((item) => item.text || item.url);
    }
  }

  return [];
};

export const BlockPopup = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props || {};
  const type = p.type === 'label' ? 'label' : 'button';
  const listItems = normalizeList(p.list);
  const popupList = listItems.map((item, index) => ({
    id: `popup-${props.node.id}-${index}`,
    text: item.text || item.url || `Item ${index + 1}`,
    url: item.url || '',
  }));

  const css: CssProps = {
    margin: p.margin || '0',
    padding: p.padding || '0',
    minWidth: '0',
    flex: p.flex === '1' ? '1 1 0' : '0 0 auto',
    width: p.width || (p.flex === '1' ? '100%' : 'auto'),
    boxSizing: 'border-box',
    textAlign: p.textAlign || 'left',
    ...(p._sys_css || {}),
    '.block-popup-control': {
      display: 'inline-block',
      pointerEvents: isPreview ? 'auto' : 'none',
    },
  };

  const handleSelected = (_val: string, item: any) => {
    if (!isPreview) return;
    const url = String(item?.url || '').trim();
    if (!url) return;

    if (typeof window !== 'undefined') {
      window.location.href = url;
    }
  };

  const commonProps = {
    label: p.label || 'Menu',
    list: popupList,
    defaultValue: p.defaultValue || '',
    tips: p.tips || '',
    noUpdateLabel: p.noUpdateLabel === true || p.noUpdateLabel === 'true',
    align: p.align === 'left' ? 'left' as const : 'right' as const,
    handleSelected,
  };

  return (
    <div css={css} class='block-popup' data-design-id={props.node.id}>
      <div class='block-popup-control'>
        {type === 'label' ? (
          <PopupMenuWithLabel {...commonProps} />
        ) : (
          <PopupMenuWithButton {...commonProps} />
        )}
      </div>
    </div>
  );
};
