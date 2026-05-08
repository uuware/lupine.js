import type { PageProps, VNode } from 'lupine.components';

export type RegisteredPageCallback = (props: PageProps, content?: VNode<any> | null) => Promise<VNode<any> | null>;
export type RegisteredComponentCallback = (props: PageProps) => Promise<VNode<any> | null> | VNode<any> | null;
export type RegisteredComponentDef = {
  key: string;
  label: string;
  component: RegisteredComponentCallback;
};

const registeredPages: Record<string, RegisteredPageCallback> = {};
const registeredComponents: Record<string, RegisteredComponentDef> = {};

export const cmsRegisterPage = (key: string, page: RegisteredPageCallback) => {
  if (!key) {
    return;
  }
  registeredPages[key] = page;
};

export const cmsUnregisterPage = (key: string) => {
  delete registeredPages[key];
};

export const cmsGetRegisteredPage = (key: string) => {
  return registeredPages[key];
};

export const cmsRegisterComponent = (key: string, component: RegisteredComponentCallback, label?: string) => {
  if (!key) {
    return;
  }
  registeredComponents[key] = {
    key,
    label: label || key,
    component,
  };
};

export const cmsUnregisterComponent = (key: string) => {
  delete registeredComponents[key];
};

export const cmsGetRegisteredComponent = (key: string) => {
  return registeredComponents[key]?.component;
};

export const cmsGetRegisteredComponents = () => {
  return Object.values(registeredComponents);
};
