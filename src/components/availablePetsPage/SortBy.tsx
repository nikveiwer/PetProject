'use client';

import { ChangeEvent, useState } from 'react';

const SortBy: React.FC = () => {
    const [value, setValue] = useState('US');

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className=" max-w-[250px] ml-2">
            <label htmlFor="sortBy" className="block mb-2 text-sm text-gray-900">
                Sort By:
            </label>
            <select
                id="sortBy"
                value={value}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5 ">
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
                <option value="BE">okfdkbkfdklbmfd</option>
            </select>
        </div>
    );
};

export default SortBy;
