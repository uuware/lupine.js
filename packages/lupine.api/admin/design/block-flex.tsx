import { CssProps } from 'lupine.web';
import { MediaQueryRange } from 'lupine.components';
import { DesignNode, getDesignStore } from './design-store';
import { RenderBlocks } from './render-blocks';

export const BlockFlex = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;

  const css: CssProps = {
    display: 'flex',
    width: '100%',
    minHeight: '0',
    height: '100%',
    flex: p.flex === 'none' ? 'none' : '1',
    gap: p.gap || '0px',
    alignItems: p.alignItems || 'stretch',
    justifyContent: p.justifyContent || 'flex-start',
    backgroundColor: p.backgroundColor || 'transparent',
    padding: p.padding || '0',
    border: isPreview ? 'none' : '1px dashed #ccc',
    flexWrap: p.flexWrap || 'nowrap',
    
    // Desktop Base
    flexDirection: p.flexDirection || 'column',
    
    // Responsive Overrides
    [MediaQueryRange.DesktopBelow]: {
       flexDirection: p.flexDirectionDesktopBelow || p.flexDirection || 'column',
       alignItems: p.alignItemsDesktopBelow || p.alignItems || 'stretch',
       justifyContent: p.justifyContentDesktopBelow || p.justifyContent || 'flex-start',
    },
    [MediaQueryRange.TabletBelow]: {
       flexDirection: p.flexDirectionTabletBelow || p.flexDirectionDesktopBelow || p.flexDirection || 'column',
       alignItems: p.alignItemsTabletBelow || p.alignItemsDesktopBelow || p.alignItems || 'stretch',
       justifyContent: p.justifyContentTabletBelow || p.justifyContentDesktopBelow || p.justifyContent || 'flex-start',
    },
    [MediaQueryRange.MobileBelow]: {
       flexDirection: p.flexDirectionMobileBelow || p.flexDirectionTabletBelow || p.flexDirectionDesktopBelow || p.flexDirection || 'column',
       alignItems: p.alignItemsMobileBelow || p.alignItemsTabletBelow || p.alignItemsDesktopBelow || p.alignItems || 'stretch',
       justifyContent: p.justifyContentMobileBelow || p.justifyContentTabletBelow || p.justifyContentDesktopBelow || p.justifyContent || 'flex-start',
    },
    [MediaQueryRange.ExtraSmallBelow]: {
       flexDirection: p.flexDirectionExtraSmallBelow || p.flexDirectionMobileBelow || p.flexDirectionTabletBelow || p.flexDirectionDesktopBelow || p.flexDirection || 'column',
       alignItems: p.alignItemsExtraSmallBelow || p.alignItemsMobileBelow || p.alignItemsTabletBelow || p.alignItemsDesktopBelow || p.alignItems || 'stretch',
       justifyContent: p.justifyContentExtraSmallBelow || p.justifyContentMobileBelow || p.justifyContentTabletBelow || p.justifyContentDesktopBelow || p.justifyContent || 'flex-start',
    },

    '.empty-drop-zone': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // padding: '24px',
      color: '#aaa',
      fontStyle: 'italic',
      width: '100%',
      height: '100%',
      // minHeight: '50px',
    }
  };

  return (
    <div css={css} class='block-flex' data-design-id={props.node.id}>
      {(!props.node.children || props.node.children.length === 0) && !isPreview && (
        <div class="empty-drop-zone text-center w-100">Drop components or containers here</div>
      )}
      {props.node.children?.map(child => (
        <RenderBlocks key={child.id} node={child} />
      ))}
    </div>
  );
};
