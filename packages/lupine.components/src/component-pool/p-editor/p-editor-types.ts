export type Tool = 'pan' | 'select' | 'pencil' | 'text' | 'sticker' | 'rotate';

export const HANDLE_SIZE = 8;

export interface LayerShadow {
  type: 'none' | 'drop' | 'glow';
  offsetX: number;
  offsetY: number;
  blur: number;
  color: string;
  opacity: number;
}

export interface TextLayer {
  id: string;
  pageIndex: number; // which page this text belongs to
  text: string;
  x: number;
  y: number;
  color: string;
  fontSize: number;
  fontFamily: string;
  bold: boolean;
  italic: boolean;
  rotation: number;
  strokeColor?: string;
  strokeWidth?: number;
  tailActive?: boolean;
  tailX?: number;
  tailY?: number;
  shadow?: LayerShadow;
}

export interface StickerLayer {
  id: string;
  pageIndex: number; // which page this sticker belongs to
  img: HTMLImageElement;
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number;
  shadow?: LayerShadow;
}

import { ShapeType, ShapeLayer } from '../i-editor/i-editor-types';
export type { ShapeType, ShapeLayer };

export interface PEditorOptions {
  pdfUrl?: string;
  pdfArrayBuffer?: ArrayBuffer;
}
