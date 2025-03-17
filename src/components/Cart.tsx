'use client';

import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useCartContext } from '@/providers/CartProvider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const Cart: React.FC = () => {
	const { products, increment, decrement } = useCartContext();
	const hasProducts = products.length > 0;

	const total = products.reduce((acc, product) => (acc += product.quantity * product.price), 0).toFixed(2);

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div>
			<IconButton aria-describedby={id} aria-label='settings' onClick={handleClick}>
				<ShoppingCartIcon color={'secondary'} className='!size-10' />
			</IconButton>

			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}>
				{hasProducts ? (
					<div className='py-2 space-y-4'>
						{products.map((product) => (
							<div key={product.id}>
								<Typography sx={{ px: 2 }}>{product.name}</Typography>
								<Typography sx={{ px: 2 }}>{product.price} $</Typography>
								<div className='flex items-center gap-2 px-2'>
									<IconButton size='small' onClick={() => increment(product)}>
										<AddIcon />
									</IconButton>
									<IconButton size='small' onClick={() => decrement(product)}>
										<RemoveIcon />
									</IconButton>
									<Typography>{product.quantity}</Typography>
								</div>
							</div>
						))}
						<Typography sx={{ p: 2 }}>Total: {total} $</Typography>
					</div>
				) : (
					<Typography sx={{ p: 2 }}>Cart empty</Typography>
				)}
			</Popover>
		</div>
	);
};
