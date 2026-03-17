import {
  CssProps,
  HtmlVar,
  MobileHeaderCenter,
  MobileHeaderTitleIcon,
  PageProps,
  RefProps,
  SliderFrame,
  SliderFrameHookProps,
  MobileHeaderEmptyIcon,
  MobileTopSysIcon,
  ActionSheetSelect,
  createDragUtil,
  DomUtils,
} from 'lupine.components';
import { NoteSearchComponent } from '../components/note-search-page';
import { LocalNoteProps, LocalNotesService } from '../services/local-notes-service';
import { NoteEditComponent } from '../components/note-edit';
import { NoteDetailComponent } from '../components/note-detail';

const extractText = (html: string) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

export const HomePage = async (props: PageProps) => {
  let currentSearchQuery = '';
  const dom = new HtmlVar('');
  const sliderFrameHook: SliderFrameHookProps = {};

  let draggedAmount = 0;
  let menuClosedJustNow = false;

  const onOpenSearch = () => {
    resetSwipeMenus();
    sliderFrameHook.load!(<NoteSearchComponent sliderFrameHook={sliderFrameHook} />);
  };

  const onAddNote = () => {
    sliderFrameHook.load!(<NoteEditComponent sliderFrameHook={sliderFrameHook} onSaved={refreshList} />);
    resetSwipeMenus();
  };

  const onEditNote = (note: LocalNoteProps) => {
    sliderFrameHook.load!(<NoteEditComponent note={note} sliderFrameHook={sliderFrameHook} onSaved={refreshList} />);
  };

  const onViewNote = (note: LocalNoteProps) => {
    resetSwipeMenus();
    sliderFrameHook.load!(<NoteDetailComponent note={note} sliderFrameHook={sliderFrameHook} onSaved={refreshList} />);
  };

  const onDeleteNote = async (id: number, e: Event) => {
    e.stopPropagation(); // prevent edit trigger
    await ActionSheetSelect.show({
      title: 'Are you sure you want to delete this note?',
      options: ['Remove'],
      cancelButtonText: 'Cancel',
      handleClicked: async (index: number, close: () => void) => {
        close();
        if (index === 0) {
          LocalNotesService.deleteNote(id);
          refreshList();
        }
      },
    });
  };

  const dragUtil = createDragUtil();
  dragUtil.setOnMoveCallback((clientX, clientY, movedX) => {
    const dragDom = dragUtil.getDraggingDom();
    if (!dragDom) return;

    if (dragDom.classList.contains('note-card')) {
      let translateX = movedX;
      if (translateX > 0) translateX = 0;
      if (translateX < -100) translateX = -100;
      dragDom.style.transform = `translateX(${translateX}px)`;
      draggedAmount = Math.abs(movedX);

      const actionLayer = dragDom.previousElementSibling as HTMLDivElement;
      if (actionLayer && actionLayer.classList.contains('note-card-actions-layer')) {
        actionLayer.style.opacity = translateX < -5 ? '1' : '0';
      }
    } else if (dragDom.classList.contains('note-card-drag-handle')) {
      resetSwipeMenus();
      const cardWrapper = dragDom.closest('.note-card-wrapper') as HTMLDivElement;
      if (!cardWrapper) return;

      // visual feedback for dragging
      cardWrapper.style.opacity = '0.9';
      cardWrapper.style.transform = 'scale(1.02)';
      cardWrapper.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
      cardWrapper.style.outline = '2px solid var(--primary-accent-color)';
      cardWrapper.style.zIndex = '100';

      const container = DomUtils.bySelector('.note-list-container') as HTMLDivElement;
      if (!container) return;

      const cards = container.querySelectorAll('.note-card-wrapper') as NodeListOf<HTMLDivElement>;
      if (cards.length <= 1) return;
      const rect = container.getBoundingClientRect();
      const relativeY = clientY - rect.top + container.scrollTop;

      let index = -1;
      for (let i = 0; i < cards.length; i++) {
        const cardTop = cards[i].offsetTop;
        const cardBottom = cardTop + cards[i].offsetHeight;
        if (relativeY >= cardTop && relativeY <= cardBottom) {
          index = i;
          break;
        }
      }

      if (index >= 0) {
        const targetCard = cards[index];
        if (cardWrapper !== targetCard) {
          let index2 = -1;
          for (let i = 0; i < cards.length; i++) {
            if (cards[i] === cardWrapper) {
              index2 = i;
              break;
            }
          }
          if (index2 >= 0) {
            if (index2 < index) {
              targetCard.parentNode?.insertBefore(cardWrapper, targetCard.nextSibling);
            } else {
              targetCard.parentNode?.insertBefore(cardWrapper, targetCard);
            }
          }
        }
      }
      // Set grabbed amount explicitly to avoid triggering any click events later
      draggedAmount = 100;
    }
  });

  dragUtil.setOnMoveEndCallback(() => {
    const dragDom = dragUtil.getDraggingDom();
    if (!dragDom) return;

    if (dragDom.classList.contains('note-card')) {
      const currentTransform = dragDom.style.transform;
      const match = currentTransform.match(/translateX\(([-\d\.]+)px\)/);
      if (match) {
        const x = parseFloat(match[1]);
        if (x < -50) {
          dragDom.style.transform = `translateX(-100px)`;
        } else {
          dragDom.style.transform = `translateX(0px)`;
          const actionLayer = dragDom.previousElementSibling as HTMLDivElement;
          if (actionLayer && actionLayer.classList.contains('note-card-actions-layer')) {
            actionLayer.style.opacity = '0';
          }
        }
      } else {
        dragDom.style.transform = `translateX(0px)`;
        const actionLayer = dragDom.previousElementSibling as HTMLDivElement;
        if (actionLayer && actionLayer.classList.contains('note-card-actions-layer')) {
          actionLayer.style.opacity = '0';
        }
      }
    } else if (dragDom.classList.contains('note-card-drag-handle')) {
      const cardWrapper = dragDom.closest('.note-card-wrapper') as HTMLDivElement;
      if (cardWrapper) {
        cardWrapper.style.opacity = '1';
        cardWrapper.style.transform = 'scale(1)';
        cardWrapper.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)';
        cardWrapper.style.outline = 'none';
        cardWrapper.style.zIndex = '';
      }

      const container = DomUtils.bySelector('.note-list-container') as HTMLDivElement;
      if (!container) return;
      const cards = container.querySelectorAll('.note-card') as NodeListOf<HTMLDivElement>;
      const newOrderIds: number[] = [];
      cards.forEach((c) => newOrderIds.push(parseInt(c.getAttribute('data-id') || '0')));
      if (newOrderIds.length > 0) {
        LocalNotesService.updateNoteOrders(newOrderIds);
      }
    }
  });

  const resetSwipeMenus = (excludeId?: number): boolean => {
    let closedAny = false;
    const cards = document.querySelectorAll('.note-list-container .note-card') as NodeListOf<HTMLDivElement>;
    cards.forEach((c) => {
      if (excludeId !== undefined) {
        const id = parseInt(c.getAttribute('data-id') || '-1');
        if (id === excludeId) return;
      }
      const transform = c.style.transform;
      const match = transform.match(/translateX\(([-\d\.]+)px\)/);
      if (match && parseFloat(match[1]) < -5) {
        c.style.transform = 'translateX(0px)';
        const actionLayer = c.previousElementSibling as HTMLDivElement;
        if (actionLayer && actionLayer.classList.contains('note-card-actions-layer')) {
          actionLayer.style.opacity = '0';
        }
        closedAny = true;
      }
    });

    return closedAny;
  };

  const handleBgTouch = (e: Event) => {
    let target = e.target as Element;
    if (target && target.closest && target.closest('.action-btn')) return;
    if (target && target.closest && target.closest('.note-card')) return;
    resetSwipeMenus();
  };

  const refreshList = () => {
    const allNotes = LocalNotesService.getAllNotes();
    const filteredNotes = currentSearchQuery
      ? allNotes.filter(
          (n) =>
            n.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
            n.content.toLowerCase().includes(currentSearchQuery.toLowerCase())
        )
      : allNotes;

    if (filteredNotes.length === 0) {
      dom.value = <div class='note-empty-state'>No search results</div>;
      return;
    }

    dom.value = (
      <div class='note-list-container' style={{ position: 'relative' }}>
        {filteredNotes.map((note) => (
          <div class='note-card-wrapper'>
            <div class='note-card-actions-layer'>
              <div
                class='action-btn edit-btn'
                onClick={(e) => {
                  e.stopPropagation();
                  onEditNote(note);
                }}
              >
                <i class='ifc-icon ma-pencil-outline' />
              </div>
              <div
                class='action-btn delete-btn'
                onClick={(e) => {
                  onDeleteNote(note.id, e);
                }}
              >
                <i class='ifc-icon ma-delete-off-outline' />
              </div>
            </div>
            <div
              class='note-card row-box'
              style={{ borderLeft: note.color ? `6px solid ${note.color}` : '' }}
              data-id={note.id}
              onMouseDown={(e) => {
                resetSwipeMenus(note.id);
                draggedAmount = 0;
                dragUtil.onMouseDown(e);
              }}
              onTouchStart={(e) => {
                resetSwipeMenus(note.id);
                draggedAmount = 0;
                dragUtil.onTouchStart(e);
              }}
              onClick={(e) => {
                if (draggedAmount > 5) return;
                const cardDom = e.currentTarget as HTMLElement;
                const transform = cardDom.style.transform;
                const match = transform.match(/translateX\(([-\d\.]+)px\)/);
                if (match && parseFloat(match[1]) < -5) {
                  // user clicked the opened card itself, just close it
                  cardDom.style.transform = 'translateX(0px)';
                  const actionLayer = cardDom.previousElementSibling as HTMLDivElement;
                  if (actionLayer && actionLayer.classList.contains('note-card-actions-layer')) {
                    actionLayer.style.opacity = '0';
                  }
                  return;
                }
                const closedOther = resetSwipeMenus();
                if (closedOther) return; // if it was open on another card, swallow the click
                onViewNote(note);
              }}
            >
              <div class='note-card-content flex-1' style={{ minWidth: 0 }}>
                <div class='note-card-title'>{note.title}</div>
                <div class='note-card-preview ellipsis'>{extractText(note.content)}</div>
                <div class='note-card-date'>{new Date(note.updatedAt).toLocaleString()}</div>
              </div>
              <div
                class='note-card-drag-handle'
                onMouseDown={(e) => {
                  e.stopPropagation();
                  dragUtil.onMouseDown(e);
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  dragUtil.onTouchStart(e);
                }}
              >
                <i class='ifc-icon bs-list' />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const ref: RefProps = {
    onLoad: async () => {
      refreshList();
    },
  };

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',

    '.note-home-scroll': {
      flex: 1,
      overflowY: 'auto',
      padding: '16px',
    },
    '.note-empty-state': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      color: 'var(--secondary-color)',
      fontSize: '16px',
    },
    '.note-card': {
      backgroundColor: 'var(--primary-bg-color)',
      borderRadius: '12px',
      padding: '16px',
      cursor: 'pointer',
      alignItems: 'center',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      position: 'relative',
      zIndex: 2,
    },
    '.note-card-actions-layer': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      zIndex: 1,
      backgroundColor: 'transparent', // explicitly prevent background bleeding
      borderRadius: '12px',
      overflow: 'hidden',
      opacity: 0,
      transition: 'opacity 0.2s ease',
    },
    '.action-btn': {
      height: '100%',
      width: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      cursor: 'pointer',
    },
    '.action-btn.edit-btn': { backgroundColor: 'var(--primary-accent-color)' },
    '.action-btn.delete-btn': {
      backgroundColor: '#ff4d4f',
      borderTopRightRadius: '12px',
      borderBottomRightRadius: '12px',
    },
    '.action-btn i': { color: 'white' },
    '.note-card-drag-handle': {
      padding: '8px',
      cursor: 'grab',
      color: 'var(--secondary-color)',
      opacity: 0.5,
      zIndex: 10,
    },
    '.note-card-drag-handle:active': { cursor: 'grabbing' },
    '.note-card-title': {
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'var(--primary-color)',
      marginBottom: '4px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '.note-card-preview': {
      fontSize: '14px',
      color: 'var(--secondary-color)',
      marginBottom: '6px',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    '.note-card-date': {
      fontSize: '12px',
      color: 'var(--secondary-color)',
      opacity: 0.8,
    },
    '.fab-button': {
      backgroundColor: 'var(--primary-accent-color, #1890ff)',
    },
  };

  return (
    <div
      css={css}
      ref={ref}
      onMouseDown={handleBgTouch}
      onTouchStart={handleBgTouch}
      onMouseMove={dragUtil.onMouseMove}
      onMouseUp={dragUtil.onMouseUp}
      onTouchMove={dragUtil.onTouchMove}
      onTouchEnd={dragUtil.onTouchEnd}
    >
      <MobileHeaderCenter>
        <MobileHeaderTitleIcon
          title='Notes'
          left={<MobileHeaderEmptyIcon />}
          right={
            <div class='flex-center-gap-12'>
              <i class='ifc-icon bs-search icon-20-pointer' onClick={onOpenSearch}></i>
              <MobileTopSysIcon />
            </div>
          }
        />
      </MobileHeaderCenter>
      <div class='note-home-scroll no-scrollbar-container'>
        <SliderFrame
          hook={sliderFrameHook}
          afterClose={async () => {
            await resetSwipeMenus();
          }}
        />
        {dom.node}
      </div>
      <div class='fab-button' onClick={onAddNote}>
        <span class='fab-icon'>+</span>
      </div>
    </div>
  );
};
