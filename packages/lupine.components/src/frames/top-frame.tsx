import { VNode, CssProps } from 'lupine.web';

export const TopFrame = async (placeholderClassname: string, vnode: VNode<any>) => {
  const cssContainer: CssProps = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    position: 'relative',
    '.top-frame-box': {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      height: '100%',
      // trick: to put two padding-top properties
      'padding-top ': 'constant(safe-area-inset-top)',
      'padding-top': 'env(safe-area-inset-top)',
    },
  };

  // console.log('Web version: ', getWebVersion());
  return (
    <div css={cssContainer}>
      {/* Can't put css on this placeholder node! */}
      <div class={'top-frame-box ' + placeholderClassname}>{vnode}</div>
    </div>
  );
};
