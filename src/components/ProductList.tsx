'use client';

import React from 'react';
import { ProductCard } from './ProductCard';
import { useFilters } from '@/providers/FilterProvider';
import { ProductListItem } from '@/api/types';

interface Props {
	products: ProductListItem[];
}

export const ProductList: React.FC<Props> = ({ products }) => {
	const {
		filter: { filteredField, filteredFieldDirection, isNewOnly },
	} = useFilters();
	const hasProducts = products.length > 0;
	const sortedProducts = products.sort((a, b) => {
		switch (filteredField) {
			case 'name':
				if (filteredFieldDirection === 'asc') {
					return a.name.localeCompare(b.name);
				} else {
					return b.name.localeCompare(a.name);
				}
			case 'price':
				if (filteredFieldDirection === 'asc') {
					return a.price - b.price;
				} else {
					return b.price - a.price;
				}
		}
	});
	const filteredProducts = isNewOnly ? sortedProducts.filter(({ isNew }) => Boolean(isNew)) : sortedProducts;

	return hasProducts ? (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
			{filteredProducts.map((product) => (
				<ProductCard key={product.id} {...product} />
			))}
		</div>
	) : (
		<p className='text-center text-lg font-medium'>No products found</p>
	);
};
