import { CssProps, getRenderPageProps, MediaQueryRange } from 'lupine.components';
import { MenuBar } from 'lupine.components';
import { DesignNode, getDesignStore } from './design-store';
import { NestMenuItemProps } from 'lupine.components';
import { DesignUtils } from './design-utils';

/**
 * Converts flat menu items [level, nav, access, link, text] into nested NestMenuItemProps[].
 */
export const buildNestedItems = (rawItems: any[]): NestMenuItemProps[] => {
  if (!rawItems || rawItems.length === 0) return [];

  const root: NestMenuItemProps[] = [];
  const stack: { level: number; children: NestMenuItemProps[] }[] = [{ level: -1, children: root }];

  for (const raw of rawItems) {
    const level = typeof raw[0] === 'number' ? raw[0] : parseInt(raw[0]) || 0;
    const link = String(raw[3] || '');
    const text = String(raw[4] || '');

    const item: NestMenuItemProps = {
      id: link || text,
      text,
      url: link,
      alt: text,
    };

    // Walk back to find the parent level
    while (stack.length > 1 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];
    parent.children.push(item);

    // This item can be a parent for the next deeper items
    const children: NestMenuItemProps[] = [];
    stack.push({ level, children });

    // Store reference for later attachment
    Object.defineProperty(item, '__children', { value: children, enumerable: false });
  }

  // Attach non-empty children
  const attachChildren = (items: NestMenuItemProps[]): void => {
    for (const item of items) {
      const c = (item as any).__children as NestMenuItemProps[] | undefined;
      if (c && c.length > 0) {
        item.items = c;
        attachChildren(c);
      }
    }
  };
  attachChildren(root);
  return root;
};

export const BlockMenuBar = async (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props;
  const menuId = p.menuId || '';

  const wrapperCss: CssProps = p._sys_css || DesignUtils.compileResponsiveCssForNode(props.node);

  // In design mode (not preview), show a placeholder
  if (!isPreview) {
    const css: CssProps = {
      padding: '12px 16px',
      backgroundColor: p.backgroundColor,
      color: p.textColor,
      textAlign: 'center',
      fontSize: '13px',
      borderRadius: '4px',
      minHeight: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      ...wrapperCss,
    };
    return (
      <div css={css} data-design-id={props.node.id}>
        ☰ Menu Bar {menuId ? `(${menuId})` : '(no menu selected)'}
      </div>
    );
  }

  // Preview / production: fetch and render the real MenuBar
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
      <MenuBar
        items={items}
        textColor={p.textColor}
        hoverColor={p.hoverColor}
        hoverBgColor={p.hoverBgColor}
        backgroundColor={p.backgroundColor}
        maxWidth={p.maxWidth}
      />
    </div>
  );
};
