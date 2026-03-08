import {
  ShapeLayer,
  ShapeType,
  computeTextLayout,
  getShapeBoundingBox,
  getShapeHandles,
  getStickerHandles,
  getTextHandles,
  hitShape,
  hitSticker,
  hitText,
  drawShapePath,
  drawDeleteHandle,
  buildBubblePath,
  FONT_OPTIONS,
  exportToSystemClipboard,
  enforceBounds,
  Tool,
  TextLayer,
  StickerLayer,
  LayerShadow,
  HANDLE_SIZE,
  renderTextLayer,
  renderStickerLayer,
  renderShapeLayer,
} from '../../lib/canvas';
import { PEditorOptions } from './p-editor-types';
import { loadPdfScripts } from './p-editor-utils';
import { PEDITOR_STYLES } from './p-editor-styles';
import { LJ_SVG_ICON_CLASS, SvgIconNames, loadSvgIconStyles } from '../svg-icons';

export class PEditor {
  private container: HTMLElement;
  private wrap: HTMLDivElement;
  private canvasBg: HTMLCanvasElement; // For PDF.js rendering
  private canvasFg: HTMLCanvasElement; // For User interactions
  private ctxBg: CanvasRenderingContext2D;
  private ctxFg: CanvasRenderingContext2D;
  private sidebar: HTMLDivElement;

  private optsWrap: HTMLDivElement;
  private loadingOverlay: HTMLDivElement;

  // Options
  private tool: Tool = 'pan';
  private color = '#ff0000';
  private fillColor?: string;
  private _fontFamily = 'sans-serif';
  private _fontSize = 24;
  private _textBold = false;
  private _textItalic = false;
  private _textTailActive = false;
  private _tempRot = 0;
  private _textStrokeColor = '#000000';
  private _textStrokeWidth = 0;
  private zoom = 1.0;
  private zoomSliderRange!: HTMLInputElement;
  private zoomSliderLabel!: HTMLSpanElement;

  private eraserSize = 20;

  // PDF State
  private pdfBytesBase?: Uint8Array;
  private pdfBytes?: Uint8Array;
  private pdfDoc?: any; // PDFLib.PDFDocument
  private pdfJsDoc?: any; // PDF.js Proxy
  private numPages = 0;
  private cp = 1; // current page (1-indexed)

  // Annotation State per page
  private texts: TextLayer[] = [];
  private stickers: StickerLayer[] = [];
  private shapes: ShapeLayer[] = [];
  private renderOrder: string[] = [];

  private activeId: string | null = null;
  private dragState: any = null;

  // Draw state
  private _penMode: ShapeType = 'pencil';
  private _penSize = 4;
  private _arrowType: 'standard' | 'double' | 'thick' | 'fishtail' | 'arc' = 'standard';
  private activeShape: ShapeLayer | null = null;
  private internalClipboard: { type: 'text' | 'sticker' | 'shape'; data: any } | null = null;
  private internalClipboardTime: number = 0;
  private textInput: HTMLTextAreaElement | null = null;
  private textCommitFn: (() => void) | null = null;
  private textCancelFn: (() => void) | null = null;
  private _isExporting = false;

  // Undo / Redo
  private undoStack: Array<{ texts: any[]; stickers: any[]; shapes: any[]; renderOrder: string[] }> = [];
  private redoStack: Array<{ texts: any[]; stickers: any[]; shapes: any[]; renderOrder: string[] }> = [];

  constructor(container: HTMLElement, options?: PEditorOptions) {
    this.container = container;
    this.container.tabIndex = 0;
    this.container.style.outline = 'none';
    this._injectStyles();

    // UI Layout
    this.container.innerHTML = `<div class="pe-container">
      <div class="pe-toolbar"></div>
      <div class="pe-opts"></div>
      <div class="pe-main">
        <div class="pe-sidebar"></div>
        <div class="pe-canvas-area" style="cursor: grab;">
          <div class="pe-canvas-wrap">
            <canvas class="pe-canvas-bg"></canvas>
            <canvas class="pe-canvas-fg"></canvas>
          </div>
        </div>
      </div>
      <div class="pe-loading" style="display:none;">Loading PDF Framework...</div>
    </div>`;

    this.wrap = this.container.querySelector('.pe-canvas-wrap')!;
    this.canvasBg = this.container.querySelector('.pe-canvas-bg')!;
    this.canvasFg = this.container.querySelector('.pe-canvas-fg')!;
    this.sidebar = this.container.querySelector('.pe-sidebar')!;
    this.optsWrap = this.container.querySelector('.pe-opts')!;
    this.loadingOverlay = this.container.querySelector('.pe-loading')!;

    this.ctxBg = this.canvasBg.getContext('2d')!;
    this.ctxFg = this.canvasFg.getContext('2d')!;

    this._buildToolbar();
    this._attachEvents();

    // The original code had this.container.appendChild(this.toolbar) etc.
    // The current structure uses innerHTML to build the initial DOM.
    // The instruction seems to be based on a different DOM construction approach.
    // I will adapt the instruction to the current DOM structure.

    // The instruction implies wrapping the sidebar and adding a zoom slider.
    // The current `this.sidebar` is already a DOM element obtained from querySelector.
    // I need to create a new wrapper div and move the existing sidebar into it.

    const mainContentArea = this.container.querySelector('.pe-main')!;
    const existingSidebar = this.container.querySelector('.pe-sidebar')!;

    const sidebarWrap = document.createElement('div');
    sidebarWrap.style.width = '200px';
    sidebarWrap.style.flexShrink = '0';
    sidebarWrap.style.display = 'flex';
    sidebarWrap.style.flexDirection = 'column';
    sidebarWrap.style.borderRight = '1px solid #ccc';
    sidebarWrap.style.background = '#f5f5f5';

    // Disconnect the sidebar temporarily to wrap it
    if (existingSidebar.parentNode) existingSidebar.parentNode.removeChild(existingSidebar);
    this.sidebar.style.flex = '1';
    this.sidebar.style.minHeight = '0';
    this.sidebar.style.width = '100%';
    this.sidebar.style.borderRight = 'none'; // handled by wrapper

    sidebarWrap.appendChild(this.sidebar);

    const zoomOverlay = document.createElement('div');
    zoomOverlay.style.padding = '10px';
    zoomOverlay.style.borderTop = '1px solid #ddd';
    zoomOverlay.style.display = 'flex';
    zoomOverlay.style.alignItems = 'center';
    zoomOverlay.style.justifyContent = 'space-between';
    zoomOverlay.style.fontSize = '12px';
    zoomOverlay.style.color = '#333';
    zoomOverlay.style.background = '#e9e9e9';

    this.zoomSliderRange = document.createElement('input');
    this.zoomSliderRange.type = 'range';
    this.zoomSliderRange.min = '0.3';
    this.zoomSliderRange.max = '4';
    this.zoomSliderRange.step = '0.05';
    this.zoomSliderRange.value = '1';
    this.zoomSliderRange.style.width = '100px';
    this.zoomSliderRange.style.cursor = 'pointer';

    this.zoomSliderLabel = document.createElement('span');
    this.zoomSliderLabel.textContent = '100%';
    this.zoomSliderLabel.style.minWidth = '36px';
    this.zoomSliderLabel.style.textAlign = 'right';

    this.zoomSliderRange.oninput = () => {
      const ns = parseFloat(this.zoomSliderRange.value);
      this.zoom = ns;
      this._updateZoomSlider();
      this._renderPage();
    };

    zoomOverlay.appendChild(this.zoomSliderRange);
    zoomOverlay.appendChild(this.zoomSliderLabel);
    sidebarWrap.appendChild(zoomOverlay);

    // Replace the original sidebar with the new sidebarWrap
    mainContentArea.insertBefore(sidebarWrap, mainContentArea.firstChild);

    if (options?.pdfUrl || options?.pdfArrayBuffer) {
      this._init(options);
    } else {
      this._init();
    }
  }

  private _injectStyles() {
    if (!document.getElementById('p-editor-css')) {
      loadSvgIconStyles();
      const s = document.createElement('style');
      s.id = 'p-editor-css';
      s.textContent = PEDITOR_STYLES;
      document.head.appendChild(s);
    }
  }

  // ─── Undo / Redo ─────────────────────────────────────────────────────────────

  private _cloneState() {
    return {
      texts: this.texts.map((t) => ({ ...t })),
      // Preserve HTMLImageElement intentionally
      stickers: this.stickers.map((s) => ({ ...s })),
      // Preserve shape points array manually
      shapes: this.shapes.map((s) => ({
        ...s,
        points: s.points ? s.points.map((p: any) => ({ ...p })) : undefined,
      })),
      renderOrder: [...this.renderOrder],
    };
  }

  private _pushUndo() {
    const newState = this._cloneState();
    if (this.undoStack.length > 0) {
      const topState = this.undoStack[this.undoStack.length - 1];
      if (JSON.stringify(topState) === JSON.stringify(newState)) return;
    }
    this.undoStack.push(newState);
    this.redoStack = [];
    if (this.undoStack.length > 50) this.undoStack.shift();
  }

  undo() {
    if (!this.undoStack.length) return;
    this.redoStack.push(this._cloneState());

    const st = this.undoStack.pop()!;
    // Deep clone it out of the stack so subsequent redos/undos don't mutate stack references
    this.texts = st.texts.map((t) => ({ ...t }));
    this.stickers = st.stickers.map((s) => ({ ...s }));
    this.shapes = st.shapes.map((s) => ({
      ...s,
      points: s.points ? s.points.map((p: any) => ({ ...p })) : undefined,
    }));
    this.renderOrder = [...st.renderOrder];

    this.activeId = null;
    this._drawFg();
  }

  redo() {
    if (!this.redoStack.length) return;
    this.undoStack.push(this._cloneState());

    const st = this.redoStack.pop()!;
    this.texts = st.texts.map((t) => ({ ...t }));
    this.stickers = st.stickers.map((s) => ({ ...s }));
    this.shapes = st.shapes.map((s) => ({
      ...s,
      points: s.points ? s.points.map((p: any) => ({ ...p })) : undefined,
    }));
    this.renderOrder = [...st.renderOrder];

    this.activeId = null;
    this._drawFg();
  }

