/* most top-frame for all other pages
place to set safe-area-inset-top and other common styles
*/
import { VNode, CssProps } from 'lupine.components';

// TopFrame and ResponsiveFrame both contain safe-area-inset-top, so can't use them togother
export const TopFrame = async ({
  placeholderClassname,
  vnode,
  noSafeAreaTop,
}: {
  placeholderClassname: string;
  vnode: VNode<any>;
  noSafeAreaTop?: boolean;
}) => {
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
      ...(!noSafeAreaTop
        ? {
            'padding-top ': 'constant(safe-area-inset-top)',
            'padding-top': 'env(safe-area-inset-top)',
          }
        : {}),
    },
  };

  return (
    <div css={cssContainer}>
      {/* Can't put css on this placeholder node! */}
      <div class={'top-frame-box ' + placeholderClassname}>{vnode}</div>
    </div>
  );
};
