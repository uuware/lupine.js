import { ActionSheetSelectPromise, CssProps, RefProps } from 'lupine.components';
import { DesignStore } from './design-store';
import { ComponentRegistry } from './component-registry';

export const SelectionOverlay = ({ store }: { store: DesignStore }) => {
  let isUnmounted = false;
  let selectedEl: HTMLElement | null = null;
  let actionBarEl: HTMLDivElement | null = null;

  const ref: RefProps = {
    onLoad: async () => {
      const clearSelectionUi = () => {
        if (actionBarEl) {
          actionBarEl.remove();
          actionBarEl = null;
        }

        if (selectedEl) {
          selectedEl.style.outline = selectedEl.dataset.ljPrevOutline || '';

          if (selectedEl.dataset.ljAddedPosition === 'true') {
            selectedEl.style.position = selectedEl.dataset.ljPrevPosition || '';
          }

          delete selectedEl.dataset.ljPrevOutline;
          delete selectedEl.dataset.ljPrevPosition;
          delete selectedEl.dataset.ljAddedPosition;
          selectedEl = null;
        }
      };

      const handleInternalDragStart = (e: DragEvent, nodeId: string) => {
        e.stopPropagation();
        e.dataTransfer?.setData('text/plain', JSON.stringify({
          action: 'move-component',
          nodeId: nodeId
        }));
      };

      const updateActionBarPosition = (targetEl: HTMLElement) => {
        if (!actionBarEl) return;

        const rect = targetEl.getBoundingClientRect();
        const isHuge = rect.height > window.innerHeight * 0.7;

        actionBarEl.style.top = '4px';
        actionBarEl.style.bottom = 'auto';

        if (!isHuge) {
          if (rect.top >= 36) {
            actionBarEl.style.top = '-36px';
          } else if (window.innerHeight - rect.bottom >= 36) {
            actionBarEl.style.top = 'auto';
            actionBarEl.style.bottom = '-36px';
          }
        }

        actionBarEl.style.left = 'auto';
        actionBarEl.style.right = '4px';
        // If the right edge of the component is too close to the left screen boundary
        // there won't be enough space for the action bar to grow to the left.
        if (rect.right < 300) {
          actionBarEl.style.left = '4px';
          actionBarEl.style.right = 'auto';
        }
      };

      const createActionButton = (text: string, title: string, onClick?: (e: MouseEvent) => void) => {
        const button = document.createElement('div');
        button.className = 'action-btn';
        button.textContent = text;
        button.title = title;
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.padding = '2px 4px';
        button.style.gap = '4px';
        button.style.borderRadius = '3px';
        button.onmouseenter = () => button.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        button.onmouseleave = () => button.style.backgroundColor = '';
        button.onclick = (e) => {
          e.stopPropagation();
          onClick?.(e);
        };
        return button;
      };

      const renderSelectionUi = () => {
        if (isUnmounted) return;

        clearSelectionUi();

        const selectedId = store.selectedNodeId;
        if (!selectedId) return;

        const escapedSelectedId = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(selectedId) : selectedId.replace(/"/g, '\\"');
        const nextSelectedEl = document.querySelector(`[data-design-id="${escapedSelectedId}"]`) as HTMLElement | null;
        if (!nextSelectedEl) return;

        selectedEl = nextSelectedEl;
        selectedEl.dataset.ljPrevOutline = selectedEl.style.outline;
        selectedEl.dataset.ljPrevPosition = selectedEl.style.position;
        selectedEl.style.outline = '2px dashed #1890ff';

        if (window.getComputedStyle(selectedEl).position === 'static') {
          selectedEl.dataset.ljAddedPosition = 'true';
          selectedEl.style.position = 'relative';
        }

        if (selectedId === 'root-page') return;

        // Node path for Breadcrumbs
        const nodePath = store.getNodePath(selectedId);
        let ancestors = nodePath ? nodePath.slice(0, -1).reverse() : [];
        ancestors = ancestors.filter(a => a.id !== 'root-page');

        actionBarEl = document.createElement('div');
        actionBarEl.className = 'lj-selection-action-bar';
        actionBarEl.style.position = 'absolute';
        actionBarEl.style.display = 'flex';
        actionBarEl.style.flexDirection = 'row';
        actionBarEl.style.alignItems = 'center';
        actionBarEl.style.gap = '4px';
        actionBarEl.style.backgroundColor = '#1890ff';
        actionBarEl.style.color = 'white';
        actionBarEl.style.padding = '4px 8px';
        actionBarEl.style.fontSize = '12px';
        actionBarEl.style.borderRadius = '4px';
        actionBarEl.style.pointerEvents = 'auto';
        actionBarEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        actionBarEl.style.zIndex = '10000';
        actionBarEl.style.whiteSpace = 'nowrap';
        actionBarEl.onclick = (e) => e.stopPropagation();

        const dragButton = createActionButton('≡', 'Drag to move');
        dragButton.draggable = true;
        dragButton.style.cursor = 'grab';
        dragButton.ondragstart = (e) => handleInternalDragStart(e, selectedId);
        actionBarEl.appendChild(dragButton);

        const deleteButton = createActionButton('✕', 'Delete', async () => {
          const index = await ActionSheetSelectPromise({
            title: 'Delete component?',
            options: ['OK'],
            cancelButtonText: 'Cancel',
          });
          if (index !== 0) {
            return;
          }
          store.removeNode(selectedId);
        });
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.color = '#ffbba6';
        actionBarEl.appendChild(deleteButton);

        ancestors.forEach((ancestor) => {
          const compDef = ComponentRegistry[ancestor.type];
          const label = compDef ? compDef.label : ancestor.type;

          const wrapper = document.createElement('div');
          wrapper.style.display = 'flex';
          wrapper.style.alignItems = 'center';

          const separator = document.createElement('div');
          separator.className = 'separator';
          separator.textContent = '|';
          separator.style.opacity = '0.4';
          separator.style.margin = '0 2px';
          separator.style.fontSize = '10px';
          wrapper.appendChild(separator);

          const ancestorButton = createActionButton(label, `Select ${label}`, () => store.selectNode(ancestor.id));
          ancestorButton.style.cursor = 'pointer';
          ancestorButton.style.fontSize = '11px';
          ancestorButton.style.fontWeight = 'normal';
          ancestorButton.style.opacity = '0.8';
          wrapper.appendChild(ancestorButton);

          actionBarEl!.appendChild(wrapper);
        });

        // top page property
        const pagePropertyButton = createActionButton('🏠', 'Page Properties', () => store.selectNode('root-page'));
        pagePropertyButton.style.cursor = 'pointer';
        pagePropertyButton.style.fontSize = '13px';
        actionBarEl.appendChild(pagePropertyButton);

        selectedEl.appendChild(actionBarEl);
        updateActionBarPosition(selectedEl);
      };

      const handleViewportChange = () => {
        if (selectedEl) updateActionBarPosition(selectedEl);
      };

      store.on('NODE_SELECTED', renderSelectionUi);
      store.on('TREE_UPDATE', renderSelectionUi);
      store.on('PREVIEW_TOGGLED', renderSelectionUi);
      window.addEventListener('resize', handleViewportChange);
      window.addEventListener('scroll', handleViewportChange, true);

      renderSelectionUi();

      (ref as any)._cleanup = () => {
        store.off('NODE_SELECTED', renderSelectionUi);
        store.off('TREE_UPDATE', renderSelectionUi);
        store.off('PREVIEW_TOGGLED', renderSelectionUi);
        window.removeEventListener('resize', handleViewportChange);
        window.removeEventListener('scroll', handleViewportChange, true);
        clearSelectionUi();
      };
    },
    onUnload: async () => {
      isUnmounted = true;
      (ref as any)._cleanup?.();
    }
  };

  const css: CssProps = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 9999,
  };

  return <div css={css} ref={ref} />;
};
