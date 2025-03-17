import { NextPage } from 'next';
import { ProductList } from '@/components/ProductList';
import { Sidebar } from '@/components/Sidebar';
import { getProducts } from '@/api/products';

const Page: NextPage = async () => {
	const products = await getProducts();

	return (
		<div className='grid grid-cols-[auto_1fr] gap-x-12'>
			<Sidebar />
			<ProductList products={products} />
		</div>
	);
};

export default Page;
