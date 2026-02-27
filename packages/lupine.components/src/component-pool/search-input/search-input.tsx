import { bindGlobalStyle, getGlobalStylesId, CssProps, RefProps } from 'lupine.web';

export interface SearchInputHookProps {
  setValue?: (value: string) => void;
}

export interface InputWithClearProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  onClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  class?: string;
  searchIcon?: string;
  hook?: SearchInputHookProps;
}

export const SearchInput = (props: InputWithClearProps) => {
  const css: CssProps = {
    display: 'flex',
    flex: 1,
    position: 'relative',
    alignItems: 'center',

    '.&-input': {
      flex: 1,
      paddingRight: '30px',
      boxSizing: 'border-box',
      width: '100%',
      padding: '8px 12px',
      border: 'var(--primary-border, 1px solid #d9d9d9)',
      borderRadius: '4px',
      outline: 'none',
      fontSize: '14px',
      transition: 'border-color 0.3s',
    },
    '.&-input:focus': {
      borderColor: 'var(--primary-color, #1890ff)',
    },
    '.&-search, .&-clear': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: 'var(--secondary-text-color, #8c8c8c)',
      transition: 'color 0.3s',
    },
    '.&-search:hover': {
      color: 'var(--primary-color, #1890ff)',
    },
    '.&-clear:hover': {
      color: 'red',
    },
    '.&-search': {
      right: '8px',
      fontSize: '16px',
    },
    '.&-clear': {
      display: 'none',
      right: '28px',
      fontSize: '18px',
    },
    'input.&-input:not(:placeholder-shown) + .&-clear': {
      display: 'block',
    },
  };

  const globalCssId = getGlobalStylesId(css);
  bindGlobalStyle(globalCssId, css);

  const ref: RefProps = {
    globalCssId,
  };

  const onSearch = () => {
    const input = ref.$('&-input') as HTMLInputElement;
    if (input) {
      props.onSearch(input.value);
    }
  };

  const onClear = () => {
    const input = ref.$('&-input') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
    props.onClear?.();
  };

  if (props.hook) {
    props.hook.setValue = (value: string) => {
      const input = ref.$('&-input') as HTMLInputElement;
      if (input) {
        input.value = value;
      }
    };
  }

  return (
    <div ref={ref} class={['search-input', props.class].join(' ').trim()}>
      <input
        type='text'
        maxLength={30}
        spellcheck={false}
        class='&-input input-base'
        placeholder={props.placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch();
          }
        }}
        onBlur={() => props.onBlur?.()}
        onFocus={() => props.onFocus?.()}
      />
      <div class='&-clear' onClick={onClear}>
        <i class='ifc-icon ma-close' />
      </div>
      <div class='&-search' onClick={onSearch}>
        <i class={['ifc-icon', props.searchIcon || 'bs-search'].join(' ')} />
      </div>
    </div>
  );
};
