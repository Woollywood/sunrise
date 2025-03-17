'use client';

import React from 'react';
import { ProductListItem } from '@/api/types';
import { ExtractUnion } from '@/utils/types';

interface IFilters {
	filteredField: ExtractUnion<keyof ProductListItem, 'name' | 'price'>;
	filteredFieldDirection: 'asc' | 'desc';
	isNewOnly: boolean;
}
interface IFilterContext {
	filter: IFilters;
	setFilteredField: (field: IFilters['filteredField']) => void;
	toggleFilterDirection: () => void;
	toggleIsNewOnly: () => void;
}
const FilterContext = React.createContext({} as IFilterContext);

export const FilterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [filter, setFilter] = React.useState<IFilters>({
		filteredField: 'name',
		filteredFieldDirection: 'asc',
		isNewOnly: false,
	});

	const setFilterDirection = (direction: IFilters['filteredFieldDirection']) => {
		setFilter((prev) => ({ ...prev, filteredFieldDirection: direction }));
	};

	const setFilteredField = React.useCallback((field: IFilters['filteredField']) => {
		setFilterDirection('asc');
		setFilter((prev) => ({ ...prev, filteredField: field }));
	}, []);

	const toggleFilterDirection = () => {
		setFilterDirection(filter.filteredFieldDirection === 'asc' ? 'desc' : 'asc');
	};

	const toggleIsNewOnly = React.useCallback(() => {
		setFilter((prev) => ({ ...prev, isNewOnly: !prev.isNewOnly }));
	}, []);

	return (
		<FilterContext.Provider value={{ filter, setFilteredField, toggleFilterDirection, toggleIsNewOnly }}>
			{children}
		</FilterContext.Provider>
	);
};

export const useFilters = () => {
	return React.useContext(FilterContext);
};
