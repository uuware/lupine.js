import { CssProps, RefProps } from 'lupine.components';
import { MobileTopSysIcon } from 'lupine.components';

// Helper hook pattern to pass search calls back to the Homepage
export const NoteSearchHelper: {
  triggerSearch?: (query: string) => void;
} = {};

export const MobileTopSearchMenu = () => {
  const css: CssProps = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',

    '.mobile-top-menu-left': {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'var(--primary-color)',
    },
    '.mobile-top-menu-right': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '12px',
    },
    '.mtm-input-group': {
      display: 'none',
      flex: 1,
      marginRight: '12px',
    },
    '.mtm-input-box': {
      width: '100%',
      padding: '4px 8px',
      borderRadius: '4px',
      border: '1px solid var(--secondary-border-color)',
      backgroundColor: 'var(--primary-bg-color)',
      color: 'var(--primary-color)',
    },
    '.mtm-search-icon, .mtm-menu-icon, .mtm-search-cancel': {
      cursor: 'pointer',
      display: 'flex',
    },
    '.mtm-search-cancel': {
      display: 'none',
      fontSize: '14px',
      color: 'var(--primary-color)',
    },

    // Toggle state specific styles
    '&.show-search': {
      '.mobile-title': { display: 'none' },
      '.mtm-search-icon': { display: 'none' },
      '.mtm-input-group': { display: 'flex' },
      '.mtm-search-cancel': { display: 'flex' },
    },
  };

  const ref: RefProps = {
    onLoad: async () => {
      ref.$('.mtm-input-box')?.addEventListener('keyup', (e: Event) => {
        if ((e as KeyboardEvent).key === 'Enter') {
          onStartSearch();
        }
      });
    },
  };

  const toggleSearchMode = () => {
    const root = ref.current;
    if (root) {
      const isSearchMode = root.classList.toggle('show-search');
      if (isSearchMode) {
        (ref.$('.mtm-input-box') as HTMLElement)?.focus();
      } else {
        // Clear search when canceling
        (ref.$('.mtm-input-box') as HTMLInputElement).value = '';
        NoteSearchHelper.triggerSearch?.('');
      }
    }
  };

  const onStartSearch = () => {
    const val = (ref.$('.mtm-input-box') as HTMLInputElement).value;
    NoteSearchHelper.triggerSearch?.(val);
  };

  return (
    <div ref={ref} css={css} class='mobile-top-menu-box'>
      <div class='mobile-top-menu-left'>
        <div class='mobile-title'>Notes</div>
        <div class='mtm-input-group'>
          <input
            type='text'
            spellcheck={false}
            class='mtm-input-box'
            placeholder='Search notes...'
            autocomplete='off'
          />
        </div>
      </div>
      <div class='mobile-top-menu-right'>
        <div class='mtm-search-cancel' onClick={toggleSearchMode}>
          Cancel
        </div>
        <div class='mtm-search-icon' onClick={toggleSearchMode}>
          <i class='ifc-icon bs-search'></i>
        </div>
        <div class='mtm-menu-icon'>
          <MobileTopSysIcon />
        </div>
      </div>
    </div>
  );
};
