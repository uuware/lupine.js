import { VNode } from '../jsx';
import type { PageProps } from './page-props';

export type PageRouterCallback = (props: PageProps) => Promise<VNode<any> | null>;

export type PageRouterData = {
  path: string;
  handler: (PageRouterCallback | IPageRouter)[];
  parameterVariables: string[];
  parameterLength: number;
};

export type FramePageProps = {
  component: (placeholderClassname: string, vnode: VNode<any>) => Promise<VNode<any>>;
  placeholderClassname: string;
};

export interface IPageRouter {
  handleRoute(url: string, props: PageProps, renderPartPage: boolean): Promise<VNode<any> | null>;
  setFilter?(filter: PageRouterCallback): void;
  setSubDir?(subDir: string): void;
  setFramePage?(framePage: FramePageProps): void;
  use?(path: string, ...handler: (PageRouterCallback | IPageRouter)[]): void;
}
