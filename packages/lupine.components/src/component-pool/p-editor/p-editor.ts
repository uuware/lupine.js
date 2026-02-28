import { Tool, TextLayer, StickerLayer, PEditorOptions, HANDLE_SIZE, ShapeLayer, ShapeType } from './p-editor-types';
import { loadPdfScripts } from './p-editor-utils';
import { PEDITOR_STYLES } from './p-editor-styles';
import {
  hitSticker,
  hitText,
  getStickerHandles,
  getTextHandles,
  hitShape,
  getShapeHandles,
  getShapeBoundingBox,
} from '../i-editor/i-editor-geometry';
import { drawShapePath, drawDeleteHandle } from '../i-editor/i-editor-drawing';
import { LJ_SVG_ICON_CLASS, SvgIconNames, loadSvgIconStyles } from '../svg-icons';
const PEditorSvgs = ['upload', 'download', 'pan', 'select', 'zoomIn', 'zoomOut', 'draw', 'text', 'sticker'];

const BUBBLE_SVG_PATH =
  'M12 2C6.48 2 2 5.58 2 10c0 2.53 1.48 4.79 3.75 6.22l-.95 3.32c-.11.39.29.74.65.59l4.52-1.92A11.83 11.83 0 0012 18c5.52 0 10-3.58 10-8s-4.48-8-10-8z';

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
  private _fontFamily = 'Arial, sans-serif';
  private _fontSize = 24;
  private zoom = 1.0;

  // PDF State
  private pdfBytes?: Uint8Array;
  private pdfDoc?: any; // PDFLib.PDFDocument
  private pdfJsDoc?: any; // PDF.js Proxy
  private numPages = 0;
  private cp = 1; // current page (1-indexed)

  // Annotation State per page
  private texts: TextLayer[] = [];
  private stickers: StickerLayer[] = [];
  private shapes: ShapeLayer[] = [];

  private activeId: string | null = null;
  private dragState: any = null;

  // Draw state
  private _penMode: ShapeType = 'pencil';
  private _penSize = 4;
  private _arrowType: 'standard' | 'double' | 'thick' | 'fishtail' | 'arc' = 'standard';
  private activeShape: ShapeLayer | null = null;
  private textInput: HTMLTextAreaElement | null = null;
  private textCommitFn: (() => void) | null = null;
  private textCancelFn: (() => void) | null = null;

  constructor(container: HTMLElement, options?: PEditorOptions) {
    this.container = container;
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

  private async _init(options?: PEditorOptions) {
    this.loadingOverlay.style.display = 'flex';
    try {
      await loadPdfScripts();
      const { PDFDocument, rgb, StandardFonts } = (window as any).PDFLib;
      const pdfjsLib = (window as any).pdfjsLib;

      if (options?.pdfArrayBuffer) {
        this.pdfBytes = new Uint8Array(options.pdfArrayBuffer);
      } else if (options?.pdfUrl) {
        const res = await fetch(options.pdfUrl);
        const arrayBuffer = await res.arrayBuffer();
        this.pdfBytes = new Uint8Array(arrayBuffer);
      } else {
        // Init empty A4
        const doc = await PDFDocument.create();
        const page = doc.addPage([595.28, 841.89]); // A4 Size in points

        // Add branding texts
        const font = await doc.embedFont(StandardFonts.HelveticaBold);
        const fontNorm = await doc.embedFont(StandardFonts.Helvetica);

        page.drawText('p-editor', {
          x: 230,
          y: 600,
          size: 40,
          font: font,
          color: rgb(0.2, 0.2, 0.2),
        });

        page.drawText('Powered by Lupine.js', {
          x: 250,
          y: 560,
          size: 14,
          font: fontNorm,
          color: rgb(0.5, 0.5, 0.5),
        });

        this.pdfBytes = await doc.save();
      }

      if (this.pdfBytes) {
        this.pdfDoc = await PDFDocument.load(this.pdfBytes);
        const loadingTask = pdfjsLib.getDocument({ data: this.pdfBytes });
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
      if (['upload', 'download', 'zoomIn', 'zoomOut'].includes(id)) {
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
        this._btn('upload', 'Upload PDF', 'upload', () => this._handleUpload()),
        this._btn('download', 'Download PDF', 'download', () => this._handleDownload())
      )
    );

    tb.appendChild(
      this._grp(
        this._btn('pan', 'Pan', 'pan', () => {}),
        this._btn('select', 'Select', 'select', () => {}),
        this._btn('zoomIn', 'Zoom In', 'zoomIn', () => this._zoom(1.2)),
        this._btn('zoomOut', 'Zoom Out', 'zoomOut', () => this._zoom(1 / 1.2))
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

  private _setTool(t: Tool) {
    if (!['upload', 'download', 'zoomIn', 'zoomOut'].includes(t)) {
      this.tool = t;
      this.container.querySelectorAll('.pe-toolbar .pe-btn').forEach((b) => {
        if ((b as HTMLButtonElement).dataset.id === t) b.classList.add('active');
        else b.classList.remove('active');
      });
      const area = this.container.querySelector('.pe-canvas-area') as HTMLElement;
      if (t === 'pan') area.style.cursor = 'grab';
      else if (t === 'select') area.style.cursor = 'default';
      else area.style.cursor = 'crosshair';

      this.activeId = null;
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
      const sz = document.createElement('input');
      sz.type = 'range';
      sz.min = '10';
      sz.max = '100';
      if (activeTxt) this._fontSize = activeTxt.fontSize;
      sz.value = this._fontSize + '';
      sz.oninput = () => {
        this._fontSize = +sz.value;
        this._applyTextSizeToActive();
        this._drawFg();
      };
      w.appendChild(sz);
      btn('+Bubble', () => {
        if (this.activeId) this._toggleBubble(this.activeId);
      });
    } else if (t === 'pencil' || activeShp) {
      clr('Color');
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
            this.stickers.push(newSticker);
            this.activeId = newSticker.id;
            this._setTool('select');
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
    if (txt) txt.fontSize = this._fontSize;
  }
  private _toggleBubble(id: string) {
    const txt = this.texts.find((x) => x.id === id && x.pageIndex === this.cp);
    if (txt) {
      txt.tailActive = !txt.tailActive;
      this._drawFg();
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
            const pdfjsLib = (window as any).pdfjsLib;
            this.pdfJsDoc = await pdfjsLib.getDocument({ data: this.pdfBytes }).promise;
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
    this.loadingOverlay.style.display = 'flex';
    this.loadingOverlay.textContent = 'Baking and saving...';
    try {
      this._commitAnnotationsToPdfDoc(); // will apply to pdfDoc
      const finalBytes = await this.pdfDoc.save();
      const blob = new Blob([finalBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'edited.pdf';
      link.click();
      this.pdfBytes = finalBytes; // update internal state to match exactly
    } catch (err) {
      console.error(err);
    }
    this.loadingOverlay.textContent = 'Loading PDF Framework...';
    this.loadingOverlay.style.display = 'none';
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
      for (const t of pgTexts) {
        // Hex to RGB
        const hex = t.color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;

        // Very rough bubble draw if active
        // Full vector bubble synthesis in pdf-lib is complex; usually we draw an SVG path.
        if (t.tailActive) {
          // As a demonstration, draw a rectangle behind text. Real bubble implies complex svg to PDF path convert.
          page.drawRectangle({
            x: t.x - 10,
            y: height - t.y - t.fontSize,
            width: t.fontSize * t.text.length * 0.6 + 20,
            height: t.fontSize + 10,
            color: rgb(0.9, 0.9, 0.9),
            opacity: 0.8,
          });
        }
        page.drawText(t.text, {
          x: t.x,
          y: height - t.y,
          size: t.fontSize,
          color: rgb(r, g, b),
          rotate: degrees((t.rotation * 180) / Math.PI),
        });
      }

      const pgSticks = this.stickers.filter((s) => s.pageIndex === pIdx);
      for (const s of pgSticks) {
        // Embed image
        // To properly embed we ideally need the original bits, but here we can draw the canvas.
        const c = document.createElement('canvas');
        c.width = s.img.width;
        c.height = s.img.height;
        c.getContext('2d')!.drawImage(s.img, 0, 0);
        const dataUrl = c.toDataURL('image/png');
        const imgBytes = Uint8Array.from(atob(dataUrl.split(',')[1]), (c) => c.charCodeAt(0));

        const embedded = await this.pdfDoc.embedPng(imgBytes);
        page.drawImage(embedded, {
          x: s.x - s.w / 2,
          y: height - (s.y + s.h / 2),
          width: s.w,
          height: s.h,
          rotate: degrees((-s.rotation * 180) / Math.PI), // pdf-lib rotation inverse
        });
      }

      const pgShapes = this.shapes.filter((s) => s.pageIndex === pIdx);
      for (const s of pgShapes) {
        const hex = s.color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;
        const color = rgb(r, g, b);

        if (s.type === 'pencil' && s.points && s.points.length > 0) {
          let path = `M ${s.points[0].x} ${height - s.points[0].y}`;
          for (let i = 1; i < s.points.length; i++) {
            path += ` L ${s.points[i].x} ${height - s.points[i].y}`;
          }
          page.drawSvgPath(path, { borderColor: color, borderWidth: s.strokeWidth });
        } else if (s.type === 'line') {
          page.drawLine({
            start: { x: s.x, y: height - s.y },
            end: { x: s.w, y: height - s.h },
            color,
            thickness: s.strokeWidth,
          });
        } else if (s.type === 'rect') {
          const rx = Math.min(s.x, s.w);
          const ry = Math.min(s.y, s.h);
          const rw = Math.abs(s.w - s.x);
          const rh = Math.abs(s.h - s.y);
          page.drawRectangle({
            x: rx,
            y: height - ry - rh,
            width: rw,
            height: rh,
            borderColor: color,
            borderWidth: s.strokeWidth,
          });
        } else if (s.type === 'circle') {
          const radius = Math.hypot(s.w - s.x, s.h - s.y);
          page.drawEllipse({
            x: s.x,
            y: height - s.y,
            xScale: radius,
            yScale: radius,
            borderColor: color,
            borderWidth: s.strokeWidth,
          });
        } else if (s.type === 'triangle') {
          const path = `M ${s.x + (s.w - s.x) / 2} ${height - s.y} L ${s.w} ${height - s.h} L ${s.x} ${height - s.h} Z`;
          page.drawSvgPath(path, { borderColor: color, borderWidth: s.strokeWidth });
        } else if (s.type === 'star') {
          const spikes = 5;
          const outerRadius = Math.hypot(s.w - s.x, s.h - s.y);
          const innerRadius = outerRadius / 2.5;
          let rot = (Math.PI / 2) * 3;
          const step = Math.PI / spikes;
          let path = '';
          for (let i = 0; i < spikes; i++) {
            const xOuter = s.x + Math.cos(rot) * outerRadius;
            const yOuter = height - (s.y + Math.sin(rot) * outerRadius);
            path += (i === 0 ? 'M ' : ' L ') + `${xOuter} ${yOuter}`;
            rot += step;
            const xInner = s.x + Math.cos(rot) * innerRadius;
            const yInner = height - (s.y + Math.sin(rot) * innerRadius);
            path += ` L ${xInner} ${yInner}`;
            rot += step;
          }
          path += ' Z';
          page.drawSvgPath(path, { borderColor: color, borderWidth: s.strokeWidth });
        } else if (s.type === 'arrow') {
          // Simplistic vector mapping for standard arrow.
          const dist = Math.hypot(s.w - s.x, s.h - s.y);
          if (dist >= 2) {
            const arrowAngle = Math.atan2(s.h - s.y, s.w - s.x);
            const headlen = Math.max(10, dist * 0.2);
            const span = Math.PI / 6;
            const ex = s.w;
            const ey = height - s.h;

            page.drawLine({
              start: { x: s.x, y: height - s.y },
              end: { x: ex, y: ey },
              color,
              thickness: s.strokeWidth,
            });

            // Front heads
            const h1x = ex - headlen * Math.cos(arrowAngle - span);
            const h1y = ey + headlen * Math.sin(arrowAngle - span);
            page.drawLine({ start: { x: ex, y: ey }, end: { x: h1x, y: h1y }, color, thickness: s.strokeWidth });

            const h2x = ex - headlen * Math.cos(arrowAngle + span);
            const h2y = ey + headlen * Math.sin(arrowAngle + span);
            page.drawLine({ start: { x: ex, y: ey }, end: { x: h2x, y: h2y }, color, thickness: s.strokeWidth });

            if (s.arrowType === 'double') {
              const b1x = s.x + headlen * Math.cos(arrowAngle - span);
              const b1y = height - s.y - headlen * Math.sin(arrowAngle - span);
              page.drawLine({
                start: { x: s.x, y: height - s.y },
                end: { x: b1x, y: b1y },
                color,
                thickness: s.strokeWidth,
              });

              const b2x = s.x + headlen * Math.cos(arrowAngle + span);
              const b2y = height - s.y - headlen * Math.sin(arrowAngle + span);
              page.drawLine({
                start: { x: s.x, y: height - s.y },
                end: { x: b2x, y: b2y },
                color,
                thickness: s.strokeWidth,
              });
            }
          }
        }
      }
    }
  }

  private async _deletePage(idx0: number) {
    // 0-indexed
    if (this.numPages <= 1) return;
    this.pdfDoc.removePage(idx0);
    this.pdfBytes = await this.pdfDoc.save();
    const pdfjsLib = (window as any).pdfjsLib;
    this.pdfJsDoc = await pdfjsLib.getDocument({ data: this.pdfBytes }).promise;
    this.numPages = this.pdfJsDoc.numPages;
    // Cleanup annotations for deleted page
    this.texts = this.texts.filter((t) => t.pageIndex !== idx0 + 1);
    this.stickers = this.stickers.filter((s) => s.pageIndex !== idx0 + 1);
    this.shapes = this.shapes.filter((s) => s.pageIndex !== idx0 + 1);
    // Shift indices
    this.texts.forEach((t) => {
      if (t.pageIndex > idx0 + 1) t.pageIndex--;
    });
    this.stickers.forEach((s) => {
      if (s.pageIndex > idx0 + 1) s.pageIndex--;
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
    const pdfjsLib = (window as any).pdfjsLib;
    this.pdfJsDoc = await pdfjsLib.getDocument({ data: this.pdfBytes }).promise;

    // update annotation page indexes
    const shift = (arr: any[]) => {
      arr.forEach((a) => {
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
      const pdfjsLib = (window as any).pdfjsLib;
      this.pdfJsDoc = await pdfjsLib.getDocument({ data: this.pdfBytes }).promise;
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

  private async _zoom(f: number) {
    this.zoom *= f;
    await this._renderPage();
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

  private _drawFg() {
    this.ctxFg.clearRect(0, 0, this.canvasFg.width, this.canvasFg.height);

    // Draw texts
    const pgTexts = this.texts.filter((t) => t.pageIndex === this.cp);
    for (const t of pgTexts) {
      this.ctxFg.save();
      this.ctxFg.translate(t.x * this.zoom, t.y * this.zoom);
      this.ctxFg.rotate(t.rotation);

      if (t.tailActive) {
        // draw speech bubble
        this.ctxFg.fillStyle = 'rgba(230,230,230,0.85)';
        this.ctxFg.strokeStyle = '#aaa';
        this.ctxFg.lineWidth = 2;
        this.ctxFg.beginPath();
        // A simple path to mimic bubble
        this.ctxFg.arc(0, -t.fontSize / 2, t.fontSize * t.text.length * 0.4, 0, Math.PI * 2);
        this.ctxFg.fill();
        this.ctxFg.stroke();
      }

      this.ctxFg.font = this._textFontFn(t);
      this.ctxFg.fillStyle = t.color;
      this.ctxFg.textAlign = 'center';
      this.ctxFg.textBaseline = 'middle';
      this.ctxFg.fillText(t.text, 0, 0);
      this.ctxFg.restore();
    }

    // Draw stickers
    const pgStickers = this.stickers.filter((s) => s.pageIndex === this.cp);
    for (const s of pgStickers) {
      this.ctxFg.save();
      this.ctxFg.translate(s.x * this.zoom, s.y * this.zoom);
      this.ctxFg.rotate(s.rotation);
      this.ctxFg.drawImage(s.img, (-s.w * this.zoom) / 2, (-s.h * this.zoom) / 2, s.w * this.zoom, s.h * this.zoom);
      this.ctxFg.restore();
    }

    // Draw shapes
    const drawShp = (sh: ShapeLayer) => {
      this.ctxFg.save();
      this.ctxFg.strokeStyle = sh.color;
      this.ctxFg.lineWidth = sh.strokeWidth * this.zoom;
      this.ctxFg.lineCap = 'round';
      this.ctxFg.lineJoin = 'round';
      if (sh.type === 'pencil' && sh.points && sh.points.length > 0) {
        this.ctxFg.beginPath();
        this.ctxFg.moveTo(sh.points[0].x * this.zoom, sh.points[0].y * this.zoom);
        for (let i = 1; i < sh.points.length; i++) {
          this.ctxFg.lineTo(sh.points[i].x * this.zoom, sh.points[i].y * this.zoom);
        }
        this.ctxFg.stroke();
      } else if (sh.type !== 'pencil') {
        drawShapePath(
          this.ctxFg,
          sh.type,
          sh.arrowType || 'standard',
          sh.color,
          sh.x * this.zoom,
          sh.y * this.zoom,
          sh.w * this.zoom,
          sh.h * this.zoom
        );
      }
      this.ctxFg.restore();
    };

    const pgShapes = this.shapes.filter((s) => s.pageIndex === this.cp);
    pgShapes.forEach(drawShp);
    if (this.activeShape) drawShp(this.activeShape);

    // Handles
    if (this.activeId && this.tool === 'select') {
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
  }

  // ─── Events ──────────────────────────────────────────────────────────────────
  private _attachEvents() {
    const cw = this.canvasFg;

    let isDragging = false;
    let startPanX = 0,
      startPanY = 0;

    cw.onmousedown = (e) => {
      if (this.textInput && this.textCommitFn) {
        this.textCommitFn();
        return;
      }
      const rect = cw.getBoundingClientRect();
      const x = (e.clientX - rect.left) / this.zoom;
      const y = (e.clientY - rect.top) / this.zoom;

      if (this.tool === 'pan') {
        const area = this.container.querySelector('.pe-canvas-area')!;
        isDragging = true;
        startPanX = e.clientX + area.scrollLeft;
        startPanY = e.clientY + area.scrollTop;
        (area as HTMLElement).style.cursor = 'grabbing';
      } else if (this.tool === 'select') {
        // hit detect
        const pgTexts = this.texts.filter((t) => t.pageIndex === this.cp);
        const pgStickers = this.stickers.filter((s) => s.pageIndex === this.cp);
        const pgShapes = this.shapes.filter((s) => s.pageIndex === this.cp);

        let hit = null;
        if (this.activeId) {
          // check handles first
          const t = pgTexts.find((x) => x.id === this.activeId);
          if (t) {
            const h = getTextHandles(t as any, this.zoom, this.ctxFg, this._textFontFn as any);
            if (Math.abs(x - h.del.x) * this.zoom < HANDLE_SIZE && Math.abs(y - h.del.y) * this.zoom < HANDLE_SIZE) {
              this.texts = this.texts.filter((tx) => tx.id !== this.activeId);
              this.activeId = null;
              this._drawFg();
              return;
            }
            if (Math.abs(x - h.rot.x) * this.zoom < HANDLE_SIZE && Math.abs(y - h.rot.y) * this.zoom < HANDLE_SIZE) {
              this.dragState = { type: 'rotT', obj: t, cx: t.x, cy: t.y };
              return;
            }
            if (
              Math.abs(x - h.resize.x) * this.zoom < HANDLE_SIZE &&
              Math.abs(y - h.resize.y) * this.zoom < HANDLE_SIZE
            ) {
              this.dragState = { type: 'resizeT', obj: t, startX: x, startY: y, origFontSize: t.fontSize };
              return;
            }
          }
          const s = pgStickers.find((x) => x.id === this.activeId);
          if (s) {
            const h = getStickerHandles(s as any, this.zoom);
            if (Math.abs(x - h.del.x) * this.zoom < HANDLE_SIZE && Math.abs(y - h.del.y) * this.zoom < HANDLE_SIZE) {
              this.stickers = this.stickers.filter((sx) => sx.id !== this.activeId);
              this.activeId = null;
              this._drawFg();
              return;
            }
            if (Math.abs(x - h.rot.x) * this.zoom < HANDLE_SIZE && Math.abs(y - h.rot.y) * this.zoom < HANDLE_SIZE) {
              this.dragState = { type: 'rotS', obj: s, cx: s.x, cy: s.y };
              return;
            }
            if (
              Math.abs(x - h.resize.x) * this.zoom < HANDLE_SIZE &&
              Math.abs(y - h.resize.y) * this.zoom < HANDLE_SIZE
            ) {
              this.dragState = { type: 'resizeS', obj: s, startX: x, startY: y, origW: s.w, origH: s.h };
              return;
            }
          }
          const shp = pgShapes.find((x) => x.id === this.activeId);
          if (shp) {
            const h = getShapeHandles(shp as any, this.zoom);
            if (Math.abs(x - h.del.x) * this.zoom < HANDLE_SIZE && Math.abs(y - h.del.y) * this.zoom < HANDLE_SIZE) {
              this.shapes = this.shapes.filter((sx) => sx.id !== this.activeId);
              this.activeId = null;
              this._drawFg();
              return;
            }
            if (Math.abs(x - h.rot.x) * this.zoom < HANDLE_SIZE && Math.abs(y - h.rot.y) * this.zoom < HANDLE_SIZE) {
              const box = getShapeBoundingBox(shp as any);
              this.dragState = { type: 'rotShp', obj: shp, cx: box.cx, cy: box.cy };
              return;
            }
            if (
              Math.abs(x - h.resize.x) * this.zoom < HANDLE_SIZE &&
              Math.abs(y - h.resize.y) * this.zoom < HANDLE_SIZE
            ) {
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
          if (hitText({ x, y }, pgTexts[i] as any, this.ctxFg, this._textFontFn as any)) {
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
          this.activeId = hit.id;
          this.dragState = { type: 'move', obj: hit, ox: x - hit.x, oy: y - hit.y };
        } else {
          this.activeId = null;
        }
        this._updateOpts();
        this._drawFg();
      } else if (this.tool === 'text') {
        const inp = document.createElement('textarea');
        inp.className = 'pe-text-input';
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
        inp.style.overflow = 'hidden';
        inp.style.whiteSpace = 'pre';
        inp.style.lineHeight = '1.2';
        inp.style.padding = '4px';
        inp.style.transform = 'translate(-50%, -50%)'; // center origin
        inp.style.pointerEvents = 'auto'; // ensure click works

        // Auto-resize
        const adjustSize = () => {
          inp.style.width = 'auto';
          inp.style.height = 'auto';
          inp.style.width = Math.max(50, inp.scrollWidth + 10) + 'px';
          inp.style.height = inp.scrollHeight + 'px';
        };

        this.wrap.appendChild(inp);
        this.textInput = inp;

        this.textCommitFn = () => {
          if (!this.textInput) return;
          const val = inp.value.trim();
          if (val) {
            this.texts.push({
              id: inp.dataset.editid || 't_' + Date.now(),
              pageIndex: this.cp,
              text: val,
              x,
              y,
              color: this.color,
              fontSize: this._fontSize,
              fontFamily: this._fontFamily,
              bold: false,
              italic: false,
              rotation: 0,
              tailActive: false,
            });
            this.activeId = this.texts[this.texts.length - 1].id;
            this._setTool('select');
          }
          if (this.textCancelFn) this.textCancelFn();
        };

        this.textCancelFn = () => {
          if (this.textInput) {
            this.textInput.remove();
            this.textInput = null;
            this.textCommitFn = null;
            this.textCancelFn = null;
          }
        };

        adjustSize();

        inp.oninput = () => adjustSize();
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
        this.activeShape = {
          id: 'shp_' + Date.now(),
          pageIndex: this.cp,
          type: this._penMode,
          color: this.color,
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
          const newX = x - st.ox;
          const newY = y - st.oy;
          const dx = newX - st.obj.x;
          const dy = newY - st.obj.y;

          if (st.obj.type === 'pencil' && st.obj.points) {
            st.obj.points.forEach((p: any) => {
              p.x += dx;
              p.y += dy;
            });
          } else if (st.obj.type && st.obj.type !== 'pencil') {
            st.obj.w += dx;
            st.obj.h += dy;
          }
          st.obj.x = newX;
          st.obj.y = newY;
        } else if (st.type.startsWith('rot')) {
          st.obj.rotation = Math.atan2(y - st.cy, x - st.cx) + Math.PI / 2;
        } else if (st.type === 'resizeT') {
          const dx = x - st.startX;
          st.obj.fontSize = Math.max(8, Math.round(st.origFontSize + dx));
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
      this.dragState = null;
      if (this.activeShape) {
        this.shapes.push(this.activeShape);
        this.activeId = this.activeShape.id;
        this.activeShape = null;
        this._setTool('select');
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
          this.texts = this.texts.filter((tx) => tx.id !== t.id); // Remove first
          this.activeId = null;
          this.color = t.color;
          this._fontSize = t.fontSize;

          // Simulate clicking to insert text
          this._setTool('text');
          const mdev = new MouseEvent('mousedown', {
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: true,
          });
          cw.dispatchEvent(mdev);

          setTimeout(() => {
            if (this.textInput) {
              this.textInput.value = t.text;
              this.textInput.dataset.editid = t.id;
              this.textInput.dispatchEvent(new Event('input'));
            }
          }, 0);
          return;
        }
      }
    });
  }
}
