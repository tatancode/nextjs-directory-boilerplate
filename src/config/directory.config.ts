import { DirectoryConfig } from '@/types/content';

export const directoryConfig: DirectoryConfig = {
	name: 'Product Chronicles',
	description: 'Historical record of product decisions',
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
