import { bindGlobalStyle, isFrontEnd, PageProps } from 'lupine.components';
import { PressLayout } from '../components';
import { getPressData, getPressSubDir, setPressLangs } from '../services/cache';

export const PressPage = async (props: PageProps) => {
  if (!isFrontEnd()) {
    return <div></div>;
  }

  const subDir = getPressSubDir();
  const markdownConfig = getPressData();
  // Derive language from URL path first
  let p = window.location.pathname;
  if (subDir && p.startsWith(subDir)) {
    p = p.substring(subDir.length);
  }
  const pathParts = p.split('/');
  const pathLang = pathParts[1]; // /en/... or /zh/...

  // Get supported langs from global config
  const globalConfig = markdownConfig['/']?.data || {};
  const langObj = Array.isArray(globalConfig.lang)
    ? globalConfig.lang
    : [
        { title: 'English', id: 'en' },
        { title: 'Chinese', id: 'zh' },
      ];
  setPressLangs(langObj);
  const supportedLangs = langObj.map((l: any) => l.id);

  const langName = supportedLangs.includes(pathLang) ? pathLang : supportedLangs[0] || 'en';

  // Sync global state with URL language
  import('lupine.components').then((m) => {
    if (m.getCurrentLang().langName !== langName) {
      m.updateLang(langName);
    }
  });

  // Get current path from router props or window.location
  let currentPath = p;
  if (currentPath === '' || currentPath === '/') {
    currentPath = `/${langName}/index`;
  } else {
    if (currentPath.endsWith('/') && currentPath.length > 1)
      currentPath = currentPath.substring(0, currentPath.length - 1);
    // If it's just lang root like /en, append /index
    if (currentPath === `/${langName}`) currentPath = `/${langName}/index`;
  }

  const config = markdownConfig[currentPath];
  const content = config ? config.html : `<h1>404 - Page Not Found</h1><p>Path: ${currentPath}</p>`;

  // Get localized configuration from lang index
  const rootIndex = markdownConfig[`/${langName}/index`]?.data || {};
  const rootNav = rootIndex.nav || [];
  const rootSidebar = rootIndex.sidebar || [];
  const siteTitle = rootIndex.title || 'Lupine.js';
  // siteStyles should be {body:{'font-family':'...'}}
  const siteStyles = rootIndex.styles || {};
  bindGlobalStyle('customer-css', siteStyles, false, true);

  // Collect langs from all supported language root index files
  const langs = langObj.map((l: { title: string; id: string }) => {
    const data = markdownConfig[`${l.id}/index`]?.data || {};
    const langData = Array.isArray(data.lang) ? data.lang[0] : data.lang || {};
    return {
      text: langData.text || langData.title || langData.label || l.title,
      id: l.id,
    };
  });

  return (
    <PressLayout
      title={siteTitle}
      nav={rootNav}
      sidebar={rootSidebar}
      lang={langName}
      langs={langs}
      data={config?.data}
      headings={config?.headings}
      sidemenuWidth={rootIndex['sidemenu-width']}
      github={{ url: rootIndex['github-link'], title: rootIndex['github-title'] }}
    >
      {content}
    </PressLayout>
  );
};
