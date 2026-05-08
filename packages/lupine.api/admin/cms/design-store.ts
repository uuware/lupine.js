import { uniqueIdGenerator } from "lupine.web";
import { DesignUtils } from './design-utils';

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
       this.normalizeTreeIds();
       this.emit('TREE_UPDATE');
       this.emit('HISTORY_CHANGED');
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
       this.historyIndex++;
       this.tree = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
       this.normalizeTreeIds();
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
    this.normalizeTreeIds();
    // Do not call enforceGridMesh here: saved pages already contain their
    // intended grid/flex cell structure, and re-meshing can move children
    // between rows/cells when opening an existing page.
    this.history = [];
    this.historyIndex = -1;
    this.commitHistory(true);
    this.emit('TREE_UPDATE');
  }

  selectNode(id: string | null) {
    this.selectedNodeId = id;
    this.emit('NODE_SELECTED');
  }

  updateNodeProps(id: string, propsToUpdate: Record<string, any>, silent: boolean = false) {
    const node = this.findNode(this.tree, id);
    if (node) {
      const isGridNode = node.type === 'block-grid' || (node.type === 'block-page' && node.props.componentMode !== 'flex');
      const previousGridTemplate = node.props.gridTemplate;

      node.props = { ...node.props, ...propsToUpdate };
      const sysCssKeys = ['customCss', 'hidden', 'position', 'top', 'bottom', 'left', 'right', 'zIndex', 'alignSelf', 'margin', 'padding', 'overflowY', 'flexDirection', 'alignItems', 'justifyContent', 'gap', 'layoutDirection', 'gridTemplate'];
      if (Object.keys(propsToUpdate).some(k => sysCssKeys.some(sysK => k.startsWith(sysK)))) {
         DesignUtils.compileResponsiveCssForNode(node, node.type === 'block-flex' || (node.type === 'block-page' && node.props.componentMode === 'flex') ? 'flex' : (isGridNode ? 'grid' : undefined));
      }

      if (isGridNode && propsToUpdate.gridTemplate !== undefined && this.hasGridTrackCountChanged(node, previousGridTemplate, propsToUpdate.gridTemplate)) {
         this.enforceGridMesh(node);
      }

      if (!silent) {
         this.commitHistory();
         this.emit('TREE_UPDATE');
      }
    }
  }

  setNodeComponentMode(id: string, mode: 'grid' | 'flex' | 'html') {
    const node = this.findNode(this.tree, id);
    if (!node || !['block-page', 'block-grid', 'block-flex'].includes(node.type)) return;

    const oldMode = node.props.componentMode || (node.type === 'block-flex' ? 'flex' : 'grid');
    if (oldMode === mode) return;

    if (mode === 'html') {
      node.props = { ...node.props, componentMode: 'html', content: node.props.content || '' };
      node.children = [];
    } else if (node.type === 'block-page') {
      node.props = { ...node.props, componentMode: mode };
      if (mode === 'flex') {
        this.removeEmptyGridFlexCells(node);
      }
      if (mode === 'grid') {
        this.enforceGridMesh(node);
      }
    } else {
      node.type = mode === 'flex' ? 'block-flex' : 'block-grid';
      node.props = { ...node.props, componentMode: mode };
      if (mode === 'flex') {
        this.removeEmptyGridFlexCells(node);
      }
      if (mode === 'grid') {
        this.enforceGridMesh(node);
      }
    }

    DesignUtils.compileResponsiveCssForNode(node, mode === 'flex' ? 'flex' : (mode === 'grid' ? 'grid' : undefined));
    this.commitHistory();
    this.emit('TREE_UPDATE');
    this.emit('NODE_SELECTED');
  }

  morphNodeType(id: string, newType: string) {
    if (id === 'root-page') return;
    const node = this.findNode(this.tree, id);
    if (!node || node.type === newType) return;

    node.type = newType;
    node.props = { ...node.props, componentMode: newType === 'block-flex' ? 'flex' : 'grid' };
    
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

  removeNode(id: string, silent: boolean = false): DesignNode | null {
    if (id === 'root-page') return null; // Cannot remove root
    const removed = this._removeNode(this.tree, id);
    if (removed) {
      if (this.selectedNodeId === id) this.selectNode(null);
      if (!silent) {
        this.commitHistory();
        this.emit('TREE_UPDATE');
      }
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
    if (nodeToInsert.props?.componentMode !== 'html' && (nodeToInsert.type === 'block-grid' || nodeToInsert.type === 'block-page')) {
      this.enforceGridMesh(nodeToInsert);
    }

    const usedIds = new Set<string>();
    this.collectNodeIds(this.tree, usedIds);
    this.ensureUniqueNodeIds(nodeToInsert, usedIds);

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
    const usedIds = new Set<string>();
    this.collectNodeIds(this.tree, usedIds);
    return this.generateUniqueId(usedIds);
  }

  private generateUniqueId(usedIds: Set<string>): string {
    let nextId = this.uniqueId();
    while (usedIds.has(nextId)) {
      nextId = this.uniqueId();
    }
    usedIds.add(nextId);
    return nextId;
  }

  private collectNodeIds(node: DesignNode | null | undefined, usedIds: Set<string>) {
    if (!node) return;
    if (node.id) usedIds.add(node.id);
    node.children?.forEach((child) => this.collectNodeIds(child, usedIds));
  }

  private ensureUniqueNodeIds(node: DesignNode, usedIds: Set<string>) {
    if (!node.id || usedIds.has(node.id)) {
      node.id = this.generateUniqueId(usedIds);
    } else {
      usedIds.add(node.id);
    }

    node.children?.forEach((child) => this.ensureUniqueNodeIds(child, usedIds));
  }

  private normalizeTreeIds() {
    const usedIds = new Set<string>();
    this.ensureUniqueNodeIds(this.tree, usedIds);
  }

  private parseGridCount(str: string): number {
    const template = (str || '').trim();
    if (!template) return 1;

    let count = 0;
    let token = '';
    let depth = 0;

    const addToken = (value: string) => {
      const normalized = value.trim();
      if (!normalized) return;

      const repeatMatch = normalized.match(/^repeat\(\s*(\d+)\s*,/i);
      count += repeatMatch?.[1] ? parseInt(repeatMatch[1], 10) : 1;
    };

    for (const char of template) {
      if (/\s/.test(char) && depth === 0) {
        addToken(token);
        token = '';
        continue;
      }

      if (char === '(') depth++;
      if (char === ')') depth = Math.max(0, depth - 1);
      token += char;
    }

    addToken(token);
    return Math.max(1, count);
  }

  private hasGridTrackCountChanged(node: DesignNode, previousGridTemplate: any, nextGridTemplate: any): boolean {
    const fallback = node.type === 'block-page' ? 'auto 1fr auto' : '1fr 1fr';
    return this.parseGridCount(previousGridTemplate || fallback) !== this.parseGridCount(nextGridTemplate || fallback);
  }

  private removeEmptyGridFlexCells(node: DesignNode) {
    if (!node.children?.length) return;

    const childrenAreEmptyFlexCells = node.children.every((child) =>
      child.type === 'block-flex' && (!child.children || child.children.length === 0)
    );
    if (childrenAreEmptyFlexCells) {
      node.children = [];
    }
  }

  private enforceGridMesh(node: DesignNode) {
    if (node.props?.componentMode === 'html') return;

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