  private async _init(options?: PEditorOptions) {
    this.loadingOverlay.style.display = 'flex';
    try {
      await loadPdfScripts();
      const { PDFDocument, rgb, StandardFonts } = (window as any).PDFLib;
      const pdfjsLib = (window as any).pdfjsLib;

      if (options?.pdfArrayBuffer) {
        this.pdfBytes = new Uint8Array(options.pdfArrayBuffer);
        this.pdfBytesBase = new Uint8Array(options.pdfArrayBuffer);
      } else if (options?.pdfUrl) {
        const res = await fetch(options.pdfUrl);
        const arrayBuffer = await res.arrayBuffer();
        this.pdfBytes = new Uint8Array(arrayBuffer);
        this.pdfBytesBase = new Uint8Array(arrayBuffer);
      } else {
        // Init empty A4
        const doc = await PDFDocument.create();
        doc.addPage([595.28, 841.89]); // A4 Size in points

        // Add branding texts as editable layers instead of hardcoding into PDF byte array
        const id1 = `t_init_1`;
        const id2 = `t_init_2`;
        this.texts.push({
          id: id1,
          text: 'p-editor',
          x: 230,
          y: 300,
          fontSize: 40,
          fontFamily: 'HelveticaBold',
          bgColor: 'transparent',
          color: '#333333',
          bold: false,
          italic: false,
          rotation: 0,
          pageIndex: 1,
        });

        this.texts.push({
          id: id2,
          text: 'Powered by Lupine.js',
          x: 230,
          y: 340,
          fontSize: 14,
          fontFamily: 'Helvetica',
          bgColor: 'transparent',
          color: '#808080',
          bold: false,
          italic: false,
          rotation: 0,
          pageIndex: 1,
        });

        this.renderOrder.push(id1, id2);

        this.pdfBytes = await doc.save();
        this.pdfBytesBase = this.pdfBytes!.slice(0);
      }

      if (this.pdfBytes) {
        if (!this.pdfBytesBase) this.pdfBytesBase = new Uint8Array(this.pdfBytes);
        this.pdfDoc = await PDFDocument.load(this.pdfBytesBase!);
        const loadingTask = pdfjsLib.getDocument({ data: this.pdfBytes! });
        this.pdfJsDoc = await loadingTask.promise;
        this.numPages = this.pdfJsDoc.numPages;
        this.cp = 1;

        await this._renderSidebar();
        await this._renderPage();
      }

      this.loadingOverlay.style.display = 'none';
      this._setTool('pan');
    } catch (e) {
      console.error(e);
      this.loadingOverlay.textContent = 'Failed to load PDF.';
    }
  }

  // ─── Toolbar ─────────────────────────────────────────────────────────────────
  private _btn(id: string, title: string, iconStr: string, fn: () => void) {
    const btn = document.createElement('button');
    btn.className = `pe-btn ${LJ_SVG_ICON_CLASS} ${LJ_SVG_ICON_CLASS}_${
      SvgIconNames[iconStr as keyof typeof SvgIconNames]
    }`;
    btn.title = title;
    btn.dataset.id = id;
    btn.onclick = () => {
      this._setTool(id as Tool);
      if (['upload', 'download', 'zoomIn', 'zoomOut', 'resize'].includes(id)) {
        fn();
      }
    };
    return btn;
  }

  private _grp(...btns: HTMLElement[]) {
    const div = document.createElement('div');
    div.className = 'pe-grp';
    btns.forEach((b) => div.appendChild(b));
    return div;
  }

  private _buildToolbar() {
    const tb = this.container.querySelector('.pe-toolbar')!;
    tb.innerHTML = '';

    tb.appendChild(
      this._grp(
        this._btn('undo', 'Undo (Ctrl+Z)', 'undo', () => this.undo()),
        this._btn('redo', 'Redo (Ctrl+Y)', 'redo', () => this.redo())
      )
    );

    tb.appendChild(
      this._grp(
        this._btn('resize', 'Resize Canvas', 'resize', () => this._showResizeModal()),
        this._btn('upload', 'Upload PDF', 'upload', () => this._handleUpload()),
        this._btn('download', 'Download PDF', 'download', () => this._handleDownload())
      )
    );

    tb.appendChild(
      this._grp(
        this._btn('pan', 'Pan', 'pan', () => {}),
        this._btn('zoomIn', 'Zoom In', 'zoomIn', () => this._zoom(0.1)),
        this._btn('zoomOut', 'Zoom Out', 'zoomOut', () => this._zoom(-0.1))
      )
    );

    tb.appendChild(
      this._grp(
        this._btn('pencil', 'Draw', 'draw', () => {}),
        this._btn('text', 'Text / Bubble', 'text', () => {}),
        this._btn('sticker', 'Sticker', 'sticker', () => {})
      )
    );

    this._setTool('pan');
  }

  private _setTool(t: Tool, keepSelection = false, initialRotation: number = 0) {
    if (!['upload', 'download', 'zoomIn', 'zoomOut', 'resize'].includes(t)) {
      this.tool = t;
      this.container.querySelectorAll('.pe-toolbar .pe-btn').forEach((b) => {
        if ((b as HTMLButtonElement).dataset.id === t) b.classList.add('active');
        else b.classList.remove('active');
      });
      const area = this.container.querySelector('.pe-canvas-area') as HTMLElement;
      if (t === 'pan') area.style.cursor = 'grab';
      else if (t === 'select') area.style.cursor = 'default';
      else area.style.cursor = 'crosshair';

      if (!keepSelection) {
        this.activeId = null;
      }
      this._updateOpts();
      this._drawFg();
    }
  }

