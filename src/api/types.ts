export interface ProductListItem {
	id: number;
	name: string;
	price: number;
	brand: string;
	isNew?: boolean;
}

export interface ProductDetail extends ProductListItem {
	description: string;
}
