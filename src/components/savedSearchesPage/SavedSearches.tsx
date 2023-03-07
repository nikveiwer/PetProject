"use client";

import { observer } from "mobx-react-lite";

import { Icon } from "@iconify/react";

import { useSavedSearchesStore } from "../../store/savedSearchesStore/savedSearchesStore";

import { ICurrentFilters } from "../../types/types";
import Link from "next/link";

const SavedSearches: React.FC = () => {
    const { savedSearches, deleteSearch } = useSavedSearchesStore();

    return (
        <>
            <ul className="mt-5 flex flex-col justify-start gap-3">
                {savedSearches.map((item, i) => {
                    return (
                        <li
                            key={i}
                            className="min-h-[150px] px-3 py-5 flex justify-start overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 sm:rounded-lg"
                        >
                            <div className="w-[70%] border-r-[1px] pr-3  border-gray-700 flex flex-wrap justify-center items-center gap-3">
                                {Object.values(item).map((value) => {
                                    if (value === "") {
                                        return;
                                    } else {
                                        return (
                                            <div
                                                key={value}
                                                className=" min-w-[80px] h-[55px] px-2 bg-red-300 rounded-lg flex justify-between items-center"
                                            >
                                                <div className=" w-full text-white text-lg text-center">
                                                    {value
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        value.slice(1)}
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                            <div className="w-[20%] border-r-[1px] border-gray-700 flex flex-col justify-center text-center">
                                <span className="text-lg uppercase text-red-300 cursor-pointer">
                                    <Link href={`availablePets/${item.type}`}>
                                        Launch search
                                    </Link>
                                </span>
                            </div>
                            <div className="w-[8%] ml-[15px] flex flex-col justify-between">
                                <button className=" h-[50%] flex flex-col justify-start ">
                                    <Icon
                                        className="mx-auto my-0 cursor-pointer"
                                        icon="ph:pen-fill"
                                        color="#fda4af"
                                        width="40"
                                        height="40"
                                    />
                                </button>
                                <div className="border-b-[1px] border-gray-700"></div>
                                <button
                                    className=" h-[50%] flex flex-col justify-end   "
                                    onClick={() => deleteSearch(item)}
                                >
                                    <Icon
                                        className="mx-auto my-0 cursor-pointer"
                                        icon="tabler:trash-filled"
                                        color="#fda4af"
                                        width="40"
                                        height="40"
                                    />
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default observer(SavedSearches);
