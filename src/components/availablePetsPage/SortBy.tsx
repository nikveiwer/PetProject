'use client';

import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import { useFiltersStore } from '../../store/filtersStore/filtersStore';
import { useLikedStore } from '../../store/likedStore/likedStore';

import { TypeLikedSortOptions } from '../../../app/likedAnimals/page';
import { TypeFiltersSortOptions } from '../../../app/availablePets/[pet]/page';

type Props = {
    target: 'filters' | 'favorites';
    options: TypeFiltersSortOptions | TypeLikedSortOptions;
};

const SortBy: React.FC<Props> = ({ target, options }) => {
    const {
        filters: { sort },
        setRequiredFilter,
    } = useFiltersStore();

    const { sortLiked, changeSortLiked } = useLikedStore();

    const handleFiltersChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setRequiredFilter('sort', e.target.value);
    };

    const handleLikedSortChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
        changeSortLiked(value as TypeLikedSortOptions[number][0]);
    };

    return (
        <div className=" max-w-[250px] ml-2">
            <label htmlFor="sortBy" className="block mb-2 text-sm text-gray-900">
                Sort By:
            </label>
            <select
                id="sortBy"
                value={target === 'filters' ? sort : sortLiked}
                onChange={target === 'filters' ? handleFiltersChange : handleLikedSortChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-300 focus:outline-none hover:border-red-300 transition-all block w-full p-2.5 ">
                {/* <option value="recent">Newest addition</option>
                <option value="-recent">Oldest addition</option>
                <option value="random">Randomize</option> */}
                {options.map(([value, text]) => {
                    return (
                        <option key={value} value={value}>
                            {text}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default observer(SortBy);