  private _updateOpts() {
    const w = this.optsWrap;
    w.innerHTML = '';

    if (!this.pdfBytes && this.loadingOverlay.style.display === 'none') {
      w.innerHTML = '<span>Please upload a PDF to start editing.</span>';
      return;
    }

    if (!this.pdfBytes) return;

    const t = this.tool;

    const txt = (s: string) => {
      const el = document.createElement('span');
      el.textContent = s;
      w.appendChild(el);
    };
    const btn = (l: string, fn: () => void) => {
      const b = document.createElement('button');
      b.textContent = l;
      b.onclick = fn;
      w.appendChild(b);
    };
    const clr = (l: string) => {
      const lbl = document.createElement('label');
      lbl.textContent = l;
      const inp = document.createElement('input');
      inp.type = 'color';
      inp.value = this.color;
      inp.oninput = () => {
        this.color = inp.value;
        this._applyColorToActive();
        this._drawFg();
      };
      lbl.appendChild(inp);
      w.appendChild(lbl);
    };

    txt(`Page ${this.cp} / ${this.numPages}`);
    btn('Prev', () => this._gotoPage(this.cp - 1));
    btn('Next', () => this._gotoPage(this.cp + 1));
    btn('Del Current Page', () => this._deletePage(this.cp - 1));

    const activeTxt = this.activeId ? this.texts.find((tx) => tx.id === this.activeId) : null;
    const activeShp = this.activeId ? this.shapes.find((sx) => sx.id === this.activeId) : null;

    if (t === 'text' || activeTxt) {
      clr('Color');

      const textFill = activeTxt ? activeTxt.bgColor || '' : this.fillColor || '';
      const tFlbl = document.createElement('label');
      tFlbl.textContent = 'Fill';
      const tFinp = document.createElement('input');
      tFinp.type = 'color';
      tFinp.value = textFill || '#ffffff';
      tFinp.oninput = () => {
        this.fillColor = tFinp.value;
        if (activeTxt) {
          activeTxt.bgColor = tFinp.value;
          this._drawFg();
        }
      };
      tFlbl.appendChild(tFinp);
      w.appendChild(tFlbl);

      const tTranBtn = document.createElement('button');
      tTranBtn.textContent = '🚫';
      tTranBtn.title = 'Transparent Fill';
      tTranBtn.style.background = !textFill ? 'var(--primary-accent-color,#0a74c9)' : 'transparent';
      tTranBtn.style.fontSize = '14px';
      tTranBtn.style.lineHeight = '1';
      tTranBtn.style.padding = '2px 4px';
      tTranBtn.style.marginLeft = '4px';
      tTranBtn.addEventListener('click', () => {
        this.fillColor = undefined;
        if (activeTxt) {
          activeTxt.bgColor = undefined;
        }
        this._updateOpts();
        this._drawFg();
      });
      w.appendChild(tTranBtn);

      const fLbl = document.createElement('label');
      const curFamily = activeTxt ? activeTxt.fontFamily : this._fontFamily;
      fLbl.innerHTML = `Font:<select style="padding:2px;border:1px solid #555;background:#333;color:#ccc;border-radius:3px;max-width:140px;">
        ${FONT_OPTIONS.map(
          (f) => `<option value='${f.val}' ${curFamily === f.val ? 'selected' : ''}>${f.label}</option>`
        ).join('')}
      </select>`;
      const fs = fLbl.querySelector('select') as HTMLSelectElement;
      fs.onchange = () => {
        this._fontFamily = fs.value;
        if (activeTxt) activeTxt.fontFamily = fs.value;
        this._drawFg();
      };
      w.appendChild(fLbl);

      const curBold = activeTxt ? activeTxt.bold : this._textBold;
      const bB = document.createElement('button');
      bB.textContent = 'B';
      bB.style.fontWeight = 'bold';
      bB.style.background = curBold ? 'var(--primary-accent-color,#0a74c9)' : '#eee';
      bB.addEventListener('click', () => {
        this._textBold = !this._textBold;
        if (activeTxt) activeTxt.bold = this._textBold;
        this._updateOpts();
        this._drawFg();
      });
      w.appendChild(bB);

      const curItalic = activeTxt ? activeTxt.italic : this._textItalic;
      const bI = document.createElement('button');
      bI.textContent = 'I';
      bI.style.fontStyle = 'italic';
      bI.style.background = curItalic ? 'var(--primary-accent-color,#0a74c9)' : '#eee';
      bI.addEventListener('click', () => {
        this._textItalic = !this._textItalic;
        if (activeTxt) activeTxt.italic = this._textItalic;
        this._updateOpts();
        this._drawFg();
      });
      w.appendChild(bI);

      const strokColorLbl = document.createElement('label');
      strokColorLbl.innerHTML = `OutLine:<input type="color" value="${
        activeTxt ? activeTxt.strokeColor || '#000000' : this._textStrokeColor
      }"/>`;
      const strokColorInp = strokColorLbl.querySelector('input') as HTMLInputElement;
      strokColorInp.oninput = () => {
        this._textStrokeColor = strokColorInp.value;
        if (activeTxt) {
          if (!activeTxt.strokeWidth || activeTxt.strokeWidth === 0) {
            activeTxt.strokeWidth = 2;
            this._textStrokeWidth = 2;
          }
          activeTxt.strokeColor = this._textStrokeColor;
          this._drawFg();
          this._updateOpts();
        }
      };
      w.appendChild(strokColorLbl);

      // Stroke Width Slider
      const widthVal = activeTxt && activeTxt.strokeWidth !== undefined ? activeTxt.strokeWidth : this._textStrokeWidth;
      const isBubbleActive = activeTxt ? activeTxt.tailActive : this._textTailActive;
      const minOutline = isBubbleActive ? 1 : 0;
      if (widthVal >= 0) {
        const strokWidthLbl = document.createElement('label');
        strokWidthLbl.innerHTML = `<input type="range" min="${minOutline}" max="50" value="${widthVal}" style="width:60px" /><span>${widthVal}</span>`;
        const strokWidthInp = strokWidthLbl.querySelector('input') as HTMLInputElement;
        const strokWidthSpan = strokWidthLbl.querySelector('span') as HTMLSpanElement;
        strokWidthInp.oninput = () => {
          const w = Number(strokWidthInp.value);
          this._textStrokeWidth = w;
          strokWidthSpan.textContent = `${w}`;
          if (activeTxt) {
            activeTxt.strokeWidth = w;
            this._drawFg();
          }
        };
        w.appendChild(strokWidthLbl);
      }

      const bT = document.createElement('button');
      bT.textContent = '🗯';
      bT.title = 'Bubble';
      bT.style.background = (activeTxt ? activeTxt.tailActive : this._textTailActive)
        ? 'var(--primary-accent-color,#0a74c9)'
        : 'transparent';
      bT.style.fontSize = '14px';
      bT.style.lineHeight = '1';
      bT.style.padding = '2px 4px';
      bT.style.minHeight = '0';
      bT.addEventListener('click', () => {
        if (activeTxt) {
          activeTxt.tailActive = !activeTxt.tailActive;
          this._textTailActive = activeTxt.tailActive;
          if (activeTxt.tailActive) {
            if (!activeTxt.strokeWidth || activeTxt.strokeWidth === 0) {
              activeTxt.strokeWidth = 2;
              this._textStrokeWidth = 2;
            }
            if (activeTxt.tailX === undefined || activeTxt.tailY === undefined) {
              activeTxt.tailX = activeTxt.x;
              activeTxt.tailY = activeTxt.y + activeTxt.fontSize * 1.5;
            }
          }
        } else {
          this._textTailActive = !this._textTailActive;
        }
        this._updateOpts();
        this._drawFg();
      });
      w.appendChild(bT);
    } else if (t === 'pencil' || activeShp) {
      clr('Color');

      const shpFill = activeShp ? activeShp.bgColor || '' : this.fillColor || '';
      const sFlbl = document.createElement('label');
      sFlbl.textContent = 'Fill';
      const sFinp = document.createElement('input');
      sFinp.type = 'color';
      sFinp.value = shpFill || '#ffffff';
      sFinp.oninput = () => {
        this.fillColor = sFinp.value;
        if (activeShp) {
          activeShp.bgColor = sFinp.value;
          this._drawFg();
        }
      };
      sFlbl.appendChild(sFinp);
      w.appendChild(sFlbl);

      const sTranBtn = document.createElement('button');
      sTranBtn.textContent = '🚫';
      sTranBtn.title = 'Transparent Fill';
      sTranBtn.style.background = !shpFill ? 'var(--primary-accent-color,#0a74c9)' : 'transparent';
      sTranBtn.style.fontSize = '14px';
      sTranBtn.style.lineHeight = '1';
      sTranBtn.style.padding = '2px 4px';
      sTranBtn.style.marginLeft = '4px';
      sTranBtn.addEventListener('click', () => {
        this.fillColor = undefined;
        if (activeShp) {
          activeShp.bgColor = undefined;
        }
        this._updateOpts();
        this._drawFg();
      });
      w.appendChild(sTranBtn);
      const sz = document.createElement('input');
      sz.type = 'range';
      sz.min = '1';
      sz.max = '50';
      let currentSize = this._penSize;
      let currentMode = this._penMode;
      let currentArrow = this._arrowType;
      if (activeShp) {
        currentSize = activeShp.strokeWidth;
        currentMode = activeShp.type;
        currentArrow = activeShp.arrowType || 'standard';
        this.color = activeShp.color; // sync global color
      }
      sz.value = currentSize + '';
      sz.oninput = () => {
        this._penSize = +sz.value;
        if (activeShp) activeShp.strokeWidth = this._penSize;
        this._drawFg();
      };
      w.appendChild(sz);

      const sel = document.createElement('select');
      ['pencil', 'line', 'circle', 'rect', 'triangle', 'star', 'arrow'].forEach((m) => {
        const o = document.createElement('option');
        o.value = m;
        o.textContent = m;
        if (m === currentMode) o.selected = true;
        sel.appendChild(o);
      });
      sel.onchange = () => {
        this._penMode = sel.value as ShapeType;
        if (activeShp) activeShp.type = this._penMode;
        this._updateOpts();
        this._drawFg();
      };
      w.appendChild(sel);

      if (currentMode === 'arrow' || (activeShp === null && this._penMode === 'arrow')) {
        const asel = document.createElement('select');
        ['standard', 'double', 'thick', 'fishtail', 'arc'].forEach((m) => {
          const o = document.createElement('option');
          o.value = m;
          o.textContent = m;
          if (m === currentArrow) o.selected = true;
          asel.appendChild(o);
        });
        asel.onchange = () => {
          this._arrowType = asel.value as any;
          if (activeShp) activeShp.arrowType = this._arrowType;
          this._drawFg();
        };
        w.appendChild(asel);
      }
    } else if (t === 'sticker') {
      const inp = document.createElement('input');
      inp.type = 'file';
      inp.accept = 'image/*';
      inp.onchange = (e: any) => {
        if (e.target.files[0]) {
          const u = URL.createObjectURL(e.target.files[0]);
          const img = new Image();
          img.onload = () => {
            let nw = img.width;
            let nh = img.height;
            const maxDim = 200;
            if (nw > maxDim || nh > maxDim) {
              const ratio = Math.min(maxDim / nw, maxDim / nh);
              nw *= ratio;
              nh *= ratio;
            }

            const newSticker = {
              id: 's_' + Date.now(),
              pageIndex: this.cp,
              img,
              x: 50 / this.zoom,
              y: 50 / this.zoom,
              w: nw / this.zoom,
              h: nh / this.zoom,
              rotation: 0,
            };
            this._pushUndo();
            this.stickers.push(newSticker);
            if (!this.renderOrder.includes(newSticker.id)) this.renderOrder.push(newSticker.id);
            this.activeId = newSticker.id;
            this._setTool('pan', true);
            this._drawFg();
          };
          img.src = u;
        }
      };
      const b = document.createElement('button');
      b.textContent = 'Upload Sticker';
      b.onclick = () => inp.click();
      w.appendChild(b);
      w.appendChild(inp);
    }

    const activeStk = this.activeId ? this.stickers.find((st) => st.id === this.activeId) : null;
    if (this.activeId && (activeTxt || activeShp || activeStk)) {
      const zGrp = document.createElement('div');
      zGrp.style.display = 'inline-block';
      zGrp.style.marginLeft = '10px';
      zGrp.style.borderLeft = '1px solid #555';
      zGrp.style.paddingLeft = '10px';

      const btnZ = (icon: string, hint: string, fn: () => void) => {
        const b = document.createElement('button');
        b.innerHTML = icon;
        b.title = hint;
        b.style.marginLeft = '4px';
        b.onclick = fn;
        zGrp.appendChild(b);
      };

      btnZ('⇡', 'Bring Forward', () => {
        const idx = this.renderOrder.indexOf(this.activeId!);
        if (idx >= 0 && idx < this.renderOrder.length - 1) {
          const tmp = this.renderOrder[idx];
          this.renderOrder[idx] = this.renderOrder[idx + 1];
          this.renderOrder[idx + 1] = tmp;
          this._drawFg();
        }
      });
      btnZ('⇈', 'Bring to Front', () => {
        const idx = this.renderOrder.indexOf(this.activeId!);
        if (idx >= 0 && idx < this.renderOrder.length - 1) {
          this.renderOrder.push(this.renderOrder.splice(idx, 1)[0]);
          this._drawFg();
        }
      });
      btnZ('⇣', 'Send Backward', () => {
        const idx = this.renderOrder.indexOf(this.activeId!);
        if (idx > 0) {
          const tmp = this.renderOrder[idx];
          this.renderOrder[idx] = this.renderOrder[idx - 1];
          this.renderOrder[idx - 1] = tmp;
          this._drawFg();
        }
      });
      btnZ('⇊', 'Send to Back', () => {
        const idx = this.renderOrder.indexOf(this.activeId!);
        if (idx > 0) {
          this.renderOrder.unshift(this.renderOrder.splice(idx, 1)[0]);
          this._drawFg();
        }
      });
      w.appendChild(zGrp);
    }
  }

  private _applyColorToActive() {
    if (!this.activeId) return;
    const txt = this.texts.find((x) => x.id === this.activeId && x.pageIndex === this.cp);
    if (txt) txt.color = this.color;
    const shp = this.shapes.find((x) => x.id === this.activeId && x.pageIndex === this.cp);
    if (shp) shp.color = this.color;
  }
  private _applyTextSizeToActive() {
    if (!this.activeId) return;
    const txt = this.texts.find((x) => x.id === this.activeId && x.pageIndex === this.cp);
    if (txt) {
      txt.fontSize = this._fontSize;
      txt.h = undefined;
    }
  }

  // ─── PDF Management ──────────────────────────────────────────────────────────

  private async _handleUpload() {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = 'application/pdf';
    inp.onchange = async (e: any) => {
      if (e.target.files[0]) {
        const u = URL.createObjectURL(e.target.files[0]);
        const res = await fetch(u);
        const ab = await res.arrayBuffer();

        if (!this.pdfBytes) {
          // completely new document
          await this._init({ pdfArrayBuffer: ab });
        } else {
          // append/insert into current
          this.loadingOverlay.style.display = 'flex';
          try {
            const { PDFDocument } = (window as any).PDFLib;
            const newPdf = await PDFDocument.load(ab);
            const copiedPages = await this.pdfDoc.copyPages(newPdf, newPdf.getPageIndices());
            for (let i = 0; i < copiedPages.length; i++) {
              this.pdfDoc.insertPage(this.cp + i, copiedPages[i]);
            }
            this.pdfBytes = await this.pdfDoc.save();
            this.pdfBytesBase = this.pdfBytes!.slice(0);
            const pdfjsLib = (window as any).pdfjsLib;
            this.pdfJsDoc = await pdfjsLib.getDocument({ data: this.pdfBytes! }).promise;
            this.numPages = this.pdfJsDoc.numPages;
            await this._renderSidebar();
            await this._renderPage();
          } catch (err) {
            console.error(err);
          }
          this.loadingOverlay.style.display = 'none';
        }
      }
    };
    inp.click();
  }

