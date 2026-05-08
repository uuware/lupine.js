import { CssProps, HtmlVar, isFrontEnd, PageProps, RefProps } from 'lupine.components';
import { DesignStore, getDesignStore } from './design-store';
import { RenderBlocks } from './render-blocks';
import { SelectionOverlay } from './selection-overlay';
import { ComponentRegistry } from './component-registry';
import { DesignUtils } from './design-utils';

const getCurrentDesignLang = () => {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('lang') || (window.parent as any)?.location?.pathname?.split('/').filter(Boolean)[0] || '';
  } catch (e) {
    return '';
  }
};

const markComponentRefTree = (tree: any, componentId: string, componentName: string) => {
  const clonedTree = JSON.parse(JSON.stringify(tree));
  clonedTree.id = clonedTree.id || componentId;
  clonedTree.props = {
    ...(clonedTree.props || {}),
    _componentRef: {
      id: componentId,
      name: componentName || componentId,
    },
  };
  return clonedTree;
};

export const AdminDesignPage = async (props: PageProps) => {
  if (!isFrontEnd()) {
    return <div>No SSR.</div>;
  }
  if (window.top === window) {
    return <div>This page should be running in an iframe.</div>;
  }

  const rootDom = new HtmlVar(<div>Loading Design...</div>);
  const dragIndicatorDom = new HtmlVar(<div style='display:none' />);

  const renderTree = () => {
    const canvasRoot = document.querySelector('.canvas-root') as HTMLElement | null;
    const scrollRoot = document.scrollingElement || document.documentElement;
    const savedScroll = {
      windowX: window.scrollX,
      windowY: window.scrollY,
      documentX: scrollRoot.scrollLeft,
      documentY: scrollRoot.scrollTop,
      canvasX: canvasRoot?.scrollLeft || 0,
      canvasY: canvasRoot?.scrollTop || 0,
    };
    const restoreScroll = () => {
      const nextCanvasRoot = document.querySelector('.canvas-root') as HTMLElement | null;
      const nextScrollRoot = document.scrollingElement || document.documentElement;
      nextScrollRoot.scrollLeft = savedScroll.documentX;
      nextScrollRoot.scrollTop = savedScroll.documentY;
      if (nextCanvasRoot) {
        nextCanvasRoot.scrollLeft = savedScroll.canvasX;
        nextCanvasRoot.scrollTop = savedScroll.canvasY;
      }
      window.scrollTo(savedScroll.windowX, savedScroll.windowY);
    };

    // Top-level styling that enforces min-height and padding for the entire document canvas
    rootDom.value = (
      <div
        class='canvas-root'
        style={{ height: '100%', padding: '2px', minHeight: '100%', boxSizing: 'border-box', overflowY: 'auto' }}
        onClick={(e) => {
          if (store.isPreviewMode) return;
          const target = e.target as HTMLElement;
          const designNode = target.closest('[data-design-id]');
          if (designNode) {
            e.preventDefault();
            e.stopPropagation();
            const newSelectedId = designNode.getAttribute('data-design-id');
            if (store.selectedNodeId !== newSelectedId) {
              store.selectNode(newSelectedId);
            }
          } else {
            store.selectNode(null);
          }
        }}
        onDragOver={(e) => {
          if (store.isPreviewMode) return;
          e.preventDefault();
          e.stopPropagation();

          const target = e.target as HTMLElement;
          const designNode = target.closest('[data-design-id]');
          if (!designNode) {
            dragIndicatorDom.value = null;
            return;
          }

          const targetId = designNode.getAttribute('data-design-id')!;
          (window as any)._lj_dragTargetId = targetId;

          // Calculate insertion indices for siblings or container children
          const tNode = store.findNode(store.tree, targetId);
          if (!tNode) return;
          const isDropContainer = ComponentRegistry[tNode.type]?.isContainer && tNode.props?.componentMode !== 'html';

          const rect = designNode.getBoundingClientRect();
          const isTopHalf = e.clientY < rect.top + rect.height / 2;
          (window as any)._lj_dragDropIsTopHalf = isTopHalf;

          if (!isDropContainer) {
            // Leaf node. Show indicator line ABOVE or BELOW it
            const parentPath = store.getNodePath(targetId);
            if (!parentPath || parentPath.length < 2) return;

            const topPos = isTopHalf ? rect.top : rect.bottom;
            dragIndicatorDom.value = (
              <div
                style={`position: absolute; pointer-events: none; z-index: 9999; top: ${
                  topPos + window.scrollY - 2
                }px; left: ${rect.left + window.scrollX}px; width: ${
                  rect.width
                }px; height: 4px; background-color: #52c41a; border-radius: 2px;`}
              />
            );
          } else {
            // Container node. If we are just over the container visually, we highlight it.
            // We could compute child gaps here, but highlighting the container is visually simpler for now.
            dragIndicatorDom.value = (
              <div
                style={`position: absolute; pointer-events: none; z-index: 9999; top: ${
                  rect.top + window.scrollY
                }px; left: ${rect.left + window.scrollX}px; width: ${rect.width}px; height: ${
                  rect.height
                }px; border: 2px solid #52c41a; background-color: rgba(82, 196, 26, 0.1); box-sizing: border-box;`}
              />
            );
          }
        }}
        onDragLeave={(e) => {
          if (store.isPreviewMode) return;
          dragIndicatorDom.value = null;
        }}
        onDrop={async (e) => {
          if (store.isPreviewMode) return;
          e.preventDefault();
          e.stopPropagation();
          dragIndicatorDom.value = null;

          try {
            const dataStr = e.dataTransfer?.getData('text/plain');
            if (!dataStr) return;
            const data = JSON.parse(dataStr);
            const targetId = (window as any)._lj_dragTargetId;
            const isTopHalf = (window as any)._lj_dragDropIsTopHalf;
            if (!targetId) return;

            const tNode = store.findNode(store.tree, targetId);
            if (!tNode) return;

            let finalParentId = targetId;
            let finalIndex = -1; // -1 means append

            if (!(ComponentRegistry[tNode.type]?.isContainer && tNode.props?.componentMode !== 'html')) {
              const parentPath = store.getNodePath(targetId);
              if (!parentPath || parentPath.length < 2) return;
              const parentNode = parentPath[parentPath.length - 2];
              finalParentId = parentNode.id;
              const selfIndex = parentNode.children?.findIndex((c) => c.id === targetId) ?? -1;
              finalIndex = isTopHalf ? selfIndex : selfIndex + 1;
            }

            if (data.action === 'add-component') {
              if (data.type === 'block-page') return;
              const newNode = {
                id: store.generateId(),
                type: data.type,
                props: { ...data.defaultProps },
                children: data.isContainer ? [] : undefined,
              };
              store.insertNode(finalParentId, newNode, finalIndex !== -1 ? finalIndex : undefined);
            } else if (data.action === 'add-registered-component') {
              const componentKey = data.componentKey || data.key;
              if (!componentKey) return;
              const newNode = {
                id: store.generateId(),
                type: 'block-registered-component',
                props: {
                  componentKey,
                  label: data.label || componentKey,
                },
              };
              store.insertNode(finalParentId, newNode, finalIndex !== -1 ? finalIndex : undefined);
            } else if (data.action === 'add-saved-component') {
              const componentId = data.pageid || data.id;
              if (!componentId) return;
              const res = await props.renderPageFunctions.fetchData(`/api/page/${componentId}`, { lang: getCurrentDesignLang() });
              const rawTree = res?.json?.status === 'ok' ? res.json.result?.json : null;
              if (!rawTree) return;
              const fetchedTree = typeof rawTree === 'string' ? JSON.parse(rawTree) : rawTree;
              const newNode = markComponentRefTree(fetchedTree, componentId, data.name || res.json.result?.name || componentId);
              DesignUtils.compileResponsiveCssForNode(newNode, newNode.type === 'block-flex' ? 'flex' : (newNode.type === 'block-grid' || newNode.type === 'block-page' ? 'grid' : undefined));
              store.insertNode(finalParentId, newNode, finalIndex !== -1 ? finalIndex : undefined);
            } else if (data.action === 'move-component') {
              if (data.nodeId === targetId) return;
              const dragging = store.findNode(store.tree, data.nodeId);
              if (dragging && store.findNode(dragging, finalParentId)) return; // Prevent ancestry inversion

              const oldParentPath = store.getNodePath(data.nodeId);
              if (oldParentPath && oldParentPath.length >= 2) {
                (window as any)._lj_lastParentOfDragged = oldParentPath[oldParentPath.length - 2].id;
                (window as any)._lj_lastIndexOfDragged = oldParentPath[oldParentPath.length - 2].children?.findIndex(
                  (c) => c.id === data.nodeId
                );
              }
              const draggedNode = store.removeNode(data.nodeId, true);
              // Adjust index if we removed it before the insertion point
              if (draggedNode && finalIndex !== -1 && finalParentId === (window as any)._lj_lastParentOfDragged) {
                const oldIdx = (window as any)._lj_lastIndexOfDragged;
                if (oldIdx < finalIndex) finalIndex--;
              }

              if (draggedNode) {
                store.insertNode(finalParentId, draggedNode, finalIndex !== -1 ? finalIndex : undefined);
              }
            }
          } catch (err) {
            console.error('Drop error:', err);
          }
        }}
      >
        <RenderBlocks node={store.tree} />
        {!store.isPreviewMode && <SelectionOverlay store={store} />}
        {dragIndicatorDom.node}
      </div>
    );
    requestAnimationFrame(() => {
      restoreScroll();
      requestAnimationFrame(restoreScroll);
      setTimeout(restoreScroll, 50);
    });
  };

  let store: DesignStore;
  let isUnmounted = false;

  const ref: RefProps = {
    onLoad: async () => {
      const initStoreEvents = (resolvedStore: DesignStore) => {
        if (isUnmounted) return; // Prevent phantom mounts if iframe unloaded before onload

        // Consolidate 'Source of Truth' assignment
        store = resolvedStore;
        (window as any)._lj_designStore = resolvedStore;

        store.on('TREE_UPDATE', renderTree);
        store.on('PREVIEW_TOGGLED', renderTree);
        // Initial render
        renderTree();
      };

      const existingStore = getDesignStore();
      if (existingStore) {
        initStoreEvents(existingStore);
      } else {
        // Fallback for Race Condition: if iframe loads faster than parent injects it
        (window as any)._lj_designInit = (injectedStore: DesignStore) => {
          initStoreEvents(injectedStore);
        };
      }
    },
    onUnload: async () => {
      isUnmounted = true;
      if (store) {
        store.off('TREE_UPDATE', renderTree);
        store.off('PREVIEW_TOGGLED', renderTree);
      }
    },
  };

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    minHeight: '100%',
    backgroundColor: 'var(--primary-bg-color, #ffffff)', // Light background for design canvas
    color: 'var(--primary-color, #333333)',
    '.drag-hover-target': {
      outline: '2px solid #52c41a !important',
      outlineOffset: '-2px',
      backgroundColor: 'rgba(82, 196, 26, 0.1)',
    },
  };

  return (
    <div css={css} ref={ref}>
      {rootDom.node}
    </div>
  );
};
