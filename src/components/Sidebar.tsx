'use client';

import React from 'react';
import { useFilters } from '@/providers/FilterProvider';
import { Button, FormControlLabel, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ProductListItem } from '@/api/types';
import { ExtractUnion } from '@/utils/types';
import Switch from '@mui/material/Switch';

export const Sidebar: React.FC = () => {
	const {
		filter: { filteredField, filteredFieldDirection, isNewOnly },
		toggleFilterDirection,
		setFilteredField,
		toggleIsNewOnly,
	} = useFilters();
	const filteredFields: ExtractUnion<keyof ProductListItem, 'name' | 'price'>[] = ['name', 'price'];

	const onClickFilteredField = (field: ExtractUnion<keyof ProductListItem, 'name' | 'price'>) => {
		if (field === filteredField) {
			toggleFilterDirection();
		} else {
			setFilteredField(field);
		}
	};

	return (
		<aside className='px-6 py-4'>
			<Typography className='!mb-8 text-center'>Filters</Typography>
			<div className='flex flex-col gap-2'>
				{filteredFields.map((field) => (
					<Button
						key={field}
						variant={field === filteredField ? 'contained' : 'text'}
						onClick={() => onClickFilteredField(field)}>
						{field}{' '}
						{field === filteredField &&
							(filteredFieldDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
					</Button>
				))}
			</div>
			<FormControlLabel
				control={<Switch value={isNewOnly} onChange={() => toggleIsNewOnly()} />}
				label='is new only'
			/>
		</aside>
	);
};
