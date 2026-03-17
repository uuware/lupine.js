import {
  CssProps,
  NotificationColor,
  NotificationMessage,
  RefProps,
  SliderFrameHookProps,
  HeaderWithBackFrame,
  ActionSheetColorPicker,
} from 'lupine.components';
// HEditor relies on complex setup in original app, fallback to simple textarea for robustness here
import { LocalNoteProps, LocalNotesService } from '../services/local-notes-service';

export const NoteEditComponent = (props: {
  note?: LocalNoteProps;
  sliderFrameHook: SliderFrameHookProps;
  onSaved: () => void;
}) => {
  const isEdit = !!props.note;
  const noteId = props.note ? props.note.id : -1;
  const defaultTitle = props.note ? props.note.title : '';
  const defaultContent = props.note ? props.note.content : '';

  const ref: RefProps = {
    onLoad: async () => {
      // Auto-focus title if new note
      if (!isEdit) {
        const tInput = ref.$('.note-edit-title-input') as HTMLInputElement;
        tInput?.focus();
      }
    },
  };

  let selectedColor = props.note?.color || '';

  const pickColor = async () => {
    const res = await ActionSheetColorPicker({
      value: selectedColor,
      title: 'Select Color Tag',
    });
    if (res !== undefined) {
      selectedColor = res;
      const ind = ref.$('.note-color-preview') as HTMLDivElement;
      if (ind) ind.style.backgroundColor = res || 'transparent';
    }
  };

  const onSave = () => {
    const title = (ref.$('.note-edit-title-input') as HTMLInputElement).value.trim();
    const content = (ref.$('.note-edit-body-input') as HTMLTextAreaElement).value.trim();

    if (!title) {
      NotificationMessage.sendMessage('Please enter a note title', NotificationColor.Error);
      return;
    }

    LocalNotesService.saveNote({
      id: noteId,
      title,
      content,
      color: selectedColor,
      updatedAt: Date.now(),
    });

    NotificationMessage.sendMessage(isEdit ? 'Modified and saved' : 'Note added', NotificationColor.Success);
    props.onSaved();
    props.sliderFrameHook.close!(new MouseEvent('click'));
  };

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'var(--primary-bg-color)',
    padding: '16px',

    '.note-edit-title-input': {
      width: '100%',
      fontSize: '20px',
      fontWeight: 'bold',
      padding: '8px',
      backgroundColor: 'transparent',
      color: 'var(--primary-color)',
      outline: 'none',
      marginBottom: '16px',
      '&:focus': {
        borderBottomColor: 'var(--primary-accent-color)',
      },
    },
    '.note-edit-body-input': {
      flex: 1,
      padding: '12px',
      backgroundColor: 'transparent',
      color: 'var(--primary-color)',
      fontSize: '16px',
      resize: 'none',
      outline: 'none',
      lineHeight: '1.6',
    },
    '.note-edit-color-row': {
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      cursor: 'pointer',
      backgroundColor: 'var(--secondary-bg-color)',
      borderRadius: '8px',
      marginBottom: '16px',
      color: 'var(--primary-color)',
      fontWeight: 'bold',
      fontSize: '16px',
    },
  };

  return (
    <HeaderWithBackFrame
      title={isEdit ? 'Edit Note' : 'New Note'}
      onBack={(e: Event) => props.sliderFrameHook.close!(e)}
      right={
        <div
          onClick={onSave}
          style={{
            color: 'var(--primary-accent-color)',
            fontWeight: 'bold',
            fontSize: '16px',
            padding: '0 8px',
            cursor: 'pointer',
          }}
        >
          Save
        </div>
      }
    >
      <div ref={ref} css={css} class='note-edit-container flex-col h-100'>
        <input
          type='text'
          class='input-base note-edit-title-input'
          placeholder='Title...'
          value={defaultTitle}
          maxLength={50}
        />
        <div class='note-edit-color-row' onClick={pickColor}>
          <div class='flex-1'>Color Tag</div>
          <div
            class='note-color-preview color-preview-box'
            style={{ backgroundColor: selectedColor || 'transparent' }}
          ></div>
          <i class='ifc-icon ma-pencil-outline icon-btn-secondary' />
        </div>
        <textarea class='input-base note-edit-body-input' placeholder='Write your note...'>
          {defaultContent}
        </textarea>
      </div>
    </HeaderWithBackFrame>
  );
};
