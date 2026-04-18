import { CssProps, HtmlVar, RefProps } from 'lupine.components';
import { DesignStore, DesignNode } from './design-store';
import { ComponentRegistry } from './component-registry';

const LayerTreeNode = (props: { node: DesignNode; store: DesignStore; depth: number }) => {
  const { node, store, depth } = props;
  const compDef = ComponentRegistry[node.type];
  const label = compDef ? compDef.label : node.type;
  
  const isSelected = store.selectedNodeId === node.id;
  const hasChildren = node.children && node.children.length > 0;

  // We can add logic to collapse/expand later, but full expansion is fine for V1.
  
  return (
    <div class="layer-node-container">
      <div 
        class={`layer-node-row ${isSelected ? 'selected' : ''}`}
        style={{ paddingLeft: `${depth * 12}px` }}
        onClick={() => store.selectNode(node.id)}
      >
        <span class="layer-icon" style={{ opacity: 0.5, marginRight: '6px', fontSize: '10px' }}>
          {hasChildren ? '▼' : '•'}
        </span>
        <span class="layer-label" style={{ fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {label}
        </span>
        <span class="layer-id" style={{ fontSize: '10px', opacity: 0.4, marginLeft: 'auto' }}>
            #{node.id.split('-').shift()?.substring(0, 4)}
        </span>
      </div>
      
      {hasChildren && (
        <div class="layer-children">
          {node.children!.map((child) => (
            <LayerTreeNode node={child} store={store} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const LayerTreePanel = (props: { store: DesignStore }) => {
  const { store } = props;
  const treeRenderer = new HtmlVar(<div/>);

  const renderTree = () => {
    treeRenderer.value = (
      <div class="layer-tree-root">
         <LayerTreeNode node={store.tree} store={store} depth={0} />
      </div>
    );
  };

  const ref: RefProps = {
    onLoad: async () => {
      renderTree();
      store.on('TREE_UPDATE', renderTree);
      store.on('NODE_SELECTED', renderTree);
    },
    onUnload: async () => {
      store.off('TREE_UPDATE', renderTree);
      store.off('NODE_SELECTED', renderTree);
    }
  };

  const css: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    backgroundColor: 'var(--primary-bg-color, #ffffff)',
    '.layer-node-row': {
        display: 'flex',
        alignItems: 'center',
        padding: '6px 8px',
        cursor: 'pointer',
        borderBottom: '1px solid var(--primary-border, #f0f0f0)',
        '&:hover': {
            backgroundColor: 'var(--hover-bg-color, #f5f5f5)',
        },
        '&.selected': {
            backgroundColor: 'var(--primary-accent-color, #e6f7ff)',
            color: 'var(--primary-color, #1890ff)',
            fontWeight: 'bold',
            borderLeft: '3px solid var(--primary-color, #1890ff)'
        }
    }
  };

  return (
    <div ref={ref} css={css} class="layer-tree-panel">
       {treeRenderer.node}
    </div>
  );
};
