import { CssProps, getRenderPageProps, MediaQueryRange } from 'lupine.components';
import { MenuSidebar } from 'lupine.components';
import { DesignNode, getDesignStore } from './design-store';
import { NestMenuItemProps } from 'lupine.components';
import { buildNestedItems } from './block-menu-bar';
import { DesignUtils } from './design-utils';

export const BlockMenuList = async (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;
  const menuId = p.menuId || '';

  const wrapperCss: CssProps = p._sys_css || DesignUtils.compileResponsiveCssForNode(props.node);

  // In design mode (not preview), show a placeholder
  if (!isPreview) {
    const css: CssProps = {
      padding: '12px 16px',
      backgroundColor: p.backgroundColor || 'var(--sidebar-bg-color, #222)',
      color: p.color || 'white',
      textAlign: 'center',
      fontSize: '13px',
      borderRadius: '4px',
      minHeight: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      flexDirection: 'column',
      ...wrapperCss,
    };
    return (
      <div css={css} data-design-id={props.node.id}>
        <div>☰ Menu Sidebar</div>
        <div style={{ fontSize: '11px', opacity: '0.7' }}>{menuId ? menuId : '(no menu selected)'}</div>
      </div>
    );
  }

  // Preview / production: fetch and render the real MenuSidebar
  let items: NestMenuItemProps[] = [];
  if (menuId) {
    try {
      const res = await getRenderPageProps().renderPageFunctions.fetchData(`/api/admin/menu/get/${menuId}`);
      if (res?.json?.status === 'ok' && res.json.result?.items) {
        items = buildNestedItems(res.json.result.items);
      }
    } catch (e) {}
  }

  return (
    <div css={wrapperCss} data-design-id={props.node.id}>
      <MenuSidebar
        items={items}
        mobileMenu={p.mobileMenu === true}
        desktopMenu={p.desktopMenu !== false}
        color={p.color}
        backgroundColor={p.backgroundColor}
        defaultOpenAll={p.defaultOpenAll === true}
      />
    </div>
  );
};
