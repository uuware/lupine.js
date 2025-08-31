import { RefProps, VNode } from 'lupine.web';

export type HtmlVarResult = { value: string | VNode<any>; ref: RefProps; node: VNode<any> };
export const HtmlVar = (initial?: string | VNode<any>): HtmlVarResult => {
  let _value: string | VNode<any> = initial || '';
  let _dirty = false;
  const waitUpdate = async (value: string | VNode<any>) => {
    if (!ref.current) return;
    await ref.mountInnerComponent!(value);
    _dirty = false;
  };
  const ref: RefProps = {
    onLoad: async (el: Element) => {
      _dirty && waitUpdate(_value);
    },
  };
  return {
    set value(value: string | VNode<any>) {
      _value = value;
      _dirty = true;
      waitUpdate(value);
    },
    get value() {
      return ref.current ? ref.current.innerHTML : _value;
    },
    get ref() {
      return ref;
    },
    get node() {
      _dirty = false;
      // the Fragment Tag will be present in the html if ref is assigned
      return { type: 'Fragment', props: { ref, children: _value }, html: [] };
    },
  };
};
