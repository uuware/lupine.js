import { RefProps, VNode } from 'lupine.web';

export type HtmlVarResult = { value: string | VNode<any>; ref: RefProps; node: VNode<any> };

export class HtmlVar implements HtmlVarResult {
  private _value: string | VNode<any>;
  private _dirty = false;
  private _ref: RefProps;

  constructor(initial?: string | VNode<any>) {
    this._value = initial || '';
    this._ref = {
      onLoad: async (el: Element) => {
        this._dirty && this.waitUpdate(this._value);
      },
    };
  }

  private async waitUpdate(value: string | VNode<any>): Promise<void> {
    if (!this._ref.current) return;
    await this._ref.mountInnerComponent!(value);
    this._dirty = false;
  }

  set value(value: string | VNode<any>) {
    this._value = value;
    this._dirty = true;
    this.waitUpdate(value);
  }

  get value(): string | VNode<any> {
    return this._ref.current ? this._ref.current.innerHTML : this._value;
  }

  get ref(): RefProps {
    return this._ref;
  }

  get node(): VNode<any> {
    this._dirty = false;
    // the Fragment Tag will be present in the html if ref is assigned
    return { 
      type: 'Fragment', 
      props: { 
        ref: this._ref, 
        children: this._value 
      }, 
      html: [] 
    };
  }
}
