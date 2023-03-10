"use client";

import { Icon } from "@iconify/react";
import { observer } from "mobx-react-lite";

import { useFiltersStore } from "../../store/filtersStore/filtersStore";
import { useSavedSearchesStore } from "../../store/savedSearchesStore/savedSearchesStore";

import { ICurrentFilters } from "../../types/types";

const AppliedFilters: React.FC = () => {
    const { filters, deleteRequiredFilter, deleteAllFilters } =
        useFiltersStore();

    console.log(filters);

    const { sort, type, ...filtersWithoutSortandType } = filters;

    const { addSearch } = useSavedSearchesStore();

    const onDelete = (deletedItem: keyof ICurrentFilters) => {
        deleteRequiredFilter(deletedItem);
    };

    let isAnyAppliedFilters = !Object.values(filtersWithoutSortandType).every(
        (item) => item === ""
    );

    return (
        <div className=" max-w-[750px] px-3">
            <h4 className=" mb-3 text-sm">Filters Applied</h4>
            <div className=" flex justify-start gap-2 flex-wrap">
                {Object.entries(filtersWithoutSortandType).map(
                    ([key, value]) => {
                        if (value === "") {
                            return;
                        } else {
                            return (
                                <div
                                    key={value}
                                    className=" min-w-[80px] h-[25px] px-2 bg-red-300 rounded-lg flex justify-between items-center"
                                >
                                    <div className=" w-full text-white text-center">
                                        {value.charAt(0).toUpperCase() +
                                            value.slice(1)}
                                    </div>
                                    <button
                                        onClick={() =>
                                            onDelete(
                                                key as keyof ICurrentFilters
                                            )
                                        }
                                        className=" ml-1 w-[15px] "
                                    >
                                        <Icon
                                            icon="basil:cross-outline"
                                            color="white"
                                            width={25}
                                            height={25}
                                        />
                                    </button>
                                </div>
                            );
                        }
                    }
                )}

                <button
                    onClick={deleteAllFilters}
                    className={`${
                        isAnyAppliedFilters ? "text-red-300" : "text-red-200"
                    }`}
                    disabled={!isAnyAppliedFilters}
                >
                    Clear all
                </button>

                <button
                    className={`${
                        isAnyAppliedFilters || "hidden"
                    } min-h-[25px] rounded-4xl bg-red-300 px-2 text-center text-white`}
                    onClick={() => addSearch(filters)}
                >
                    Save this search
                </button>
            </div>
        </div>
    );
};

export default observer(AppliedFilters);
