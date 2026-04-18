import { CssProps } from 'lupine.web';
import { DesignNode, getDesignStore } from './design-store';
import { ComponentRegistry } from './component-registry';
import { ComponentsMap } from './render-blocks';

export const DesignRenderer = (props: { node: DesignNode; isStructural?: boolean }) => {
  const store = getDesignStore();
  
  const isRootComponent = props.node.id === 'root-page';
  
  const Component = ComponentsMap[props.node.type];

  if (!Component) {
    return <div style={{ color: 'red' }}>Unknown component: {props.node.type}</div>;
  }

  const isSelected = store ? store.selectedNodeId === props.node.id : false;
  const isContainer = ComponentRegistry[props.node.type]?.isContainer === true;

  const handleClick = (e: Event) => {
    e.stopPropagation(); // prevent parent from being selected
    if (store) store.selectNode(props.node.id);
  };

  const handleDragOver = (e: any) => {
    if (!store || store.isPreviewMode || !isContainer) return;
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e: any) => {
    if (!store || store.isPreviewMode || !isContainer) return;
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e: any) => {
    if (!store || store.isPreviewMode || !isContainer) return;
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
    
    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (!dataStr) return;
      const data = JSON.parse(dataStr);
      
      if (data.action === 'add-component') {
        // Prevent dropping root-page instances inside other components completely
        if (data.type === 'block-page') return;

        const newNode: DesignNode = {
          id: store.generateId(),
          type: data.type,
          props: { ...data.defaultProps },
          children: data.isContainer ? [] : undefined,
        };
        store.insertNode(props.node.id, newNode);
      } else if (data.action === 'add-saved-component') {
        // Deep clone template and recursively map fresh IDs
        const hydrateTemplate = (template: DesignNode): DesignNode => {
           const hydratedProps = template.props ? JSON.parse(JSON.stringify(template.props)) : {};
           return {
              id: store.generateId(),
              type: template.type,
              props: hydratedProps,
              children: template.children?.map(hydrateTemplate)
           };
        };
        
        const instance = hydrateTemplate(data.tree);
        // If they drop a Page component as a reusable block, it's essentially acting as a grid container
        if (instance.type === 'block-page') {
           instance.type = 'block-grid'; // Demote root page logic to standard container to avoid UI conflicts
        }
        
        store.insertNode(props.node.id, instance);
      } else if (data.action === 'move-component') {
         if (data.nodeId === props.node.id) return; // Dropped on self
         // Defend against dropping ancestor into descendant
         const dragging = store.findNode(store.tree, data.nodeId);
         if (dragging && store.findNode(dragging, props.node.id)) {
            console.warn("Cannot drop ancestor inside descendant");
            return;
         }
         const draggedNode = store.removeNode(data.nodeId);
         if (draggedNode) {
             store.insertNode(props.node.id, draggedNode);
         }
      }
    } catch(err) {
      console.error('Drop error:', err);
    }
  };

  const css: CssProps = {
    position: 'relative',
    boxSizing: 'border-box',
    border: '1px solid transparent', // reserve space for selection border
    transition: 'border 0.2s, box-shadow 0.2s',

    // Essential wrapper layout pass-through
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    minWidth: 0,
    minHeight: 0,

    '&.selected': {
      border: '2px dashed var(--primary-color) !important',
      boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)', // glow effect
    },

    '&.drag-over': {
      border: '2px solid green',
      backgroundColor: 'rgba(0, 255, 0, 0.05)',
    },

    '.action-bar': {
      position: 'absolute',
      // Attach actionBar inside the bounds so it doesn't leave gaps that break hover interactions
      top: '4px',
      right: '4px',
      display: 'none',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '4px',
      backgroundColor: 'var(--primary-color)',
      color: 'white',
      padding: '4px 8px',
      fontSize: '12px',
      borderRadius: '4px',
      zIndex: 10,
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    },
    
    '&.selected > .action-bar': {
      display: 'flex',  // Always show action bar for selected as flex layout
    },
    
    '&:hover > .action-bar': {
      display: 'flex',
    },
    '.action-btn': {
        display: 'flex',
        alignItems: 'center',
        padding: '2px 4px',
        gap: '4px',
        borderRadius: '3px',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)'
        }
    },
    '.separator': {
        opacity: 0.4,
        margin: '0 2px',
        fontSize: '10px'
    }
  };

  const handleInternalDragStart = (e: any) => {
     if (isRootComponent) { e.preventDefault(); return; }
     e.stopPropagation();
     e.dataTransfer.setData('text/plain', JSON.stringify({
        action: 'move-component',
        nodeId: props.node.id
     }));
  };

  const p = props.node.props;
  let inlineStyle = `flex: ${p.flex === 'none' ? 'none' : '1'};`;
  // if (p.position && p.position !== 'static') inlineStyle += `position: ${p.position};`;
  // if (p.top) inlineStyle += `top: ${p.top};`;
  // if (p.bottom) inlineStyle += `bottom: ${p.bottom};`;
  // if (p.left) inlineStyle += `left: ${p.left};`;
  // if (p.right) inlineStyle += `right: ${p.right};`;
  // if (p.zIndex) inlineStyle += `z-index: ${p.zIndex};`;
  // if (p.minWidth) inlineStyle += `min-width: ${p.minWidth};`;
  // if (p.maxWidth) inlineStyle += `max-width: ${p.maxWidth};`;
  // if (p.minHeight) inlineStyle += `min-height: ${p.minHeight};`;
  // if (p.maxHeight) inlineStyle += `max-height: ${p.maxHeight};`;
  if (p.customCss) inlineStyle += p.customCss;

  // Hydrate Interactive Pseudo-States Dynamically
  const hoverStyles: any = {};
  const activeStyles: any = {};
  Object.keys(p).forEach(key => {
    if (key.endsWith('_Hover')) {
      hoverStyles[key.replace('_Hover', '')] = p[key];
    } else if (key.endsWith('_Active')) {
      activeStyles[key.replace('_Active', '')] = p[key];
    }
  });

  if (Object.keys(hoverStyles).length > 0) {
      css['&:hover'] = { ...(css['&:hover'] as any), ...hoverStyles, transition: 'all 0.2s ease-in-out' };
  }
  if (Object.keys(activeStyles).length > 0) {
      css['&:active'] = { ...(css['&:active'] as any), ...activeStyles };
  }

  return (
    <div 
      style={inlineStyle}
      css={!store || store.isPreviewMode ? { height: '100%', width: '100%', display: 'flex', flexDirection: 'column' } : css} 
      className={`design-node-wrapper ${isSelected && store && !store.isPreviewMode ? 'selected' : ''}`}
      onClick={!store || store.isPreviewMode ? undefined : handleClick}
      onDragOver={!store || store.isPreviewMode ? undefined : handleDragOver}
      onDragLeave={!store || store.isPreviewMode ? undefined : handleDragLeave}
      onDrop={!store || store.isPreviewMode ? undefined : handleDrop}
    >
      {(!isRootComponent) && store && !store.isPreviewMode && (() => {
           const nodePath = store.getNodePath(props.node.id);
           let ancestors = nodePath ? nodePath.slice(0, -1).reverse() : [];
           
           // Omit the top-level root-page from the breadcrumb stack to save UI space
           ancestors = ancestors.filter(a => a.id !== 'root-page');

           // Short-circuit: if component shouldn't have Drag/Delete buttons (isStructural),
           // AND it has no viable ancestors (like direct descendants of root-page), drop the action bar entirely.
           if (props.isStructural && ancestors.length === 0) {
              return null;
           }

           return (
             <div class="action-bar" onClick={(e) => e.stopPropagation()}>
                {!props.isStructural && (
                    <>
                      <div class="action-btn" draggable={true} onDragStart={handleInternalDragStart} style="cursor: grab" title="Drag to move">≡</div>
                      <div class="action-btn" onClick={() => confirm('Delete component?') && store.removeNode(props.node.id)} style="cursor: pointer; color: #ffbba6" title="Delete">✕</div>
                    </>
                )}

                {ancestors.map((ancestor, idx) => {
                    const compDef = ComponentRegistry[ancestor.type];
                    const label = compDef ? compDef.label : ancestor.type;
                    const isFirstUiElement = idx === 0 && props.isStructural;
                    
                    return (
                      <div key={ancestor.id} style={{ display: 'flex', alignItems: 'center' }}>
                         {!isFirstUiElement && <div class="separator">|</div>}
                         <div 
                            class="action-btn" 
                            onClick={(e) => { e.stopPropagation(); store.selectNode(ancestor.id); }}
                            title={`Select ${label}`}
                            style="cursor: pointer; font-size: 11px;"
                         >
                            <span style={{ fontWeight: 'normal', opacity: 0.8 }}>{label}</span>
                         </div>
                      </div>
                    )
                })}
             </div>
           );
      })()}
      <Component node={props.node} />
    </div>
  );
};
