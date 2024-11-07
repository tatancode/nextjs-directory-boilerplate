import { DirectoryConfig } from '@/types/content';

export const directoryConfig: DirectoryConfig = {
  name: 'Directory Boilerplate',
  description: 'A customizable directory/blog template built with Next.js and MDX',
  itemsPerPage: 9,
  features: {
    audio: true,
    images: true,
    tags: true,
    search: true,
    pagination: true,
  },
  theme: {
    fontHeading: 'Cormorant_Garamond',
    fontBody: 'Nunito',
  },
};