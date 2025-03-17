'use server';

import { ProductDetail, ProductListItem } from './types';

export const getProducts = async (): Promise<ProductListItem[]> => {
	const { products } = await import('@/data/products.json');
	return products;
};

export const getProductById = async (id: string): Promise<ProductDetail | undefined> => {
	const data = await import('@/data/products.json');
	// @ts-expect-error json types
	return data[id];
};
