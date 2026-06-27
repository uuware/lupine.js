import { PopupMenuWithButton, PopupMenuWithLabel, getSiteLangs, WebConfig } from 'lupine.components';
import { callUnload, CssProps, refreshPaeg } from 'lupine.web';
import { DesignNode, getDesignStore } from './design-store';

const getCmsPageParts = async (url: string, langCodes: string[]) => {
  const urlParts = url.split('/').filter((p) => !!p);
  const defaultLang = langCodes[0] || 'en';
  const firstPart = urlParts[0] || '';
  const hasLangPrefix = langCodes.includes(firstPart);
  const frameId = (hasLangPrefix ? urlParts[1] : urlParts[0]) || await WebConfig.get('cmsPageDefault', '');
  const contentId = (hasLangPrefix ? urlParts[2] : urlParts[1]) || await WebConfig.get('cmsContentDefault', '');

  return {
    langId: hasLangPrefix ? firstPart : defaultLang,
    frameId,
    contentId,
  };
};

export const BlockLang = async (props: { node: DesignNode }) => {
  const store = getDesignStore();
  const isPreview = store ? store.isPreviewMode : true;
  const p = props.node.props || {};
  const type = p.type === 'label' ? 'label' : 'button';
  const siteLangs = await getSiteLangs();
  const langCodes = siteLangs.map((lang) => lang.code).filter(Boolean);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const currentParts = await getCmsPageParts(currentPath, langCodes);
  const popupList = siteLangs.map((lang) => ({
    id: lang.code,
    text: lang.text || lang.code,
    url: lang.code,
  }));

  const css: CssProps = {
    margin: p.margin || '0',
    padding: p.padding || '0',
    minWidth: '0',
    flex: p.flex === '1' ? '1 1 0' : '0 0 auto',
    width: p.width || (p.flex === '1' ? '100%' : 'auto'),
    boxSizing: 'border-box',
    textAlign: p.textAlign || 'left',
    ...(p._sys_css || {}),
    '.block-lang-control': {
      display: 'inline-block',
      pointerEvents: isPreview ? 'auto' : 'none',
    },
  };

  const handleSelected = async (langId: string, item: any) => {
    if (!isPreview) return;
    const selectedLang = String(item?.id || item?.url || langId || '').trim();
    if (!selectedLang || typeof window === 'undefined') return;

    const parts = await getCmsPageParts(window.location.pathname, langCodes);
    const nextParts = [selectedLang, parts.frameId, parts.contentId].filter(Boolean);
    const nextUrl = `/${nextParts.join('/')}${window.location.search || ''}${window.location.hash || ''}`;
    await refreshPaeg(nextUrl);
  };

  const commonProps = {
    label: p.label || 'Language',
    list: popupList,
    defaultValue: p.defaultValue || currentParts.langId,
    tips: p.tips || '',
    noUpdateLabel: p.noUpdateLabel === true || p.noUpdateLabel === 'true',
    align: p.align === 'left' ? 'left' as const : 'right' as const,
    handleSelected,
  };

  return (
    <div css={css} class='block-lang' data-design-id={props.node.id}>
      <div class='block-lang-control'>
        {type === 'label' ? (
          <PopupMenuWithLabel {...commonProps} />
        ) : (
          <PopupMenuWithButton {...commonProps} />
        )}
      </div>
    </div>
  );
};
