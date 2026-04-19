import { CssProps } from 'lupine.web';
import { MediaQueryRange } from 'lupine.components';
import { DesignNode, getDesignStore } from './design-store';
import { RenderBlocks } from './render-blocks';

const DEFAULT_LAYOUT = '100px 1fr 50px';
export const BlockPage = (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;

  const isVertical = p.layoutDirection === 'vertical' || !p.layoutDirection;

  const css: CssProps = {
    display: 'grid',
    width: '100%',
    minHeight: p.isRoot ? '100vh' : '100%',
    flex: p.flex === 'none' ? 'none' : '1',
    backgroundColor: p.backgroundColor || 'transparent',
    padding: p.padding || '0',
    border: 'none',

    gridTemplateRows: isVertical ? (p.gridTemplate || DEFAULT_LAYOUT) : '1fr',
    gridTemplateColumns: !isVertical ? (p.gridTemplate || DEFAULT_LAYOUT) : '1fr',

    [MediaQueryRange.DesktopBelow]: {
       gridTemplateRows: isVertical ? (p.gridTemplateDesktopBelow || p.gridTemplate || DEFAULT_LAYOUT) : '1fr',
       gridTemplateColumns: !isVertical ? (p.gridTemplateDesktopBelow || p.gridTemplate || DEFAULT_LAYOUT) : '1fr',
    },
    [MediaQueryRange.TabletBelow]: {
       gridTemplateRows: isVertical ? (p.gridTemplateTabletBelow || p.gridTemplateDesktopBelow || p.gridTemplate || DEFAULT_LAYOUT) : '1fr',
       gridTemplateColumns: !isVertical ? (p.gridTemplateTabletBelow || p.gridTemplateDesktopBelow || p.gridTemplate || DEFAULT_LAYOUT) : '1fr',
    },
    [MediaQueryRange.MobileBelow]: {
       gridTemplateRows: isVertical ? (p.gridTemplateMobileBelow || p.gridTemplateTabletBelow || p.gridTemplateDesktopBelow || p.gridTemplate || DEFAULT_LAYOUT) : '1fr',
       gridTemplateColumns: !isVertical ? (p.gridTemplateMobileBelow || p.gridTemplateTabletBelow || p.gridTemplateDesktopBelow || p.gridTemplate || DEFAULT_LAYOUT) : '1fr',
    },
    [MediaQueryRange.ExtraSmallBelow]: {
       gridTemplateRows: isVertical ? (p.gridTemplateExtraSmallBelow || p.gridTemplateMobileBelow || p.gridTemplateTabletBelow || p.gridTemplateDesktopBelow || p.gridTemplate || DEFAULT_LAYOUT) : '1fr',
       gridTemplateColumns: !isVertical ? (p.gridTemplateExtraSmallBelow || p.gridTemplateMobileBelow || p.gridTemplateTabletBelow || p.gridTemplateDesktopBelow || p.gridTemplate || DEFAULT_LAYOUT) : '1fr',
    }
  };

  return (
    <div css={css} class='block-page root-page' data-design-id={props.node.id}>
      {props.node.children?.map(child => (
        <RenderBlocks key={child.id} node={child} />
      ))}
    </div>
  );
};
