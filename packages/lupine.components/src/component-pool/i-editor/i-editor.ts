import {
  Tool,
  TextLayer,
  StickerLayer,
  Snapshot,
  IEditorOptions,
  HANDLE_SIZE,
  ShapeLayer,
  DisplayObject,
} from './i-editor-types';
import {
  hitSticker,
  hitText,
  getStickerHandles,
  getTextHandles,
  getShapeBoundingBox,
  getShapeHandles,
  hitShape,
} from './i-editor-geometry';
import { drawHeartPath, drawDeleteHandle, buildBubblePath, drawShapePath } from './i-editor-drawing';
import { drawFrame } from './i-editor-frames';
import { applyMosaic, flipImageDataVertical } from './i-editor-image';
import { EDITOR_STYLES } from './i-editor-styles';
import { LJ_SVG_ICON_CLASS, SvgIconNames, loadSvgIconStyles } from '../svg-icons';
import { ActionSheetSelectPromise } from '../../components/action-sheet';
export class IEditor {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private offCanvas = document.createElement('canvas');
  private offCtx: CanvasRenderingContext2D;

  private displayObjects: DisplayObject[] = [];

  private viewScale = 1;
  private viewOffX = 0;
  private viewOffY = 0;

  private get textLayers(): TextLayer[] {
    return this.displayObjects.filter((o) => o.type === 'text').map((o) => o.layer as TextLayer);
  }
  private get stickerLayers(): StickerLayer[] {
    return this.displayObjects.filter((o) => o.type === 'sticker').map((o) => o.layer as StickerLayer);
  }
  private get shapes(): ShapeLayer[] {
    return this.displayObjects.filter((o) => o.type === 'shape').map((o) => o.layer as ShapeLayer);
  }

  private undoStack: Snapshot[] = [];
  private redoStack: Snapshot[] = [];

  private activeTool: Tool = 'pan';
  private isPointerDown = false;
  private lastX = 0;
  private lastY = 0;
  private zoomSliderRange!: HTMLInputElement;
  private zoomSliderLabel!: HTMLSpanElement;
  public resizeBgColor: string | null = null;
  private eraserSize = 20;
  private isErasing = false;
  private eraserLastX: number = 0;
  private eraserLastY: number = 0;
  private mosaicLastX: number = 0;
  private mosaicLastY: number = 0;

  private activePointers: Map<number, PointerEvent> = new Map();
  private initialPinchDist = 0;
  private initialPinchScale = 1;
  private pinchCenter = { x: 0, y: 0 };
  private brushSizeInput!: HTMLInputElement;
  private brushSizeVal!: HTMLSpanElement;
  private optsWrap!: HTMLLabelElement | HTMLDivElement;
  private rotSliderRange!: HTMLInputElement;

  private penColor = '#e74c3c';
  private penSize = 8;
  private penMode: 'pencil' | 'line' | 'circle' | 'rect' | 'triangle' | 'star' | 'arrow' = 'pencil';
  private penArrowType: 'standard' | 'double' | 'thick' | 'fishtail' | 'arc' = 'standard';
  private penStartX = 0;
  private penStartY = 0;
  private mosaicSize = 16;

  // Select tool state
  private selStartX = 0;
  private selStartY = 0;
  private selEndX = 0;
  private selEndY = 0;
  private hasSelection = false;

  // Crop overlay state (DOM-based)
  private cropOverlayEl: HTMLDivElement | null = null;
  private cropFrameEl: HTMLDivElement | null = null;
  private cropX = 50;
  private cropY = 50;
  private cropW = 200;
  private cropH = 150;
  private cropDragMode: 'move' | 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w' | null = null;
  private cropDragStartX = 0;
  private cropDragStartY = 0;
  private cropStartState = { x: 0, y: 0, w: 0, h: 0 };

  // Active draggable layers
  private activeText: { layer: TextLayer; offX: number; offY: number } | null = null;
  private activeSticker: { layer: StickerLayer; offX: number; offY: number } | null = null;
  private rotatingSticker: {
    layer: StickerLayer;
    cx: number;
    cy: number;
    startAngle: number;
    startRotation: number;
  } | null = null;
  private resizingSticker: {
    layer: StickerLayer;
    startX: number;
    startY: number;
    startW: number;
    startH: number;
  } | null = null;

  private resizingText: { layer: TextLayer; startX: number; startFontSize: number } | null = null;
  private rotatingText: {
    layer: TextLayer;
    cx: number;
    cy: number;
    startAngle: number;
    startRotation: number;
  } | null = null;
  private movingTail: { layer: TextLayer } | null = null;
  private selectedSticker: StickerLayer | null = null;
  private selectedText: TextLayer | null = null;
  private selectedShape: ShapeLayer | null = null;

  private activeShape: ShapeLayer | null = null; // Used during active path drawing
  private movingShape: { layer: ShapeLayer; lastX: number; lastY: number } | null = null;
  private rotatingShape: {
    layer: ShapeLayer;
    cx: number;
    cy: number;
    startAngle: number;
    startRotation: number;
  } | null = null;
  private resizingShape: {
    layer: ShapeLayer;
    startX: number;
    startY: number;
    boxW: number;
    boxH: number;
    boxCX: number;
    boxCY: number;
    origX: number;
    origY: number;
    origW: number;
    origH: number;
    origPoints: { x: number; y: number }[];
  } | null = null;

  private editingTextId: string | null = null;

  private textColor = '#ff0000';
  private textFontSize = 24;
  private textFontFamily = 'sans-serif';
  private textBold = false;
  private textItalic = false;
  private textStrokeColor = '#000000';
  private textStrokeWidth = 0;
  private textTailActive = false;
  private penDrawing = false;

  // Clipboard (copied region)
  private clipboardImg: HTMLImageElement | null = null;

  // Adjustments (Brightness and Contrast and Color Balance)
  private adjustBrightness = 100;
  private adjustContrast = 100;
  private adjustRed = 100;
  private adjustGreen = 100;
  private adjustBlue = 100;

  // Round Corners Tool
  private roundRadius = 0;
  private roundIsCircle = false;
  private roundIsHeart = false;

  // Frame Tool
  private currentFrame: 'none' | 'border' | 'polaroid' | 'vignette' | 'film' | 'double' = 'none';
  private frameColor = '#ffffff';

  private rotateValue = 0;

  private textInput: HTMLInputElement | null = null;
  private subOptionsBarEl!: HTMLDivElement;
  private optionsBarEl!: HTMLDivElement;

  static getEditor(container: HTMLElement, options?: IEditorOptions): IEditor {
    return new IEditor(container, options);
  }

  private constructor(container: HTMLElement, options?: IEditorOptions) {
    this.container = container;
    this.offCtx = this.offCanvas.getContext('2d', { willReadFrequently: true })!;
    Object.assign(container.style, {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      fontFamily: 'sans-serif',
      background: 'var(--primary-bg-color, #1a1a1a)',
    });
    this._injectStyles();
    this._buildToolbar();

    const wrap = document.createElement('div');
    wrap.className = 'ie-canvas-wrap';
    container.appendChild(wrap);

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'ie-canvas';
    wrap.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;

    // Zoom Overlay
    const zoomOverlay = document.createElement('div');
    Object.assign(zoomOverlay.style, {
      position: 'absolute',
      left: '10px',
      bottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(40,40,40,0.85)',
      padding: '4px 10px',
      borderRadius: '20px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
      color: '#ccc',
      fontSize: '12px',
      zIndex: 'var(--layer-cover, 200)',
    });

    this.zoomSliderRange = document.createElement('input');
    this.zoomSliderRange.type = 'range';
    this.zoomSliderRange.min = '0.05';
    this.zoomSliderRange.max = '8';
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
      const cx = this.canvas.width / 2,
        cy = this.canvas.height / 2;
      this.viewOffX = cx - (cx - this.viewOffX) * (ns / this.viewScale);
      this.viewOffY = cy - (cy - this.viewOffY) * (ns / this.viewScale);
      this.viewScale = ns;
      this.zoomSliderLabel.textContent = `${Math.round(this.viewScale * 100)}%`;
      if (this.activeTool === 'pan') this._updateOpts();
      this._redraw();
    };

    zoomOverlay.appendChild(this.zoomSliderRange);
    zoomOverlay.appendChild(this.zoomSliderLabel);
    wrap.appendChild(zoomOverlay);

    this.subOptionsBarEl = document.createElement('div');
    this.subOptionsBarEl.className = 'ie-sub-opts';
    this.subOptionsBarEl.style.display = 'none';
    container.appendChild(this.subOptionsBarEl);

    this.optionsBarEl = document.createElement('div');
    this.optionsBarEl.className = 'ie-opts';
    container.appendChild(this.optionsBarEl);

    this._attachEvents();
    this._setTool('pan');

