export type Tool =
  | 'pan'
  | 'select'
  | 'crop'
  | 'pencil'
  | 'mosaic'
  | 'text'
  | 'sticker'
  | 'adjust'
  | 'round'
  | 'frame'
  | 'rotate'
  | 'eraser';

export const HANDLE_SIZE = 8;

export interface LayerShadow {
  type: 'none' | 'drop' | 'glow'; // 'none' to disable shadow locally
  offsetX: number;
  offsetY: number;
  blur: number;
  color: string;
  opacity: number; // 0-100
}

export interface TextLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  fontSize: number;
  fontFamily: string;
  bold: boolean;
  italic: boolean;
  rotation: number; // radians
  strokeColor?: string;
  strokeWidth?: number;
  tailActive?: boolean;
  tailX?: number; // absolute
  tailY?: number; // absolute
  shadow?: LayerShadow;
}

export interface StickerLayer {
  id: string;
  img: HTMLImageElement;
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number; // radians
  shadow?: LayerShadow;
}

export type DisplayObject = {
  id: string;
  type: 'text' | 'sticker' | 'shape';
  layer: TextLayer | StickerLayer | ShapeLayer;
};

export interface Snapshot {
  imageData: ImageData;
  displayObjects: DisplayObject[];
}

export type ShapeType = 'pencil' | 'line' | 'circle' | 'rect' | 'triangle' | 'star' | 'arrow';

export interface ShapeLayer {
  id: string;
  type: ShapeType;
  color: string;
  strokeWidth: number;
  rotation: number; // For movable/rotatable shape manipulation
  points?: { x: number; y: number }[];
  x: number;
  y: number;
  w: number;
  h: number;
  arrowType?: 'standard' | 'double' | 'thick' | 'fishtail' | 'arc';
  pageIndex?: number; // Used only by p-editor
  shadow?: LayerShadow;
}

export interface IEditorOptions {
  imageSrc?: string;
}
