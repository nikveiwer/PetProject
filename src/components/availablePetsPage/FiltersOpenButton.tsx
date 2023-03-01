"use client";

import { useFiltersStore } from "../../store/filtersStore/filtersStore";

import { Icon } from "@iconify/react";

const FiltersOpenButton: React.FC = () => {
    const { changeSwitcher } = useFiltersStore();

    return (
        <>
            <button
                type="button"
                className=" lg:hidden w-[200px] text-red-300 border-gray-300 border-[1px] focus:ring-red-300 focus:border-red-300 focus:outline-none hover:border-red-300 transition-all font-medium rounded-lg uppercase px-5 py-2.5 text-center flex justify-center items-center gap-2"
                onClick={changeSwitcher}
            >
                <Icon
                    icon="material-symbols:format-list-bulleted-rounded"
                    color="#fda4af"
                    width="22"
                    height="22"
                />
                <span className="block">Filters</span>
            </button>
        </>
    );
};

export default FiltersOpenButton;
