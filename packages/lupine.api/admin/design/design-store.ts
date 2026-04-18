import { uniqueIdGenerator } from "lupine.web";

export interface DesignNode {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: DesignNode[];
}

export type DesignEvent = 'TREE_UPDATE' | 'NODE_SELECTED' | 'PREVIEW_TOGGLED' | 'HISTORY_CHANGED' | 'COMPONENT_SAVED';

export class DesignStore {
  tree: DesignNode = {
    id: 'root-page',
    type: 'block-page',
    props: {
      siteTitle: 'My Website',
      description: '',
      backgroundColor: '#ffffff',
      isRoot: true, // Special flag for the top level page
    },
    children: [],
  };

  selectedNodeId: string | null = null;
  isPreviewMode: boolean = false;

  private listeners: Record<string, Function[]> = {};
  private uniqueId = uniqueIdGenerator('d');

  // History Stack (RAM-Isolated)
  history: DesignNode[] = [];
  historyIndex: number = -1;

  constructor() {
    this.enforceGridMesh(this.tree);
    this.commitHistory(true); // Initial structural capture
  }

  commitHistory(force: boolean = false) {
    const snapshot = JSON.parse(JSON.stringify(this.tree));
    // Defend against redundant captures
    if (!force && this.historyIndex >= 0) {
       const currentTip = this.history[this.historyIndex];
       if (JSON.stringify(currentTip) === JSON.stringify(snapshot)) return;
    }
    // Branch clipping
    if (this.historyIndex < this.history.length - 1) {
       this.history.splice(this.historyIndex + 1);
    }
    this.history.push(snapshot);
    if (this.history.length > 50) this.history.shift(); // Hard cap memory footprint
    this.historyIndex = this.history.length - 1;
    this.emit('HISTORY_CHANGED');
  }

  undo() {
    if (this.historyIndex > 0) {
       this.historyIndex--;
       this.tree = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
       this.emit('TREE_UPDATE');
       this.emit('HISTORY_CHANGED');
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
       this.historyIndex++;
       this.tree = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
       this.emit('TREE_UPDATE');
       this.emit('HISTORY_CHANGED');
    }
  }

  on(event: DesignEvent, callback: Function) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  off(event: DesignEvent, callback: Function) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
  }

  emit(event: DesignEvent) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((cb: any) =>
        cb(this.tree, this.selectedNodeId, this.isPreviewMode)
      );
    }
  }

  setTree(newTree: DesignNode) {
    this.tree = newTree;
    this.commitHistory();
    this.emit('TREE_UPDATE');
  }

  selectNode(id: string | null) {
    this.selectedNodeId = id;
    this.emit('NODE_SELECTED');
  }

  updateNodeProps(id: string, propsToUpdate: Record<string, any>, silent: boolean = false) {
    const node = this.findNode(this.tree, id);
    if (node) {
      node.props = { ...node.props, ...propsToUpdate };

      if ((node.type === 'block-grid' || node.type === 'block-page') && propsToUpdate.gridTemplate !== undefined) {
         this.enforceGridMesh(node);
      }

      if (!silent) {
         this.commitHistory();
         this.emit('TREE_UPDATE');
      }
    }
  }

  morphNodeType(id: string, newType: string) {
    if (id === 'root-page') return; 
    const node = this.findNode(this.tree, id);
    if (!node || node.type === newType) return;

    node.type = newType;
    
    if (newType === 'block-grid') {
      this.enforceGridMesh(node);
    }

    this.commitHistory();
    this.emit('TREE_UPDATE');
    // Force panel redraw specifically required when changing types
    this.emit('NODE_SELECTED');
  }

  findNode(node: DesignNode, id: string): DesignNode | null {
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = this.findNode(child, id);
        if (found) return found;
      }
    }
    return null;
  }

  getNodePath(targetId: string, currentNode: DesignNode = this.tree, currentPath: DesignNode[] = []): DesignNode[] | null {
    const newPath = [...currentPath, currentNode];
    if (currentNode.id === targetId) return newPath;
    if (currentNode.children) {
      for (const child of currentNode.children) {
        const result = this.getNodePath(targetId, child, newPath);
        if (result) return result;
      }
    }
    return null;
  }

  removeNode(id: string): DesignNode | null {
    if (id === 'root-page') return null; // Cannot remove root
    const removed = this._removeNode(this.tree, id);
    if (removed) {
      if (this.selectedNodeId === id) this.selectNode(null);
      this.commitHistory();
      this.emit('TREE_UPDATE');
    }
    return removed;
  }

  private _removeNode(node: DesignNode, id: string): DesignNode | null {
    if (!node.children) return null;
    for (let i = 0; i < node.children.length; i++) {
      if (node.children[i].id === id) {
        const removed = node.children[i];
        node.children.splice(i, 1);
        return removed;
      }
      const r = this._removeNode(node.children[i], id);
      if (r) return r;
    }
    return null;
  }

  insertNode(parentId: string, nodeToInsert: DesignNode, insertIndex?: number) {
    if (nodeToInsert.type === 'block-grid' || nodeToInsert.type === 'block-page') {
      this.enforceGridMesh(nodeToInsert);
    }

    const parent = this.findNode(this.tree, parentId);
    if (parent) {
      if (!parent.children) parent.children = [];
      if (insertIndex !== undefined && insertIndex >= 0) {
        parent.children.splice(insertIndex, 0, nodeToInsert);
      } else {
        parent.children.push(nodeToInsert);
      }
      this.commitHistory();
      this.emit('TREE_UPDATE');
    }
  }

  generateId() {
    return this.uniqueId();
  }

  private parseGridCount(str: string): number {
    if (!str) return 1;
    const repeatMatch = str.match(/repeat\((\d+)/);
    if (repeatMatch && repeatMatch[1]) return parseInt(repeatMatch[1]);
    return str.trim().split(/\s+/).length;
  }

  private enforceGridMesh(node: DesignNode) {
    const count = this.parseGridCount(node.props.gridTemplate || (node.type === 'block-page' ? 'auto 1fr auto' : '1fr 1fr'));
    if (!node.children) node.children = [];

    // Safety Protocol: Wrap existing content children before instantiating structural layout metrics
    const hasContentChildren = node.children.some(c => c.type !== 'block-flex');
    if (hasContentChildren) {
        const wrapperCell: DesignNode = {
            id: this.generateId(),
            type: 'block-flex',
            props: { flex: '1', layoutDirection: 'vertical' },
            children: [...node.children]
        };
        node.children = [wrapperCell];
    }

    if (count > node.children.length) {
      while (node.children.length < count) {
        node.children.push({
          id: this.generateId(),
          type: 'block-flex',
          props: { flex: '1', layoutDirection: 'vertical' },
          children: []
        });
      }
    } else if (count < node.children.length) {
      const doomedNodes = node.children.splice(count);
      // Salvage architecture: preserve content components nested in discarded cells
      if (node.children.length > 0) {
        const anchor = node.children[node.children.length - 1];
        if (!anchor.children) anchor.children = [];
        for (const doomed of doomedNodes) {
          if (doomed.children && doomed.children.length > 0) {
            anchor.children.push(...doomed.children);
          }
        }
      }
    }
  }
}

// Helper to fetch the design store bound to the *current executing window*
// This allows true multi-tab isolation since each iframe gets its own window scope and store binding
export const getDesignStore = (): DesignStore | null => {
  if (typeof window !== 'undefined') {
    return (window as any)._lj_designStore || null;
  }
  return null;
};
