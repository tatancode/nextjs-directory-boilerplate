import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ContentItem, ContentMeta } from '@/types/content';

const contentDirectory = path.join(process.cwd(), 'src/content');

export function getAllContent(): ContentItem[] {
  const fileNames = fs.readdirSync(contentDirectory);
  const allContent = fileNames.map((fileName) => {
    return getContentBySlug(fileName.replace('.mdx', ''));
  });

  return allContent;
}

export function getContentBySlug(slug: string): ContentItem {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    fileName: `${slug}.mdx`,
    content,
    meta: data as ContentMeta,
  };
}

export function getContentByTag(tag: string): ContentItem[] {
  const allContent = getAllContent();
  return allContent.filter((item) => item.meta.tags?.includes(tag));
}

export function searchContent(query: string): ContentItem[] {
  const allContent = getAllContent();
  const searchTerm = query.toLowerCase();
  
  return allContent.filter((item) => {
    const searchableText = `
      ${item.meta.title}
      ${item.meta.summary}
      ${item.meta.tags?.join(' ')}
    `.toLowerCase();
    
    return searchableText.includes(searchTerm);
  });
}