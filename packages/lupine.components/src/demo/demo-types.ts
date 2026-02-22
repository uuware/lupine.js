import { VNode } from 'lupine.components';

export type DemoControlType = 'text' | 'boolean' | 'select' | 'number';

export type DemoArgType<T = any> = {
  control: DemoControlType;
  options?: T[]; // For 'select'
  description?: string;
};

export type DemoArgTypes<TArgs> = {
  [K in keyof TArgs]?: DemoArgType<TArgs[K]>;
};

export interface DemoStory<TArgs> {
  id: string;
  text: string;
  args: TArgs;
  argTypes?: DemoArgTypes<TArgs>;
  code?: string;
  render: (args: TArgs) => VNode;
}
