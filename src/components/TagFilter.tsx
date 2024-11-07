"use client";

import { Button } from './ui/button';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

export default function TagFilter({ tags, selectedTags, onChange }: TagFilterProps) {
  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onChange(newTags);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tags.map((tag) => (
        <Button
          key={tag}
          variant={selectedTags.includes(tag) ? "default" : "outline"}
          size="sm"
          onClick={() => toggleTag(tag)}
          className="rounded-full"
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}