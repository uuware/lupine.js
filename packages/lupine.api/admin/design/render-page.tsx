import { CssProps, getRenderPageProps, getSiteLangs, HtmlLoad, PageProps, WebConfig } from 'lupine.components';
import { RenderBlocks } from './render-blocks';
import { DesignNode } from './design-store';
import { ComponentRegistry } from './component-registry';
import { cmsGetRegisteredPage } from './register-page';

const getBrowserLang = () => {
  if (typeof navigator === 'undefined') {
    return '';
  }
  return (navigator.language || navigator.languages?.[0] || '').slice(0, 2).toLowerCase();
};

const getCmsPageIds = async (url: string) => {
  const urlParts = url.split('/').filter((p) => !!p);
  const siteLangs = await getSiteLangs();
  const langCodes = siteLangs.map((lang) => lang.code).filter(Boolean);
  const defaultLang = langCodes[0] || 'en';
  const firstPart = urlParts[0] || '';
  const hasLangPrefix = langCodes.includes(firstPart);
  const browserLang = getBrowserLang();
  const langId = hasLangPrefix ? firstPart : (langCodes.includes(browserLang) ? browserLang : defaultLang);
  const frameId = (hasLangPrefix ? urlParts[1] : urlParts[0]) || await WebConfig.get('cmsPageDefault', '');
  const contentId = (hasLangPrefix ? urlParts[2] : urlParts[1]) || await WebConfig.get('cmsContentDefault', '');
  return {
    langId,
    frameId,
    contentId,
  };
};

const resolveCmsLang = async (propsLang: string | undefined, url: string) => {
  const siteLangs = await getSiteLangs();
  const langCodes = siteLangs.map((lang) => lang.code).filter(Boolean);
  const defaultLang = langCodes[0] || 'en';
  const normalizedPropsLang = (propsLang || '').trim().toLowerCase();
  if (normalizedPropsLang && langCodes.includes(normalizedPropsLang)) {
    return normalizedPropsLang;
  }

  const urlParts = url.split('/').filter((p) => !!p);
  const urlLang = urlParts[0] || '';
  if (urlLang && langCodes.includes(urlLang)) {
    return urlLang;
  }

  const browserLang = getBrowserLang();
  return langCodes.includes(browserLang) ? browserLang : defaultLang;
};

const getErrorNode = (id: string): DesignNode => ({
    id: `error-${id}`,
    type: 'block-flex',
    props: {
      flex: '1',
      padding: '64px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    children: [
      {
        id: `error-text-${id}`,
        type: 'block-title',
        props: {
          text: 'Page not found or access denied',
          level: 'h3',
          textAlign: 'center',
          color: '#999',
        },
      },
    ],
});

const fetchCmsPageTree = async (props: PageProps, pageId: string, langId: string, errorId: string) => {
  let pageTree: DesignNode | null = null;
  try {
    const res = await props.renderPageFunctions.fetchData(`/api/page/${pageId}`, { lang: langId });
    if (res && res.json && res.json.status === 'ok' && res.json.result) {
      try {
        pageTree = typeof res.json.result.json === 'string' ? JSON.parse(res.json.result.json) : res.json.result.json;
      } catch (e) {}
    }
  } catch (e) {
    console.error(e);
  }
  return pageTree || getErrorNode(errorId);
};

const resolveCmsContent = async (props: PageProps) => {
  const { langId, contentId } = await getCmsPageIds(props.url);
  if (!contentId) {
    return { contentPage: null, contentTree: null };
  }

  const registeredContentPage = cmsGetRegisteredPage(contentId);
  if (registeredContentPage) {
    return { contentPage: await registeredContentPage(props), contentTree: null };
  }

  return { contentPage: null, contentTree: await fetchCmsPageTree(props, contentId, langId, 'content') };
};

// used in code
export const CmsEmbedContent = async (props: {id: string, lang?: string}) => {
  const renderProps = getRenderPageProps();
  const pageId = (props.id || '').trim();
  if (!pageId) {
    return null;
  }

  const langId = await resolveCmsLang(props.lang, renderProps.url || '');
  const pageTree = await fetchCmsPageTree(renderProps, pageId, langId, pageId);
  if (pageTree?.props) {
    pageTree.props.isRoot = false;
  }
  return <RenderBlocks node={pageTree} />;
};

export const CmsRenderContent = async (props: Partial<PageProps> = {}) => {
  const renderProps = props.url ? (props as PageProps) : getRenderPageProps();
  const { contentPage, contentTree } = await resolveCmsContent(renderProps);
  return contentPage || (contentTree ? <RenderBlocks node={contentTree} /> : null);
};

export const CmsRenderPage = async (props: PageProps) => {
  if (await WebConfig.get('cmsMaintenanceMode', '') === '1') {
    return (
      <div class='lupine-cms-maintenance-page' style={{ padding: '64px', fontFamily: 'sans-serif' }}>
        <HtmlLoad html={async () => (await WebConfig.get('cmsMaintenanceMsg', '') || 'Maintenance Mode') as any} />
      </div>
    );
  }

  const { langId, frameId, contentId } = await getCmsPageIds(props.url);

  const registeredFramePage = cmsGetRegisteredPage(frameId);
  if (registeredFramePage) {
    return registeredFramePage(props);
  }

  let frameTree: DesignNode | null = null;
  if (frameId) {
    frameTree = await fetchCmsPageTree(props, frameId, langId, 'frame');
  }

  const { contentPage, contentTree } = await resolveCmsContent(props);

  const swapPlaceholder = (node: DesignNode) => {
    if (node.type === 'block-placeholder') {
      if (contentPage) {
        const defaultProps = ComponentRegistry['block-placeholder']?.defaultProps || {};
        const rawProps = node.props || {};
        const originalProps = { ...defaultProps, ...rawProps };
        const originalSysCss = rawProps._sys_css || {};

        Object.assign(node, {
          id: `registered-content-${contentId || node.id}`,
          type: 'block-rendered-page-content',
          props: {
            ...originalProps,
            _sys_css: Object.keys(originalSysCss).length > 0 ? originalSysCss : undefined,
            page: contentPage,
          },
        });
      } else if (contentTree) {
        const defaultProps = ComponentRegistry['block-placeholder']?.defaultProps || {};
        const rawProps = node.props || {};
        const originalProps = { ...defaultProps, ...rawProps };
        const originalSysCss = rawProps._sys_css || {};
        const contentSysCss = contentTree.props?._sys_css || {};

        Object.assign(node, contentTree); // Swap the raw placeholder node with the true sub-page tree natively!
        node.props = {
          ...contentTree.props,
          ...originalProps,
          _sys_css:
            Object.keys(originalSysCss).length > 0 || Object.keys(contentSysCss).length > 0
              ? { ...contentSysCss, ...originalSysCss }
              : undefined,
          customCss: [contentTree.props?.customCss, originalProps.customCss].filter(Boolean).join('; '),
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
    height: '100vh',
    minHeight: '100vh',
    overflowY: 'visible',
  };

  return (
    <div css={css} class='lupine-rendered-page'>
      {frameTree ? (
        <RenderBlocks node={frameTree} />
      ) : (
        <div style={{ padding: '64px', textAlign: 'center', fontFamily: 'sans-serif', color: '#999' }}>
          Page Not Found
        </div>
      )}
    </div>
  );
};
