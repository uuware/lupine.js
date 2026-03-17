import { bindGlobalStyle, CssProps, RefProps } from 'lupine.components';

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
    fontSize: '16px',
    '.search-in-input': {
      flex: 1,
      paddingRight: '30px',
      height: '32px',
      padding: '4px 30px 4px 12px',
      borderRadius: '16px',
      border: 'none',
      backgroundColor: 'var(--secondary-bg-color)',
      color: 'var(--primary-color)',
      outline: 'none',
    },
    '.search-in-search, .search-in-clear': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--secondary-color)',
    },
    '.search-in-search': {
      right: '12px',
    },
    '.search-in-clear': {
      display: 'none',
      right: '34px',
    },
    'input.search-in-input:not(:placeholder-shown) + .search-in-clear': {
      display: 'flex',
    },
  };
  bindGlobalStyle('search-input-component', css);

  const ref: RefProps = {};
  const onSearch = () => {
    const value = ref.$('.search-in-input').value;
    props.onSearch(value);
  };
  const onClear = () => {
    ref.$('.search-in-input').value = '';
    props.onClear?.();
  };
  if (props.hook) {
    props.hook.setValue = (value: string) => {
      ref.$('input.search-in-input').value = value;
    };
  }
  return (
    <div ref={ref} class={'search-input-component ' + (props.class || '')}>
      <input
        type='text'
        maxLength={30}
        spellcheck={false}
        class='search-in-input input-base'
        placeholder={props.placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch();
          }
        }}
        onBlur={() => props.onBlur?.()}
        onFocus={() => props.onFocus?.()}
      />
      <div class='search-in-clear' onClick={onClear}>
        <i class='ifc-icon ma-close' />
      </div>
      <div class='search-in-search' onClick={onSearch}>
        <i class={'ifc-icon ' + (props.searchIcon || 'bs-search')} />
      </div>
    </div>
  );
};
