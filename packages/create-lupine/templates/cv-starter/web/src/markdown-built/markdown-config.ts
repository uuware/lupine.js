import html0 from './index.html';
import html1 from './en/01-experience/index.html';
import html2 from './en/02-projects/index.html';
import html3 from './en/03-skills/index.html';
import html4 from './en/04-education/index.html';
import html5 from './en/index.html';
import html6 from './zh/01-experience/index.html';
import html7 from './zh/02-projects/index.html';
import html8 from './zh/03-skills/index.html';
import html9 from './zh/04-education/index.html';
import html10 from './zh/index.html';

export const markdownConfig: Record<string, { html: string; data: any; headings: any[] }> = {
  '/': { html: html0, data: {"lang":[{"title":"English","id":"en"},{"title":"简体中文","id":"zh"}]}, headings: [] },
  '/en/01-experience/index': { html: html1, data: {"title":"Experience","order":1}, headings: [{"level":2,"text":"Senior Frontend Engineer | ABC Technology Ltd.","id":"senior-frontend-engineer-abc-technology-ltd"},{"level":2,"text":"Full Stack Engineer | XYZ Network Technology Co., Ltd.","id":"full-stack-engineer-xyz-network-technology-co-ltd"},{"level":2,"text":"Frontend Intern | MNO Innovation Studio","id":"frontend-intern-mno-innovation-studio"}] },
  '/en/02-projects/index': { html: html2, data: {"title":"Projects","order":2}, headings: [{"level":2,"text":"Lupine.js (Demo Project)","id":"lupine-js-https-github-com-uuware-lupine-js-demo-project"},{"level":2,"text":"Personal Blog System","id":"personal-blog-system"},{"level":2,"text":"Real-time Collaborative Document Platform","id":"real-time-collaborative-document-platform"}] },
  '/en/03-skills/index': { html: html3, data: {"title":"Skills","order":3}, headings: [{"level":2,"text":"Frontend Core","id":"frontend-core"},{"level":2,"text":"Backend & Database","id":"backend-database"},{"level":2,"text":"Engineering & Tools","id":"engineering-tools"},{"level":2,"text":"Others","id":"others"}] },
  '/en/04-education/index': { html: html4, data: {"title":"Education","order":4}, headings: [{"level":2,"text":"Shanghai Jiao Tong University (Example)","id":"shanghai-jiao-tong-university-example"}] },
  '/en/index': { html: html5, data: {"title":"Resume","order":0,"github-title":"View on GitHub","github-link":"https://github.com/uuware/lupine.js","sidebar":[{"type":"group","text":"Details","level":0},{"type":"link","text":"Experience","link":"/en/01-experience/index","level":1},{"type":"link","text":"Projects","link":"/en/02-projects/index","level":1},{"type":"link","text":"Skills","link":"/en/03-skills/index","level":1},{"type":"link","text":"Education","link":"/en/04-education/index","level":1}]}, headings: [{"level":2,"text":"Profile","id":"profile"},{"level":2,"text":"Career Objective","id":"career-objective"}] },
  '/zh/01-experience/index': { html: html6, data: {"title":"工作经历","order":1}, headings: [{"level":2,"text":"高级前端工程师 | ABC 科技有限公司","id":"高级前端工程师-abc-科技有限公司"},{"level":2,"text":"全栈工程师 | XYZ 网络技术有限公司","id":"全栈工程师-xyz-网络技术有限公司"},{"level":2,"text":"前端实习生 | MNO 创新工作室","id":"前端实习生-mno-创新工作室"}] },
  '/zh/02-projects/index': { html: html7, data: {"title":"项目经验","order":2}, headings: [{"level":2,"text":"Lupine.js (示例项目)","id":"lupine-js-https-github-com-uuware-lupine-js-示例项目"},{"level":2,"text":"个人博客系统","id":"个人博客系统"},{"level":2,"text":"实时协作文档平台","id":"实时协作文档平台"}] },
  '/zh/03-skills/index': { html: html8, data: {"title":"专业技能","order":3}, headings: [{"level":2,"text":"前端核心","id":"前端核心"},{"level":2,"text":"后端与数据库","id":"后端与数据库"},{"level":2,"text":"工程化与工具","id":"工程化与工具"},{"level":2,"text":"其他","id":"其他"}] },
  '/zh/04-education/index': { html: html9, data: {"title":"教育背景","order":4}, headings: [{"level":2,"text":"上海交通大学 (示例)","id":"上海交通大学-示例"}] },
  '/zh/index': { html: html10, data: {"title":"工作简历","order":0,"github-title":"View on GitHub","github-link":"https://github.com/uuware/lupine.js","sidebar":[{"type":"group","text":"详细介绍","level":0},{"type":"link","text":"工作经历","link":"/zh/01-experience/index","level":1},{"type":"link","text":"项目经验","link":"/zh/02-projects/index","level":1},{"type":"link","text":"专业技能","link":"/zh/03-skills/index","level":1},{"type":"link","text":"教育背景","link":"/zh/04-education/index","level":1}]}, headings: [{"level":2,"text":"个人简介","id":"个人简介"},{"level":2,"text":"求职意向","id":"求职意向"}] },
};
