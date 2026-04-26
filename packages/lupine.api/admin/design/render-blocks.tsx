import { DesignNode } from './design-store';
import { BlockPage } from './block-page';
import { BlockGrid } from './block-grid';
import { BlockFlex } from './block-flex';
import { BlockTitle } from './block-title';
import { BlockParagraph } from './block-paragraph';
import { BlockImage } from './block-image';
import { BlockCarousel } from './block-carousel';
import { BlockYoutube } from './block-youtube';
import { BlockChart } from './block-chart';
import { BlockPlaceholder } from './block-placeholder';
import { BlockMenuBar } from './block-menu-bar';
import { BlockMenuList } from './block-menu-list';

export const ComponentsMap: Record<string, any> = {
  'block-page': BlockPage,
  'block-grid': BlockGrid,
  'block-flex': BlockFlex,
  'block-title': BlockTitle,
  'block-paragraph': BlockParagraph,
  'block-image': BlockImage,
  'block-carousel': BlockCarousel,
  'block-youtube': BlockYoutube,
  'block-chart': BlockChart,
  'block-placeholder': BlockPlaceholder,
  'block-menu-bar': BlockMenuBar,
  'block-menu-list': BlockMenuList,
};

export const RenderBlocks = (props: { node: DesignNode }) => {
  const Component = ComponentsMap[props.node.type];
  if (!Component) {
    return <div style={{ color: 'red' }}>Unknown component: {props.node.type}</div>;
  }

  // Pure headless rendering stripped of absolutely all wrapping div's, store linkages, and drag handlers!
  return <Component node={props.node} />;
};