  private async _handleDownload() {
    if (!this.pdfBytes) return;
    this._isExporting = true;
    this._drawFg(); // rerender text dashed borders to false
    this.loadingOverlay.style.display = 'flex';
    this.loadingOverlay.textContent = 'Baking and saving...';
    try {
      const { PDFDocument } = (window as any).PDFLib;
      this.pdfDoc = await PDFDocument.load(this.pdfBytesBase!);
      await this._commitAnnotationsToPdfDoc(); // will apply to pdfDoc
      const finalBytes = await this.pdfDoc.save();
      const blob = new Blob([finalBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'edited.pdf';
      link.click();
    } catch (err) {
      console.error(err);
    }
    this.loadingOverlay.textContent = 'Loading PDF Framework...';
    this.loadingOverlay.style.display = 'none';
  }

  private _showResizeModal() {
    if (!this.pdfBytesBase) return;

    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '99999',
    });

    const box = document.createElement('div');
    Object.assign(box.style, {
      background: '#242424',
      padding: '20px',
      borderRadius: '8px',
      width: '280px',
      color: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      fontFamily: 'sans-serif',
    });

    box.innerHTML = '<p style="margin:0 0 14px;font-weight:bold;font-size:14px">Resize Dimensions (cm)</p>';

    const presetsList = {
      A0: [84.1, 118.9],
      A1: [59.4, 84.1],
      A2: [42.0, 59.4],
      A3: [29.7, 42.0],
      A4: [21.0, 29.7],
      A5: [14.8, 21.0],
      A6: [10.5, 14.8],
      B4: [25.0, 35.3],
      B5: [17.6, 25.0],
      Letter: [21.6, 27.9],
      Legal: [21.6, 35.6],
      Ledger: [27.9, 43.2],
      Executive: [18.4, 26.7],
    };

    const sel = document.createElement('select');
    sel.style.cssText =
      'width:100%;margin-bottom:14px;padding:6px;background:#333;color:#fff;border:1px solid #555;border-radius:4px;outline:none;font-size:13px;';
    Object.entries(presetsList).forEach(([k, v]) => {
      const opt = document.createElement('option');
      opt.value = k;
      opt.text = `${k} (${v[0]} x ${v[1]} cm)`;
      if (k === 'A4') opt.selected = true;
      sel.appendChild(opt);
    });

    box.appendChild(sel);

    const inputsDiv = document.createElement('div');
    inputsDiv.style.cssText = 'display:flex;gap:10px;margin-bottom:14px;';

    const inp = (label: string, defaultVal: number) => {
      const wrapper = document.createElement('div');
      wrapper.style.flex = '1';
      wrapper.innerHTML = `<div style="font-size:12px;color:#aaa;margin-bottom:4px;">${label}</div>`;
      const i = document.createElement('input');
      i.type = 'number';
      i.value = defaultVal.toString();
      i.step = '0.1';
      i.style.cssText =
        'width:100%;background:#111;color:#fff;border:1px solid #444;border-radius:4px;padding:6px;font-size:13px;box-sizing:border-box;outline:none;';
      wrapper.appendChild(i);
      inputsDiv.appendChild(wrapper);
      return i;
    };

    const wI = inp('Width (cm)', 21.0);
    const hI = inp('Height (cm)', 29.7);
    box.appendChild(inputsDiv);

    sel.onchange = () => {
      const preset = presetsList[sel.value as keyof typeof presetsList];
      if (preset) {
        wI.value = preset[0].toString();
        hI.value = preset[1].toString();
      }
    };

    const btnLine = document.createElement('div');
    btnLine.style.cssText = 'display:flex;justify-content:flex-end;gap:8px;margin-top:20px;';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.className = 'pe-btn';
    cancelBtn.style.cssText =
      'width:auto;padding:6px 12px;background:#444;border:none;border-radius:4px;color:#fff;cursor:pointer;';
    cancelBtn.onclick = () => overlay.remove();

    const applyBtn = document.createElement('button');
    applyBtn.textContent = 'Apply';
    applyBtn.className = 'pe-btn';
    applyBtn.style.cssText =
      'width:auto;padding:6px 12px;background:#0a74c9;border:none;border-radius:4px;color:#fff;cursor:pointer;font-weight:bold;';

    applyBtn.onclick = async () => {
      overlay.remove();
      this.loadingOverlay.style.display = 'flex';
      this.loadingOverlay.textContent = 'Resizing Document...';
      try {
        const { PDFDocument } = (window as any).PDFLib;
        const doc = await PDFDocument.load(this.pdfBytesBase!);
        const newW = parseFloat(wI.value) * 28.3464567; // convert cm to points
        const newH = parseFloat(hI.value) * 28.3464567;
        doc.getPages().forEach((p: any) => p.setSize(newW, newH));
        this.pdfBytesBase = await doc.save();
        await this._init();
      } catch (e) {
        console.error(e);
      }
      this.loadingOverlay.style.display = 'none';
      this.loadingOverlay.textContent = 'Loading PDF Framework...';
    };

    btnLine.appendChild(cancelBtn);
    btnLine.appendChild(applyBtn);
    box.appendChild(btnLine);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  private async _commitAnnotationsToPdfDoc() {
    // Basic implementation: for each text and sticker, we draw onto the pdfDoc.
    const { rgb, degrees } = (window as any).PDFLib;
    // Map text layers and stickers page by page
    for (let pIdx = 1; pIdx <= this.numPages; pIdx++) {
      const page = this.pdfDoc.getPage(pIdx - 1);
      const { width, height } = page.getSize();
      // Y axis goes bottom-to-top in PDF

      const pgTexts = this.texts.filter((t) => t.pageIndex === pIdx);
      const pgSticks = this.stickers.filter((s) => s.pageIndex === pIdx);
      const pgShapes = this.shapes.filter((s) => s.pageIndex === pIdx);
      if (this.activeShape && this.activeShape.pageIndex === pIdx) {
        pgShapes.push(this.activeShape);
      }

      const renderedIds = new Set<string>();
      const pageObjects: { type: string; obj: any }[] = [];

      this.renderOrder.forEach((id) => {
        let obj: any = pgTexts.find((t) => t.id === id);
        if (obj) {
          pageObjects.push({ type: 'text', obj });
          renderedIds.add(id);
          return;
        }
        obj = pgSticks.find((s) => s.id === id);
        if (obj) {
          pageObjects.push({ type: 'sticker', obj });
          renderedIds.add(id);
          return;
        }
        obj = pgShapes.find((s) => s.id === id);
        if (obj) {
          pageObjects.push({ type: 'shape', obj });
          renderedIds.add(id);
          return;
        }
      });

      pgTexts.forEach((t) => {
        if (!renderedIds.has(t.id)) pageObjects.push({ type: 'text', obj: t });
      });
      pgSticks.forEach((s) => {
        if (!renderedIds.has(s.id)) pageObjects.push({ type: 'sticker', obj: s });
      });
      pgShapes.forEach((s) => {
        if (!renderedIds.has(s.id)) pageObjects.push({ type: 'shape', obj: s });
      });

      for (const item of pageObjects) {
        if (item.type === 'text') {
          const t = item.obj as TextLayer;
          const cxC = document.createElement('canvas').getContext('2d')!;
          const fontFn = (tx: any) =>
            `${tx.italic ? 'italic ' : ''}${tx.bold ? 'bold ' : ''}${tx.fontSize}px ${tx.fontFamily}`;
          const layout = computeTextLayout(cxC, t as any, fontFn);
          const tw = layout.actualW;
          const th = layout.actualH;
          const cx = t.x + tw / 2;
          const cy = t.y;

          let lx = 0,
            ly = 0;
          if (t.tailActive && t.tailX !== undefined && t.tailY !== undefined) {
            const dx = t.tailX - cx;
            const dy = t.tailY - cy;
            const cos = Math.cos(-t.rotation);
            const sin = Math.sin(-t.rotation);
            lx = dx * cos - dy * sin;
            ly = dx * sin + dy * cos;
          }

          const pad = t.tailActive ? (t.strokeWidth || 0) + 12 : Math.max(t.strokeWidth || 0, 4);
          const boundHalfW = Math.max(tw / 2 + pad, Math.abs(lx) + pad);
          const boundHalfH = Math.max(th / 2 + pad, Math.abs(ly) + pad);

          const cW = Math.ceil(boundHalfW * 2);
          const cH = Math.ceil(boundHalfH * 2);

          const scale = 2; // Better resolution
          const c = document.createElement('canvas');
          c.width = cW * scale;
          c.height = cH * scale;
          const ctx = c.getContext('2d')!;
          ctx.scale(scale, scale);
          ctx.translate(cW / 2, cH / 2);

          if (t.bgColor || (t.strokeWidth && t.strokeWidth > 0)) {
            buildBubblePath(ctx, tw, th, lx, ly, !!t.tailActive);
            if (t.bgColor) {
              ctx.fillStyle = t.bgColor;
              ctx.fill();
            }
            if (t.strokeWidth && t.strokeWidth > 0) {
              ctx.strokeStyle = t.strokeColor || '#000000';
              ctx.lineWidth = t.strokeWidth;
              ctx.lineJoin = 'round';
              ctx.stroke();
            }
          }

          ctx.font = fontFn({ ...t, fontSize: layout.fs });
          ctx.fillStyle = t.color;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          let currentY = -th / 2 + layout.fs * 0.6;
          for (const line of layout.lines) {
            ctx.fillText(line, -tw / 2, currentY);
            currentY += layout.lineHeight;
          }

          const dataUrl = c.toDataURL('image/png');
          const imgBytes = Uint8Array.from(atob(dataUrl.split(',')[1]), (ch) => ch.charCodeAt(0));
          const embedded = await this.pdfDoc.embedPng(imgBytes);

          page.drawImage(embedded, {
            x: cx - cW / 2,
            y: height - cy - cH / 2,
            width: cW,
            height: cH,
            rotate: degrees((-t.rotation * 180) / Math.PI),
          });
        } else if (item.type === 'sticker') {
          const s = item.obj as StickerLayer;
          const c = document.createElement('canvas');
          c.width = s.img.width;
          c.height = s.img.height;
          c.getContext('2d')!.drawImage(s.img, 0, 0);
          const dataUrl = c.toDataURL('image/png');
          const imgBytes = Uint8Array.from(atob(dataUrl.split(',')[1]), (c) => c.charCodeAt(0));

          const embedded = await this.pdfDoc.embedPng(imgBytes);
          page.drawImage(embedded, {
            x: s.x,
            y: height - (s.y + s.h),
            width: s.w,
            height: s.h,
            rotate: degrees((-s.rotation * 180) / Math.PI),
          });
        } else if (item.type === 'shape') {
          const s = item.obj as ShapeLayer;
          const box = getShapeBoundingBox(s as any);
          const pad = (s.strokeWidth || 4) + 20;
          const cW = Math.ceil(box.w + pad * 2);
          const cH = Math.ceil(box.h + pad * 2);

          const c = document.createElement('canvas');
          c.width = cW;
          c.height = cH;
          const ctx = c.getContext('2d')!;

          ctx.translate(cW / 2, cH / 2);
          ctx.rotate(s.rotation || 0);
          ctx.translate(-box.cx, -box.cy);

          ctx.strokeStyle = s.color;
          ctx.lineWidth = s.strokeWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          drawShapePath(ctx, s.type, s.arrowType || 'standard', s.color, s.x, s.y, s.w, s.h, s.bgColor, s.points);

          const dataUrl = c.toDataURL('image/png');
          const imgBytes = Uint8Array.from(atob(dataUrl.split(',')[1]), (ch) => ch.charCodeAt(0));
          const embedded = await this.pdfDoc.embedPng(imgBytes);

          page.drawImage(embedded, {
            x: box.cx - cW / 2,
            y: height - box.cy - cH / 2,
            width: cW,
            height: cH,
            rotate: degrees((-(s.rotation || 0) * 180) / Math.PI),
          });
        }
      }
    }
  }

  private async _deletePage(idx0: number) {
    // 0-indexed
    if (this.numPages <= 1) return;
    this.pdfDoc.removePage(idx0);
    this.pdfBytes = await this.pdfDoc.save();
    this.pdfBytesBase = new Uint8Array(this.pdfBytes!);
    const pdfjsLib = (window as any).pdfjsLib;
    this.pdfJsDoc = await pdfjsLib.getDocument({ data: this.pdfBytes! }).promise;
    this.numPages = this.pdfJsDoc.numPages;
    // Cleanup annotations for deleted page
    this.texts = this.texts.filter((t) => t.pageIndex !== idx0 + 1);
    this.stickers = this.stickers.filter((s) => s.pageIndex !== idx0 + 1);
    this.shapes = this.shapes.filter((s) => s.pageIndex !== idx0 + 1);
    // Shift indices
    this.texts.forEach((t) => {
      if (t.pageIndex && t.pageIndex > idx0 + 1) t.pageIndex--;
    });
    this.stickers.forEach((s) => {
      if (s.pageIndex && s.pageIndex > idx0 + 1) s.pageIndex--;
    });
    this.shapes.forEach((s) => {
      if (s.pageIndex && s.pageIndex > idx0 + 1) s.pageIndex--;
    });

    if (this.cp > this.numPages) this.cp = this.numPages;
    await this._renderSidebar();
    await this._renderPage();
  }

  private async _movePage(from0: number, to0: number) {
    if (from0 === to0) return;
    const [page] = await this.pdfDoc.copyPages(this.pdfDoc, [from0]);
    this.pdfDoc.removePage(from0);
    // if from < to, the removal shifts everything left, so 'to0' is inherently the right slot to insert.
    let target = to0;
    if (from0 < to0) target = to0 - 1;
    // Wait, insertPage adds BEFORE the index. So if we want to be AT index 'to0', and we removed 'from0' < 'to0', old to0 is now to0-1.
    // actually standard PDF-lib:
    this.pdfDoc.insertPage(target, page);

    this.pdfBytes = await this.pdfDoc.save();
    this.pdfBytesBase = new Uint8Array(this.pdfBytes!);
    const pdfjsLib = (window as any).pdfjsLib;
    this.pdfJsDoc = await pdfjsLib.getDocument({ data: this.pdfBytes! }).promise;

    // update annotation page indexes
    const shift = (arr: any[]) => {
      arr.forEach((a) => {
        if (!a.pageIndex) return;
        const p = a.pageIndex - 1;
        if (p === from0) a.pageIndex = target + 1;
        else if (from0 < to0 && p > from0 && p <= to0) a.pageIndex = p; // shifted down
        else if (from0 > to0 && p >= to0 && p < from0) a.pageIndex = p + 2; // shifted up
      });
    };
    shift(this.texts);
    shift(this.stickers);
    shift(this.shapes);

    await this._renderSidebar();
    await this._renderPage();
  }

  private async _insertBlankPage(index: number) {
    if (!this.pdfBytes) return;
    this.loadingOverlay.style.display = 'flex';
    try {
      this.pdfDoc.insertPage(index, [595.28, 841.89]); // A4

      this.pdfBytes = await this.pdfDoc.save();
      this.pdfBytesBase = new Uint8Array(this.pdfBytes!);
      const pdfjsLib = (window as any).pdfjsLib;
      this.pdfJsDoc = await pdfjsLib.getDocument({ data: this.pdfBytes! }).promise;
      this.numPages = this.pdfJsDoc.numPages;

      const shift = (arr: any[]) => {
        arr.forEach((a) => {
          if (a.pageIndex > index) a.pageIndex++;
        });
      };
      shift(this.texts);
      shift(this.stickers);
      shift(this.shapes);

      if (this.cp > index) this.cp++;
      await this._renderSidebar();
      await this._renderPage();
    } catch (err) {
      console.error(err);
    }
    this.loadingOverlay.style.display = 'none';
  }

  private async _gotoPage(p: number) {
    if (p >= 1 && p <= this.numPages) {
      this.cp = p;
      await this._renderSidebar();
      await this._renderPage();
    }
  }

  private _updateZoomSlider() {
    if (this.zoomSliderRange && this.zoomSliderLabel) {
      this.zoomSliderRange.value = String(this.zoom);
      this.zoomSliderLabel.textContent = `${Math.round(this.zoom * 100)}%`;
    }
  }

  private _zoom(delta: number) {
    this.zoom = Math.max(0.3, Math.min(4, this.zoom + delta));
    this._updateZoomSlider();
    if (this.pdfDoc) {
      this._renderPage();
    }
  }

  // ─── Rendering ───────────────────────────────────────────────────────────────

  private async _renderSidebar() {
    this.sidebar.innerHTML = '';
    // Draw thumbnails
    for (let i = 1; i <= this.numPages; i++) {
      const wrap = document.createElement('div');
      wrap.className = 'pe-thumb-wrap' + (this.cp === i ? ' active' : '');
      wrap.draggable = true;
      wrap.ondragstart = (e) => {
        e.dataTransfer!.setData('text/plain', (i - 1).toString());
      };
      wrap.ondragover = (e) => {
        e.preventDefault();
        wrap.classList.add('drag-over');
      };
      wrap.ondragleave = (e) => {
        wrap.classList.remove('drag-over');
      };
      wrap.ondrop = (e) => {
        wrap.classList.remove('drag-over');
        const from = parseInt(e.dataTransfer!.getData('text/plain'));
        this._movePage(from, i - 1);
      };
      wrap.onclick = () => this._gotoPage(i);

      const num = document.createElement('div');
      num.className = 'pe-thumb-num';
      num.textContent = i + '';
      const del = document.createElement('div');
      del.className = 'pe-thumb-del';
      del.innerHTML = '×';
      del.onclick = (e) => {
        e.stopPropagation();
        this._deletePage(i - 1);
      };

      const addTop = document.createElement('div');
      addTop.className = 'pe-thumb-add-top';
      addTop.textContent = '+';
      addTop.onclick = (e) => {
        e.stopPropagation();
        this._insertBlankPage(i - 1);
      };

      const addBottom = document.createElement('div');
      addBottom.className = 'pe-thumb-add-bottom';
      addBottom.textContent = '+';
      addBottom.onclick = (e) => {
        e.stopPropagation();
        this._insertBlankPage(i);
      };

      const cv = document.createElement('canvas');
      cv.className = 'pe-thumb-canvas';
      wrap.appendChild(cv);
      wrap.appendChild(num);
      wrap.appendChild(del);
      wrap.appendChild(addTop);
      wrap.appendChild(addBottom);
      this.sidebar.appendChild(wrap);

      // Render thumbnail
      const page = await this.pdfJsDoc.getPage(i);
      const viewport = page.getViewport({ scale: 180 / page.getViewport({ scale: 1 }).width }); // scale to width 180
      cv.width = viewport.width;
      cv.height = viewport.height;
      await page.render({ canvasContext: cv.getContext('2d')!, viewport }).promise;
    }
  }

  private async _renderPage() {
    if (!this.pdfJsDoc) return;
    this._updateOpts();
    const page = await this.pdfJsDoc.getPage(this.cp);
    const viewport = page.getViewport({ scale: this.zoom });

    this.canvasBg.width = viewport.width;
    this.canvasBg.height = viewport.height;
    this.canvasFg.width = viewport.width;
    this.canvasFg.height = viewport.height;
    this.wrap.style.width = viewport.width + 'px';
    this.wrap.style.height = viewport.height + 'px';

    await page.render({ canvasContext: this.ctxBg, viewport }).promise;
    this._drawFg();
  }

  private _textFontFn = (t: TextLayer) =>
    `${t.italic ? 'italic ' : ''}${t.bold ? 'bold ' : ''}${t.fontSize * this.zoom}px ${t.fontFamily}`;

  private _unzoomedFontFn = (t: TextLayer) =>
    `${t.italic ? 'italic ' : ''}${t.bold ? 'bold ' : ''}${t.fontSize}px ${t.fontFamily}`;

  private _drawFg() {
    this.ctxFg.clearRect(0, 0, this.canvasFg.width, this.canvasFg.height);

    const pgTexts = this.texts.filter((t) => t.pageIndex === this.cp);
    const pgStickers = this.stickers.filter((s) => s.pageIndex === this.cp);
    const pgShapes = this.shapes.filter((s) => s.pageIndex === this.cp);

    const renderedIds = new Set<string>();
    const pageObjects: { type: string; obj: any }[] = [];

    this.renderOrder.forEach((id) => {
      let obj: any = pgTexts.find((t) => t.id === id);
      if (obj) {
        pageObjects.push({ type: 'text', obj });
        renderedIds.add(id);
        return;
      }
      obj = pgStickers.find((s) => s.id === id);
      if (obj) {
        pageObjects.push({ type: 'sticker', obj });
        renderedIds.add(id);
        return;
      }
      obj = pgShapes.find((s) => s.id === id);
      if (obj) {
        pageObjects.push({ type: 'shape', obj });
        renderedIds.add(id);
        return;
      }
    });

    pgTexts.forEach((t) => {
      if (!renderedIds.has(t.id)) {
        pageObjects.push({ type: 'text', obj: t });
        this.renderOrder.push(t.id);
      }
    });
    pgStickers.forEach((s) => {
      if (!renderedIds.has(s.id)) {
        pageObjects.push({ type: 'sticker', obj: s });
        this.renderOrder.push(s.id);
      }
    });
    pgShapes.forEach((s) => {
      if (!renderedIds.has(s.id)) {
        pageObjects.push({ type: 'shape', obj: s });
        this.renderOrder.push(s.id);
      }
    });

    for (const item of pageObjects) {
      if (item.type === 'text') {
        const t = item.obj as TextLayer;
        const layout = computeTextLayout(this.ctxFg, t, (layer: any) => this._unzoomedFontFn(layer as TextLayer));
        const tw = layout.actualW * this.zoom;
        const th = layout.actualH * this.zoom;
        const cx = t.x * this.zoom + tw / 2;
        const cy = t.y * this.zoom;

        let lx = 0,
          ly = 0;
        if (t.tailActive && t.tailX !== undefined && t.tailY !== undefined) {
          const dx = t.tailX * this.zoom - cx;
          const dy = t.tailY * this.zoom - cy;
          const cos = Math.cos(-t.rotation);
          const sin = Math.sin(-t.rotation);
          lx = dx * cos - dy * sin;
          ly = dx * sin + dy * cos;
        }

        this.ctxFg.save();
        this.ctxFg.translate(cx, cy);
        this.ctxFg.rotate(t.rotation);

        this.ctxFg.font = this._textFontFn({ ...t, fontSize: layout.fs * this.zoom } as TextLayer);

        if (t.bgColor || t.strokeWidth !== undefined) {
          buildBubblePath(this.ctxFg, tw, th, lx, ly, !!t.tailActive);
          if (t.bgColor) {
            this.ctxFg.fillStyle = t.bgColor;
            this.ctxFg.fill();
          }
          if (t.strokeWidth && t.strokeWidth > 0) {
            this.ctxFg.setLineDash([]);
            this.ctxFg.strokeStyle = t.strokeColor || '#000000';
            this.ctxFg.lineWidth = t.strokeWidth * this.zoom;
            this.ctxFg.lineJoin = 'round';
            this.ctxFg.stroke();
          } else if (t.strokeWidth === 0 && !this._isExporting) {
            this.ctxFg.setLineDash([5, 5]);
            this.ctxFg.strokeStyle = '#aaa';
            this.ctxFg.lineWidth = 1;
            this.ctxFg.lineJoin = 'round';
            this.ctxFg.stroke();
            this.ctxFg.setLineDash([]); // reset immediately
          }
        }

        this.ctxFg.fillStyle = t.color;
        this.ctxFg.textAlign = 'left';
        this.ctxFg.textBaseline = 'middle';

        const totalTextH = layout.lines.length * layout.lineHeight * this.zoom;
        const startY = -th / 2 + (th - totalTextH) / 2 + (layout.lineHeight * this.zoom) / 2;
        for (let i = 0; i < layout.lines.length; i++) {
          this.ctxFg.fillText(layout.lines[i], -tw / 2, startY + i * layout.lineHeight * this.zoom);
        }
        this.ctxFg.restore();
      } else if (item.type === 'sticker') {
        const s = item.obj as StickerLayer;
        this.ctxFg.save();
        const cx = s.x + s.w / 2;
        const cy = s.y + s.h / 2;
        this.ctxFg.translate(cx * this.zoom, cy * this.zoom);
        this.ctxFg.rotate(s.rotation);
        this.ctxFg.drawImage(s.img, (-s.w / 2) * this.zoom, (-s.h / 2) * this.zoom, s.w * this.zoom, s.h * this.zoom);
        this.ctxFg.restore();
      } else if (item.type === 'shape') {
        const sh = item.obj as ShapeLayer;
        this.ctxFg.save();
        const box = getShapeBoundingBox(sh as any);
        this.ctxFg.translate(box.cx * this.zoom, box.cy * this.zoom);
        this.ctxFg.rotate(sh.rotation || 0);
        this.ctxFg.translate(-box.cx * this.zoom, -box.cy * this.zoom);

        this.ctxFg.strokeStyle = sh.color;
        this.ctxFg.lineWidth = sh.strokeWidth * this.zoom;
        this.ctxFg.lineCap = 'round';
        this.ctxFg.lineJoin = 'round';
        const scaledPoints = sh.points ? sh.points.map((p) => ({ x: p.x * this.zoom, y: p.y * this.zoom })) : undefined;
        drawShapePath(
          this.ctxFg,
          sh.type,
          sh.arrowType || 'standard',
          sh.color,
          sh.x * this.zoom,
          sh.y * this.zoom,
          sh.w * this.zoom,
          sh.h * this.zoom,
          sh.bgColor,
          scaledPoints
        );
        this.ctxFg.restore();
      }
    }

    if (this.activeShape) {
      const sh = this.activeShape;
      this.ctxFg.save();
      const box = getShapeBoundingBox(sh as any);
      this.ctxFg.translate(box.cx * this.zoom, box.cy * this.zoom);
      this.ctxFg.rotate(sh.rotation || 0);
      this.ctxFg.translate(-box.cx * this.zoom, -box.cy * this.zoom);

      this.ctxFg.strokeStyle = sh.color;
      this.ctxFg.lineWidth = sh.strokeWidth * this.zoom;
      this.ctxFg.lineCap = 'round';
      this.ctxFg.lineJoin = 'round';
      const scaledPoints = sh.points ? sh.points.map((p) => ({ x: p.x * this.zoom, y: p.y * this.zoom })) : undefined;
      drawShapePath(
        this.ctxFg,
        sh.type,
        sh.arrowType || 'standard',
        sh.color,
        sh.x * this.zoom,
        sh.y * this.zoom,
        sh.w * this.zoom,
        sh.h * this.zoom,
        sh.bgColor,
        scaledPoints
      );
      this.ctxFg.restore();
    }

    // Handles
    if (this.activeId && this.tool === 'pan') {
      const txt = pgTexts.find((x) => x.id === this.activeId);
      if (txt) {
        const h = getTextHandles(txt as any, this.zoom, this.ctxFg, this._textFontFn as any);
        this._drawHandles(h);
      }
      const st = pgStickers.find((x) => x.id === this.activeId);
      if (st) {
        const h = getStickerHandles(st as any, this.zoom);
        this._drawHandles(h);
      }
      const sh = pgShapes.find((x) => x.id === this.activeId);
      if (sh) {
        const h = getShapeHandles(sh as any, this.zoom);
        this._drawHandles(h);
      }
    }
  }

  private _drawHandles(h: any) {
    const s = HANDLE_SIZE;
    if (h.rot) {
      this.ctxFg.beginPath();
      this.ctxFg.arc(h.rot.x * this.zoom, h.rot.y * this.zoom, 6, 0, Math.PI * 2);
      this.ctxFg.fillStyle = '#0af';
      this.ctxFg.fill();
      this.ctxFg.strokeStyle = '#fff';
      this.ctxFg.stroke();
    }
    if (h.resize) {
      this.ctxFg.fillStyle = '#fff';
      this.ctxFg.strokeStyle = '#333';
      this.ctxFg.lineWidth = 1;
      this.ctxFg.fillRect(h.resize.x * this.zoom - s / 2, h.resize.y * this.zoom - s / 2, s, s);
      this.ctxFg.strokeRect(h.resize.x * this.zoom - s / 2, h.resize.y * this.zoom - s / 2, s, s);
    }
    if (h.del) {
      drawDeleteHandle(this.ctxFg, h.del.x * this.zoom, h.del.y * this.zoom, 10);
    }
    if (h.tail) {
      this.ctxFg.fillStyle = '#ffaa00';
      this.ctxFg.strokeStyle = '#fff';
      this.ctxFg.lineWidth = 1;
      this.ctxFg.beginPath();
      this.ctxFg.arc(h.tail.x * this.zoom, h.tail.y * this.zoom, 4, 0, Math.PI * 2);
      this.ctxFg.fill();
      this.ctxFg.stroke();
    }
  }

  // ─── Events ──────────────────────────────────────────────────────────────────
  private _attachEvents() {
    const cw = this.canvasFg;

    let isDragging = false;
    let startPanX = 0,
      startPanY = 0;

    cw.onmousedown = (e) => {
      this.container.focus();
      if (this.textInput && this.textCommitFn) {
        this.textCommitFn();
        return;
      }
      const rect = cw.getBoundingClientRect();
      const x = (e.clientX - rect.left) / this.zoom;
      const y = (e.clientY - rect.top) / this.zoom;

      if (this.tool === 'pan') {
        const area = this.container.querySelector('.pe-canvas-area')!;
        // hit detect
        const pgTexts = this.texts.filter((t) => t.pageIndex === this.cp);
        const pgStickers = this.stickers.filter((s) => s.pageIndex === this.cp);
        const pgShapes = this.shapes.filter((s) => s.pageIndex === this.cp);

        let hit = null;
        let startedAction = false;

        if (this.activeId) {
          // check handles first
          const t = pgTexts.find((x) => x.id === this.activeId);
          if (t) {
            const h = getTextHandles(t as any, this.zoom, this.ctxFg, this._unzoomedFontFn as any);
            if (Math.abs(x - h.rot.x) * this.zoom < HANDLE_SIZE && Math.abs(y - h.rot.y) * this.zoom < HANDLE_SIZE) {
              this._pushUndo();
              this.ctxFg.font = this._textFontFn(t as any);
              const layout = computeTextLayout(this.ctxFg, t as any, this._unzoomedFontFn as any);
              const cx = t.x + layout.actualW / 2;
              const startAngle = Math.atan2(y - t.y, x - cx);
              this.dragState = {
                type: 'rotT',
                obj: t,
                cx,
                cy: t.y,
                startAngle,
                startRotation: t.rotation || 0,
              };
              return;
            }
            if (
              Math.abs(x - h.resize.x) * this.zoom < HANDLE_SIZE &&
              Math.abs(y - h.resize.y) * this.zoom < HANDLE_SIZE
            ) {
              this._pushUndo();
              this.dragState = {
                type: 'resizeT',
                obj: t,
                startX: x,
                startY: y,
                startW: t.w || 200,
                startH: t.h || t.fontSize * 1.5,
              };
              return;
            }
            if (Math.abs(x - h.del.x) * this.zoom < HANDLE_SIZE && Math.abs(y - h.del.y) * this.zoom < HANDLE_SIZE) {
              this._pushUndo();
              this.texts = this.texts.filter((tx) => tx.id !== this.activeId);
              this.activeId = null;
              this._drawFg();
              return;
            }
            if (
              h.tail &&
              Math.abs(x - h.tail.x) * this.zoom < HANDLE_SIZE &&
              Math.abs(y - h.tail.y) * this.zoom < HANDLE_SIZE
            ) {
              this._pushUndo();
              this.dragState = { type: 'dtail', obj: t, lastX: x, lastY: y };
              return;
            }
          }
          const s = pgStickers.find((x) => x.id === this.activeId);
          if (s) {
            const h = getStickerHandles(s as any, this.zoom);
            if (Math.abs(x - h.del.x) * this.zoom < HANDLE_SIZE && Math.abs(y - h.del.y) * this.zoom < HANDLE_SIZE) {
              this._pushUndo();
              this.stickers = this.stickers.filter((sx) => sx.id !== this.activeId);
              this.activeId = null;
              this._drawFg();
              return;
            }
            if (Math.abs(x - h.rot.x) * this.zoom < HANDLE_SIZE && Math.abs(y - h.rot.y) * this.zoom < HANDLE_SIZE) {
              this._pushUndo();
              this.dragState = { type: 'rotS', obj: s, cx: s.x + s.w / 2, cy: s.y + s.h / 2 };
              return;
            }
            if (
              Math.abs(x - h.resize.x) * this.zoom < HANDLE_SIZE &&
              Math.abs(y - h.resize.y) * this.zoom < HANDLE_SIZE
            ) {
              this._pushUndo();
              this.dragState = { type: 'resizeS', obj: s, startX: x, startY: y, origW: s.w, origH: s.h };
              return;
            }
          }
          const shp = pgShapes.find((x) => x.id === this.activeId);
          if (shp) {
            const h = getShapeHandles(shp as any, this.zoom);
            if (Math.abs(x - h.del.x) * this.zoom < HANDLE_SIZE && Math.abs(y - h.del.y) * this.zoom < HANDLE_SIZE) {
              this._pushUndo();
              this.shapes = this.shapes.filter((sx) => sx.id !== this.activeId);
              this.activeId = null;
              this._drawFg();
              return;
            }
            if (Math.abs(x - h.rot.x) * this.zoom < HANDLE_SIZE && Math.abs(y - h.rot.y) * this.zoom < HANDLE_SIZE) {
              this._pushUndo();
              const box = getShapeBoundingBox(shp as any);
              this.dragState = { type: 'rotShp', obj: shp, cx: box.cx, cy: box.cy };
              return;
            }
            if (
              Math.abs(x - h.resize.x) * this.zoom < HANDLE_SIZE &&
              Math.abs(y - h.resize.y) * this.zoom < HANDLE_SIZE
            ) {
              this._pushUndo();
              const box = getShapeBoundingBox(shp as any);
              this.dragState = {
                type: 'resizeShp',
                obj: shp,
                startX: x,
                startY: y,
                origX: shp.x,
                origY: shp.y,
                origW: shp.w,
                origH: shp.h,
                boxCX: box.cx,
                boxCY: box.cy,
                boxW: box.w,
                boxH: box.h,
                origPoints: shp.points ? shp.points.map((p: any) => ({ ...p })) : [],
              };
              return;
            }
          }
        }

        for (let i = pgTexts.length - 1; i >= 0; i--) {
          if (hitText({ x, y }, pgTexts[i] as any, this.ctxFg, this._unzoomedFontFn as any)) {
            hit = pgTexts[i];
            break;
          }
        }
        if (!hit) {
          for (let i = pgStickers.length - 1; i >= 0; i--) {
            if (hitSticker({ x, y }, pgStickers[i] as any)) {
              hit = pgStickers[i];
              break;
            }
          }
        }
        if (!hit) {
          for (let i = pgShapes.length - 1; i >= 0; i--) {
            if (hitShape({ x, y }, pgShapes[i] as any)) {
              hit = pgShapes[i];
              break;
            }
          }
        }

        if (hit) {
          this._pushUndo();
          this.activeId = hit.id;
          this.dragState = { type: 'move', obj: hit, ox: x - hit.x, oy: y - hit.y };
        } else {
          this.activeId = null;
          isDragging = true;
          startPanX = e.clientX + area.scrollLeft;
          startPanY = e.clientY + area.scrollTop;
          (area as HTMLElement).style.cursor = 'grabbing';
        }
        this._updateOpts();
        this._drawFg();
      } else if (this.tool === 'text') {
        let boxW = Math.max(200, this._fontSize * 5);
        let boxH = Math.max(50, this._fontSize * 1.5);
        const initialRotation = this._tempRot;
        this._tempRot = 0; // reset immediately

        const inp = document.createElement('textarea');
        inp.className = 'pe-text-input';
        inp.placeholder = 'Type text... (Shift+Enter to newline)';
        inp.style.position = 'absolute';
        inp.style.left = x * this.zoom + 'px';
        inp.style.top = y * this.zoom + 'px';
        inp.style.color = this.color;
        inp.style.fontSize = this._fontSize * this.zoom + 'px';
        inp.style.fontFamily = this._fontFamily;
        inp.style.fontWeight = 'normal';
        inp.style.fontStyle = 'normal';
        inp.style.background = 'transparent';
        inp.style.border = '1px dashed #0af';
        inp.style.outline = 'none';
        inp.style.resize = 'none';
        inp.style.overflow = 'auto'; // allow inner scroll
        inp.style.whiteSpace = 'pre'; // prevent auto layout wrap while typing
        inp.style.lineHeight = '1.2';
        inp.style.padding = '4px';
        inp.style.transform = `translate(0, -50%) rotate(${initialRotation}rad)`; // aligned origin
        inp.style.transformOrigin = '50% 50%';
        inp.dataset.rot = String(initialRotation);
        inp.dataset.explicitw = 'false';
        inp.style.pointerEvents = 'auto'; // ensure click works
        inp.style.width = boxW * this.zoom + 'px';
        inp.style.height = boxH * this.zoom + 'px';

        this.wrap.appendChild(inp);
        this.textInput = inp;

        this.textCommitFn = () => {
          if (!this.textInput) return;
          const val = inp.value.trim();
          if (val) {
            const newId = inp.dataset.editid || 't_' + Date.now();
            const explicitW = inp.dataset.explicitw === 'true';
            const uiA = parseFloat(inp.style.width) / this.zoom || 200;
            const expectedBoxW = explicitW ? uiA : undefined;

            const t: TextLayer = {
              id: newId,
              pageIndex: this.cp,
              text: val,
              x,
              y,
              w: undefined,
              h: undefined,
              color: this.color,
              bgColor: this.fillColor,
              fontSize: this._fontSize,
              fontFamily: this._fontFamily,
              bold: this._textBold,
              italic: this._textItalic,
              rotation: Number(inp.dataset.rot) || 0,
              strokeColor: this._textStrokeColor,
              strokeWidth: this._textStrokeWidth,
              tailActive: this._textTailActive,
            };

            const layoutB = computeTextLayout(this.ctxFg, t, this._unzoomedFontFn.bind(this) as any);
            const B = layoutB.actualW;

            t.w = explicitW ? expectedBoxW : Math.min(B, uiA);
            const layoutFinal = computeTextLayout(this.ctxFg, t, this._unzoomedFontFn.bind(this) as any);
            t.h = layoutFinal.actualH;
            t.fontSize = layoutFinal.fs;

            if (t.tailActive && (t.tailX === undefined || t.tailY === undefined)) {
              t.tailX = t.x;
              t.tailY = t.y + t.fontSize * 1.5;
            }

            this._pushUndo();
            this.texts.push(t);
            if (!this.renderOrder.includes(newId)) this.renderOrder.push(newId);
            this.activeId = newId;
            this._setTool('pan', true);
          }

          if (this.textCancelFn) this.textCancelFn();

          if (val) {
            this._updateOpts();
            this._drawFg();
          }
        };

        this.textCancelFn = () => {
          if (this.textInput) {
            this.textInput.remove();
            this.textInput = null;
            this.textCommitFn = null;
            this.textCancelFn = null;
          }
        };

        inp.onmousedown = (ev) => ev.stopPropagation(); // prevent re-triggering canvas mousedown
        inp.onkeydown = (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.textCommitFn!();
          }
          if (e.key === 'Escape') {
            this.textCancelFn!();
          }
        };

        setTimeout(() => inp.focus(), 50);
      } else if (this.tool === 'pencil') {
        this._pushUndo();
        this.activeShape = {
          id: 'shp_' + Date.now(),
          pageIndex: this.cp,
          type: this._penMode,
          color: this.color,
          bgColor: this.fillColor,
          strokeWidth: this._penSize,
          points: [{ x, y }],
          rotation: 0,
          x,
          y,
          w: x,
          h: y,
          arrowType: this._arrowType,
        };
      }
    };

    window.addEventListener('mousemove', (e) => {
      if (isDragging && this.tool === 'pan') {
        const area = this.container.querySelector('.pe-canvas-area')!;
        area.scrollLeft = startPanX - e.clientX;
        area.scrollTop = startPanY - e.clientY;
      }
      if (this.dragState) {
        const rect = cw.getBoundingClientRect();
        const x = (e.clientX - rect.left) / this.zoom;
        const y = (e.clientY - rect.top) / this.zoom;
        const st = this.dragState;

        if (st.type === 'move') {
          const pgW = this.canvasFg.width / this.zoom;
          const pgH = this.canvasFg.height / this.zoom;
          let bx: { cx: number; cy: number; w: number; h: number } | null = null;
          if ((st.obj as any).text !== undefined) {
            const layout = computeTextLayout(this.ctxFg, st.obj as TextLayer, (t: any) => this._unzoomedFontFn(t));
            bx = {
              cx: st.obj.x + layout.actualW / 2,
              cy: st.obj.y,
              w: layout.actualW,
              h: layout.actualH,
            };
          } else if ((st.obj as any).img !== undefined) {
            bx = { cx: st.obj.x + st.obj.w / 2, cy: st.obj.y + st.obj.h / 2, w: st.obj.w, h: st.obj.h };
          } else if ((st.obj as any).type !== undefined) {
            bx = getShapeBoundingBox(st.obj as any);
          }

          let dx = 0;
          let dy = 0;

          if (bx) {
            const rightMax = Math.max(0, pgW - bx.w);
            const bottomMax = Math.max(0, pgH - bx.h);

            const targetDx = x - st.ox - st.obj.x;
            const targetDy = y - st.oy - st.obj.y;

            const targetLeft = bx.cx - bx.w / 2 + targetDx;
            const targetTop = bx.cy - bx.h / 2 + targetDy;

            const clampedLeft = Math.max(0, Math.min(targetLeft, rightMax));
            const clampedTop = Math.max(0, Math.min(targetTop, bottomMax));

            dx = clampedLeft - (bx.cx - bx.w / 2);
            dy = clampedTop - (bx.cy - bx.h / 2);
          } else {
            dx = x - st.ox - st.obj.x;
            dy = y - st.oy - st.obj.y;
          }

          const el = document.elementFromPoint(e.clientX, e.clientY);
          const thumbWrap = el?.closest('.pe-thumb-wrap') as HTMLElement;
          if (thumbWrap && thumbWrap.dataset.pageIndex) {
            const hIdx = parseInt(thumbWrap.dataset.pageIndex, 10);
            if (hIdx !== this.cp) {
              this.cp = hIdx;
              st.obj.pageIndex = hIdx;
              this._renderSidebar();
              this._renderPage();
            }
          }

          if (st.obj.type === 'pencil' && st.obj.points) {
            st.obj.points.forEach((p: any) => {
              p.x += dx;
              p.y += dy;
            });
          } else if (st.obj.type && st.obj.type !== 'pencil') {
            st.obj.w += dx;
            st.obj.h += dy;
          }

          st.obj.x += dx;
          st.obj.y += dy;

          if ((st.obj as any).text !== undefined && st.obj.tailActive) {
            const t = st.obj as TextLayer;
            if (t.tailX !== undefined) t.tailX += dx;
            if (t.tailY !== undefined) t.tailY += dy;
          }
        } else if (st.type === 'dtail') {
          const dx = x - st.lastX;
          const dy = y - st.lastY;
          const t = st.obj as TextLayer;
          if (t.tailX !== undefined) t.tailX += dx;
          if (t.tailY !== undefined) t.tailY += dy;
          st.lastX = x;
          st.lastY = y;
        } else if (st.type.startsWith('rot')) {
          st.obj.rotation = Math.atan2(y - st.cy, x - st.cx) + Math.PI / 2;
        } else if (st.type === 'resizeT') {
          const dx = x - st.startX;
          const dy = y - st.startY;
          const rot = st.obj.rotation || 0;
          const cos = Math.cos(-rot);
          const sin = Math.sin(-rot);

          const unDx = dx * cos - dy * sin;
          const unDy = dx * sin + dy * cos;

          st.obj.w = Math.max(60, st.startW + unDx);
          st.obj.h = Math.max(20, st.startH + unDy * 2);
        } else if (st.type === 'resizeS') {
          const dx = x - st.startX;
          const dy = y - st.startY;
          let targetW = st.origW + dx;
          let targetH = st.origH + dy;
          if (e.shiftKey) {
            const ratio = st.origW / st.origH;
            if (Math.abs(targetW) / Math.abs(targetH) > ratio) {
              targetW = targetH * ratio;
            } else {
              targetH = targetW / ratio;
            }
          }
          st.obj.w = Math.max(20, targetW);
          st.obj.h = Math.max(20, targetH);
        } else if (st.type === 'resizeShp') {
          const dx = x - st.startX;
          const dy = y - st.startY;
          const rot = st.obj.rotation || 0;
          const cos = Math.cos(-rot);
          const sin = Math.sin(-rot);
          const unDx = dx * cos - dy * sin;
          const unDy = dx * sin + dy * cos;

          const scaleX = Math.max(0.1, st.boxW + unDx * 2) / Math.max(0.1, st.boxW);
          const scaleY = Math.max(0.1, st.boxH + unDy * 2) / Math.max(0.1, st.boxH);

          if (st.obj.type === 'pencil' && st.obj.points) {
            st.obj.points.forEach((p: any, i: number) => {
              p.x = st.boxCX + (st.origPoints[i].x - st.boxCX) * scaleX;
              p.y = st.boxCY + (st.origPoints[i].y - st.boxCY) * scaleY;
            });
            st.startX = x;
            st.startY = y;
            st.boxW = Math.max(1, st.boxW + unDx * 2);
            st.boxH = Math.max(1, st.boxH + unDy * 2);
            st.origPoints = st.obj.points.map((p: any) => ({ ...p }));
          } else if (st.obj.type === 'circle' || st.obj.type === 'star') {
            const radScale = Math.max(scaleX, scaleY);
            st.obj.w = st.obj.x + (st.origW - st.obj.x) * radScale;
            st.obj.h = st.obj.y + (st.origH - st.obj.y) * radScale;
          } else {
            st.obj.x = st.boxCX + (st.origX - st.boxCX) * scaleX;
            st.obj.y = st.boxCY + (st.origY - st.boxCY) * scaleY;
            st.obj.w = st.boxCX + (st.origW - st.boxCX) * scaleX;
            st.obj.h = st.boxCY + (st.origH - st.boxCY) * scaleY;
          }
        }
        this._drawFg();
      }

      if (this.activeShape) {
        const rect = cw.getBoundingClientRect();
        const x = (e.clientX - rect.left) / this.zoom;
        const y = (e.clientY - rect.top) / this.zoom;
        this.activeShape.w = x;
        this.activeShape.h = y;
        if (this.activeShape.type === 'pencil' && this.activeShape.points) {
          this.activeShape.points.push({ x, y });
        }
        this._drawFg();
      }
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        const area = this.container.querySelector('.pe-canvas-area') as HTMLElement;
        area.style.cursor = 'grab';
      }

      let dragged = false;
      if (this.dragState) dragged = true;

      if (this.dragState && this.dragState.type === 'resizeT') {
        const tObj = this.dragState.obj as any;
        const layout = computeTextLayout(this.ctxFg, tObj, this._unzoomedFontFn.bind(this) as any);
        tObj.fontSize = layout.fs;
        this._fontSize = layout.fs;
      }

      this.dragState = null;
      let shapeCommitted = false;
      if (this.activeShape) {
        this.shapes.push(this.activeShape);
        if (!this.renderOrder.includes(this.activeShape.id)) this.renderOrder.push(this.activeShape.id);
        const newActive = this.activeShape.id;
        this.activeShape = null;
        this.activeId = newActive;
        shapeCommitted = true;
        this._setTool('pan', true);
      }

      const movedOrDrawn = dragged || shapeCommitted;
      if (movedOrDrawn) {
        this._drawFg();
      }
    });

