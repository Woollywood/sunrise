'use client';

import React from 'react';
import { ProductListItem } from '@/api/types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import { CardMedia, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useCartContext } from '@/providers/CartProvider';
import Link from 'next/link';

export const ProductCard: React.FC<ProductListItem> = (product) => {
	const { name, isNew, price } = product;

	const { products, addToCart, removeFromCart } = useCartContext();
	const inCart = products.some(({ id }) => product.id === id);

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
						R
					</Avatar>
				}
				action={isNew && <Typography className='pr-2'>New!</Typography>}
				title={name}
				subheader='September 14, 2016'
			/>
			<Link href={`/${product.id}`}>
				<CardMedia component='img' height='194' image='/product.jpg' alt={name} />
			</Link>
			<Typography padding={2}>{price} $</Typography>
			<CardActions disableSpacing>
				{inCart ? (
					<IconButton aria-label='add to favorites' onClick={() => removeFromCart(product)}>
						<RemoveShoppingCartIcon />
					</IconButton>
				) : (
					<IconButton aria-label='add to favorites' onClick={() => addToCart(product)}>
						<AddShoppingCartIcon />
					</IconButton>
				)}
			</CardActions>
		</Card>
	);
};
