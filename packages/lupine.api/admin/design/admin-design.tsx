import { CssProps, HtmlVar, isFrontEnd, PageProps, RefProps } from 'lupine.components';
import { DesignStore, getDesignStore } from './design-store';
import { DesignRenderer } from './design-renderer';

export const AdminDesignPage = async (props: PageProps) => {
  if (!isFrontEnd()) {
    return <div>No SSR.</div>;
  }
  if (window.top === window) {
    return <div>This page should be running in an iframe.</div>;
  }

  const rootDom = new HtmlVar(<div>Loading Design...</div>);

  const renderTree = () => {
    // Top-level styling that enforces min-height and padding for the entire document canvas
    rootDom.value = (
      <div 
        className="canvas-root" 
        style={{ minHeight: '100vh', boxSizing: 'border-box' }}
        onClick={(e) => {
           // Clicking on empty space deselects everything
           if (e.target === e.currentTarget) {
              store.selectNode(null);
           }
        }}
      >
        <DesignRenderer node={store.tree} />
      </div>
    );
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
        store.on('NODE_SELECTED', renderTree);
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
        store.off('NODE_SELECTED', renderTree);
        store.off('PREVIEW_TOGGLED', renderTree);
      }
    }
  };

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    minHeight: '100%',
    backgroundColor: 'var(--primary-bg-color, #ffffff)', // Light background for design canvas
    color: 'var(--primary-color, #333333)',
  };

  return (
    <div css={css} ref={ref}>
       {rootDom.node}
    </div>
  );
};
