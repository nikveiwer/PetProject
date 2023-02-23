"use client";

import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { useFiltersStore } from "../../store/filtersStore/filtersStore";

const SortBy: React.FC = () => {
    // const [value, setValue] = useState("US");

    // const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    //     setValue(e.target.value);
    // };

    const {
        filters: { sort },
        setRequiredFilter,
    } = useFiltersStore();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setRequiredFilter("sort", e.target.value);
    };

    return (
        <div className=" max-w-[250px] ml-2">
            <label
                htmlFor="sortBy"
                className="block mb-2 text-sm text-gray-900"
            >
                Sort By:
            </label>
            <select
                id="sortBy"
                value={sort}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5 "
            >
                <option value="recent">Newest addition</option>
                <option value="-recent">Oldest addition</option>
                <option value="random">Randomize</option>
            </select>
        </div>
    );
};

export default observer(SortBy);
