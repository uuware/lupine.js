import { CssProps, HtmlVar, RefProps } from 'lupine.components';
import { DesignStore } from './design-store';
import { ComponentRegistry } from './component-registry';

export const SelectionOverlay = ({ store }: { store: DesignStore }) => {
  const overlayDom = new HtmlVar(<div style="display:none" />);
  let isUnmounted = false;

  const ref: RefProps = {
    onLoad: async () => {
      let reqId: number;

      const handleInternalDragStart = (e: any, nodeId: string) => {
         e.stopPropagation();
         e.dataTransfer.setData('text/plain', JSON.stringify({
            action: 'move-component',
            nodeId: nodeId
         }));
      };

      let lastStructureHash = '';

      const updateOverlay = () => {
        if (isUnmounted) return;

        const selectedId = store.selectedNodeId;
        if (!selectedId) {
          if (lastStructureHash !== '') {
            overlayDom.value = null;
            lastStructureHash = '';
          }
          reqId = requestAnimationFrame(updateOverlay);
          return;
        }

        const el = document.querySelector(`[data-design-id="${selectedId}"]`);
        if (!el) {
          if (lastStructureHash !== '') {
            overlayDom.value = null;
            lastStructureHash = '';
          }
          // Retry polling in case it hasn't rendered yet
          reqId = requestAnimationFrame(updateOverlay);
          return;
        }

        // We use Math.round to avoid subpixel blurring
        const rect = el.getBoundingClientRect();
        
        // Node path for Breadcrumbs
        const nodePath = store.getNodePath(selectedId);
        let ancestors = nodePath ? nodePath.slice(0, -1).reverse() : [];
        ancestors = ancestors.filter(a => a.id !== 'root-page');

        const structureHash = `${selectedId}|${ancestors.map(a => a.id).join(',')}`;
        const isRootComponent = selectedId === 'root-page';

        const isHuge = rect.height > window.innerHeight * 0.7;
        let actionBarTop = '4px';
        let actionBarBottom = 'auto';

        if (!isHuge) {
            if (rect.top >= 36) {
                actionBarTop = '-36px';
            } else if (window.innerHeight - rect.bottom >= 36) {
                actionBarTop = 'auto';
                actionBarBottom = '-36px';
            }
        }

        if (lastStructureHash !== structureHash) {
            lastStructureHash = structureHash;
            overlayDom.value = (
            <div id="lj-selection-box" style={{
                position: 'absolute',
                top: `${Math.round(rect.top + window.scrollY)}px`,
                left: `${Math.round(rect.left + window.scrollX)}px`,
                width: `${Math.round(rect.width)}px`,
                height: `${Math.round(rect.height)}px`,
                border: '2px dashed #1890ff',
                boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
                pointerEvents: 'none',
                zIndex: 9999,
                transition: 'all 0.1s ease-out', // smooth layout shifts
            }}>
                {(!isRootComponent) && (
                <div class="action-bar" style={{
                    position: 'absolute',
                    top: actionBarTop,
                    bottom: actionBarBottom,
                    right: '4px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#1890ff',
                    color: 'white',
                    padding: '4px 8px',
                    fontSize: '12px',
                    borderRadius: '4px',
                    pointerEvents: 'auto', // Allow clicking the action bar
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} onClick={(e: any) => e.stopPropagation()}>
                    <div class="action-btn" draggable={true} onDragStart={(e) => handleInternalDragStart(e, selectedId)} style="cursor: grab" title="Drag to move">≡</div>
                    <div class="action-btn" onClick={() => confirm('Delete component?') && store.removeNode(selectedId)} style="cursor: pointer; color: #ffbba6" title="Delete">✕</div>

                    {ancestors.map((ancestor, idx) => {
                        const compDef = ComponentRegistry[ancestor.type];
                        const label = compDef ? compDef.label : ancestor.type;
                        
                        return (
                            <div key={ancestor.id} style={{ display: 'flex', alignItems: 'center' }}>
                            {<div class="separator" style={{ opacity: 0.4, margin: '0 2px', fontSize: '10px' }}>|</div>}
                            <div 
                                class="action-btn" 
                                onClick={(e: any) => { e.stopPropagation(); store.selectNode(ancestor.id); }}
                                title={`Select ${label}`}
                                style="cursor: pointer; font-size: 11px;"
                            >
                                <span style={{ fontWeight: 'normal', opacity: 0.8 }}>{label}</span>
                            </div>
                            </div>
                        )
                    })}
                </div>
                )}
            </div>
            );
        } else {
            // Structure hasn't changed. Just perform an ultra-fast DOM update.
            const boxEl = document.getElementById('lj-selection-box');
            if (boxEl) {
                boxEl.style.top = `${Math.round(rect.top + window.scrollY)}px`;
                boxEl.style.left = `${Math.round(rect.left + window.scrollX)}px`;
                boxEl.style.width = `${Math.round(rect.width)}px`;
                boxEl.style.height = `${Math.round(rect.height)}px`;

                const actionBarEl = boxEl.querySelector('.action-bar') as HTMLElement;
                if (actionBarEl) {
                    actionBarEl.style.top = actionBarTop;
                    actionBarEl.style.bottom = actionBarBottom;
                }
            }
        }

        reqId = requestAnimationFrame(updateOverlay);
      };

      reqId = requestAnimationFrame(updateOverlay);
    },
    onUnload: async () => {
      isUnmounted = true;
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
  };

  return (
    <div css={css} ref={ref}>
      {overlayDom.node}
    </div>
  );
};
