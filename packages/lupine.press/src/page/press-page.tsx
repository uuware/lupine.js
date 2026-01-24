import { isFrontEnd, PageProps } from 'lupine.components';
import { PressLayout } from '../components';
import { getPressData } from '../services/cache';

export const PressPage = (props: PageProps) => {
  if (!isFrontEnd()) {
    return <div></div>;
  }

  const markdownConfig = getPressData();
  // Derive language from URL path first
  const pathParts = window.location.pathname.split('/');
  const pathLang = pathParts[1]; // /en/... or /zh/...

  // Get supported langs from global config
  const globalConfig = markdownConfig['/']?.data || {};
  const supportedLangs = Array.isArray(globalConfig.lang) ? globalConfig.lang.map((l: any) => l.id) : ['en', 'zh'];

  const langName = supportedLangs.includes(pathLang) ? pathLang : supportedLangs[0] || 'en';

  // Sync global state with URL language
  import('lupine.components').then((m) => {
    if (m.getCurrentLang().langName !== langName) {
      m.updateLang(langName);
    }
  });

  // Get current path from router props or window.location
  let currentPath = window.location.pathname;
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
  const siteTitle = rootIndex.title || 'LupineJS';

  // Collect langs from all supported language root index files
  const langs = supportedLangs.map((l: string) => {
    const data = markdownConfig[`/${l}/index`]?.data || {};
    const langData = Array.isArray(data.lang) ? data.lang[0] : data.lang || {};
    return {
      text: langData.text || langData.title || langData.label || l.toUpperCase(),
      id: l,
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