    cw.addEventListener('dblclick', (e) => {
      if (this.tool !== 'pan' && this.tool !== 'select') return;
      const rect = cw.getBoundingClientRect();
      const x = (e.clientX - rect.left) / this.zoom;
      const y = (e.clientY - rect.top) / this.zoom;

      const pgTexts = this.texts.filter((t) => t.pageIndex === this.cp);
      for (let i = pgTexts.length - 1; i >= 0; i--) {
        const t = pgTexts[i];
        if (hitText({ x, y }, t as any, this.ctxFg, this._textFontFn as any)) {
          // Re-edit text
          this._pushUndo();
          this.texts = this.texts.filter((tx) => tx.id !== t.id); // Remove first
          this.activeId = null;

          this.color = t.color;
          const layout = computeTextLayout(this.ctxFg, t as any, this._unzoomedFontFn.bind(this) as any);
          this._fontSize = layout.fs;
          this.fillColor = t.bgColor;
          this._textStrokeColor = t.strokeColor || '#000000';
          this._textStrokeWidth = t.strokeWidth || 0;
          this._textTailActive = !!t.tailActive;
          this._textBold = !!t.bold;
          this._textItalic = !!t.italic;
          this._fontFamily = t.fontFamily || 'sans-serif';
          this._updateOpts();

          // Simulate clicking to insert text
          this._tempRot = t.rotation || 0;
          this._setTool('text');
          const mdev = new MouseEvent('mousedown', {
            clientX: rect.left + t.x * this.zoom,
            clientY: rect.top + t.y * this.zoom,
            bubbles: true,
          });
          cw.dispatchEvent(mdev);

          setTimeout(() => {
            if (this.textInput) {
              this.textInput.value = t.text;
              this.textInput.dataset.editid = t.id;
              this.textInput.dataset.rot = String(t.rotation || 0);
              this.textInput.style.transform = `translate(0, -50%) rotate(${t.rotation || 0}rad)`;
              if (t.w) {
                this.textInput.style.width = String(t.w * this.zoom) + 'px';
                this.textInput.dataset.explicitw = 'true';
              }
              if (t.h) this.textInput.style.height = String(t.h * this.zoom) + 'px';
              this.textInput.dispatchEvent(new Event('input'));
            }
          }, 0);
          return;
        }
      }
    });

