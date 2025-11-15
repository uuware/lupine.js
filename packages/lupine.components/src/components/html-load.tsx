import { RefProps, VNode } from 'lupine.web';

// load async html
/*
<HtmlLoad
  html={async () => {
    return <Footer title={await WebConfig.get('footer', `XXX`)}></Footer>;
  }}
></HtmlLoad>
*/
export type HtmlLoadHookProps = {
  getRef?: () => RefProps;
  render?: (html: string | VNode<any>) => void;
};
export type HtmlLoadProps = {
  html: () => Promise<VNode<any>>;
  initialHtml?: string | VNode<any>;
  hook?: HtmlLoadHookProps;
};
export const HtmlLoad = (props: HtmlLoadProps) => {
  const ref: RefProps = {
    onLoad: async (el: Element) => {
      const dom = await props.html();
      await ref.mountInnerComponent!(dom);
    },
  };
  if (props.hook) {
    props.hook.getRef = () => ref;
    props.hook.render = (html: string | VNode<any>) => {
      ref.mountInnerComponent!(html);
    };
  }
  return {
    type: 'Fragment',
    props: {
      ref: ref,
      children: props.initialHtml || '',
    },
    html: [],
  };
};