    if (options?.imageSrc) this.loadImageFromUrl(options.imageSrc);
    else this._initBlank(800, 600);
  }

  private _injectStyles() {
    if (document.getElementById('ie-styles')) return;

    loadSvgIconStyles();
    const s = document.createElement('style');
    s.id = 'ie-styles';
    s.textContent = EDITOR_STYLES;
    document.head.appendChild(s);
  }

  private _btn(id: string, title: string, iconClass: string, fn: () => void): HTMLButtonElement {
    const b = document.createElement('button');
    b.className = `ie-btn ${LJ_SVG_ICON_CLASS} ${LJ_SVG_ICON_CLASS}_${iconClass}`;
    b.title = title;
    b.id = `ieb-${id}`;
    b.addEventListener('click', fn);
    return b;
  }

  private _grp(...btns: HTMLElement[]): HTMLDivElement {
    const g = document.createElement('div');
    g.className = 'ie-grp';
    btns.forEach((b) => g.appendChild(b));
    return g;
  }

  private _buildToolbar() {
    const tb = document.createElement('div');
    tb.className = 'ie-toolbar';
    tb.appendChild(
      this._grp(
        this._btn('undo', 'Undo', SvgIconNames.undo, () => this.undo()),
        this._btn('redo', 'Redo', SvgIconNames.redo, () => this.redo())
      )
    );
    tb.appendChild(
      this._grp(
        this._btn('upload', 'Upload Image', SvgIconNames.upload, () => this._triggerUpload()),
        this._btn('download', 'Download', SvgIconNames.download, () => this._showDownload())
      )
    );
    tb.appendChild(
      this._grp(
        this._btn('zoomIn', 'Zoom In', SvgIconNames.zoomIn, () => this._zoom(0.15)),
        this._btn('zoomOut', 'Zoom Out', SvgIconNames.zoomOut, () => this._zoom(-0.15))
      )
    );
    tb.appendChild(
      this._grp(
        this._btn('rotate', 'Rotate / Flip', SvgIconNames.rotate, () => this._setTool('rotate')),
        this._btn('resize', 'Resize', SvgIconNames.resize, () => this._promptResize())
      )
    );
    tb.appendChild(
      this._grp(
        this._btn('pan', 'Pan', SvgIconNames.pan, () => this._setTool('pan')),
        this._btn('select', 'Select / Copy', SvgIconNames.select, () => this._setTool('select')),
        this._btn('crop', 'Crop Frame', SvgIconNames.crop, () => this._setTool('crop')),
        this._btn('pencil', 'Draw', SvgIconNames.pencil, () => this._setTool('pencil')),
        this._btn('mosaic', 'Mosaic', SvgIconNames.mosaic, () => this._setTool('mosaic')),
        this._btn('eraser', 'Eraser', SvgIconNames.removeformat, () => this._setTool('eraser')),
        this._btn('text', 'Text', SvgIconNames.text, () => this._setTool('text')),
        this._btn('sticker', 'Sticker', SvgIconNames.sticker, () => this._setTool('sticker')),
        this._btn('adjust', 'Adjust Color', SvgIconNames.adjust, () => this._setTool('adjust')),
        this._btn('round', 'Round Corners', SvgIconNames.round, () => this._setTool('round')),
        this._btn('frame', 'Frame', SvgIconNames.frame, () => this._setTool('frame'))
      )
    );
    this.container.insertBefore(tb, this.optionsBarEl?.parentElement ?? this.container.firstChild);
    this.container.appendChild(tb);

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        this.undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Z')) {
        e.preventDefault();
        this.redo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        this._pasteClipboard();
      }
    });
  }

  private _setTool(t: Tool, keepSelection = false) {
    if (this.textInput) this._commitText();
    this._removeCropOverlay();
    if (!keepSelection && (t === 'pencil' || t === 'text' || t === 'sticker' || t === 'mosaic' || t === 'eraser')) {
      this.hasSelection = false;
      this.selectedSticker = null;
      this.selectedText = null;
      this.selectedShape = null;
    }
    this.activeTool = t;

    (
      [
        'pan',
        'select',
        'crop',
        'pencil',
        'mosaic',
        'eraser',
        'text',
        'sticker',
        'adjust',
        'round',
        'frame',
        'rotate',
      ] as Tool[]
    ).forEach((name) => {
      const el = this.container.querySelector(`#ieb-${name}`) as HTMLElement | null;
      if (el) el.classList.toggle('active', name === t);
    });
    this._updateOpts();
    if (t === 'crop') this._initCropOverlay();
    this._redraw();
  }

  private _updateOpts() {
    const el = this.optionsBarEl;
    const subEl = this.subOptionsBarEl;
    el.innerHTML = '';
    subEl.innerHTML = '';
    subEl.style.display = 'none';
    const txt = (s: string) => el.appendChild(Object.assign(document.createElement('span'), { textContent: s }));
    const btn = (label: string, fn: () => void) => {
      const b = document.createElement('button');
      b.textContent = label;
      b.addEventListener('click', fn);
      el.appendChild(b);
    };
    const lbl = (html: string, fn: (v: string) => void, type = 'text', val = '') => {
      const l = document.createElement('label');
      l.innerHTML = html;
      const i = l.querySelector('input') as HTMLInputElement;
      if (val) i.value = val;
      i.oninput = () => fn(i.value);
      el.appendChild(l);
    };
    const isUniversalMode =
      this.activeTool === 'pan' ||
      this.activeTool === 'select' ||
      this.activeTool === 'mosaic' ||
      this.activeTool === 'eraser' ||
      this.activeTool === 'text' ||
      this.activeTool === 'pencil' ||
      this.activeTool === 'sticker';

    const showShapeOpts =
      this.activeTool === 'pencil' ||
      (this.selectedShape && ['pan', 'select', 'mosaic', 'eraser'].includes(this.activeTool));
    const showTextOpts =
      this.activeTool === 'text' ||
      (this.selectedText && ['pan', 'select', 'mosaic', 'eraser'].includes(this.activeTool));

    if (showShapeOpts) {
      const curShape = this.selectedShape;
      const curColor = curShape ? curShape.color : this.penColor;
      const curSize = curShape ? curShape.strokeWidth : this.penSize;

      lbl(`Color:<input type="color" value="${curColor}"/>`, (v) => {
        this.penColor = v;
        if (curShape) {
          curShape.color = v;
          this._redraw();
        }
      });
      const ls = document.createElement('label');
      ls.innerHTML = `Size:<input type="range" min="1" max="60" value="${curSize}"/><span>${curSize}px</span>`;
      const si = ls.querySelector('input') as HTMLInputElement;
      const ss = ls.querySelector('span') as HTMLSpanElement;
      si.oninput = () => {
        const v = Number(si.value);
        this.penSize = v;
        ss.textContent = `${v}px`;
        if (curShape) {
          curShape.strokeWidth = v;
          this._redraw();
        }
      };
      el.appendChild(ls);

      const curMode = curShape ? curShape.type : this.penMode;

      const modeLbl = document.createElement('label');
      modeLbl.innerHTML = `Mode:<select style="padding:2px;border:1px solid #555;background:#333;color:#ccc;border-radius:3px">
        <option value="pencil" ${curMode === 'pencil' ? 'selected' : ''}>Pencil</option>
        <option value="line" ${curMode === 'line' ? 'selected' : ''}>Line</option>
        <option value="arrow" ${curMode === 'arrow' ? 'selected' : ''}>Arrow</option>
        <option value="circle" ${curMode === 'circle' ? 'selected' : ''}>Ellipse</option>
        <option value="rect" ${curMode === 'rect' ? 'selected' : ''}>Rectangle</option>
        <option value="triangle" ${curMode === 'triangle' ? 'selected' : ''}>Triangle</option>
        <option value="star" ${curMode === 'star' ? 'selected' : ''}>Star</option>
      </select>`;
      const ms = modeLbl.querySelector('select') as HTMLSelectElement;
      ms.onchange = () => {
        this.penMode = ms.value as 'pencil' | 'line' | 'circle' | 'rect' | 'triangle' | 'star' | 'arrow';
        if (curShape) {
          curShape.type = this.penMode;
          this._redraw();
        }
        this._updateOpts();
      };
      el.appendChild(modeLbl);

      if (curMode === 'arrow') {
        const atLbl = document.createElement('label');
        const curArrowType = curShape ? curShape.arrowType || 'standard' : this.penArrowType;
        atLbl.innerHTML = `Type:<select style="padding:2px;border:1px solid #555;background:#333;color:#ccc;border-radius:3px">
          <option value="standard" ${curArrowType === 'standard' ? 'selected' : ''}>Standard</option>
          <option value="double" ${curArrowType === 'double' ? 'selected' : ''}>Double</option>
          <option value="thick" ${curArrowType === 'thick' ? 'selected' : ''}>Thick</option>
          <option value="fishtail" ${curArrowType === 'fishtail' ? 'selected' : ''}>Fishtail</option>
          <option value="arc" ${curArrowType === 'arc' ? 'selected' : ''}>Arc</option>
        </select>`;
        const as = atLbl.querySelector('select') as HTMLSelectElement;
        as.onchange = () => {
          this.penArrowType = as.value as 'standard' | 'double' | 'thick' | 'fishtail' | 'arc';
          if (curShape) {
            curShape.arrowType = this.penArrowType;
            this._redraw();
          }
        };
        el.appendChild(atLbl);
      }
      txt(' (Hold Shift for constraints)');
    } else if (showTextOpts) {
      if (this.textInput) {
        const lbl = document.createElement('span');
        lbl.textContent = 'Typing text... (Use floating toolbar above)';
        lbl.style.padding = '0 8px';
        lbl.style.color = '#888';
        el.appendChild(lbl);
        return;
      }
      // Text style controls (global defaults for new text)
      const t = this.selectedText;
      const curColor = t ? t.color : this.textColor;
      const curSize = t ? t.fontSize : this.textFontSize;
      const curFamily = t ? t.fontFamily : this.textFontFamily;
      const curBold = t ? t.bold : this.textBold;
      const curItalic = t ? t.italic : this.textItalic;

      if (t) {
        lbl(
          `Text:<input type="text" value="${t.text}" style="width:100px;padding:2px;border:1px solid #555;background:#333;color:#ccc;border-radius:3px"/>`,
          (v) => {
            t.text = v;
            this._redraw();
          }
        );
      }

      lbl(`Color:<input type="color" value="${curColor}"/>`, (v) => {
        this.textColor = v;
        if (t) {
          t.color = v;
          this._redraw();
        }
      });

      const fsLbl = document.createElement('label');
      fsLbl.innerHTML = `Size:<input type="range" min="12" max="120" value="${curSize}"/><span>${curSize}px</span>`;
      const fi = fsLbl.querySelector('input') as HTMLInputElement;
      const fsp = fsLbl.querySelector('span') as HTMLSpanElement;
      fi.oninput = () => {
        const v = Number(fi.value);
        this.textFontSize = v;
        fsp.textContent = `${v}px`;
        if (t) {
          t.fontSize = v;
          this._redraw();
        }
      };
      el.appendChild(fsLbl);

      const fLbl = document.createElement('label');
      fLbl.innerHTML = `Font:<select style="padding:2px;border:1px solid #555;background:#333;color:#ccc;border-radius:3px">
        <option value="sans-serif" ${curFamily === 'sans-serif' ? 'selected' : ''}>Sans</option>
        <option value="serif" ${curFamily === 'serif' ? 'selected' : ''}>Serif</option>
        <option value="monospace" ${curFamily === 'monospace' ? 'selected' : ''}>Mono</option>
        <option value="cursive" ${curFamily === 'cursive' ? 'selected' : ''}>Cursive</option>
      </select>`;
      const fs = fLbl.querySelector('select') as HTMLSelectElement;
      fs.onchange = () => {
        this.textFontFamily = fs.value;
        if (t) {
          t.fontFamily = fs.value;
          this._redraw();
        }
      };
      el.appendChild(fLbl);

      const bB = document.createElement('button');
      bB.textContent = 'B';
      bB.style.fontWeight = 'bold';
      bB.style.background = curBold ? 'var(--primary-accent-color,#0a74c9)' : '#eee';
      bB.addEventListener('click', () => {
        this.textBold = !this.textBold;
        if (t) {
          t.bold = this.textBold;
        }
        this._updateOpts();
        this._redraw();
      });
      el.appendChild(bB);

      const bI = document.createElement('button');
      bI.textContent = 'I';
      bI.style.fontStyle = 'italic';
      bI.style.background = curItalic ? 'var(--primary-accent-color,#0a74c9)' : '#eee';
      bI.addEventListener('click', () => {
        this.textItalic = !this.textItalic;
        if (t) {
          t.italic = this.textItalic;
        }
        this._updateOpts();
        this._redraw();
      });
      el.appendChild(bI);

      // Stroke Color
      const strokColorLbl = document.createElement('label');
      strokColorLbl.innerHTML = `OutLine:<input type="color" value="${t ? t.strokeColor : this.textStrokeColor}"/>`;
      const strokColorInp = strokColorLbl.querySelector('input') as HTMLInputElement;
      strokColorInp.oninput = () => {
        const v = strokColorInp.value;
        this.textStrokeColor = v;
        if (t) {
          if (!t.strokeWidth || t.strokeWidth === 0) {
            t.strokeWidth = 2; // Auto-enable stroke if previously 0
            this.textStrokeWidth = 2; // Sync default
          }
          t.strokeColor = v;
          this._redraw();
          this._updateOpts(); // Re-render to show updated slider
        }
      };
      el.appendChild(strokColorLbl);

      // Stroke Width Slider
      const widthVal = t && t.strokeWidth !== undefined ? t.strokeWidth : this.textStrokeWidth;
      if (widthVal > 0) {
        const strokWidthLbl = document.createElement('label');
        strokWidthLbl.innerHTML = `<input type="range" min="1" max="50" value="${widthVal}" style="width:60px" /><span>${widthVal}</span>`;
        const strokWidthInp = strokWidthLbl.querySelector('input') as HTMLInputElement;
        const strokWidthSpan = strokWidthLbl.querySelector('span') as HTMLSpanElement;
        strokWidthInp.oninput = () => {
          const w = Number(strokWidthInp.value);
          this.textStrokeWidth = w;
          strokWidthSpan.textContent = `${w}`;
          if (t) {
            t.strokeWidth = w;
            this._redraw();
          }
        };
        el.appendChild(strokWidthLbl);
      }

      // Tail Toggle
      const bT = document.createElement('button');
      bT.textContent = '🗯';
      bT.title = 'Bubble';
      bT.style.background = (t ? t.tailActive : this.textTailActive)
        ? 'var(--primary-accent-color,#0a74c9)'
        : 'transparent';
      bT.style.fontSize = '14px';
      bT.style.lineHeight = '1';
      bT.style.padding = '2px 4px';
      bT.style.minHeight = '0';
      bT.addEventListener('click', () => {
        this.textTailActive = !this.textTailActive;
        if (t) {
          t.tailActive = this.textTailActive;
        }
        this._updateOpts();
        this._redraw();
      });
      el.appendChild(bT);
      txt('  Click canvas to place.');
    } else if (this.activeTool === 'mosaic') {
      const l = document.createElement('label');
      l.innerHTML = `Brush:<input type="range" min="4" max="64" value="${this.mosaicSize}"/><span>${this.mosaicSize}px</span>`;
      const i = l.querySelector('input') as HTMLInputElement;
      const sp = l.querySelector('span') as HTMLSpanElement;
      i.oninput = () => {
        this.mosaicSize = Number(i.value);
        sp.textContent = `${this.mosaicSize}px`;
      };
      el.appendChild(l);
    } else if (this.activeTool === 'eraser') {
      const l = document.createElement('label');
      l.innerHTML = `Brush:<input type="range" min="4" max="100" step="2" value="${this.eraserSize}"/><span>${this.eraserSize}px</span>`;
      const i = l.querySelector('input') as HTMLInputElement;
      const sp = l.querySelector('span') as HTMLSpanElement;
      i.oninput = () => {
        this.eraserSize = Number(i.value);
        sp.textContent = `${this.eraserSize}px`;
      };
      el.appendChild(l);
    } else if (this.activeTool === 'select') {
      txt('Drag to select. ');
      btn('Copy as Layer', () => this._copySelectionAsSticker());
      if (this.clipboardImg) btn('Paste', () => this._pasteClipboard());
      btn('Clear', () => {
        this.hasSelection = false;
        this._redraw();
      });
    } else if (this.activeTool === 'rotate') {
      const g = (iconName: keyof typeof SvgIconNames, hint: string, fn: () => void) => {
        const b = document.createElement('button');
        b.className = `ie-tool-btn ${LJ_SVG_ICON_CLASS} ${LJ_SVG_ICON_CLASS}_${SvgIconNames[iconName]}`;
        b.title = hint;
        b.addEventListener('click', fn);
        el.appendChild(b);
      };
      g('rotL', 'Rotate 90° CCW', () => {
        this._rotate(-90);
        this.rotateValue = 0; // reset local degree value after discrete rotation
        this._updateOpts();
        this._redraw();
      });
      g('rotR', 'Rotate 90° CW', () => {
        this._rotate(90);
        this.rotateValue = 0; // reset local degree value after discrete rotation
        this._updateOpts();
        this._redraw();
      });
      g('flipH', 'Flip Horizontal', () => {
        this._flip();
        this._updateOpts();
      });
      g('flipV', 'Flip Vertical', () => {
        this._flipV();
        this._updateOpts();
      });

      const sL = document.createElement('label');
      sL.style.cssText = 'display:flex;align-items:center;gap:6px;margin-left:8px;font-size:13px';
      sL.innerHTML = `Rotate:<input type="range" min="-180" max="180" value="${this.rotateValue}" style="width:80px"/><span>${this.rotateValue}°</span>`;
      const sI = sL.querySelector('input') as HTMLInputElement;
      const sS = sL.querySelector('span') as HTMLSpanElement;
      sI.oninput = () => {
        this.rotateValue = Number(sI.value);
        sS.textContent = `${this.rotateValue}°`;
        this._redraw();
      };
      el.appendChild(sL);

      const aB = document.createElement('button');
      aB.textContent = 'Apply';
      aB.addEventListener('click', () => {
        if (this.rotateValue !== 0) {
          const val = this.rotateValue;
          this.rotateValue = 0;
          this._rotate(val);
          this._updateOpts();
        }
        this._redraw();
      });
      el.appendChild(aB);

      const rB = document.createElement('button');
      rB.textContent = 'Reset';
      rB.addEventListener('click', () => {
        this.rotateValue = 0;
        this._updateOpts();
        this._redraw();
      });
      el.appendChild(rB);
    } else if (this.activeTool === 'crop') {
      txt('Drag handles or frame. ');
      btn('Apply Crop', () => this._applyCrop());
      btn('Cancel', () => this._setTool('pan'));
    } else if (this.activeTool === 'sticker') {
      btn('Upload Sticker', () => this._triggerStickerUpload());
      if (this.clipboardImg) btn('Paste Copied Layer', () => this._pasteClipboard());
      txt(' Drag to move, corner=resize, top=rotate.');
    } else if (this.activeTool === 'pan') {
      if (this.clipboardImg) btn('Paste', () => this._pasteClipboard());
      txt(` Drag=pan, scroll/pinch=zoom. Scale: ${Math.round(this.viewScale * 100)}%`);
    } else if (this.activeTool === 'adjust') {
      const bL = document.createElement('label');
      bL.innerHTML = `Brightness:<input type="range" min="0" max="200" value="${this.adjustBrightness}"/><span style="display:inline-block;width:35px;text-align:right">${this.adjustBrightness}%</span>`;
      const bI = bL.querySelector('input') as HTMLInputElement;
      const bS = bL.querySelector('span') as HTMLSpanElement;
      bI.oninput = () => {
        this.adjustBrightness = Number(bI.value);
        bS.textContent = `${this.adjustBrightness}%`;
        this._redraw();
      };
      el.appendChild(bL);

      const cL = document.createElement('label');
      cL.innerHTML = `Contrast:<input type="range" min="0" max="200" value="${this.adjustContrast}"/><span style="display:inline-block;width:35px;text-align:right">${this.adjustContrast}%</span>`;
      const cI = cL.querySelector('input') as HTMLInputElement;
      const cS = cL.querySelector('span') as HTMLSpanElement;
      cI.oninput = () => {
        this.adjustContrast = Number(cI.value);
        cS.textContent = `${this.adjustContrast}%`;
        this._redraw();
      };
      el.appendChild(cL);

      const mkColorSlider = (lbl: string, val: number, bg: string, onChange: (v: number) => void) => {
        const row = document.createElement('label');
        row.style.background = bg;
        row.style.padding = '0 4px';
        row.style.borderRadius = '3px';
        row.innerHTML = `<span style="display:inline-block;width:20px">${lbl}:</span><input type="range" min="0" max="200" value="${val}"/><span style="display:inline-block;width:35px;text-align:right">${val}%</span>`;
        const rt = row.querySelector('input') as HTMLInputElement;
        const rs = row.querySelectorAll('span')[1] as HTMLSpanElement;
        rt.oninput = () => {
          onChange(Number(rt.value));
          rs.textContent = `${rt.value}%`;
          this._redraw();
        };
        el.appendChild(row);
      };

      mkColorSlider('R', this.adjustRed, 'rgba(255,0,0,0.2)', (v) => (this.adjustRed = v));
      mkColorSlider('G', this.adjustGreen, 'rgba(0,255,0,0.2)', (v) => (this.adjustGreen = v));
      mkColorSlider('B', this.adjustBlue, 'rgba(0,0,255,0.2)', (v) => (this.adjustBlue = v));

      btn('Apply', () => {
        if (
          this.adjustBrightness === 100 &&
          this.adjustContrast === 100 &&
          this.adjustRed === 100 &&
          this.adjustGreen === 100 &&
          this.adjustBlue === 100
        ) {
          this._setTool('pan');
          return;
        }
        this._mergeLayersToOff();
        this._pushUndo();
        const tmp = document.createElement('canvas');
        tmp.width = this.offCanvas.width;
        tmp.height = this.offCanvas.height;
        const ctx = tmp.getContext('2d')!;
        ctx.filter = `brightness(${this.adjustBrightness}%) contrast(${this.adjustContrast}%)`;
        ctx.drawImage(this.offCanvas, 0, 0);

        if (this.adjustRed !== 100 || this.adjustGreen !== 100 || this.adjustBlue !== 100) {
          const imgD = ctx.getImageData(0, 0, tmp.width, tmp.height);
          const rf = this.adjustRed / 100;
          const gf = this.adjustGreen / 100;
          const bf = this.adjustBlue / 100;
          for (let i = 0; i < imgD.data.length; i += 4) {
            imgD.data[i] = Math.min(255, imgD.data[i] * rf);
            imgD.data[i + 1] = Math.min(255, imgD.data[i + 1] * gf);
            imgD.data[i + 2] = Math.min(255, imgD.data[i + 2] * bf);
          }
          ctx.putImageData(imgD, 0, 0);
        }

        this.offCtx.clearRect(0, 0, this.offCanvas.width, this.offCanvas.height);
        this.offCtx.drawImage(tmp, 0, 0);
        this.adjustBrightness = 100;
        this.adjustContrast = 100;
        this.adjustRed = 100;
        this.adjustGreen = 100;
        this.adjustBlue = 100;
        this._setTool('pan');
      });
      // B&W icon button
      const g = (iconName: keyof typeof SvgIconNames, hint: string, fn: () => void) => {
        const b = document.createElement('button');
        b.className = `ie-tool-btn ${LJ_SVG_ICON_CLASS} ${LJ_SVG_ICON_CLASS}_${SvgIconNames[iconName]}`;
        b.title = hint;
        b.addEventListener('click', fn);
        el.appendChild(b);
      };
      g('bw', 'Black & White', () => {
        this._mergeLayersToOff();
        this._pushUndo();
        const imgD = this.offCtx.getImageData(0, 0, this.offCanvas.width, this.offCanvas.height);
        for (let i = 0; i < imgD.data.length; i += 4) {
          const gray = Math.round(imgD.data[i] * 0.299 + imgD.data[i + 1] * 0.587 + imgD.data[i + 2] * 0.114);
          imgD.data[i] = imgD.data[i + 1] = imgD.data[i + 2] = gray;
        }
        this.offCtx.putImageData(imgD, 0, 0);
        this.adjustBrightness = 100;
        this.adjustContrast = 100;
        this.adjustRed = 100;
        this.adjustGreen = 100;
        this.adjustBlue = 100;
        this._setTool('pan');
      });
      btn('Cancel', () => this._setTool('pan'));
    } else if (this.activeTool === 'round') {
      const maxR = Math.min(this.offCanvas.width, this.offCanvas.height) / 2;
      const rL = document.createElement('label');
      rL.innerHTML = `Radius:<input type="range" min="0" max="${Math.round(maxR)}" value="${this.roundRadius}"/><span>${
        this.roundRadius
      }px</span>`;
      const rI = rL.querySelector('input') as HTMLInputElement;
      const rS = rL.querySelector('span') as HTMLSpanElement;
      rI.oninput = () => {
        this.roundRadius = Number(rI.value);
        this.roundIsCircle = false;
        rS.textContent = `${this.roundRadius}px`;
        this._redraw();
      };
      el.appendChild(rL);

      const g = (iconName: keyof typeof SvgIconNames, hint: string, fn: () => void) => {
        const b = document.createElement('button');
        b.className = `ie-tool-btn ${LJ_SVG_ICON_CLASS} ${LJ_SVG_ICON_CLASS}_${SvgIconNames[iconName]}`;
        b.title = hint;
        b.addEventListener('click', fn);
        el.appendChild(b);
      };

      g('circle', 'Max (Circle)', () => {
        this.roundRadius = Math.round(maxR);
        this.roundIsCircle = true;
        this.roundIsHeart = false;
        rI.value = String(this.roundRadius);
        rS.textContent = `${this.roundRadius}px`;
        this._redraw();
      });

      g('heart', 'Heart Shape', () => {
        this.roundIsHeart = true;
        this.roundIsCircle = false;
        this.roundRadius = Math.round(maxR);
        this._redraw();
      });

      const aB = document.createElement('button');
      aB.textContent = 'Apply';
      aB.style.marginLeft = '8px';
      aB.addEventListener('click', () => {
        if (this.roundRadius <= 0 && !this.roundIsHeart) {
          this._setTool('pan');
          return;
        }
        this._mergeLayersToOff();
        this._pushUndo();
        const tmp = document.createElement('canvas');
        tmp.width = this.offCanvas.width;
        tmp.height = this.offCanvas.height;
        const ctx = tmp.getContext('2d')!;

        const r = this.roundRadius;
        const w = tmp.width;
        const h = tmp.height;
        ctx.beginPath();
        if (this.roundIsHeart) {
          drawHeartPath(ctx, w / 2, h / 2, Math.min(w, h) * 0.45);
        } else if (this.roundIsCircle) {
          ctx.arc(w / 2, h / 2, Math.min(w, h) / 2, 0, Math.PI * 2);
        } else {
          ctx.moveTo(r, 0);
          ctx.arcTo(w, 0, w, h, r);
          ctx.arcTo(w, h, 0, h, r);
          ctx.arcTo(0, h, 0, 0, r);
          ctx.arcTo(0, 0, w, 0, r);
        }
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(this.offCanvas, 0, 0);

        // Fill transparency where cut (in case previous was opaque)
        this.offCtx.clearRect(0, 0, this.offCanvas.width, this.offCanvas.height);
        this.offCtx.drawImage(tmp, 0, 0);

        this.roundRadius = 0;
        this.roundIsCircle = false;
        this.roundIsHeart = false;
        this._setTool('pan');
      });
      el.appendChild(aB);
      btn('Cancel', () => this._setTool('pan'));
    } else if (this.activeTool === 'frame') {
      const fLbl = document.createElement('label');
      fLbl.innerHTML = `Style:<select style="padding:2px;border:1px solid #555;background:#333;color:#ccc;border-radius:3px">
        <option value="none" ${this.currentFrame === 'none' ? 'selected' : ''}>None</option>
        <option value="border" ${this.currentFrame === 'border' ? 'selected' : ''}>Simple Border</option>
        <option value="polaroid" ${this.currentFrame === 'polaroid' ? 'selected' : ''}>Polaroid</option>
        <option value="vignette" ${this.currentFrame === 'vignette' ? 'selected' : ''}>Vignette</option>
        <option value="film" ${this.currentFrame === 'film' ? 'selected' : ''}>Film Strip</option>
        <option value="double" ${this.currentFrame === 'double' ? 'selected' : ''}>Double Border</option>
      </select>`;
      const fSel = fLbl.querySelector('select') as HTMLSelectElement;
      fSel.onchange = () => {
        this.currentFrame = fSel.value as any;
        this._redraw();
      };
      el.appendChild(fLbl);

      const cL = document.createElement('label');
      cL.style.marginLeft = '8px';
      cL.innerHTML = `Color:<input type="color" value="${this.frameColor}" style="width:24px;height:24px;padding:0;border:none;background:none;cursor:pointer"/>`;
      const cI = cL.querySelector('input') as HTMLInputElement;
      cI.oninput = () => {
        this.frameColor = cI.value;
        this._redraw();
      };
      el.appendChild(cL);

      btn('Apply Frame', () => {
        if (this.currentFrame === 'none') {
          this._setTool('pan');
          return;
        }
        this._mergeLayersToOff();
        this._pushUndo();
        const tmp = document.createElement('canvas');
        tmp.width = this.offCanvas.width;
        tmp.height = this.offCanvas.height;
        const ctx = tmp.getContext('2d')!;
        ctx.drawImage(this.offCanvas, 0, 0);
        drawFrame(ctx, tmp.width, tmp.height, this.currentFrame, this.frameColor);

        this.offCtx.clearRect(0, 0, this.offCanvas.width, this.offCanvas.height);
        this.offCtx.drawImage(tmp, 0, 0);
        this.currentFrame = 'none';
        this._setTool('pan');
      });
      btn('Cancel', () => this._setTool('pan'));
    }

    if (['pan', 'select', 'pencil', 'mosaic', 'eraser', 'text', 'sticker'].includes(this.activeTool)) {
      if (this.selectedShape) {
        subEl.style.display = 'flex';
        this._addShadowUI(subEl, this.selectedShape);
        this._addLayerUI(subEl, this.selectedShape, this.shapes);
      }
      if (this.selectedSticker) {
        subEl.style.display = 'flex';
        this._addShadowUI(subEl, this.selectedSticker);
        this._addLayerUI(subEl, this.selectedSticker, this.stickerLayers);
      }
      if (this.selectedText) {
        subEl.style.display = 'flex';
        this._addShadowUI(subEl, this.selectedText);
        this._addLayerUI(subEl, this.selectedText, this.textLayers);
      }
    }
  }

  private _addLayerUI(el: HTMLElement, item: any, list: any[]) {
    // Determine type for correct casting
    const isText = (item as TextLayer).text !== undefined;
    const isShape = (item as ShapeLayer).type !== undefined && !isText;
    const oType = isText ? 'text' : isShape ? 'shape' : 'sticker';

    const activeObj = item;
    const wrap = document.createElement('span');
    wrap.style.marginLeft = '8px';

    const btnUp = document.createElement('button');
    btnUp.className = `ie-tool-btn ${LJ_SVG_ICON_CLASS} ${LJ_SVG_ICON_CLASS}_layerUp`;
    btnUp.title = 'Bring to front';
    btnUp.addEventListener('click', () => {
      const objIndex = this.displayObjects.findIndex((o) => o.id === activeObj.id);
      if (objIndex !== -1 && objIndex < this.displayObjects.length - 1) {
        this._pushUndo();
        this.displayObjects.splice(objIndex, 1);
        this.displayObjects.push({ type: oType, id: activeObj.id, layer: activeObj } as any);
        this._redraw();
      }
    });

    const btnDown = document.createElement('button');
    btnDown.className = `ie-tool-btn ${LJ_SVG_ICON_CLASS} ${LJ_SVG_ICON_CLASS}_layerDown`;
    btnDown.title = 'Send to back';
    btnDown.addEventListener('click', () => {
      const objIndex = this.displayObjects.findIndex((o) => o.id === activeObj.id);
      if (objIndex > 0) {
        this._pushUndo();
        this.displayObjects.splice(objIndex, 1);
        this.displayObjects.unshift({ type: oType, id: activeObj.id, layer: activeObj } as any);
        this._redraw();
      }
    });

    const btnMerge = document.createElement('button');
    btnMerge.className = `ie-tool-btn ${LJ_SVG_ICON_CLASS} ${LJ_SVG_ICON_CLASS}_merge`;
    btnMerge.title = 'Merge layer down';
    btnMerge.addEventListener('click', () => {
      this._mergeSingleLayerToOff(activeObj, oType);
    });

    wrap.appendChild(btnMerge);
    wrap.appendChild(btnDown);
    wrap.appendChild(btnUp);
    el.appendChild(wrap);
  }

  private _mergeSingleLayerToOff(targetLayer: any, type: string) {
    const idx = this.displayObjects.findIndex((o) => o.id === targetLayer.id);
    if (idx === -1) return;
    this._pushUndo();
    const [obj] = this.displayObjects.splice(idx, 1);

    // Draw just this object to offCtx directly using existing vector logic inside _mergeLayersToOff
    const tempStore = this.displayObjects;
    this.displayObjects = [obj];

    this._mergeLayersToOff(false); // don't clear! Uses the false parameter.

    this.displayObjects = tempStore; // restore

    if (type === 'shape') this.selectedShape = null;
    if (type === 'sticker') this.selectedSticker = null;
    if (type === 'text') this.selectedText = null;
    this._updateOpts();
    this._redraw();
  }

  // ─── Events ──────────────────────────────────────────────────────────────────
  private _attachEvents() {
    const c = this.canvas;
    c.addEventListener('pointerdown', (e) => this._onDown(e));
    c.addEventListener('pointermove', (e) => this._onMove(e));
    c.addEventListener('pointerup', (e) => this._onUp(e));
    c.addEventListener('pointerleave', (e) => this._onUp(e));
    c.addEventListener('dblclick', (e) => this._onDblClick(e));
    c.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        this._zoom(e.deltaY < 0 ? 0.033 : -0.033);
      },
      { passive: false }
    );
    c.addEventListener('dragover', (e) => e.preventDefault());
    c.addEventListener('drop', (e) => {
      e.preventDefault();
      const f = e.dataTransfer?.files[0];
      if (f?.type.startsWith('image/')) this._loadFile(f);
    });
    window.addEventListener('keydown', (e) => {
      if (this.textInput) return;
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (this.selectedSticker || this.selectedText) {
          this._deleteSelected();
        }
      } else if (e.ctrlKey || e.metaKey) {
        if (e.key === 'c' || e.key === 'C') {
          if (this.hasSelection) this._copySelectionAsSticker();
        } else if (e.key === 'x' || e.key === 'X') {
          if (this.hasSelection) {
            this._copySelectionAsSticker();
            this._pushUndo();
            const sx = Math.min(this.selStartX, this.selEndX);
            const sy = Math.min(this.selStartY, this.selEndY);
            const sw = Math.abs(this.selEndX - this.selStartX);
            const sh = Math.abs(this.selEndY - this.selStartY);
            this.offCtx.clearRect(sx, sy, sw, sh);
            this.hasSelection = false;
            this._redraw();
          }
        } else if (e.key === 'v' || e.key === 'V') {
          this._pasteClipboard();
        }
      }
    });
  }

  private _drawShapePath(ctx: CanvasRenderingContext2D, dx: number, dy: number, shift: boolean) {
    const sw = this.penStartX;
    const sh = this.penStartY;
    // Current xy coordinates (relative to stroke start)
    const cx = sw + dx;
    const cy = sh + dy;

    // Shift key constraint logic
    let fx = cx;
    let fy = cy;
    let dist = Math.hypot(dx, dy);

    if (shift) {
      if (this.penMode === 'line' || this.penMode === 'arrow') {
        // Snap to 45 degree angles
        const angle = Math.atan2(dy, dx);
        const snapped = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4);
        fx = sw + Math.cos(snapped) * dist;
        fy = sh + Math.sin(snapped) * dist;
      } else {
        // Square/Circle snapping: 1:1 aspect ratio constraint
        const maxDim = Math.max(Math.abs(dx), Math.abs(dy));
        fx = sw + maxDim * Math.sign(dx);
        fy = sh + maxDim * Math.sign(dy);
      }
    }

    drawShapePath(ctx, this.penMode, this.penArrowType, this.penColor, sw, sh, fx, fy);
  }

  // Double-click on a text layer (in pan or text mode) to re-edit it
  private _onDblClick(e: MouseEvent) {
    if (this.activeTool !== 'pan' && this.activeTool !== 'text') return;
    const cv = this._scr2cv(e.clientX, e.clientY);
    for (const t of [...this.textLayers].reverse()) {
      if (hitText(cv, t, this.offCtx, (l) => this._textFont(l))) {
        const r = this.canvas.getBoundingClientRect();
        this.ctx.font = this._textFont(t);
        const tw = this.ctx.measureText(t.text).width;
        const cvLeftX = t.x - tw / 2;
        const sx = cvLeftX * this.viewScale + this.viewOffX + r.left;
        const sy = t.y * this.viewScale + this.viewOffY + r.top;
        // Also copy styles into editing state, so properties aren't reset.
        this.textColor = t.color;
        this.textFontSize = t.fontSize;
        this.textFontFamily = t.fontFamily;
        this.textBold = !!t.bold;
        this.textItalic = !!t.italic;

        this._showTextInput(sx, sy, cvLeftX, t.y, t.id, t.text);
        return;
      }
    }
  }

  private _scr2cv(cx: number, cy: number) {
    const r = this.canvas.getBoundingClientRect();
    return { x: (cx - r.left - this.viewOffX) / this.viewScale, y: (cy - r.top - this.viewOffY) / this.viewScale };
  }
  private _scr2wrap(cx: number, cy: number) {
    const r = this.canvas.getBoundingClientRect();
    return { x: cx - r.left, y: cy - r.top };
  }

  private _hitTestInteract(cv: { x: number; y: number }): boolean {
    const hs = 10 / this.viewScale;

    if (this.selectedShape) {
      const s = this.selectedShape;
      const handles = getShapeHandles(s, this.viewScale);
      if (Math.hypot(cv.x - handles.rot.x, cv.y - handles.rot.y) < hs) {
        const box = getShapeBoundingBox(s);
        this.rotatingShape = {
          layer: s,
          cx: box.cx,
          cy: box.cy,
          startAngle: Math.atan2(cv.y - box.cy, cv.x - box.cx),
          startRotation: s.rotation || 0,
        };
        return true;
      }
      if (Math.hypot(cv.x - handles.resize.x, cv.y - handles.resize.y) < hs) {
        const box = getShapeBoundingBox(s);
        this.resizingShape = {
          layer: s,
          startX: cv.x,
          startY: cv.y,
          boxW: box.w,
          boxH: box.h,
          boxCX: box.cx,
          boxCY: box.cy,
          origX: s.x,
          origY: s.y,
          origW: s.w,
          origH: s.h,
          origPoints: s.points ? s.points.map((p) => ({ ...p })) : [],
        };
        return true;
      }
      if (Math.hypot(cv.x - handles.del.x, cv.y - handles.del.y) < hs) {
        this._deleteSelected();
        return true;
      }
    }

    if (this.selectedSticker) {
      const s = this.selectedSticker;
      const handles = getStickerHandles(s, this.viewScale);
      if (Math.hypot(cv.x - handles.rot.x, cv.y - handles.rot.y) < hs) {
        this.rotatingSticker = {
          layer: s,
          cx: s.x + s.w / 2,
          cy: s.y + s.h / 2,
          startAngle: Math.atan2(cv.y - (s.y + s.h / 2), cv.x - (s.x + s.w / 2)),
          startRotation: s.rotation,
        };
        return true;
      }
      if (Math.hypot(cv.x - handles.resize.x, cv.y - handles.resize.y) < hs) {
        this.resizingSticker = { layer: s, startX: cv.x, startY: cv.y, startW: s.w, startH: s.h };
        return true;
      }
      if (Math.hypot(cv.x - handles.del.x, cv.y - handles.del.y) < hs) {
        this._deleteSelected();
        return true;
      }
    }

    if (this.selectedText) {
      const t = this.selectedText;
      const h = getTextHandles(t, this.viewScale, this.offCtx, (l) => this._textFont(l));
      if (Math.hypot(cv.x - h.rot.x, cv.y - h.rot.y) < hs) {
        this.rotatingText = {
          layer: t,
          cx: t.x,
          cy: t.y,
          startAngle: Math.atan2(cv.y - t.y, cv.x - t.x),
          startRotation: t.rotation,
        };
        return true;
      }
      if (Math.hypot(cv.x - h.resize.x, cv.y - h.resize.y) < hs) {
        this.resizingText = { layer: t, startX: cv.x, startFontSize: t.fontSize };
        return true;
      }
      if (Math.hypot(cv.x - h.del.x, cv.y - h.del.y) < hs) {
        this._deleteSelected();
        return true;
      }
      if (t.tailActive && Math.hypot(cv.x - (t.tailX || 0), cv.y - (t.tailY || 0)) < hs) {
        this.movingTail = { layer: t };
        this._pushUndo();
        return true;
      }
    }

    for (const obj of [...this.displayObjects].reverse()) {
      if (obj.type === 'sticker') {
        const s = obj.layer as StickerLayer;
        if (hitSticker(cv, s)) {
          this.selectedSticker = s;
          this.selectedText = null;
          this.selectedShape = null;
          this.activeSticker = { layer: s, offX: cv.x - s.x, offY: cv.y - s.y };
          this._pushUndo();
          if (this.activeTool === 'sticker' || this.activeTool === 'text' || this.activeTool === 'pencil') {
            this._setTool('pan', true);
          } else {
            this._updateOpts();
            this._redraw();
          }
          return true;
        }
      } else if (obj.type === 'text') {
        const t = obj.layer as TextLayer;
        if (hitText(cv, t, this.offCtx, this._textFont.bind(this))) {
          this.selectedText = t;
          this.selectedSticker = null;
          this.selectedShape = null;
          this.activeText = { layer: t, offX: cv.x - t.x, offY: cv.y - t.y };
          this._pushUndo();
          if (this.activeTool === 'sticker' || this.activeTool === 'text' || this.activeTool === 'pencil') {
            this._setTool('pan', true);
          } else {
            this._updateOpts();
            this._redraw();
          }
          return true;
        }
      } else if (obj.type === 'shape') {
        const s = obj.layer as ShapeLayer;
        if (hitShape(cv, s)) {
          this.selectedShape = s;
          this.selectedSticker = null;
          this.selectedText = null;
          this.movingShape = { layer: s, lastX: cv.x, lastY: cv.y };
          this._pushUndo();
          if (this.activeTool === 'sticker' || this.activeTool === 'text' || this.activeTool === 'pencil') {
            this._setTool('pan', true);
          } else {
            this._updateOpts();
            this._redraw();
          }
          return true;
        }
      }
    }

    return false;
  }

  private _onDown(e: PointerEvent) {
    this.activePointers.set(e.pointerId, e);
    // If text input is open, commit it first
    if (this.textInput) {
      this._commitText();
      return;
    }
    this.canvas.setPointerCapture(e.pointerId);
    this.isPointerDown = true;

    if (this.activePointers.size === 2 && this.activeTool === 'pan') {
      const pts = Array.from(this.activePointers.values());
      const dx = pts[0].clientX - pts[1].clientX;
      const dy = pts[0].clientY - pts[1].clientY;
      this.initialPinchDist = Math.hypot(dx, dy);
      this.initialPinchScale = this.viewScale;
      this.pinchCenter = {
        x: (pts[0].clientX + pts[1].clientX) / 2,
        y: (pts[0].clientY + pts[1].clientY) / 2,
      };
      this.activeSticker = null;
      this.activeText = null;
      return;
    }

    const cv = this._scr2cv(e.clientX, e.clientY);
    const sc = this._scr2wrap(e.clientX, e.clientY);
    this.lastX = sc.x;
    this.lastY = sc.y;

    if (
      this.activeTool === 'pan' ||
      this.activeTool === 'select' ||
      this.activeTool === 'pencil' ||
      this.activeTool === 'mosaic' ||
      this.activeTool === 'eraser' ||
      this.activeTool === 'sticker' ||
      this.activeTool === 'text'
    ) {
      if (this._hitTestInteract(cv)) return;
    }

    if (this.activeTool === 'pan') {
      this.selectedSticker = null;
      this.selectedText = null;
      this.selectedShape = null;
      this._updateOpts();
      this._redraw();
    } else if (this.activeTool === 'select') {
      this.selectedSticker = null;
      this.selectedText = null;
      this.selectedShape = null;
      this._updateOpts();
      this._redraw();
      this.selStartX = cv.x;
      this.selStartY = cv.y;
      this.selEndX = cv.x;
      this.selEndY = cv.y;
      this.hasSelection = false;
    } else if (this.activeTool === 'pencil') {
      this._pushUndo();
      this.selectedSticker = null;
      this.selectedText = null;
      this.selectedShape = null;
      this._redraw();
      this.penStartX = cv.x;
      this.penStartY = cv.y;
      this.penDrawing = true;
      this.activeShape = {
        id: `shp_${Date.now()}`,
        type: this.penMode,
        color: this.penColor,
        strokeWidth: this.penSize,
        rotation: 0,
        x: cv.x,
        y: cv.y,
        w: cv.x,
        h: cv.y,
        arrowType: this.penArrowType,
        points: this.penMode === 'pencil' ? [{ x: cv.x, y: cv.y }] : undefined,
      };
    } else if (this.activeTool === 'mosaic') {
      this.selectedSticker = null;
      this.selectedText = null;
      this.selectedShape = null;
      this._updateOpts();
      this._pushUndo();
      this.mosaicLastX = cv.x;
      this.mosaicLastY = cv.y;
      this._applyMosaic(cv.x, cv.y);
      this._redraw();
    } else if (this.activeTool === 'eraser') {
      this.selectedSticker = null;
      this.selectedText = null;
      this.selectedShape = null;
      this._updateOpts();
      this._pushUndo();
      this.isErasing = true;
      this.eraserLastX = cv.x;
      this.eraserLastY = cv.y;
      this._eraseStroke(cv.x, cv.y, cv.x, cv.y);
    } else if (this.activeTool === 'text') {
      this.selectedSticker = null;
      this.selectedText = null;
      this.selectedShape = null;
      this._redraw();
      this._showTextInput(e.clientX, e.clientY, cv.x, cv.y);
    } else if (this.activeTool === 'sticker') {
      this.selectedSticker = null;
      this.selectedText = null;
      this.selectedShape = null;
      this._redraw();
    }
  }

  private _onMove(e: PointerEvent) {
    if (this.activePointers.has(e.pointerId)) {
      this.activePointers.set(e.pointerId, e);
    }
    if (!this.isPointerDown) return;

    if (this.activePointers.size === 2 && this.activeTool === 'pan') {
      const pts = Array.from(this.activePointers.values());
      const dx = pts[0].clientX - pts[1].clientX;
      const dy = pts[0].clientY - pts[1].clientY;
      const dist = Math.hypot(dx, dy);
      if (this.initialPinchDist > 0) {
        const scaleRatio = dist / this.initialPinchDist;
        const ns = Math.max(0.05, Math.min(8, this.initialPinchScale * scaleRatio));

        const r = this.canvas.getBoundingClientRect();
        const cx = this.pinchCenter.x - r.left,
          cy = this.pinchCenter.y - r.top;
        this.viewOffX = cx - (cx - this.viewOffX) * (ns / this.viewScale);
        this.viewOffY = cy - (cy - this.viewOffY) * (ns / this.viewScale);
        this.viewScale = ns;

        const currentPinchCenter = {
          x: (pts[0].clientX + pts[1].clientX) / 2,
          y: (pts[0].clientY + pts[1].clientY) / 2,
        };
        this.viewOffX += currentPinchCenter.x - this.pinchCenter.x;
        this.viewOffY += currentPinchCenter.y - this.pinchCenter.y;
        this.pinchCenter = currentPinchCenter;

        this.initialPinchDist = dist;
        this.initialPinchScale = ns;

        this._updateZoomSlider();
        this._updateOpts();
        this._redraw();
      }
      return;
    }

    const cv = this._scr2cv(e.clientX, e.clientY);
    const sc = this._scr2wrap(e.clientX, e.clientY);

    // resizingText works regardless of active tool
    if (this.resizingText) {
      const dx = cv.x - this.resizingText.startX;
      this.resizingText.layer.fontSize = Math.max(8, Math.round(this.resizingText.startFontSize + dx));
      this._redraw();
      return;
    }
    if (this.rotatingText) {
      const r = this.rotatingText;
      const angle = Math.atan2(cv.y - r.cy, cv.x - r.cx);
      r.layer.rotation = r.startRotation + (angle - r.startAngle);
      this._redraw();
      return;
    }
    if (this.movingTail) {
      this.movingTail.layer.tailX = cv.x;
      this.movingTail.layer.tailY = cv.y;
      this._redraw();
      return;
    }

    if (this.rotatingShape) {
      const r = this.rotatingShape;
      const angle = Math.atan2(cv.y - r.cy, cv.x - r.cx);
      r.layer.rotation = r.startRotation + (angle - r.startAngle);
      this._redraw();
      return;
    }
    if (this.resizingShape) {
      const r = this.resizingShape;
      const dx = cv.x - r.startX;
      const dy = cv.y - r.startY;
      const rot = r.layer.rotation || 0;
      const cos = Math.cos(-rot);
      const sin = Math.sin(-rot);
      const unDx = dx * cos - dy * sin;
      const unDy = dx * sin + dy * cos;

      const scaleX = Math.max(0.1, r.boxW + unDx * 2) / Math.max(0.1, r.boxW);
      const scaleY = Math.max(0.1, r.boxH + unDy * 2) / Math.max(0.1, r.boxH);

      if (r.layer.type === 'pencil' && r.layer.points) {
        for (let i = 0; i < r.layer.points.length; i++) {
          r.layer.points[i].x = r.boxCX + (r.origPoints[i].x - r.boxCX) * scaleX;
          r.layer.points[i].y = r.boxCY + (r.origPoints[i].y - r.boxCY) * scaleY;
        }
        r.startX = cv.x;
        r.startY = cv.y;
        r.boxW = Math.max(1, r.boxW + unDx * 2);
        r.boxH = Math.max(1, r.boxH + unDy * 2);
        r.origPoints = r.layer.points.map((p) => ({ ...p }));
      } else if (r.layer.type === 'circle' || r.layer.type === 'star') {
        const radScale = Math.max(scaleX, scaleY);
        r.layer.w = r.layer.x + (r.origW - r.layer.x) * radScale;
        r.layer.h = r.layer.y + (r.origH - r.layer.y) * radScale;
      } else {
        r.layer.x = r.boxCX + (r.origX - r.boxCX) * scaleX;
        r.layer.y = r.boxCY + (r.origY - r.boxCY) * scaleY;
        r.layer.w = r.boxCX + (r.origW - r.boxCX) * scaleX;
        r.layer.h = r.boxCY + (r.origH - r.boxCY) * scaleY;
      }
      this._redraw();
      return;
    }
    if (this.movingShape) {
      const m = this.movingShape;
      const dx = cv.x - m.lastX;
      const dy = cv.y - m.lastY;
      if (m.layer.type === 'pencil' && m.layer.points) {
        for (const p of m.layer.points) {
          p.x += dx;
          p.y += dy;
        }
      } else {
        m.layer.x += dx;
        m.layer.y += dy;
        m.layer.w += dx;
        m.layer.h += dy;
      }
      m.lastX = cv.x;
      m.lastY = cv.y;
      this._redraw();
      return;
    }

    if (this.rotatingSticker) {
      const r = this.rotatingSticker;
      const angle = Math.atan2(cv.y - r.cy, cv.x - r.cx);
      r.layer.rotation = r.startRotation + (angle - r.startAngle);
      this._redraw();
      return;
    }
    if (this.resizingSticker) {
      const r = this.resizingSticker;
      const dx = cv.x - r.startX;
      const dy = cv.y - r.startY;
      let targetW = r.startW + dx;
      let targetH = r.startH + dy;
      if (e.shiftKey) {
        const ratio = r.startW / r.startH;
        if (Math.abs(targetW) / Math.abs(targetH) > ratio) {
          targetW = targetH * ratio;
        } else {
          targetH = targetW / ratio;
        }
      }
      r.layer.w = Math.max(20, targetW);
      r.layer.h = Math.max(20, targetH);
      this._redraw();
      return;
    }
    if (this.activeSticker) {
      const s = this.activeSticker;
      s.layer.x = cv.x - s.offX;
      s.layer.y = cv.y - s.offY;
      this._redraw();
      return;
    }
    if (this.activeText) {
      const t = this.activeText;
      t.layer.x = cv.x - t.offX;
      t.layer.y = cv.y - t.offY;
      this._redraw();
      return;
    }

    if (!this.isPointerDown) return;

    if (this.activeTool === 'pan') {
      this.viewOffX += sc.x - this.lastX;
      this.viewOffY += sc.y - this.lastY;
      this._redraw();
    } else if (this.activeTool === 'select') {
      this.selEndX = cv.x;
      this.selEndY = cv.y;
      this.hasSelection = true;
      this._redraw();
    } else if (this.activeTool === 'text' || this.activeTool === 'sticker') {
      // Dragging empty space does nothing in these tools
    } else if (this.activeTool === 'pencil') {
      if (!this.activeShape) return;
      let dx = cv.x - this.penStartX;
      let dy = cv.y - this.penStartY;

      if (e.shiftKey && this.penMode !== 'pencil') {
        const dist = Math.hypot(dx, dy);
        if (this.penMode === 'line' || this.penMode === 'arrow') {
          const angle = Math.atan2(dy, dx);
          const snapped = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4);
          dx = Math.cos(snapped) * dist;
          dy = Math.sin(snapped) * dist;
        } else {
          const maxDim = Math.max(Math.abs(dx), Math.abs(dy));
          dx = maxDim * Math.sign(dx);
          dy = maxDim * Math.sign(dy);
        }
      }

      if (this.penMode === 'pencil') {
        this.activeShape.points!.push({ x: cv.x, y: cv.y });
        this.activeShape.w = Math.max(this.activeShape.w, cv.x);
        this.activeShape.h = Math.max(this.activeShape.h, cv.y);
      } else {
        this.activeShape.w = this.penStartX + dx;
        this.activeShape.h = this.penStartY + dy;
      }
      this._redraw();
    } else if (this.activeTool === 'mosaic') {
      this._applyMosaic(cv.x, cv.y);
      this.mosaicLastX = cv.x;
      this.mosaicLastY = cv.y;
      this._redraw();
    } else if (this.activeTool === 'eraser' && this.isErasing) {
      this._eraseStroke(this.eraserLastX, this.eraserLastY, cv.x, cv.y);
      this.eraserLastX = cv.x;
      this.eraserLastY = cv.y;
    }
    this.lastX = sc.x;
    this.lastY = sc.y;
    this.penStartX = cv.x;
    this.penStartY = cv.y;
  }

  private _eraseStroke(x1: number, y1: number, x2: number, y2: number) {
    this.offCtx.save();
    if (this.resizeBgColor) {
      this.offCtx.globalCompositeOperation = 'source-over';
      this.offCtx.strokeStyle = this.resizeBgColor;
    } else {
      this.offCtx.globalCompositeOperation = 'destination-out';
      this.offCtx.strokeStyle = 'rgba(0,0,0,1)';
    }
    this.offCtx.lineWidth = this.eraserSize;
    this.offCtx.lineCap = 'round';
    this.offCtx.lineJoin = 'round';
    this.offCtx.beginPath();
    this.offCtx.moveTo(x1, y1);
    if (x1 === x2 && y1 === y2) this.offCtx.lineTo(x2 + 0.1, y2);
    else this.offCtx.lineTo(x2, y2);
    this.offCtx.stroke();
    this.offCtx.restore();
    this._redraw();
  }

  private _onUp(e: PointerEvent) {
    this.activePointers.delete(e.pointerId);
    // Capture before resetting – used below to guard against phantom events
    // (e.g. pointerleave while not pressed) firing shape-finalization logic.
    const wasPointerDown = this.isPointerDown;
    if (this.activePointers.size === 0) {
      this.isPointerDown = false;
    } else if (this.activePointers.size === 1) {
      const remaining = Array.from(this.activePointers.values())[0];
      const sc = this._scr2wrap(remaining.clientX, remaining.clientY);
      this.lastX = sc.x;
      this.lastY = sc.y;
      return;
    } else {
      return;
    }

    if (
      this.rotatingSticker ||
      this.resizingSticker ||
      this.resizingText ||
      this.rotatingText ||
      this.movingTail ||
      this.rotatingShape ||
      this.resizingShape
    ) {
      this.resizingText = null;
      this.rotatingSticker = null;
      this.rotatingText = null;
      this.movingTail = null;
      this.resizingSticker = null;
      this.rotatingShape = null;
      this.resizingShape = null;
      return;
    }
    if (this.activeSticker) {
      this.activeSticker = null;
      return;
    }
    if (this.activeText) {
      this.activeText = null;
      return;
    }
    if (this.movingShape) {
      this.movingShape = null;
      return;
    }
    if (this.isErasing) {
      this.isErasing = false;
      return;
    }
    if (this.activeTool === 'pencil') {
      // Guard: only commit a shape if the pointer was actually down when this
      // event fired. Phantom pointerleave/up events arrive with isPointerDown
      // already false, which is now captured in wasPointerDown.
      if (!wasPointerDown) return;
      if (!this.penDrawing) return;
      this.penDrawing = false;
      if (this.activeShape) {
        let keep = false;
        if (this.penMode === 'pencil') {
          keep = this.activeShape.points!.length > 1;
        } else {
          keep =
            Math.abs(this.activeShape.w - this.activeShape.x) > 0 ||
            Math.abs(this.activeShape.h - this.activeShape.y) > 0;
        }
        if (keep) {
          this.displayObjects.push({
            id: this.activeShape.id,
            type: 'shape',
            layer: this.activeShape,
          });
          this.selectedShape = this.activeShape;
          this.activeShape = null;
          this._setTool('pan', true);
        } else {
          this.activeShape = null;
          this._updateOpts();
          this._redraw();
        }
      }
    }
  }

  // ─── Select / Copy / Paste ────────────────────────────────────────────────────
  private _copySelectionAsSticker() {
    if (!this.hasSelection) return;
    const x = Math.round(Math.min(this.selStartX, this.selEndX));
    const y = Math.round(Math.min(this.selStartY, this.selEndY));
    const w = Math.round(Math.abs(this.selEndX - this.selStartX));
    const h = Math.round(Math.abs(this.selEndY - this.selStartY));
    if (w < 4 || h < 4) return;
    const tmp = document.createElement('canvas');
    tmp.width = w;
    tmp.height = h;
    tmp.getContext('2d')!.drawImage(this.offCanvas, x, y, w, h, 0, 0, w, h);
    const img = new Image();
    img.src = tmp.toDataURL();
    img.onload = () => {
      this.clipboardImg = img;
      this.hasSelection = false;
      this._updateOpts();
    };
  }

  private _pasteClipboard() {
    if (!this.clipboardImg) return;
    this._pushUndo();
    const img = this.clipboardImg;
    const s: StickerLayer = {
      id: `st_${Date.now()}`,
      img,
      x: (this.offCanvas.width - img.naturalWidth) / 2,
      y: (this.offCanvas.height - img.naturalHeight) / 2,
      w: img.naturalWidth,
      h: img.naturalHeight,
      rotation: 0,
    };
    this.stickerLayers.push(s);
    this.selectedSticker = s;
    this._redraw();
  }

  // ─── Crop overlay ─────────────────────────────────────────────────────────────
  private _initCropOverlay() {
    const wrap = this.canvas.parentElement!;
    // Default crop frame = center 70% of visible canvas
    const vW = this.offCanvas.width * this.viewScale,
      vH = this.offCanvas.height * this.viewScale;
    const pad = vW * 0.15;
    this.cropX = this.viewOffX + pad;
    this.cropY = this.viewOffY + pad;
    this.cropW = Math.max(60, vW - pad * 2);
    this.cropH = Math.max(60, vH - pad * 2);

    const overlay = document.createElement('div');
    overlay.className = 'ie-crop-overlay';
    const frame = document.createElement('div');
    frame.className = 'ie-crop-frame';
    overlay.appendChild(frame);
    wrap.appendChild(overlay);
    this.cropOverlayEl = overlay;
    this.cropFrameEl = frame;

    // 9 handles: corners + edges
    const handles: [string, string, string][] = [
      ['nw', '0', '0'],
      ['n', 'calc(50% - 5px)', '0'],
      ['ne', 'calc(100% - 10px)', '0'],
      ['w', '0', 'calc(50% - 5px)'],
      ['e', 'calc(100% - 10px)', 'calc(50% - 5px)'],
      ['sw', '0', 'calc(100% - 10px)'],
      ['s', 'calc(50% - 5px)', 'calc(100% - 10px)'],
      ['se', 'calc(100% - 10px)', 'calc(100% - 10px)'],
    ];
    handles.forEach(([tag, l, t]) => {
      const h = document.createElement('div');
      h.className = 'ie-handle';
      h.dataset.h = tag;
      h.style.left = l;
      h.style.top = t;
      const cursorMap: Record<string, string> = {
        nw: 'nw-resize',
        n: 'n-resize',
        ne: 'ne-resize',
        w: 'w-resize',
        e: 'e-resize',
        sw: 'sw-resize',
        s: 's-resize',
        se: 'se-resize',
      };
      h.style.cursor = cursorMap[tag] || 'pointer';
      h.addEventListener('pointerdown', (ev) => this._cropHandleDown(ev, tag));
      frame.appendChild(h);
    });
    frame.addEventListener('pointerdown', (ev) => {
      if ((ev.target as HTMLElement).dataset.h) return;
      this._cropHandleDown(ev, 'move');
    });
    this._updateCropFrame();
  }

  private _updateCropFrame() {
    if (!this.cropFrameEl) return;
    Object.assign(this.cropFrameEl.style, {
      left: `${this.cropX}px`,
      top: `${this.cropY}px`,
      width: `${this.cropW}px`,
      height: `${this.cropH}px`,
    });
  }

  private _cropHandleDown(e: PointerEvent, tag: string) {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    this.cropDragMode = tag as any;
    this.cropDragStartX = e.clientX;
    this.cropDragStartY = e.clientY;
    this.cropStartState = { x: this.cropX, y: this.cropY, w: this.cropW, h: this.cropH };
    const onMove = (ev: PointerEvent) => {
      if (!this.cropDragMode) return;
      const dx = ev.clientX - this.cropDragStartX,
        dy = ev.clientY - this.cropDragStartY;
      const s = this.cropStartState;
      const MIN = 30;
      // Canvas bounds in screen px
      const minX = this.viewOffX,
        minY = this.viewOffY;
      const maxX = this.viewOffX + this.offCanvas.width * this.viewScale;
      const maxY = this.viewOffY + this.offCanvas.height * this.viewScale;
      if (this.cropDragMode === 'move') {
        this.cropX = Math.max(minX, Math.min(s.x + dx, maxX - this.cropW));
        this.cropY = Math.max(minY, Math.min(s.y + dy, maxY - this.cropH));
      } else {
        let { x, y, w, h } = s;
        if (this.cropDragMode.includes('e')) w = Math.max(MIN, Math.min(s.w + dx, maxX - x));
        if (this.cropDragMode.includes('s')) h = Math.max(MIN, Math.min(s.h + dy, maxY - y));
        if (this.cropDragMode.includes('w')) {
          x = Math.max(minX, s.x + dx);
          w = Math.max(MIN, s.w - (x - s.x));
        }
        if (this.cropDragMode.includes('n')) {
          y = Math.max(minY, s.y + dy);
          h = Math.max(MIN, s.h - (y - s.y));
        }
        this.cropX = x;
        this.cropY = y;
        this.cropW = w;
        this.cropH = h;
      }
      this._updateCropFrame();
    };
    const onUp = () => {
      this.cropDragMode = null;
      (e.target as HTMLElement).removeEventListener('pointermove', onMove);
    };
    (e.target as HTMLElement).addEventListener('pointermove', onMove);
    (e.target as HTMLElement).addEventListener('pointerup', onUp, { once: true });
  }

  private _removeCropOverlay() {
    this.cropOverlayEl?.remove();
    this.cropOverlayEl = null;
    this.cropFrameEl = null;
  }

  private _applyCrop() {
    const ox = (this.cropX - this.viewOffX) / this.viewScale;
    const oy = (this.cropY - this.viewOffY) / this.viewScale;
    const ow = this.cropW / this.viewScale,
      oh = this.cropH / this.viewScale;
    const rx = Math.max(0, Math.round(ox)),
      ry = Math.max(0, Math.round(oy));
    const rw = Math.min(Math.round(ow), this.offCanvas.width - rx);
    const rh = Math.min(Math.round(oh), this.offCanvas.height - ry);
    if (rw < 4 || rh < 4) return;
    this._mergeLayersToOff();
    this._pushUndo();
    const id = this.offCtx.getImageData(rx, ry, rw, rh);
    this.offCanvas.width = rw;
    this.offCanvas.height = rh;
    this.offCtx.putImageData(id, 0, 0);
    this._setTool('pan');
    this._fitView();
  }

  // ─── Mosaic ──────────────────────────────────────────────────────────────────
  private _applyMosaic(cx: number, cy: number) {
    const currentImg = this.offCtx.getImageData(0, 0, this.offCanvas.width, this.offCanvas.height);
    const newImgData = applyMosaic(
      currentImg,
      this.offCanvas.width,
      this.offCanvas.height,
      this.mosaicLastX,
      this.mosaicLastY,
      cx,
      cy,
      this.mosaicSize
    );
    this.offCtx.putImageData(newImgData, 0, 0);
  }

  private __checkerPattern: CanvasPattern | null = null;
  private _getCheckerPattern() {
    if (this.__checkerPattern) return this.__checkerPattern;
    const c = document.createElement('canvas');
    c.width = 16;
    c.height = 16;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, 16, 16);
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(0, 0, 8, 8);
    ctx.fillRect(8, 8, 8, 8);
    this.__checkerPattern = this.ctx.createPattern(c, 'repeat')!;
    return this.__checkerPattern;
  }

  // ─── Redraw ──────────────────────────────────────────────────────────────────
  private _redraw() {
    const wrap = this.canvas.parentElement!;
    this.canvas.width = wrap.clientWidth;
    this.canvas.height = wrap.clientHeight;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    this.ctx.translate(this.viewOffX, this.viewOffY);
    this.ctx.scale(this.viewScale, this.viewScale);

    if (this.activeTool === 'rotate' && this.rotateValue !== 0) {
      const cx = this.offCanvas.width / 2;
      const cy = this.offCanvas.height / 2;
      this.ctx.translate(cx, cy);
      this.ctx.rotate((this.rotateValue * Math.PI) / 180);
      this.ctx.translate(-cx, -cy);
    }

    // Background checkerboard for transparency & boundary
    this.ctx.save();
    this.ctx.fillStyle = this._getCheckerPattern();
    this.ctx.fillRect(0, 0, this.offCanvas.width, this.offCanvas.height);
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    this.ctx.lineWidth = 1 / this.viewScale;
    this.ctx.strokeRect(0, 0, this.offCanvas.width, this.offCanvas.height);
    this.ctx.restore();

    // Apply temporary filter if in Adjust mode
    if (this.activeTool === 'adjust') {
      if (this.adjustBrightness !== 100 || this.adjustContrast !== 100) {
        this.ctx.filter = `brightness(${this.adjustBrightness}%) contrast(${this.adjustContrast}%)`;
      }
    }

    // Apply temporary rounding if in Round mode
    if (this.activeTool === 'round' && this.roundRadius > 0) {
      this.ctx.save();
      const r = this.roundRadius;
      const w = this.offCanvas.width;
      const h = this.offCanvas.height;
      this.ctx.beginPath();
      if (this.roundIsHeart) {
        drawHeartPath(this.ctx, w / 2, h / 2, Math.min(w, h) * 0.45);
      } else if (this.roundIsCircle) {
        this.ctx.arc(w / 2, h / 2, Math.min(w, h) / 2, 0, Math.PI * 2);
      } else {
        this.ctx.moveTo(r, 0);
        this.ctx.arcTo(w, 0, w, h, r);
        this.ctx.arcTo(w, h, 0, h, r);
        this.ctx.arcTo(0, h, 0, 0, r);
        this.ctx.arcTo(0, 0, w, 0, r);
      }
      this.ctx.closePath();
      this.ctx.clip();
    }

    // 1 base
    if (
      this.activeTool === 'adjust' &&
      (this.adjustRed !== 100 || this.adjustGreen !== 100 || this.adjustBlue !== 100)
    ) {
      // OffCanvas rendered through memory so we can color-multiply it before canvas rendering
      const tcv = document.createElement('canvas');
      tcv.width = this.offCanvas.width;
      tcv.height = this.offCanvas.height;
      const tctx = tcv.getContext('2d')!;
      tctx.drawImage(this.offCanvas, 0, 0);
      const tImg = tctx.getImageData(0, 0, tcv.width, tcv.height);
      const rf = this.adjustRed / 100;
      const gf = this.adjustGreen / 100;
      const bf = this.adjustBlue / 100;
      for (let i = 0; i < tImg.data.length; i += 4) {
        tImg.data[i] = Math.min(255, tImg.data[i] * rf);
        tImg.data[i + 1] = Math.min(255, tImg.data[i + 1] * gf);
        tImg.data[i + 2] = Math.min(255, tImg.data[i + 2] * bf);
      }
      tctx.putImageData(tImg, 0, 0);
      this.ctx.drawImage(tcv, 0, 0);
    } else {
      this.ctx.drawImage(this.offCanvas, 0, 0);
    }

    // Apply temporary frame if in Frame mode
    if (this.activeTool === 'frame' && this.currentFrame !== 'none') {
      drawFrame(this.ctx, this.offCanvas.width, this.offCanvas.height, this.currentFrame, this.frameColor);
    }

    // restore clipping path if round mode was active
    if (this.activeTool === 'round' && this.roundRadius > 0) {
      this.ctx.restore();
    }

    // reset filter so it doesn't apply double or to UI overlays unless intended
    this.ctx.filter = 'none';

    // 2 Render all objects based on the unified displayObjects array order
    this.displayObjects.forEach((obj) => {
      if (obj.type === 'text') {
        const t = obj.layer as TextLayer;
        this.ctx.font = this._textFont(t);
        const m = this.ctx.measureText(t.text);
        const tw = m.width;
        const th = t.fontSize;
        const cx = t.x;
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

        this.ctx.save();
        this.ctx.translate(cx, cy);
        this.ctx.rotate(t.rotation);

        if (t.shadow && t.shadow.type !== 'none') {
          this.ctx.shadowBlur = t.shadow.blur;
          this.ctx.shadowColor = t.shadow.color;
          if (t.shadow.type === 'drop') {
            this.ctx.shadowOffsetX = t.shadow.offsetX;
            this.ctx.shadowOffsetY = t.shadow.offsetY;
          } else {
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
          }
          this.ctx.globalAlpha = t.shadow.opacity / 100;
        }
        this.ctx.font = this._textFont(t);
        if (t.strokeWidth && t.strokeWidth > 0) {
          this.ctx.strokeStyle = t.strokeColor || '#000000';
          this.ctx.lineWidth = t.strokeWidth;
          this.ctx.lineJoin = 'round';
          buildBubblePath(this.ctx, tw, th, lx, ly, !!t.tailActive);
          this.ctx.stroke();
        }
        this.ctx.fillStyle = t.color;
        this.ctx.fillText(t.text, -tw / 2, th / 2 - 2);
        this.ctx.restore();

        if (
          this.activeTool === 'pan' ||
          this.activeTool === 'text' ||
          this.activeTool === 'select' ||
          this.activeTool === 'pencil' ||
          this.activeTool === 'mosaic' ||
          this.activeTool === 'sticker'
        ) {
          const iss = this.selectedText === t;
          const h = getTextHandles(t, this.viewScale, this.offCtx, (l) => this._textFont(l));

          this.ctx.save();
          this.ctx.translate(cx, cy);
          this.ctx.rotate(t.rotation);
          this.ctx.strokeStyle = iss ? 'rgba(255,200,0,0.8)' : 'rgba(80,140,255,0.4)';
          this.ctx.lineWidth = 1 / this.viewScale;
          this.ctx.strokeRect(-tw / 2 - 2, -th / 2 - 2, tw + 4, th + 8);
          this.ctx.restore();

          if (iss) {
            const hs = 10 / this.viewScale;
            // Rotation handle
            this.ctx.fillStyle = '#0a74c9';
            this.ctx.beginPath();
            this.ctx.arc(h.rot.x, h.rot.y, hs / 2, 0, Math.PI * 2);
            this.ctx.fill();

            // Resize handle
            this.ctx.fillStyle = '#fff';
            this.ctx.strokeStyle = '#0a74c9';
            this.ctx.lineWidth = 2 / this.viewScale;
            this.ctx.beginPath();
            this.ctx.arc(h.resize.x, h.resize.y, hs / 2, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();

            // Delete handle
            drawDeleteHandle(this.ctx, h.del.x, h.del.y, hs);

            // Tail handle
            if (t.tailActive && t.tailX !== undefined && t.tailY !== undefined) {
              this.ctx.fillStyle = '#ff00ff';
              this.ctx.beginPath();
              this.ctx.moveTo(t.tailX, t.tailY - hs);
              this.ctx.lineTo(t.tailX + hs, t.tailY);
              this.ctx.lineTo(t.tailX, t.tailY + hs);
              this.ctx.lineTo(t.tailX - hs, t.tailY);
              this.ctx.closePath();
              this.ctx.fill();
            }
          }
        }
      } else if (obj.type === 'sticker') {
        const s = obj.layer as StickerLayer;
        const cx = s.x + s.w / 2,
          cy = s.y + s.h / 2;
        this.ctx.save();
        this.ctx.translate(cx, cy);
        this.ctx.rotate(s.rotation);
        if (s.shadow && s.shadow.type !== 'none') {
          this.ctx.shadowBlur = s.shadow.blur;
          this.ctx.shadowColor = s.shadow.color;
          if (s.shadow.type === 'drop') {
            this.ctx.shadowOffsetX = s.shadow.offsetX;
            this.ctx.shadowOffsetY = s.shadow.offsetY;
          } else {
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
          }
        }
        this.ctx.drawImage(s.img, -s.w / 2, -s.h / 2, s.w, s.h);
        // Reset shadow for overlays
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;

        if (
          this.activeTool === 'pan' ||
          this.activeTool === 'sticker' ||
          this.activeTool === 'select' ||
          this.activeTool === 'mosaic' ||
          this.activeTool === 'pencil' ||
          this.activeTool === 'text'
        ) {
          const iss = this.selectedSticker === s;
          this.ctx.strokeStyle = iss ? 'rgba(255,200,0,0.9)' : 'rgba(80,140,255,0.4)';
          this.ctx.lineWidth = 1 / this.viewScale;
          this.ctx.strokeRect(-s.w / 2, -s.h / 2, s.w, s.h);
          if (iss) {
            const hs = HANDLE_SIZE / this.viewScale;
            // Resize handle - bottom right
            this.ctx.fillStyle = '#fff';
            this.ctx.strokeStyle = '#333';
            this.ctx.fillRect(s.w / 2 - hs, s.h / 2 - hs, hs, hs);
            this.ctx.strokeRect(s.w / 2 - hs, s.h / 2 - hs, hs, hs);
            // Rotation handle - top center
            this.ctx.beginPath();
            this.ctx.arc(0, -s.h / 2 - 16 / this.viewScale, 6 / this.viewScale, 0, Math.PI * 2);
            this.ctx.fillStyle = '#0af';
            this.ctx.fill();
            this.ctx.strokeStyle = '#fff';
            this.ctx.stroke();
            // Line from frame to handle
            this.ctx.beginPath();
            this.ctx.moveTo(0, -s.h / 2);
            this.ctx.lineTo(0, -s.h / 2 - 10 / this.viewScale);
            this.ctx.strokeStyle = '#0af';
            this.ctx.stroke();

            // Delete handle - top left relative to rotated frame
            drawDeleteHandle(this.ctx, -s.w / 2, -s.h / 2, hs);
          }
        }
        this.ctx.restore();
      } else if (obj.type === 'shape') {
        const s = obj.layer as ShapeLayer;
        const isSelected = this.selectedShape === s;
        this.ctx.save();

        if (s.type === 'pencil' && s.points) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = s.color;
          this.ctx.lineWidth = s.strokeWidth;
          this.ctx.lineCap = 'round';
          this.ctx.lineJoin = 'round';

          const box = getShapeBoundingBox(s);
          this.ctx.translate(box.cx, box.cy);
          this.ctx.rotate(s.rotation || 0);
          this.ctx.translate(-box.cx, -box.cy);

          if (s.points.length > 0) {
            this.ctx.moveTo(s.points[0].x, s.points[0].y);
            for (let i = 1; i < s.points.length; i++) {
              this.ctx.lineTo(s.points[i].x, s.points[i].y);
            }
            this.ctx.stroke();
          }
        } else {
          const cx = s.x + (s.w - s.x) / 2;
          const cy = s.y + (s.h - s.y) / 2;
          this.ctx.translate(cx, cy);
          this.ctx.rotate(s.rotation || 0);
          this.ctx.translate(-cx, -cy);

          if (s.shadow && s.shadow.type !== 'none') {
            this.ctx.shadowBlur = s.shadow.blur;
            this.ctx.shadowColor = s.shadow.color;
            if (s.shadow.type === 'drop') {
              this.ctx.shadowOffsetX = s.shadow.offsetX;
              this.ctx.shadowOffsetY = s.shadow.offsetY;
            } else {
              this.ctx.shadowOffsetX = 0;
              this.ctx.shadowOffsetY = 0;
            }
          }

          this.ctx.strokeStyle = s.color;
          this.ctx.fillStyle = s.color;
          this.ctx.lineWidth = s.strokeWidth;
          this.ctx.lineCap = 'round';
          this.ctx.lineJoin = 'round';
          drawShapePath(this.ctx, s.type, s.arrowType || 'standard', s.color, s.x, s.y, s.w, s.h);
        }
        this.ctx.restore();

        if (
          isSelected &&
          (this.activeTool === 'pan' ||
            this.activeTool === 'select' ||
            this.activeTool === 'pencil' ||
            this.activeTool === 'sticker' ||
            this.activeTool === 'mosaic' ||
            this.activeTool === 'text')
        ) {
          const box = getShapeBoundingBox(s);
          const bw = Math.max(box.w, 20);
          const bh = Math.max(box.h, 20);
          const handles = getShapeHandles(s, this.viewScale);
          const hs = HANDLE_SIZE / this.viewScale;

          this.ctx.save();
          this.ctx.translate(box.cx, box.cy);
          this.ctx.rotate(s.rotation || 0);
          this.ctx.strokeStyle = 'rgba(255,200,0,0.9)';
          this.ctx.lineWidth = 1 / this.viewScale;
          this.ctx.strokeRect(-bw / 2 - 2, -bh / 2 - 2, bw + 4, bh + 4);

          // Rotation Handle Line
          this.ctx.beginPath();
          this.ctx.moveTo(0, -box.h / 2 - 2);
          this.ctx.lineTo(0, -box.h / 2 - 2 - 10 / this.viewScale);
          this.ctx.strokeStyle = '#0af';
          this.ctx.lineWidth = 1 / this.viewScale;
          this.ctx.stroke();
          this.ctx.restore();

          // Resize handle
          this.ctx.fillStyle = '#fff';
          this.ctx.strokeStyle = '#333';
          this.ctx.fillRect(handles.resize.x - hs, handles.resize.y - hs, hs, hs);
          this.ctx.strokeRect(handles.resize.x - hs, handles.resize.y - hs, hs, hs);

          // Rotation handle
          this.ctx.beginPath();
          this.ctx.arc(handles.rot.x, handles.rot.y, 6 / this.viewScale, 0, Math.PI * 2);
          this.ctx.fillStyle = '#0af';
          this.ctx.fill();
          this.ctx.strokeStyle = '#fff';
          this.ctx.stroke();

          drawDeleteHandle(this.ctx, handles.del.x, handles.del.y, hs);
        }
      }
    });

    if (this.activeShape) {
      this.ctx.save();
      const s = this.activeShape;
      if (s.type === 'pencil' && s.points) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = s.color;
        this.ctx.lineWidth = s.strokeWidth;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        const box = getShapeBoundingBox(s);
        this.ctx.translate(box.cx, box.cy);
        this.ctx.rotate(s.rotation || 0);
        this.ctx.translate(-box.cx, -box.cy);

        if (s.points.length > 0) {
          this.ctx.moveTo(s.points[0].x, s.points[0].y);
          for (let i = 1; i < s.points.length; i++) {
            this.ctx.lineTo(s.points[i].x, s.points[i].y);
          }
          this.ctx.stroke();
        }
      } else {
        const cx = s.x + (s.w - s.x) / 2;
        const cy = s.y + (s.h - s.y) / 2;
        this.ctx.translate(cx, cy);
        this.ctx.rotate(s.rotation || 0);
        this.ctx.translate(-cx, -cy);

        this.ctx.strokeStyle = s.color;
        this.ctx.fillStyle = s.color;
        this.ctx.lineWidth = s.strokeWidth;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        drawShapePath(this.ctx, s.type, s.arrowType || 'standard', s.color, s.x, s.y, s.w, s.h);
      }
      this.ctx.restore();
    }

    // Selection rect
    if (this.hasSelection) {
      const x = Math.min(this.selStartX, this.selEndX),
        y = Math.min(this.selStartY, this.selEndY);
      const w = Math.abs(this.selEndX - this.selStartX),
        h = Math.abs(this.selEndY - this.selStartY);
      this.ctx.strokeStyle = 'rgba(80,200,255,0.9)';
      this.ctx.lineWidth = 1 / this.viewScale;
      this.ctx.setLineDash([6 / this.viewScale, 3 / this.viewScale]);
      this.ctx.strokeRect(x, y, w, h);
      this.ctx.setLineDash([]);
    }
    this.ctx.restore();
  }

  // ─── Zoom / fit ──────────────────────────────────────────────────────────────
  private _updateZoomSlider() {
    if (this.zoomSliderRange && this.zoomSliderLabel) {
      this.zoomSliderRange.value = String(this.viewScale);
      this.zoomSliderLabel.textContent = `${Math.round(this.viewScale * 100)}%`;
    }
  }

  private _zoom(delta: number) {
    const ns = Math.max(0.05, Math.min(8, this.viewScale + delta));
    const cx = this.canvas.width / 2,
      cy = this.canvas.height / 2;
    this.viewOffX = cx - (cx - this.viewOffX) * (ns / this.viewScale);
    this.viewOffY = cy - (cy - this.viewOffY) * (ns / this.viewScale);
    this.viewScale = ns;
    this._updateZoomSlider();
    if (this.activeTool === 'pan') this._updateOpts();
    this._redraw();
  }

  private _fitView() {
    const wrap = this.canvas.parentElement!;
    const cw = wrap.clientWidth || this.canvas.width,
      ch = wrap.clientHeight || this.canvas.height;
    this.viewScale = Math.min(cw / this.offCanvas.width, ch / this.offCanvas.height, 1);
    this.viewOffX = (cw - this.offCanvas.width * this.viewScale) / 2;
    this.viewOffY = (ch - this.offCanvas.height * this.viewScale) / 2;
    this._updateZoomSlider();
    if (this.activeTool === 'pan') this._updateOpts();
    this._redraw();
  }

  // ─── Rotate / Flip ───────────────────────────────────────────────────────────
  private _rotate(deg: number) {
    this._mergeLayersToOff();
    this._pushUndo();
    const rad = (deg * Math.PI) / 180,
      cos = Math.abs(Math.cos(rad)),
      sin = Math.abs(Math.sin(rad));
    const ow = this.offCanvas.width;
    const oh = this.offCanvas.height;
    const nw = Math.round(this.offCanvas.width * cos + this.offCanvas.height * sin);
    const nh = Math.round(this.offCanvas.width * sin + this.offCanvas.height * cos);
    const tmp = document.createElement('canvas');
    tmp.width = nw;
    tmp.height = nh;
    const tc = tmp.getContext('2d')!;
    if (deg === 90 || deg === -90) {
      // 90 or -90 rotation, handle resize and rotation difference
      tc.translate(nw / 2, nh / 2);
      tc.rotate(rad);
    } else {
      tc.translate(nw / 2, nh / 2);
      tc.rotate(rad);
    }
    tc.drawImage(this.offCanvas, -this.offCanvas.width / 2, -this.offCanvas.height / 2);
    this.offCanvas.width = nw;
    this.offCanvas.height = nh;
    this.offCtx.drawImage(tmp, 0, 0);
    this.viewOffX += (ow / 2 - nw / 2) * this.viewScale;
    this.viewOffY += (oh / 2 - nh / 2) * this.viewScale;
  }

  private _flip() {
    this._mergeLayersToOff();
    this._pushUndo();
    const tmp = document.createElement('canvas');
    tmp.width = this.offCanvas.width;
    tmp.height = this.offCanvas.height;
    const tc = tmp.getContext('2d')!;
    tc.translate(tmp.width, 0);
    tc.scale(-1, 1);
    tc.drawImage(this.offCanvas, 0, 0);
    this.offCtx.clearRect(0, 0, this.offCanvas.width, this.offCanvas.height);
    this.offCtx.drawImage(tmp, 0, 0);
    this._redraw();
  }

  private _flipV() {
    this._mergeLayersToOff();
    this._pushUndo();
    const currentImg = this.offCtx.getImageData(0, 0, this.offCanvas.width, this.offCanvas.height);
    const flippedImg = flipImageDataVertical(currentImg);
    this.offCtx.putImageData(flippedImg, 0, 0);
    this._redraw();
  }

  private _promptResize() {
    // Custom modal instead of browser prompt
    const bd = document.createElement('div');
    Object.assign(bd.style, {
      position: 'fixed',
      inset: '0',
      zIndex: 'var(--layer-modal, 600)',
      background: 'rgba(0,0,0,.45)',
    });
    const box = document.createElement('div');
    Object.assign(box.style, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      background: 'var(--secondary-bg-color,#2a2a2a)',
      border: '1px solid #555',
      borderRadius: '8px',
      padding: '20px',
      zIndex: 'var(--layer-modal, 600)',
      color: 'var(--primary-color,#ccc)',
      minWidth: '260px',
    });
    const inp = (label: string, val: number) => {
      const l = document.createElement('label');
      l.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:10px;font-size:13px';
      l.innerHTML = `<span style="width:55px">${label}</span>`;
      const i = document.createElement('input');
      i.type = 'number';
      i.value = String(val);
      i.min = '1';
      i.max = '10000';
      i.style.cssText =
        'flex:1;padding:4px 8px;border:1px solid #555;background:#333;color:#ccc;border-radius:4px;font-size:13px';
      // Ensure options list wrapper is saved
      this.optsWrap = l;

      l.appendChild(i);
      box.appendChild(l);
      return i;
    };
    box.innerHTML = '<p style="margin:0 0 14px;font-weight:bold;font-size:14px">Resize Canvas</p>';
    const wI = inp('Width (px)', this.offCanvas.width);
    const hI = inp('Height (px)', this.offCanvas.height);

    // Custom slider for Scale (%)
    const scaleL = document.createElement('label');
    scaleL.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:14px;font-size:13px';
    scaleL.innerHTML = `<span style="width:55px">Scale (%)</span>`;
    const scaleI = document.createElement('input');
    scaleI.type = 'range';
    scaleI.min = '1';
    scaleI.max = '300';
    scaleI.value = '100';
    scaleI.style.flex = '1';
    const scaleSpan = document.createElement('span');
    scaleSpan.style.width = '40px';
    scaleSpan.style.textAlign = 'right';
    scaleSpan.textContent = '100%';
    scaleL.appendChild(scaleI);
    scaleL.appendChild(scaleSpan);
    box.appendChild(scaleL);

    const propL = document.createElement('label');
    propL.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:14px;font-size:13px;cursor:pointer';
    propL.innerHTML = '<input type="checkbox" checked/><span>Maintain aspect ratio</span>';
    const propCb = propL.querySelector('input') as HTMLInputElement;
    box.appendChild(propL);

    // Anchor Grid
    const anchorWrap = document.createElement('div');
    Object.assign(anchorWrap.style, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '14px',
      opacity: '0.4',
      pointerEvents: 'none',
      transition: 'opacity 0.2s',
    });
    anchorWrap.innerHTML = '<div style="font-size:12px;margin-bottom:4px;color:#999">Anchor Position</div>';
    const grid = document.createElement('div');
    Object.assign(grid.style, {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 24px)',
      gap: '2px',
      background: '#555',
      padding: '2px',
      borderRadius: '4px',
    });

    let selectedAnchor = 4; // Center
    const cells: HTMLDivElement[] = [];
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      Object.assign(cell.style, {
        width: '24px',
        height: '24px',
        background: i === selectedAnchor ? '#0a74c9' : '#333',
        cursor: 'pointer',
      });
      cell.onclick = () => {
        selectedAnchor = i;
        cells.forEach((c, idx) => (c.style.background = idx === selectedAnchor ? '#0a74c9' : '#333'));
      };
      cells.push(cell);
      grid.appendChild(cell);
    }
    anchorWrap.appendChild(grid);
    box.appendChild(anchorWrap);

    const aspect = this.offCanvas.width / this.offCanvas.height;
    const origW = this.offCanvas.width;
    const origH = this.offCanvas.height;

    const updateScaleSpan = (v: string) => (scaleSpan.textContent = `${v}%`);

    wI.oninput = () => {
      if (propCb.checked) hI.value = String(Math.round(Number(wI.value) / aspect));
      scaleI.value = String(Math.round((Number(wI.value) / origW) * 100));
      updateScaleSpan(scaleI.value);
    };
    hI.oninput = () => {
      if (propCb.checked) {
        wI.value = String(Math.round(Number(hI.value) * aspect));
        scaleI.value = String(Math.round((Number(wI.value) / origW) * 100));
      } else {
        scaleI.value = String(Math.round((Number(hI.value) / origH) * 100));
      }
      updateScaleSpan(scaleI.value);
    };
    scaleI.oninput = () => {
      const s = Math.max(0.01, Number(scaleI.value) / 100);
      wI.value = String(Math.max(1, Math.round(origW * s)));
      hI.value = String(Math.max(1, Math.round(origH * s)));
      updateScaleSpan(scaleI.value);
    };
    propCb.onchange = () => {
      anchorWrap.style.opacity = propCb.checked ? '0.4' : '1';
      anchorWrap.style.pointerEvents = propCb.checked ? 'none' : 'auto';
      if (propCb.checked) {
        hI.value = String(Math.round(Number(wI.value) / aspect));
        scaleI.value = String(Math.round((Number(wI.value) / origW) * 100));
        updateScaleSpan(scaleI.value);
      }
    };

    const rowStyle = 'display:flex;gap:8px;justify-content:space-between;align-items:center';
    const row = Object.assign(document.createElement('div'), {
      innerHTML:
        `<div style="display:flex;align-items:center;gap:6px;font-size:12px">` +
        `<label style="display:flex;align-items:center;gap:4px;cursor:pointer"><input type="checkbox" id="bgcb">Fill BG</label>` +
        `<input type="color" id="bgcol" value="#ffffff" disabled style="width:22px;height:22px;padding:0;border:none;background:none;cursor:pointer"></div>` +
        `<div><button id="clearBtn" style="padding:6px 16px;border-radius:4px;border:1px solid #c92a2a;background:#b30000;color:#fff;cursor:pointer;font-size:13px;margin-right:8px">Clear all</button>` +
        `<button id="rc" style="padding:6px 16px;border-radius:4px;border:1px solid #555;background:#333;color:#ccc;cursor:pointer;font-size:13px">Cancel</button>` +
        `<button id="ra" style="padding:6px 16px;border-radius:4px;border:none;background:var(--primary-accent-color,#0a74c9);color:#fff;cursor:pointer;font-size:13px;margin-left:8px">Apply</button></div>`,
    });
    box.appendChild(row);

    const bgCb = box.querySelector('#bgcb') as HTMLInputElement;
    const bgCol = box.querySelector('#bgcol') as HTMLInputElement;
    bgCb.onchange = () => (bgCol.disabled = !bgCb.checked);

    document.body.appendChild(bd);
    document.body.appendChild(box);
    const close = () => {
      bd.remove();
      box.remove();
    };
    bd.addEventListener('click', close);
    (box.querySelector('#rc') as HTMLElement).onclick = close;
    (box.querySelector('#clearBtn') as HTMLElement).onclick = async () => {
      const index = await ActionSheetSelectPromise({
        title: 'Clear all shapes, texts, and stickers?',
        options: ['Confirm'],
        cancelButtonText: 'Cancel',
      });
      if (index === 0) {
        this._pushUndo();
        this.displayObjects = [];
        this.selectedShape = null;
        this.selectedSticker = null;
        this.selectedText = null;
        this.offCtx.clearRect(0, 0, this.offCanvas.width, this.offCanvas.height);
        if (bgCb.checked) {
          this.offCtx.fillStyle = bgCol.value;
          this.offCtx.fillRect(0, 0, this.offCanvas.width, this.offCanvas.height);
        }
        close();
        this._redraw();
      }
    };
    (box.querySelector('#ra') as HTMLElement).onclick = () => {
      const nw = parseInt(wI.value, 10),
        nh = parseInt(hI.value, 10);
      if (isNaN(nw) || isNaN(nh) || nw < 1 || nh < 1) return;
      close();
      this._mergeLayersToOff();
      this._pushUndo();

      const tmp = document.createElement('canvas');
      tmp.width = nw;
      tmp.height = nh;
      const ctx = tmp.getContext('2d')!;

      if (bgCb.checked) {
        ctx.fillStyle = bgCol.value;
        ctx.fillRect(0, 0, nw, nh);
        this.resizeBgColor = bgCol.value;
      } else {
        this.resizeBgColor = null;
      }

      if (propCb.checked) {
        // Stretch
        ctx.drawImage(this.offCanvas, 0, 0, nw, nh);
      } else {
        // Anchor-based crop/expand
        const ow = this.offCanvas.width;
        const oh = this.offCanvas.height;
        let dx = 0;
        let dy = 0;

        // anchor indexes logic:
        // 0: top-left, 1: top-center, 2: top-right
        // 3: mid-left, 4: center,     5: mid-right
        // 6: bot-left, 7: bot-center, 8: bot-right

        // X offset
        if (selectedAnchor % 3 === 0) {
          // left (0, 3, 6)
          dx = 0;
        } else if (selectedAnchor % 3 === 1) {
          // center (1, 4, 7)
          dx = (nw - ow) / 2;
        } else {
          // right (2, 5, 8)
          dx = nw - ow;
        }

        // Y offset
        if (selectedAnchor < 3) {
          // top (0, 1, 2)
          dy = 0;
        } else if (selectedAnchor < 6) {
          // middle (3, 4, 5)
          dy = (nh - oh) / 2;
        } else {
          // bottom (6, 7, 8)
          dy = nh - oh;
        }

        // Optional: clear background to transparent (already transparent on new canvas)
        ctx.drawImage(this.offCanvas, dx, dy);
      }

      this.offCanvas.width = nw;
      this.offCanvas.height = nh;
      this.offCtx.drawImage(tmp, 0, 0);
      this._fitView();
    };
  }

  // ─── Text ────────────────────────────────────────────────────────────────────

  private _showTextInput(
    screenX: number,
    screenY: number,
    cvX: number,
    cvY: number,
    editId?: string,
    prefill?: string
  ) {
    const wrap = this.canvas.parentElement!;
    const rect = wrap.getBoundingClientRect();
    const left = screenX - rect.left;
    const top = screenY - rect.top - 28;

    const applyStyle = (inp: HTMLInputElement) => {
      inp.style.fontFamily = this.textFontFamily;
      inp.style.fontSize = '18px'; // Fixed size for editing box
      inp.style.fontWeight = this.textBold ? 'bold' : 'normal';
      inp.style.fontStyle = this.textItalic ? 'italic' : 'normal';
      inp.style.color = this.textColor;
    };

    // ── Text input ────────────────────────────────────────────────────────────
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'ie-text-input';
    inp.placeholder = 'Type text…';
    inp.style.left = `${left}px`;
    inp.style.top = `${top + 28}px`; // middle height matches click point
    inp.style.transform = 'translateY(-50%)';
    inp.style.textAlign = 'left';
    inp.dataset.cvx = String(cvX);
    inp.dataset.cvy = String(cvY);
    if (editId) inp.dataset.editid = editId;
    if (prefill) inp.value = prefill;
    applyStyle(inp);

    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this._commitText();
      }
      if (e.key === 'Escape') {
        this._cancelText();
      }
    });

    wrap.appendChild(inp);
    this.textInput = inp;
    setTimeout(() => {
      inp.focus();
      if (prefill) inp.select();
    }, 50);
  }

  private _commitText() {
    if (!this.textInput) return;
    const txt = this.textInput.value.trim();
    const cvX = Number(this.textInput.dataset.cvx),
      cvY = Number(this.textInput.dataset.cvy);
    const editId = this.textInput.dataset.editid || null;
    this.textInput.remove();
    this.textInput = null;

    if (!txt) return;

    this.ctx.font = this._textFont({
      fontFamily: this.textFontFamily,
      fontSize: this.textFontSize,
      bold: this.textBold,
      italic: this.textItalic,
    } as any);
    const tw = this.ctx.measureText(txt).width;

    this._pushUndo();

    if (editId) {
      const idx = this.displayObjects.findIndex((x) => x.id === editId);
      if (idx !== -1) {
        const oldLayer = this.displayObjects[idx].layer as TextLayer;
        const newLayer: TextLayer = {
          ...oldLayer,
          text: txt,
          x: Math.round(cvX + tw / 2),
          y: cvY,
          color: this.textColor,
          fontSize: this.textFontSize,
          fontFamily: this.textFontFamily,
          bold: this.textBold,
          italic: this.textItalic,
          strokeColor: this.textStrokeColor,
          strokeWidth: this.textStrokeWidth,
          tailActive: this.textTailActive,
        };
        // If tail was just activated and never set
        if (newLayer.tailActive && (newLayer.tailX === undefined || newLayer.tailY === undefined)) {
          newLayer.tailX = newLayer.x + 50;
          newLayer.tailY = newLayer.y + 50;
        }
        this.displayObjects[idx].layer = newLayer;
      }
    } else {
      const newId = `txt_${Date.now()}`;
      const layer: TextLayer = {
        id: newId,
        text: txt,
        x: Math.round(cvX + tw / 2),
        y: cvY,
        color: this.textColor,
        fontSize: this.textFontSize,
        fontFamily: this.textFontFamily,
        bold: this.textBold,
        italic: this.textItalic,
        rotation: 0,
        strokeColor: this.textStrokeColor,
        strokeWidth: this.textStrokeWidth,
        tailActive: this.textTailActive,
      };
      if (layer.tailActive) {
        layer.tailX = layer.x + 50;
        layer.tailY = layer.y + 50;
      }
      this.displayObjects.push({ id: newId, type: 'text', layer: layer });
      this.selectedText = layer;
    }
    this._setTool('pan', true);
  }

  private _cancelText() {
    this.textInput?.remove();
    this.textInput = null;
  }

  // ─── Sticker ─────────────────────────────────────────────────────────────────
  private _triggerStickerUpload() {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = 'image/*';
    inp.onchange = () => {
      const f = inp.files?.[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = (ev) => this._addStickerFromUrl(ev.target!.result as string);
      r.readAsDataURL(f);
    };
    inp.click();
  }

  private _addStickerFromUrl(src: string) {
    const img = new Image();
    img.onload = () => {
      this._pushUndo();
      const maxW = Math.min(img.naturalWidth, 200),
        h = Math.round(maxW * (img.naturalHeight / img.naturalWidth));
      const newId = `stk_${Date.now()}`;
      const s: StickerLayer = {
        id: newId,
        img,
        x: (this.offCanvas.width - maxW) / 2,
        y: (this.offCanvas.height - h) / 2,
        w: maxW,
        h,
        rotation: 0,
      };
      this.displayObjects.push({ id: newId, type: 'sticker', layer: s });
      this.selectedSticker = s;
      this._setTool('pan', true);
    };
    img.src = src;
  }

  private _mergeSelectedSticker() {
    if (!this.selectedSticker) return;
    const s = this.selectedSticker;
    const cx = s.x + s.w / 2,
      cy = s.y + s.h / 2;
    this.offCtx.save();
    this.offCtx.translate(cx, cy);
    this.offCtx.rotate(s.rotation);
    this.offCtx.drawImage(s.img, -s.w / 2, -s.h / 2, s.w, s.h);
    this.offCtx.restore();
    this.displayObjects = this.displayObjects.filter((x) => x.layer !== s);
    this.selectedSticker = null;
    this._updateOpts();
    this._redraw();
  }

  private _mergeSelectedText() {
    if (!this.selectedText) return;
    const t = this.selectedText;
    this.offCtx.font = this._textFont(t);
    const m = this.offCtx.measureText(t.text);
    const tw = m.width;
    const th = t.fontSize;
    const cx = t.x;
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

    this.offCtx.save();
    this.offCtx.translate(cx, cy);
    this.offCtx.rotate(t.rotation);

    if (t.strokeWidth && t.strokeWidth > 0) {
      this.offCtx.strokeStyle = t.strokeColor || '#000000';
      this.offCtx.lineWidth = t.strokeWidth;
      this.offCtx.lineJoin = 'round';
      buildBubblePath(this.offCtx, tw, th, lx, ly, !!t.tailActive);
      this.offCtx.stroke();
    }
    this.offCtx.fillStyle = t.color;
    this.offCtx.fillText(t.text, -tw / 2, th / 2 - 2);
    this.offCtx.restore();

    this.displayObjects = this.displayObjects.filter((x) => x.layer !== t);
    this.selectedText = null;
    this._updateOpts();
    this._redraw();
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────────
  private _textFont(t: TextLayer) {
    return `${t.italic ? 'italic ' : ''}${t.bold ? 'bold ' : ''}${t.fontSize}px ${t.fontFamily}`;
  }

  // ─── Upload / Layers merge ───────────────────────────────────────────────────
  private _triggerUpload() {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = 'image/*';
    inp.onchange = () => {
      if (inp.files?.[0]) this._loadFile(inp.files[0]);
    };
    inp.click();
  }

  private _loadFile(file: File) {
    const r = new FileReader();
    r.onload = (ev) => this.loadImageFromUrl(ev.target!.result as string);
    r.readAsDataURL(file);
  }

  loadImageFromUrl(src: string) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const load = (el: HTMLImageElement) => {
      this.displayObjects = [];
      this.undoStack = [];
      this.redoStack = [];
      this.offCanvas.width = el.naturalWidth;
      this.offCanvas.height = el.naturalHeight;
      this.offCtx.drawImage(el, 0, 0);
      setTimeout(() => this._fitView(), 0);
    };
    img.onload = () => load(img);
    img.onerror = () => {
      const img2 = new Image();
      img2.onload = () => load(img2);
      img2.src = src;
    };
    img.src = src;
  }

  // ─── Download ────────────────────────────────────────────────────────────────
  private _showDownload() {
    const fmts = ['png', 'jpeg', 'webp'];
    const bd = document.createElement('div');
    Object.assign(bd.style, {
      position: 'fixed',
      inset: '0',
      zIndex: 'var(--layer-modal, 600)',
      background: 'rgba(0,0,0,.4)',
    });
    const menu = document.createElement('div');
    Object.assign(menu.style, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      background: 'var(--secondary-bg-color,#2a2a2a)',
      border: '1px solid #555',
      borderRadius: '8px',
      padding: '16px',
      zIndex: 'var(--layer-modal, 600)',
      color: 'var(--primary-color,#ccc)',
      minWidth: '200px',
    });
    menu.innerHTML = '<p style="margin:0 0 12px;font-weight:bold">Download as</p>';
    fmts.forEach((fmt) => {
      const b = document.createElement('button');
      Object.assign(b.style, {
        display: 'block',
        width: '100%',
        padding: '8px',
        marginBottom: '6px',
        cursor: 'pointer',
        borderRadius: '4px',
        border: '1px solid #555',
        background: '#333',
        color: '#eee',
        fontSize: '13px',
      });
      b.textContent = fmt.toUpperCase();
      b.onclick = () => {
        this._download(fmt as any);
        menu.remove();
        bd.remove();
      };
      menu.appendChild(b);
    });
    const cancel = document.createElement('button');
    Object.assign(cancel.style, {
      display: 'block',
      width: '100%',
      padding: '8px',
      cursor: 'pointer',
      borderRadius: '4px',
      border: '1px solid #555',
      background: 'transparent',
      color: '#999',
      fontSize: '13px',
    });
    cancel.textContent = 'Cancel';
    cancel.onclick = () => {
      menu.remove();
      bd.remove();
    };
    menu.appendChild(cancel);
    bd.onclick = () => {
      menu.remove();
      bd.remove();
    };
    document.body.appendChild(bd);
    document.body.appendChild(menu);
  }

  private _download(fmt: 'png' | 'jpeg' | 'webp') {
    this._mergeLayersToOff(false);
    const type = fmt === 'jpeg' ? 'image/jpeg' : fmt === 'webp' ? 'image/webp' : 'image/png';
    const a = document.createElement('a');
    a.href = this.offCanvas.toDataURL(type, 0.92);
    a.download = `image.${fmt}`;
    a.click();
  }

  // ─── Undo / Redo ─────────────────────────────────────────────────────────────
  private _pushUndo() {
    this.undoStack.push({
      imageData: this.offCtx.getImageData(0, 0, this.offCanvas.width, this.offCanvas.height),
      displayObjects: this.displayObjects.map((obj) => ({
        id: obj.id,
        type: obj.type,
        layer: { ...obj.layer, ...(obj.type === 'sticker' ? { img: (obj.layer as StickerLayer).img } : {}) },
      })),
    });
    this.redoStack = [];
    if (this.undoStack.length > 50) this.undoStack.shift();
  }

  undo() {
    if (!this.undoStack.length) return;
    this.redoStack.push({
      imageData: this.offCtx.getImageData(0, 0, this.offCanvas.width, this.offCanvas.height),
      displayObjects: this.displayObjects.map((obj) => ({
        id: obj.id,
        type: obj.type,
        layer: { ...obj.layer, ...(obj.type === 'sticker' ? { img: (obj.layer as StickerLayer).img } : {}) },
      })),
    });
    const st = this.undoStack.pop()!;
    this._restoreSnapshot(st);
  }

  redo() {
    if (!this.redoStack.length) return;
    this.undoStack.push({
      imageData: this.offCtx.getImageData(0, 0, this.offCanvas.width, this.offCanvas.height),
      displayObjects: this.displayObjects.map((obj) => ({
        id: obj.id,
        type: obj.type,
        layer: { ...obj.layer, ...(obj.type === 'sticker' ? { img: (obj.layer as StickerLayer).img } : {}) },
      })),
    });
    const st = this.redoStack.pop()!;
    this._restoreSnapshot(st);
  }

  private _restoreSnapshot(st: Snapshot) {
    this.offCanvas.width = st.imageData.width;
    this.offCanvas.height = st.imageData.height;
    this.offCtx.putImageData(st.imageData, 0, 0);
    this.displayObjects = st.displayObjects.map((obj) => {
      if (obj.type === 'shape' && (obj.layer as ShapeLayer).points) {
        return { ...obj, layer: { ...obj.layer, points: [...((obj.layer as ShapeLayer).points || [])] } };
      }
      return { ...obj, layer: { ...obj.layer } };
    });
    this._redraw();
  }

  private _mergeLayersToOff(clearLayers = true) {
    this.displayObjects.forEach((obj) => {
      if (obj.type === 'text') {
        const t = obj.layer as TextLayer;
        this.offCtx.font = this._textFont(t);
        const m = this.offCtx.measureText(t.text);
        const tw = m.width;
        const th = t.fontSize;
        const cx = t.x;
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

        this.offCtx.save();
        this.offCtx.translate(cx, cy);
        this.offCtx.rotate(t.rotation);

        if (t.shadow && t.shadow.type !== 'none') {
          this.offCtx.shadowBlur = t.shadow.blur;
          this.offCtx.shadowColor = t.shadow.color;
          if (t.shadow.type === 'drop') {
            this.offCtx.shadowOffsetX = t.shadow.offsetX;
            this.offCtx.shadowOffsetY = t.shadow.offsetY;
          } else {
            this.offCtx.shadowOffsetX = 0;
            this.offCtx.shadowOffsetY = 0;
          }
          this.offCtx.globalAlpha = t.shadow.opacity / 100;
        }

        if (t.strokeWidth && t.strokeWidth > 0) {
          this.offCtx.strokeStyle = t.strokeColor || '#000000';
          this.offCtx.lineWidth = t.strokeWidth;
          this.offCtx.lineJoin = 'round';
          buildBubblePath(this.offCtx, tw, th, lx, ly, !!t.tailActive);
          this.offCtx.stroke();
        }
        this.offCtx.fillStyle = t.color;
        this.offCtx.fillText(t.text, -tw / 2, th / 2 - 2);
        this.offCtx.restore();
      } else if (obj.type === 'sticker') {
        const s = obj.layer as StickerLayer;
        const cx = s.x + s.w / 2,
          cy = s.y + s.h / 2;
        this.offCtx.save();
        this.offCtx.translate(cx, cy);
        this.offCtx.rotate(s.rotation);
        if (s.shadow && s.shadow.type !== 'none') {
          this.offCtx.shadowBlur = s.shadow.blur;
          this.offCtx.shadowColor = s.shadow.color;
          if (s.shadow.type === 'drop') {
            this.offCtx.shadowOffsetX = s.shadow.offsetX;
            this.offCtx.shadowOffsetY = s.shadow.offsetY;
          } else {
            this.offCtx.shadowOffsetX = 0;
            this.offCtx.shadowOffsetY = 0;
          }
        }
        this.offCtx.drawImage(s.img, -s.w / 2, -s.h / 2, s.w, s.h);
        this.offCtx.restore();
      } else if (obj.type === 'shape') {
        const s = obj.layer as ShapeLayer;
        this.offCtx.save();
        if (s.type === 'pencil' && s.points) {
          this.offCtx.beginPath();
          this.offCtx.strokeStyle = s.color;
          this.offCtx.lineWidth = s.strokeWidth;
          this.offCtx.lineCap = 'round';
          this.offCtx.lineJoin = 'round';

          const box = getShapeBoundingBox(s);
          this.offCtx.translate(box.cx, box.cy);
          this.offCtx.rotate(s.rotation || 0);
          this.offCtx.translate(-box.cx, -box.cy);

          if (s.shadow && s.shadow.type !== 'none') {
            this.offCtx.shadowBlur = s.shadow.blur;
            this.offCtx.shadowColor = s.shadow.color;
            if (s.shadow.type === 'drop') {
              this.offCtx.shadowOffsetX = s.shadow.offsetX;
              this.offCtx.shadowOffsetY = s.shadow.offsetY;
            } else {
              this.offCtx.shadowOffsetX = 0;
              this.offCtx.shadowOffsetY = 0;
            }
          }

          if (s.points.length > 0) {
            this.offCtx.moveTo(s.points[0].x, s.points[0].y);
            for (let i = 1; i < s.points.length; i++) {
              this.offCtx.lineTo(s.points[i].x, s.points[i].y);
            }
            this.offCtx.stroke();
          }
        } else {
          const box = getShapeBoundingBox(s);
          this.offCtx.translate(box.cx, box.cy);
          this.offCtx.rotate(s.rotation || 0);
          this.offCtx.translate(-box.cx, -box.cy);

          if (s.shadow && s.shadow.type !== 'none') {
            this.offCtx.shadowBlur = s.shadow.blur;
            this.offCtx.shadowColor = s.shadow.color;
            if (s.shadow.type === 'drop') {
              this.offCtx.shadowOffsetX = s.shadow.offsetX;
              this.offCtx.shadowOffsetY = s.shadow.offsetY;
            } else {
              this.offCtx.shadowOffsetX = 0;
              this.offCtx.shadowOffsetY = 0;
            }
          }

          this.offCtx.strokeStyle = s.color;
          this.offCtx.fillStyle = s.color;
          this.offCtx.lineWidth = s.strokeWidth;
          this.offCtx.lineCap = 'round';
          this.offCtx.lineJoin = 'round';
          drawShapePath(this.offCtx, s.type, s.arrowType || 'standard', s.color, s.x, s.y, s.w, s.h);
        }
        this.offCtx.restore();
      }
    });

    if (clearLayers) {
      this.displayObjects = [];
    }
  }

  private _initBlank(w: number, h: number) {
    this.offCanvas.width = w;
    this.offCanvas.height = h;
    this.offCtx.fillStyle = '#ffffff';
    this.offCtx.fillRect(0, 0, w, h);
    setTimeout(() => this._fitView(), 0);
  }

  private _deleteSelected() {
    this._pushUndo();
    if (this.selectedShape) {
      const idx = this.displayObjects.findIndex((o) => o.layer === this.selectedShape);
      if (idx !== -1) this.displayObjects.splice(idx, 1);
      this.selectedShape = null;
    }
    if (this.selectedSticker) {
      const idx = this.displayObjects.findIndex((o) => o.layer === this.selectedSticker);
      if (idx !== -1) this.displayObjects.splice(idx, 1);
      this.selectedSticker = null;
    }
    if (this.selectedText) {
      const idx = this.displayObjects.findIndex((o) => o.layer === this.selectedText);
      if (idx !== -1) this.displayObjects.splice(idx, 1);
      this.selectedText = null;
      this._updateOpts();
    }
  }

  private _addShadowUI(el: HTMLElement, layer: StickerLayer | TextLayer | ShapeLayer) {
    const sh = layer.shadow || { type: 'none', offsetX: 5, offsetY: 5, blur: 10, color: '#000000', opacity: 50 };
    layer.shadow = sh;

    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.gap = '4px';
    row.innerHTML = `<div style="font-size:12px;color:#888;margin-top:0px">Shadow:</div>`;

    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '4px';
    controls.style.alignItems = 'center';

    const typeSel = document.createElement('select');
    typeSel.style.background = '#333';
    typeSel.style.color = '#ccc';
    typeSel.style.padding = '2px';
    typeSel.style.borderRadius = '3px';
    typeSel.innerHTML = `<option value="none" ${
      sh.type === 'none' ? 'selected' : ''
    }>None</option><option value="drop" ${sh.type === 'drop' ? 'selected' : ''}>Shadow</option><option value="glow" ${
      sh.type === 'glow' ? 'selected' : ''
    }>Glow</option>`;
    typeSel.onchange = () => {
      sh.type = typeSel.value as any;
      this._redraw();
    };
    controls.appendChild(typeSel);

    const colorI = document.createElement('input');
    colorI.type = 'color';
    colorI.value = sh.color;
    colorI.style.width = '24px';
    colorI.style.height = '24px';
    colorI.style.padding = '0';
    colorI.oninput = () => {
      sh.color = colorI.value;
      this._redraw();
    };
    controls.appendChild(colorI);

    const blurL = document.createElement('label');
    blurL.innerHTML = `B:<input type="range" min="0" max="60" value="${sh.blur}" style="width:40px"/>`;
    blurL.querySelector('input')!.oninput = (e) => {
      sh.blur = Number((e.target as HTMLInputElement).value);
      this._redraw();
    };
    controls.appendChild(blurL);

    const opL = document.createElement('label');
    opL.innerHTML = `O:<input type="range" min="0" max="100" value="${sh.opacity}" style="width:40px"/>`;
    opL.querySelector('input')!.oninput = (e) => {
      sh.opacity = Number((e.target as HTMLInputElement).value);
      this._redraw();
    };
    controls.appendChild(opL);

    row.appendChild(controls);
    el.appendChild(row);
  }
}
