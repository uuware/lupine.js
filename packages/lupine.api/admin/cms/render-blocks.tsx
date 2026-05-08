import { getRenderPageProps } from 'lupine.components';
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
import { BlockInput } from './block-input';
import { BlockButton } from './block-button';
import { BlockPopup } from './block-popup';
import { BlockLang } from './block-lang';
import { cmsGetRegisteredComponent } from './register-page';

const BlockRenderedPageContent = (props: { node: DesignNode }) => {
  const p = props.node.props || {};
  const css: any = {
    width: '100%',
    minWidth: '0',
    minInlineSize: '0',
    boxSizing: 'border-box',
    flex: p.flex === 'none' ? 'none' : '1 1 0',
    ...(p._sys_css || {}),
  };
  return <div css={css} class='block-rendered-page-content'>{p.page || null}</div>;
};

const BlockComponentRef = (props: { node: DesignNode }) => {
  const ref = props.node.props?._componentRef;
  return <div style={{ color: 'red' }}>Component not expanded: {ref?.name || ref?.id || props.node.id}</div>;
};

const BlockRegisteredComponent = async (props: { node: DesignNode }) => {
  const p = props.node.props || {};
  const Component = cmsGetRegisteredComponent(p.componentKey);
  if (!Component) {
    return <div style={{ color: 'red' }}>Registered component not found: {p.label || p.componentKey || props.node.id}</div>;
  }

  const renderProps = getRenderPageProps();
  return <div class='block-registered-component' data-design-id={props.node.id}>{await Component(renderProps)}</div>;
};

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
  'block-input': BlockInput,
  'block-button': BlockButton,
  'block-popup': BlockPopup,
  'block-lang': BlockLang,
  // only used when frame is json, but content is registered page
  'block-rendered-page-content': BlockRenderedPageContent,
  // placeholder persisted for user-defined component references; backend expands it before render
  'block-component-ref': BlockComponentRef,
  'block-registered-component': BlockRegisteredComponent,
};

export const RenderBlocks = (props: { node: DesignNode }) => {
  const Component = ComponentsMap[props.node.type];
  if (!Component) {
    return <div style={{ color: 'red' }}>Unknown component: {props.node.type}</div>;
  }

  // Pure headless rendering stripped of absolutely all wrapping div's, store linkages, and drag handlers!
  return <Component node={props.node} />;
};
