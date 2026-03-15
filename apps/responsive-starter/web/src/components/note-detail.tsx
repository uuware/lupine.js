import {
  CssProps,
  PageProps,
  RefProps,
  SliderFrameHookProps,
  HeaderWithBackFrame,
  ActionSheetSelect,
} from 'lupine.components';
import { LocalNoteProps, LocalNotesService } from '../services/local-notes-service';
import { NoteEditComponent } from './note-edit';

interface NoteDetailProps {
  note: LocalNoteProps;
  sliderFrameHook: SliderFrameHookProps;
  onSaved: () => void;
}

export const NoteDetailComponent = async (props: NoteDetailProps) => {
  const css: CssProps = {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
    backgroundColor: 'var(--primary-bg-color)',

    '.note-detail-title': {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'var(--primary-color)',
      marginBottom: '12px',
      lineHeight: '1.4',
    },
    '.note-detail-date': {
      fontSize: '13px',
      color: 'var(--secondary-color)',
    },
    '.note-detail-meta': {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      marginBottom: '24px',
      paddingBottom: '16px',
      borderBottom: '1px solid var(--primary-border-color)',
    },
    '.note-detail-content': {
      fontSize: '16px',
      color: 'var(--primary-color)',
      lineHeight: '1.6',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
    },
    '.header-action-icon': {
      fontSize: '20px',
      padding: '4px',
      cursor: 'pointer',
      color: 'var(--primary-color)',
    },
    '.header-actions-container': {
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
    },
    '.header-action-delete': {
      color: '#ff4d4f',
    },
    '.note-detail-color-marker': {
      width: '16px',
      height: '16px',
      borderRadius: '4px',
    },
  };

  const onEdit = () => {
    // Open edit component and pass the current note
    props.sliderFrameHook.load!(
      <NoteEditComponent note={props.note} sliderFrameHook={props.sliderFrameHook} onSaved={props.onSaved} />
    );
  };

  const onDelete = async () => {
    await ActionSheetSelect.show({
      title: 'Are you sure you want to delete this note?',
      options: ['Remove'],
      cancelButtonText: 'Cancel',
      handleClicked: async (index: number, close: () => void) => {
        close();
        if (index === 0) {
          LocalNotesService.deleteNote(props.note.id);
          props.onSaved(); // trigger list refresh
          props.sliderFrameHook.close!(new MouseEvent('click')); // close detail view
        }
      },
    });
  };

  const pageRight = (
    <div class='header-actions-container'>
      <i class='ifc-icon ma-pencil-outline header-action-icon' onClick={onEdit}></i>
      <i class='ifc-icon ma-delete-off-outline header-action-icon header-action-delete' onClick={onDelete}></i>
    </div>
  );

  return (
    <HeaderWithBackFrame title='Details' onBack={(e: Event) => props.sliderFrameHook.close!(e)} right={pageRight}>
      <div css={css} class='note-detail-wrapper no-scrollbar-container flex-col h-100'>
        <div class='note-detail-title'>{props.note.title}</div>
        <div class='note-detail-meta'>
          {props.note.color && (
            <div class='note-detail-color-marker' style={{ backgroundColor: props.note.color }}></div>
          )}
          <div class='note-detail-date'>{new Date(props.note.updatedAt).toLocaleString()}</div>
        </div>
        <div class='note-detail-content'>{props.note.content}</div>
      </div>
    </HeaderWithBackFrame>
  );
};
