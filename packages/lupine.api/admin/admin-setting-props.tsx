import { FloatWindow, RefProps, HEditor } from "lupine.components";
import { AdminSelectPage } from './admin-page-list';

export interface SettingItem {
  label: string;
  type: string;
  name: string;
  tip?: string;
  options?: { value: string; label: string }[];
}

export interface SettingGroup {
  groupName: string;
  items: SettingItem[];
}

export const SettingItemRender = ({ item, ref }: { item: SettingItem, ref: RefProps }) => {
  const key = item.name;

  const openHtmlEditor = (key: string, title: string) => {
    const currentValue = ref.$(`.f-${key}`).value;

    let edt: HEditor | undefined;
    const editorRef: RefProps = {
      onLoad: async () => {
        const container = editorRef.$('.edit-view-box');
        if (container) {
          edt = HEditor.getEditor(container, currentValue);
        }
      },
    };

    FloatWindow.show({
      title: `Edit ${title}`,
      contentMinWidth: '80%',
      buttons: ['Cancel', 'Save'],
      handleClicked: (index, close) => {
        if (index === 1 && edt) {
          ref.$(`.f-${key}`).value = edt.getHtml();
        }
        close();
      },
      children: (
        <div ref={editorRef} style={{ width: '100%', boxSizing: 'border-box', height: '500px', display: 'flex', flexDirection: 'column' }}>
          <div
            class="edit-view-box"
            style={{ flex: 1, border: '1px solid var(--primary-border)', borderRadius: '4px', overflow: 'hidden' }}
          ></div>
        </div>
      )
    });
  };

  const openCmsPageSelector = async (key: string) => {
    const currentValue = ref.$(`.f-${key}`).value;
    await AdminSelectPage({
      isMultiple: false,
      selectedIds: currentValue ? [currentValue] : [],
      isComponentOnly: false,
      handleSelectedIds: (ids: string[]) => {
        ref.$(`.f-${key}`).value = ids[0] || '';
      },
    });
  };

  return (
    <div class='row-box mb-m cfg-item-row'>
      <label class='cfg-label'>{item.label}:</label>

      <div class='cfg-control flex-1'>
        {(item.type === 'text' || item.type === 'number' || item.type === 'color') && (
          <input type={item.type} class={`cfg-input input-base f-${key}`} />
        )}

        {item.type === 'select' && (
          <select class={`cfg-input input-base f-${key}`}>
            {item.options?.map((opt: any) => (
              <option value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}

        {item.type === 'checkbox' && (
          <div class="row-box flex-1">
            <input type="checkbox" class={`f-${key}`} style={{ marginRight: '8px' }} />
          </div>
        )}

        {item.type === 'html' && (
          <div class="row-box flex-1">
            <input type='text' class={`cfg-input input-base f-${key}`} />
            <button class='button-base html-editor-btn' onClick={() => openHtmlEditor(key, item.label)}>
              ...
            </button>
          </div>
        )}

        {item.type === 'cms-page' && (
          <div class="row-box flex-1">
            <input type='text' class={`cfg-input input-base f-${key}`} />
            <button class='button-base html-editor-btn' onClick={() => openCmsPageSelector(key)}>
              ...
            </button>
          </div>
        )}

        {item.tip && <div class='cfg-tip'>{item.tip}</div>}
      </div>
    </div>
  );
};
