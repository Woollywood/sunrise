'use client';

import React from 'react';
import { ProductListItem } from '@/api/types';

interface CartItem extends ProductListItem {
	quantity: number;
}

interface IContext {
	products: CartItem[];
	addToCart: (product: ProductListItem) => void;
	removeFromCart: (product: ProductListItem) => void;
	increment: (product: ProductListItem) => void;
	decrement: (product: ProductListItem) => void;
}

const CartContext = React.createContext<IContext>([] as unknown as IContext);

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [products, setProducts] = React.useState<CartItem[]>([]);

	const addToCart = React.useCallback((product: ProductListItem) => {
		setProducts((prev) => [...prev, { ...product, quantity: 1 }]);
	}, []);

	const removeFromCart = React.useCallback((product: ProductListItem) => {
		setProducts((prev) => prev.filter((item) => item.id !== product.id));
	}, []);

	const increment = React.useCallback((product: ProductListItem) => {
		setProducts((prev) =>
			prev.map((item) => (item.id !== product.id ? item : { ...item, quantity: item.quantity + 1 }))
		);
	}, []);

	const decrement = React.useCallback(
		(product: ProductListItem) => {
			const item = products.find(({ id }) => id === product.id);
			if (item?.quantity === 1) {
				setProducts((prev) => prev.filter(({ id }) => id !== product.id));
			} else {
				setProducts((prev) =>
					prev.map((item) => (item.id !== product.id ? item : { ...item, quantity: item.quantity - 1 }))
				);
			}
		},
		[products]
	);

	return (
		<CartContext.Provider value={{ products, addToCart, removeFromCart, increment, decrement }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = () => {
	return React.useContext(CartContext);
};
