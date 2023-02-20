"use client";

import { useState, ChangeEvent, use } from "react";

import { observer } from "mobx-react-lite";

import { useFiltersStore } from "../../store/filtersStore/filtersStore";

import { IFilters } from "../../types/types";

type Props = {
    filTitle: keyof IFilters;
    filArray: string[];
};

const FilterItem: React.FC<Props> = ({ filTitle, filArray }) => {
    const [value, setValue] = useState("any");
    const { setRequiredFilter } = useFiltersStore();

    const filtersStore = useFiltersStore();

    console.log(filtersStore);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);

        setRequiredFilter(filTitle, e.target.value);
    };

    return (
        <div className="w-[250px] ml-2">
            <label
                htmlFor="sortBy"
                className="block mb-[2px] text-lg uppercase text-center text-gray-700"
            >
                {filTitle}
            </label>
            <select
                id="sortBy"
                value={value}
                onChange={handleChange}
                className=" mb-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5 "
            >
                <option value="any">Any</option>
                {filArray.map((item) => {
                    return (
                        <option key={item} value={item}>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default FilterItem;
