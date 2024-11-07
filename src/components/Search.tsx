"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Input } from './ui/input';
import { ContentItem } from '@/types/content';
import TagFilter from './TagFilter';
import Pagination from './Pagination';
import { directoryConfig } from '@/config/directory.config';

// Dynamically import the ContentGrid component
const ContentGrid = dynamic(() => import('./layout/ContentGrid'));

export default function Search({ items }: { items: ContentItem[] }) {
  const [searchResults, setSearchResults] = useState(items);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    filterContent(query, selectedTags);
  };

  const handleTagSelect = (tags: string[]) => {
    setSelectedTags(tags);
    filterContent('', tags);
    setCurrentPage(1);
  };

  const filterContent = (query: string, tags: string[]) => {
    const filtered = items.filter((item) => {
      const searchContent = `
        ${item.meta.title}
        ${item.meta.summary}
        ${item.meta.tags?.join(' ')}
      `.toLowerCase();
      
      const matchesSearch = searchContent.includes(query.toLowerCase());
      const matchesTags = tags.length === 0 || 
        tags.every(tag => item.meta.tags?.includes(tag));

      return matchesSearch && matchesTags;
    });
    setSearchResults(filtered);
  };

  // Pagination logic
  const itemsPerPage = directoryConfig.itemsPerPage || 9;
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get all unique tags
  const allTags = Array.from(new Set(
    items.flatMap(item => item.meta.tags || [])
  ));

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Input
          type="search"
          placeholder="Search content..."
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-md mx-auto"
        />
        <TagFilter 
          tags={allTags}
          selectedTags={selectedTags}
          onChange={handleTagSelect}
        />
      </div>
      <ContentGrid items={paginatedResults} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}