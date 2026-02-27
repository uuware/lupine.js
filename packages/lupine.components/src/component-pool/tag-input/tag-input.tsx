import { CssProps, getGlobalStylesId, bindGlobalStyle, RefProps } from 'lupine.web';
import { HtmlVar } from '../../components/html-var';
import { ActionSheetMultiSelectPromise } from '../../components/action-sheet';

export type TagInputProps = {
  options: string[];
  selectedIndices?: number[];
  placeholder?: string;
  disabled?: boolean;
  maxCount?: number;
  align?: 'left' | 'center' | 'right';
  title?: string;
  onChange?: (selectedIndices: number[], selectedOptions: string[]) => void;
  class?: string;
  css?: CssProps;
};

const tagInputCss: CssProps = {
  display: 'flex',
  '&.disabled': {
    backgroundColor: 'var(--primary-bg-color-hover, #f5f5f5)',
    cursor: 'not-allowed',
    opacity: '0.7',
  },
  '&:hover': {
    borderColor: 'var(--activatable-color-normal, #4080ff)',
  },
  '&.disabled:hover': {
    borderColor: 'var(--primary-border-color)',
  },
  '.&-tag-box': {
    border: '1px solid var(--primary-border-color)',
    borderRadius: 'var(--border-radius-m, 8px)',
    backgroundColor: 'var(--primary-bg-color, #fff)',
    minHeight: '40px',
    padding: '4px 8px',
    cursor: 'pointer',
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    gap: '2px',
    alignItems: 'center',
    opacity: '1',
  },

  '.&-placeholder': {
    color: 'var(--secondary-color, #999)',
    fontSize: '14px',
    paddingLeft: '4px',
  },

  '.&-tag': {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'var(--activatable-bg-color-hover, rgba(0,0,0,0.06))',
    color: 'var(--primary-color)',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '13px',
    lineHeight: '20px',
  },

  '.&-tag-remove': {
    marginLeft: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    lineHeight: '1',
    color: 'var(--secondary-color, #999)',
    transition: 'color 0.2s',
    '&:hover': {
      color: 'var(--error-color, #ff4d4f)',
    },
  },
};

export const TagInput = ({
  options = [],
  selectedIndices = [],
  placeholder = 'Select tags...',
  disabled = false,
  maxCount,
  align = 'center',
  title = 'Select Tags',
  onChange,
  class: cls,
  css: extraCss,
}: TagInputProps) => {
  const globalCssId = getGlobalStylesId(tagInputCss);
  bindGlobalStyle(globalCssId, tagInputCss);

  const ref: RefProps = {
    globalCssId,
  };

  let currentSelection = [...selectedIndices];

  const renderTags = () => {
    // pass globalCssId for & in classname
    const tempRef: RefProps = {
      globalCssId,
    };
    if (currentSelection.length === 0) {
      return (
        <span class='&-tag-box &-placeholder' ref={tempRef}>
          {placeholder}
        </span>
      );
    }

    return (
      <div class='&-tag-box' ref={tempRef}>
        {currentSelection.map((idx) => (
          <div class='&-tag'>
            <span class='&-tag-text'>{options[idx]}</span>
            {!disabled && (
              <span
                class='&-tag-remove'
                onClick={(e: any) => {
                  e.stopPropagation();
                  removeTag(idx);
                }}
              >
                ×
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const update = (newSelection: number[]) => {
    currentSelection = newSelection;
    dom.value = renderTags();
    onChange?.(
      currentSelection,
      currentSelection.map((i) => options[i])
    );
  };

  const removeTag = (idxToRemove: number) => {
    if (disabled) return;
    update(currentSelection.filter((i) => i !== idxToRemove));
  };

  const openSelector = async () => {
    if (disabled) return;
    const result = await ActionSheetMultiSelectPromise({
      title,
      options,
      initialSelected: currentSelection,
      align,
      maxCount,
      closeWhenClickOutside: true,
    });
    // result is the array of selected indices, sorted conceptually or by definition
    update(result);
  };

  const dom = new HtmlVar(renderTags());

  // Combine native classes, framework namespace (from globalCssId), and optional extra classes
  let finalClass = cls || '';
  if (disabled) finalClass += ' disabled';

  return (
    <div ref={ref} css={extraCss} class={finalClass} onClick={openSelector}>
      {dom.node}
    </div>
  );
};
