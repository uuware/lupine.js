import { marked } from 'marked';
import matter from 'gray-matter';

export interface MarkdownResult {
  content: string;
  data: { [key: string]: any };
  html: string;
}

export const parseMarkdown = (mdContent: string): MarkdownResult => {
  const { data, content } = matter(mdContent);
  const html = marked.parse(content) as string;
  return {
    content,
    data,
    html,
  };
};
