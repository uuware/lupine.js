import { CssProps, getRenderPageProps, PageProps } from 'lupine.components';
import { RenderBlocks } from './render-blocks';
import { DesignNode } from './design-store';

export const RenderPage = async (props: PageProps) => {
  const urlParts = props.url.split('/').filter(p => !!p);
  const langId = urlParts[0] || 'en';
  const frameId = urlParts[1];
  const contentId = urlParts[2];

  let frameTree: DesignNode | null = null;
  let contentTree: DesignNode | null = null;

  if (frameId) {
     const res = await props.renderPageFunctions.fetchData(`/api/admin/page/get/${frameId}`);
     if (res && res.json && res.json.status === 'ok' && res.json.result) {
        try { frameTree = typeof res.json.result.json === 'string' ? JSON.parse(res.json.result.json) : res.json.result.json; } catch(e) {}
     }
  }

  if (contentId) {
     const res2 = await getRenderPageProps().renderPageFunctions.fetchData(`/api/admin/page/get/${contentId}`);
     if (res2 && res2.json && res2.json.status === 'ok' && res2.json.result) {
        try { contentTree = typeof res2.json.result.json === 'string' ? JSON.parse(res2.json.result.json) : res2.json.result.json; } catch(e) {}
     }
  }

  const swapPlaceholder = (node: DesignNode) => {
     if (node.type === 'block-placeholder') {
         if (contentTree) {
             const originalProps = node.props || {};
             Object.assign(node, contentTree); // Swap the raw placeholder node with the true sub-page tree natively!
             node.props = {
                 ...contentTree.props,
                 ...originalProps,
                 customCss: [contentTree.props?.customCss, originalProps.customCss].filter(Boolean).join('; ')
             };
             node.props.isRoot = false; // Defeat 100vh height override CSS cascades so it flows into the container.
         }
     } else if (node.children) {
         node.children.forEach(swapPlaceholder);
     }
  };

  if (frameTree) {
     swapPlaceholder(frameTree);
     frameTree.props.isRoot = true; // Ensure highest tree forces 100vh layout correctly.
  }

  const css: CssProps = {
     display: 'flex',
     flexDirection: 'column',
     width: '100%',
     height: '100%',
     minHeight: '100vh',
  };

  return (
    <div css={css} class='lupine-rendered-page'>
       {frameTree ? <RenderBlocks node={frameTree} /> : <div style={{ padding: '64px', textAlign: 'center', fontFamily: 'sans-serif', color: '#999' }}>Page Not Found</div>}
    </div>
  );
};
