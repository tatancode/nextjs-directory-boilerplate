"use client";

import { Input } from '../ui/input';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  return (
    <Input
      type="search"
      placeholder="Search content..."
      onChange={(e) => onSearch(e.target.value)}
      className="max-w-md mx-auto"
    />
  );
}