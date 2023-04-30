'use client';

import { observer } from 'mobx-react-lite';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useFiltersStore } from '../../store/filtersStore/filtersStore';

const SearchByName: React.FC = () => {
    const [value, setValue] = useState('');

    const {
        filters: { sort },
        setRequiredFilter,
    } = useFiltersStore();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setRequiredFilter('name', value);
    };

    return (
        <div className=" mt-5 min-w-[250px] ml-2">
            <span className="block mb-[2px] text-lg uppercase text-center text-gray-700">Name</span>
            <form onSubmit={handleSubmit} className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                    Search
                </label>
                <div className="relative w-full">
                    <input
                        value={value}
                        onChange={handleChange}
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-300 focus:outline-none hover:border-red-300 transition-all block w-full pl-2 p-2.5"
                        placeholder="Search"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="p-2.5 ml-2 text-sm font-medium text-white bg-red-300 rounded-lg border border-red-300 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 transition-all">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </form>
        </div>
    );
};

export default observer(SearchByName);
