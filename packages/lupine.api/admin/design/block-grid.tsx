import { CssProps } from 'lupine.web';
import { MediaQueryRange } from 'lupine.components';
import { DesignNode, getDesignStore } from './design-store';
import { RenderBlocks } from './render-blocks';
import { DesignUtils } from './design-utils';

export const BlockGrid = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;

  const sysCss: any = p._sys_css || DesignUtils.compileResponsiveCssForNode(props.node, 'grid');

  const isVertical = p.layoutDirection === 'vertical';

  const css: CssProps = {
    display: p.hidden ? 'none' : 'grid',
    width: '100%',
    minHeight: '0',
    height: '100%',
    flex: p.flex === 'none' ? 'none' : '1',
    gap: p.gap || '0',
    alignItems: p.alignItems || 'stretch',
    justifyContent: p.justifyContent || 'flex-start',
    backgroundColor: p.backgroundColor || 'transparent',
    padding: p.padding || '0',
    border: isPreview ? 'none' : '1px dashed #ccc',
    gridTemplateRows: isVertical ? (p.gridTemplate || 'auto auto') : '1fr',
    gridTemplateColumns: !isVertical ? (p.gridTemplate || '1fr 1fr') : '1fr',
    ...sysCss,

    [MediaQueryRange.DesktopBelow]: {
       ...sysCss[MediaQueryRange.DesktopBelow],
       gridTemplateRows: isVertical ? (p.gridTemplateDesktopBelow || p.gridTemplate || 'auto auto') : '1fr',
       gridTemplateColumns: !isVertical ? (p.gridTemplateDesktopBelow || p.gridTemplate || '1fr 1fr') : '1fr',
    },
    [MediaQueryRange.TabletBelow]: {
       ...sysCss[MediaQueryRange.TabletBelow],
       gridTemplateRows: isVertical ? (p.gridTemplateTabletBelow || p.gridTemplateDesktopBelow || p.gridTemplate || 'auto auto') : '1fr',
       gridTemplateColumns: !isVertical ? (p.gridTemplateTabletBelow || p.gridTemplateDesktopBelow || p.gridTemplate || '1fr 1fr') : '1fr',
    },
    [MediaQueryRange.MobileBelow]: {
       ...sysCss[MediaQueryRange.MobileBelow],
       gridTemplateRows: isVertical ? (p.gridTemplateMobileBelow || p.gridTemplateTabletBelow || p.gridTemplateDesktopBelow || p.gridTemplate || 'auto auto') : '1fr',
       gridTemplateColumns: !isVertical ? (p.gridTemplateMobileBelow || p.gridTemplateTabletBelow || p.gridTemplateDesktopBelow || p.gridTemplate || '1fr 1fr') : '1fr',
    },
    [MediaQueryRange.ExtraSmallBelow]: {
       ...sysCss[MediaQueryRange.ExtraSmallBelow],
       gridTemplateRows: isVertical ? (p.gridTemplateExtraSmallBelow || p.gridTemplateMobileBelow || p.gridTemplateTabletBelow || p.gridTemplateDesktopBelow || p.gridTemplate || 'auto auto') : '1fr',
       gridTemplateColumns: !isVertical ? (p.gridTemplateExtraSmallBelow || p.gridTemplateMobileBelow || p.gridTemplateTabletBelow || p.gridTemplateDesktopBelow || p.gridTemplate || '1fr 1fr') : '1fr',
    }
  };

  return (
    <div css={css} class='block-grid' data-design-id={props.node.id}>
      {props.node.children?.map(child => (
        <RenderBlocks key={child.id} node={child} />
      ))}
    </div>
  );
};
