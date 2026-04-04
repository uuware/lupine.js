import { VNode } from '../jsx';

export interface MounterProps {
  mountInnerComponent: (selector: string | null | Element, jsxNodes: VNode<any>) => Promise<void>;
  mountOuterComponent: (selector: string | Element, jsxNodes: VNode<any>) => Promise<void>;
}