    this.container.addEventListener('keydown', (e) => {
      // Undo / Redo Shortcuts
      if ((e.ctrlKey || e.metaKey) && typeof e.key === 'string' && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          this.redo();
        } else {
          e.preventDefault();
          this.undo();
        }
        return;
      }
      if ((e.ctrlKey || e.metaKey) && typeof e.key === 'string' && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        this.redo();
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'c' || e.key === 'C') {
          if (this.textInput || this.activeId === null) return;
          this._copyInternalClipboard();
        } else if (e.key === 'x' || e.key === 'X') {
          if (this.textInput || this.activeId === null) return;
          this._copyInternalClipboard();
          this._pushUndo();
          this.texts = this.texts.filter((t) => t.id !== this.activeId);
          this.stickers = this.stickers.filter((s) => s.id !== this.activeId);
          this.shapes = this.shapes.filter((s) => s.id !== this.activeId);
          this.activeId = null;
          this._updateOpts();
          this._drawFg();
        } else if (e.key === 'v' || e.key === 'V') {
          if (this.textInput) return;
          let _w: any = window;
          try {
            _w = window.top || window;
          } catch (err) {}
          const globalTime = _w.__lupine_clipboard_time || 0;
          const globalImgTime = _w.__lupine_clipboard_img_time || 0;

          if (globalTime > 0 || globalImgTime > 0 || this.internalClipboard) {
            e.preventDefault();
            this._pasteClipboard();
          }
        }
      }

