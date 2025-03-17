import { NextPage } from 'next';
import { CardMedia, Typography } from '@mui/material';
import { getProductById } from '@/api/products';
import { notFound } from 'next/navigation';

interface Props {
	params: Promise<{ id: string }>;
}

const Page: NextPage<Props> = async ({ params }) => {
	const { id } = await params;
	const product = await getProductById(id);

	if (!product) {
		notFound();
	}

	const { name, price, description, isNew } = product;
	return (
		<div className='grid grid-cols-2 gap-12'>
			<CardMedia component='img' height='194' image='/product.jpg' alt='product logo' />
			<div>
				<Typography variant='h3'>{name}</Typography>
				<Typography variant='subtitle1'>{description}</Typography>
				<Typography variant='subtitle2'>{price} $</Typography>
				{isNew && <Typography variant='subtitle2'>New</Typography>}
			</div>
		</div>
	);
};

export default Page;
