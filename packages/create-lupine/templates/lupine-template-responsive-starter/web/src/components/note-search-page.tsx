import { CssProps, HeaderWithBackFrame, HtmlVar, RefProps, SliderFrame, SliderFrameHookProps } from 'lupine.components';
import { SearchInput, SearchInputHookProps } from './search-input';
import { InputHistoryComponent, addHistoryItem } from './input-history-component';
import { LocalNoteProps, LocalNotesService } from '../services/local-notes-service';
import { NoteDetailComponent } from './note-detail';
import { clearHistoryList } from './input-history-component';

const extractText = (html: string) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

export const NoteSearchComponent = (props: { sliderFrameHook: SliderFrameHookProps }) => {
  const listDom = new HtmlVar('');
  const historyDom = new HtmlVar('');

  const searchInputHook: SearchInputHookProps = {};
  // this is the inner slide hook for editing from search results
  const subSliderHook: SliderFrameHookProps = {};

  const historyKey = 'note-search';

  const onSearch = (value?: string) => {
    const val = (value || '').trim();
    if (val) {
      addHistoryItem(historyKey, val);
      hideHistory();
    } else {
      showHistory();
    }
    refreshList(val);
  };

  const onClearSearch = () => {
    onSearch('');
  };

  const showHistory = () => {
    historyDom.value = (
      <InputHistoryComponent
        historyKey={historyKey}
        onClearHistory={() => {
          clearHistoryList(historyKey);
          showHistory();
        }}
        onItemClick={(item) => {
          searchInputHook.setValue!(item);
          onSearch(item);
        }}
      />
    );
  };

  const hideHistory = () => {
    historyDom.value = '';
  };

  const onViewNote = (note: LocalNoteProps) => {
    subSliderHook.load!(
      <NoteDetailComponent
        note={note}
        sliderFrameHook={subSliderHook}
        onSaved={() => {
          // We re-query the note values after saving. Easiest is to trigger search again.
          const val = document.querySelector('.search-input .search-in-input') as HTMLInputElement;
          if (val) onSearch(val.value);
        }}
      />
    );
  };

  const refreshList = (query: string) => {
    if (!query) {
      listDom.value = '';
      return;
    }

    const allNotes = LocalNotesService.getAllNotes();
    const filteredNotes = allNotes.filter(
      (n) =>
        n.title.toLowerCase().includes(query.toLowerCase()) || n.content.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredNotes.length === 0) {
      listDom.value = (
        <div
          class='note-empty-state'
          style={{ marginTop: '40px', textAlign: 'center', color: 'var(--secondary-color)' }}
        >
          No search results
        </div>
      );
      return;
    }

    listDom.value = (
      <div class='note-list-container' style={{ paddingTop: '16px' }}>
        {filteredNotes.map((note) => (
          <div class='note-card-wrapper search-result-card-wrapper'>
            <div class='note-card row-box search-result-card' onClick={() => onViewNote(note)}>
              <div class='note-card-content flex-1'>
                <div class='note-card-title'>{note.title}</div>
                <div class='note-card-preview ellipsis'>{extractText(note.content)}</div>
                <div class='note-card-date'>{new Date(note.updatedAt).toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const css: CssProps = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    backgroundColor: 'var(--primary-bg-color)',
    padding: '0 16px',

    '.search-result-card-wrapper': {
      marginBottom: '16px',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
      backgroundColor: 'var(--secondary-bg-color)',
    },
    '.search-result-card': {
      backgroundColor: 'var(--primary-bg-color)',
      borderRadius: '12px',
      padding: '16px',
      cursor: 'pointer',
      alignItems: 'center',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:active': {
        transform: 'scale(0.98)',
      },
    },
    '.note-card-title': {
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'var(--primary-color)',
      marginBottom: '4px',
    },
    '.note-card-preview': {
      fontSize: '14px',
      color: 'var(--secondary-color)',
      marginBottom: '6px',
    },
    '.note-card-date': {
      fontSize: '12px',
      color: 'var(--secondary-color)',
      opacity: 0.8,
    },
  };

  const ref: RefProps = {
    onLoad: async () => {
      showHistory();
      // focus input
      const input = ref.$('.search-in-input') as HTMLInputElement;
      if (input) {
        requestAnimationFrame(() => input.focus());
      }
    },
  };

  const headerTitle = (
    <SearchInput
      placeholder='Search title or content...'
      onSearch={onSearch}
      onClear={onClearSearch}
      onFocus={showHistory}
      class='w-100p'
      hook={searchInputHook}
    />
  );

  return (
    <HeaderWithBackFrame
      title={headerTitle}
      right={<span></span>}
      onBack={(event) => props.sliderFrameHook.close!(event)}
    >
      <div ref={ref} css={css} class='note-search-page'>
        <SliderFrame hook={subSliderHook} />
        {historyDom.node}
        {listDom.node}
      </div>
    </HeaderWithBackFrame>
  );
};
