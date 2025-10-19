import { RefProps, VNode } from 'lupine.web';

export type HtmlVarResult = { value: string | VNode<any>; ref: RefProps; node: VNode<any> };

export class HtmlVar implements HtmlVarResult {
  private _value: string | VNode<any>;
  private _dirty = false;
  private _ref: RefProps;
  private resolve!: () => void;
  private promise: Promise<void>;

  constructor(initial?: string | VNode<any>) {
    this.promise = new Promise<void>((res) => {
      this.resolve = res;
    });

    this._value = initial || '';
    this._ref = {
      onLoad: async (el: Element) => {
        // in case new resolve is created while updating
        const res = this.resolve;
        if (this._dirty) {
          await this.update();
        }
        res();
      },
    };
  }

  private async update(): Promise<void> {
    await this._ref.mountInnerComponent!(this._value);
    this._dirty = false;
    this._value = '';
  }

  // need to wait before use ref.current
  async waitUpdate() {
    await this.promise;
  }

  set value(value: string | VNode<any>) {
    this._value = value;
    if (this._dirty) {
      return;
    }

    this._dirty = true;
    if (!this._ref.current) {
      return;
    }
    this.promise = new Promise<void>(async (res) => {
      this.resolve = res;
      await this.update();
      this.resolve();
    });
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
        children: this._value,
      },
      html: [],
    };
  }
}
