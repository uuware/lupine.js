import html0 from './index.html';
import html1 from './en/essentials/index.html';
import html2 from './en/essentials/list.html';
import html3 from './en/guide/install.html';
import html4 from './en/guide/started.html';
import html5 from './en/index.html';
import html6 from './zh/essentials/index.html';
import html7 from './zh/essentials/list.html';
import html8 from './zh/guide/install.html';
import html9 from './zh/guide/started.html';
import html10 from './zh/index.html';

export const markdownConfig: Record<string, { html: string; data: any; headings: any[] }> = {
  '/': { html: html0, data: {"lang":[{"title":"English","id":"en"},{"title":"简体中文","id":"zh"}]}, headings: [] },
  '/en/essentials/index': { html: html1, data: {"title":"Core Essentials","sidebar":[{"type":"link","text":"Essentials List","link":"/en/essentials/list","level":0}]}, headings: [] },
  '/en/essentials/list': { html: html2, data: {"title":"Essentials List"}, headings: [{"level":2,"text":"Feature Overview","id":"feature-overview"}] },
  '/en/guide/install': { html: html3, data: {"title":"Installation"}, headings: [{"level":2,"text":"Basic Install","id":"basic-install"}] },
  '/en/guide/started': { html: html4, data: {"title":"Getting Started"}, headings: [{"level":2,"text":"Quick Start","id":"quick-start"}] },
  '/en/index': { html: html5, data: {"layout":"home","title":"Doc Starter","sidemenu-width":"260px","github-title":"View on GitHub","github-link":"https://github.com/uuware/lupine.js","lang":{"title":"English","id":"en"},"hero":{"name":"Doc Starter","text":"A Demo Documentation Project","tagline":"This is a demo to show how to build documentation.","actions":[{"theme":"brand","text":"Get Started","link":"/en/guide/started"},{"theme":"alt","text":"View on GitHub","link":"https://github.com/uuware/lupine.js"}]},"nav":[{"text":"Guide","link":"/en/guide/started"},{"text":"API","link":"/en/essentials/list"}],"sidebar":[{"type":"group","text":"Guide","level":0},{"type":"link","text":"Getting Started","link":"/en/guide/started","level":1},{"type":"link","text":"Installation","link":"/en/guide/install","level":1},{"type":"group","text":"Core Essentials","level":0},{"type":"link","text":"Essentials List","link":"/en/essentials/list","level":1}],"features":[{"title":"Demo Feature 1","details":"This is a demo feature description."},{"title":"Demo Feature 2","details":"This is another demo feature description."}]}, headings: [] },
  '/zh/essentials/index': { html: html6, data: {"sidebar":[{"type":"group","text":"核心要点","level":0},{"type":"link","text":"核心要点列表","link":"/zh/essentials/list","level":1}]}, headings: [] },
  '/zh/essentials/list': { html: html7, data: {"title":"核心要点列表"}, headings: [{"level":2,"text":"核心要点概述","id":"核心要点概述"}] },
  '/zh/guide/install': { html: html8, data: {"title":"安装"}, headings: [{"level":2,"text":"基本安装","id":"基本安装"}] },
  '/zh/guide/started': { html: html9, data: {"title":"快速开始"}, headings: [{"level":2,"text":"快速开始","id":"快速开始"}] },
  '/zh/index': { html: html10, data: {"layout":"home","title":"文档演示","sidemenu-width":"260px","github-title":"GitHub 仓库","github-link":"https://github.com/uuware/lupine.js","lang":{"title":"简体中文","id":"zh"},"hero":{"name":"文档演示","text":"一个演示用的文档项目","tagline":"这是一个用来展示如何构建文档的演示项目。","actions":[{"theme":"brand","text":"快速开始","link":"/zh/guide/started"},{"theme":"alt","text":"GitHub 仓库","link":"https://github.com/uuware/lupine.js"}]},"nav":[{"text":"指南","link":"/zh/guide/started"},{"text":"API","link":"/zh/essentials/list"}],"sidebar":[{"type":"group","text":"指南","level":0},{"type":"link","text":"快速开始","link":"/zh/guide/started","level":1},{"type":"link","text":"安装","link":"/zh/guide/install","level":1},{"type":"group","text":"核心要点","level":0},{"type":"link","text":"核心要点列表","link":"/zh/essentials/list","level":1}],"features":[{"title":"演示特性 1","details":"这是一个演示特性的描述。"},{"title":"演示特性 2","details":"这是另一个演示特性的描述。"}]}, headings: [] },
};