      // Keyboard Delete
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (this.textInput || this.activeId === null) return;
        this._pushUndo();
        this.texts = this.texts.filter((t) => t.id !== this.activeId);
        this.stickers = this.stickers.filter((s) => s.id !== this.activeId);
        this.shapes = this.shapes.filter((s) => s.id !== this.activeId);
        this.activeId = null;
        this._updateOpts();
        this._drawFg();
      }
    });

    this.container.addEventListener('paste', (e) => {
      // Do not intercept if user is typing in an input
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      // Prevent custom internal payloads (which Ctrl+V handles) from triggering external Image parsing natively
      if (e.clipboardData?.types.includes('text/html')) {
        const payloadFlag = e.clipboardData.getData('text/html');
        if (payloadFlag && payloadFlag.includes('lupine-editor')) return;
      }

      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          e.preventDefault();
          const file = items[i].getAsFile();
          if (file) {
            const img = new Image();
            img.onload = () => {
              this._pushUndo();
              const maxDim = 200;
              let nw = img.naturalWidth;
              let nh = img.naturalHeight;
              if (nw > maxDim || nh > maxDim) {
                const ratio = Math.min(maxDim / nw, maxDim / nh);
                nw *= ratio;
                nh *= ratio;
              }

              const newSticker: StickerLayer = {
                id: 's_' + Date.now(),
                pageIndex: this.cp,
                img,
                x: 50 / this.zoom,
                y: 50 / this.zoom,
                w: nw / this.zoom,
                h: nh / this.zoom,
                rotation: 0,
              };
              this.stickers.push(newSticker);
              if (!this.renderOrder.includes(newSticker.id)) this.renderOrder.push(newSticker.id);
              this.activeId = newSticker.id;
              this._setTool('pan', true);
              this._drawFg();
            };
            img.src = URL.createObjectURL(file);
          }
          return;
        }
      }
    });
  }

  private _copyInternalClipboard() {
    if (!this.activeId) return;
    const txt = this.texts.find((t) => t.id === this.activeId);
    if (txt) {
      const layout = computeTextLayout(this.ctxFg, txt as any, this._unzoomedFontFn.bind(this) as any);
      this.internalClipboard = { type: 'text', data: { ...txt, w: layout.actualW, h: layout.actualH } };
    } else {
      const stk = this.stickers.find((s) => s.id === this.activeId);
      if (stk) {
        this.internalClipboard = { type: 'sticker', data: { ...stk } };
      } else {
        const shp = this.shapes.find((s) => s.id === this.activeId);
        if (shp) {
          this.internalClipboard = {
            type: 'shape',
            data: {
              ...shp,
              points: shp.points ? shp.points.map((p: any) => ({ ...p })) : undefined,
            },
          };
        }
      }
    }

    if (this.internalClipboard) {
      this.internalClipboardTime = Date.now();
      try {
        const _w: any = window.top || window;
        _w.__lupine_clipboard = this.internalClipboard;
        _w.__lupine_clipboard_time = this.internalClipboardTime;
      } catch (err) {}
      exportToSystemClipboard(this.internalClipboard, (ctx, shifted) => {
        if (this.internalClipboard!.type === 'text') {
          renderTextLayer(ctx, shifted, this._unzoomedFontFn.bind(this) as any, 1, true);
        } else if (this.internalClipboard!.type === 'shape') {
          renderShapeLayer(ctx, shifted, 1);
        } else if (this.internalClipboard!.type === 'sticker') {
          renderStickerLayer(ctx, shifted, 1);
        }
      });
    }
  }

  private _pasteClipboard() {
    let _w: any = window;
    try {
      _w = window.top || window;
    } catch (err) {}
    const globalTime = _w.__lupine_clipboard_time || 0;
    const globalImgTime = _w.__lupine_clipboard_img_time || 0;

    const useImgGlobal = globalImgTime > 0;
    const bestInternalTime = Math.max(globalTime, this.internalClipboardTime);

    if (useImgGlobal && globalImgTime > bestInternalTime) {
      const img = _w.__lupine_clipboard_img;
      if (!img) return;
      this._pushUndo();
      const newId = `c_${Date.now()}`;
      const s: StickerLayer = {
        id: newId,
        img,
        pageIndex: this.cp,
        x: 50 / this.zoom,
        y: 50 / this.zoom,
        w: img.naturalWidth / this.zoom,
        h: img.naturalHeight / this.zoom,
        rotation: 0,
      };
      this.stickers.push(s);
      this.activeId = newId;
      this._drawFg();
      return;
    }

    const internal =
      globalTime > this.internalClipboardTime ? _w.__lupine_clipboard : this.internalClipboard || _w.__lupine_clipboard;

    if (!internal) return;
    this._pushUndo();
    const newId = `c_${Date.now()}`;
    const offset = 20 / this.zoom;

    const pgW = this.canvasFg.width / this.zoom;
    const pgH = this.canvasFg.height / this.zoom;

    if (internal.type === 'text') {
      const t = { ...internal.data, id: newId, pageIndex: this.cp };
      t.x += offset;
      t.y += offset;
      if (t.tailActive && t.tailX !== undefined && t.tailY !== undefined) {
        t.tailX += offset;
        t.tailY += offset;
      }
      enforceBounds(t, false, 0, 0, pgW, pgH, this.zoom);
      this.texts.push(t);
      this.activeId = newId;
    } else if (internal.type === 'sticker') {
      const s = { ...internal.data, id: newId, pageIndex: this.cp };
      s.x += offset;
      s.y += offset;
      enforceBounds(s, false, 0, 0, pgW, pgH, this.zoom);
      this.stickers.push(s);
      this.activeId = newId;
    } else if (internal.type === 'shape') {
      const sh = {
        ...internal.data,
        id: newId,
        pageIndex: this.cp,
        points: internal.data.points ? internal.data.points.map((p: any) => ({ ...p })) : undefined,
      };

      if (sh.w === undefined && sh.endX !== undefined) sh.w = sh.endX;
      if (sh.h === undefined && sh.endY !== undefined) sh.h = sh.endY;

      sh.x += offset;
      sh.y += offset;
      if (sh.w !== undefined) sh.w += offset;
      else if (sh.endX !== undefined) sh.endX += offset;
      if (sh.h !== undefined) sh.h += offset;
      else if (sh.endY !== undefined) sh.endY += offset;

      if (sh.points) {
        for (const p of sh.points) {
          p.x += offset;
          p.y += offset;
        }
      }
      enforceBounds(sh, true, 0, 0, pgW, pgH, this.zoom);
      this.shapes.push(sh);
      this.activeId = newId;
    }

    if (this.activeId && !this.renderOrder.includes(this.activeId)) {
      this.renderOrder.push(this.activeId);
    }
    this._setTool('pan', true);
    this._drawFg();
  }
}
