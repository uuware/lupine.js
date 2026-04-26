/**
 * Modernized SVG Graph Library
 * Replaces the legacy JGraph library.
 */

export class SvgGraph {
  public svgRoot: SVGSVGElement;
  private elements: Map<string, SVGElement> = new Map();

  constructor(container: HTMLElement | string) {
    let el: HTMLElement | null = null;
    if (typeof container === 'string') {
      el = document.getElementById(container);
    } else {
      el = container;
    }

    if (!el) {
      throw new Error('SvgGraph: container not found');
    }

    el.style.userSelect = 'none';

    this.svgRoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svgRoot.style.width = '100%';
    this.svgRoot.style.height = '100%';
    this.svgRoot.style.position = 'absolute';
    this.svgRoot.style.left = '0';
    this.svgRoot.style.top = '0';
    this.svgRoot.style.pointerEvents = 'none'; // usually good for overlays

    el.appendChild(this.svgRoot);
  }

  draw(
    shape: 'rect' | 'ellipse' | 'roundrect' | 'line',
    fillColor: string,
    lineColor: string,
    lineWidth: string,
    left: number,
    top: number,
    width: number,
    height: number,
    id?: string
  ): SVGElement {
    const svgNamespace = 'http://www.w3.org/2000/svg';
    let svg: SVGElement;

    if (shape === 'rect') {
      svg = document.createElementNS(svgNamespace, 'rect');
      svg.setAttributeNS(null, 'x', left + 'px');
      svg.setAttributeNS(null, 'y', top + 'px');
      svg.setAttributeNS(null, 'width', width + 'px');
      svg.setAttributeNS(null, 'height', height + 'px');
    } else if (shape === 'ellipse') {
      svg = document.createElementNS(svgNamespace, 'ellipse');
      svg.setAttributeNS(null, 'cx', left + width / 2 + 'px');
      svg.setAttributeNS(null, 'cy', top + height / 2 + 'px');
      svg.setAttributeNS(null, 'rx', width / 2 + 'px');
      svg.setAttributeNS(null, 'ry', height / 2 + 'px');
    } else if (shape === 'roundrect') {
      svg = document.createElementNS(svgNamespace, 'rect');
      svg.setAttributeNS(null, 'x', left + 'px');
      svg.setAttributeNS(null, 'y', top + 'px');
      svg.setAttributeNS(null, 'rx', '20px');
      svg.setAttributeNS(null, 'ry', '20px');
      svg.setAttributeNS(null, 'width', width + 'px');
      svg.setAttributeNS(null, 'height', height + 'px');
    } else if (shape === 'line') {
      svg = document.createElementNS(svgNamespace, 'line');
      svg.setAttributeNS(null, 'x1', left + 'px');
      svg.setAttributeNS(null, 'y1', top + 'px');
      svg.setAttributeNS(null, 'x2', width + 'px');
      svg.setAttributeNS(null, 'y2', height + 'px');
    } else {
      throw new Error(`Unsupported shape: ${shape}`);
    }

    svg.style.position = 'absolute';
    svg.setAttributeNS(null, 'fill', fillColor || 'none');
    svg.setAttributeNS(null, 'stroke', lineColor || 'none');
    svg.setAttributeNS(null, 'stroke-width', lineWidth || '1px');
    svg.style.pointerEvents = 'auto'; // allow interaction with shape

    if (id) {
      svg.id = id;
      this.elements.set(id, svg);
    }
    this.svgRoot.appendChild(svg);
    return svg;
  }

  drawLine(
    lineColor: string,
    lineWidth: string,
    left: number,
    top: number,
    width: number,
    height: number,
    id?: string
  ): SVGElement {
    return this.draw('line', '', lineColor, lineWidth, left, top, width, height, id);
  }

  resize(idOrObj: string | SVGElement, left: number, top: number, width: number, height: number): SVGElement | void {
    const svg =
      typeof idOrObj === 'string' ? this.elements.get(idOrObj) || (document.getElementById(idOrObj) as any) : idOrObj;
    if (!svg) return;

    if (svg.tagName === 'rect') {
      svg.setAttributeNS(null, 'x', left + 'px');
      svg.setAttributeNS(null, 'y', top + 'px');
      svg.setAttributeNS(null, 'width', width + 'px');
      svg.setAttributeNS(null, 'height', height + 'px');
    } else if (svg.tagName === 'ellipse') {
      svg.setAttributeNS(null, 'cx', left + width / 2 + 'px');
      svg.setAttributeNS(null, 'cy', top + height / 2 + 'px');
      svg.setAttributeNS(null, 'rx', width / 2 + 'px');
      svg.setAttributeNS(null, 'ry', height / 2 + 'px');
    } else if (svg.tagName === 'line') {
      svg.setAttributeNS(null, 'x1', left + 'px');
      svg.setAttributeNS(null, 'y1', top + 'px');
      svg.setAttributeNS(null, 'x2', width + 'px');
      svg.setAttributeNS(null, 'y2', height + 'px');
    }
    return svg;
  }

  remove(idOrObj: string | SVGElement): void {
    const svg = typeof idOrObj === 'string' ? this.elements.get(idOrObj) || document.getElementById(idOrObj) : idOrObj;
    if (svg && svg.parentNode) {
      svg.parentNode.removeChild(svg);
      if (typeof idOrObj === 'string') this.elements.delete(idOrObj);
    }
  }

  setAttribute(shape: SVGElement, cmd: string, value: string): void {
    if (shape != null) {
      if (cmd === 'fillcolor') {
        shape.setAttributeNS(null, 'fill', value || 'none');
      } else if (cmd === 'linecolor') {
        shape.setAttributeNS(null, 'stroke', value || 'none');
      } else if (cmd === 'linewidth') {
        shape.setAttributeNS(null, 'stroke-width', parseInt(value) + 'px');
      }
    }
  }

  getAttribute(shape: SVGElement, cmd: string): string {
    let result = '';
    if (shape != null) {
      if (cmd === 'fillcolor') {
        result = shape.getAttributeNS(null, 'fill') || '';
        if (result === 'none') result = '';
      } else if (cmd === 'linecolor') {
        result = shape.getAttributeNS(null, 'stroke') || '';
        if (result === 'none') result = '';
      } else if (cmd === 'linewidth') {
        result = shape.getAttributeNS(null, 'stroke') || '';
        if (result === 'none') result = '';
        else result = shape.getAttributeNS(null, 'stroke-width') || '';
      }
    }
    return result;
  }
}
