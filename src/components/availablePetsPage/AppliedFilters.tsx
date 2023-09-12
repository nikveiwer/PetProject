"use client";

import { Icon } from "@iconify/react";
import { observer } from "mobx-react-lite";

import { useFiltersStore } from "../../store/filtersStore/filtersStore";
import { useSavedSearchesStore } from "../../store/savedSearchesStore/savedSearchesStore";

// import supabase from "../../config/supabaseClient";
import { useSupabase } from "../../config/supabaseClient";

import { ICurrentFilters } from "../../types/types";

import uuid4 from "uuid4";
import { useEffect, useState } from "react";

type StatusType = "idle" | "error" | "loading" | "successful" | "already";
type Props = {
    pet: "cats" | "dogs";
};

const AppliedFilters: React.FC<Props> = ({ pet }) => {
    const [status, setStatus] = useState<StatusType>("idle");

    const { supabase } = useSupabase();

    const { filters, deleteRequiredFilter, deleteAllFilters } =
        useFiltersStore();

    console.log(filters);

    const { sort, type, ...filtersWithoutSortandType } = filters;

    const { addSearch, addedSearch } = useSavedSearchesStore();

    const onDelete = (deletedItem: keyof ICurrentFilters) => {
        deleteRequiredFilter(deletedItem);
    };

    let isAnyAppliedFilters = !Object.values(filtersWithoutSortandType).every(
        (item) => item === ""
    );

    console.log(status);

    let fetchAddedSearch = async () => {
        if (addedSearch) {
            setStatus("loading");

            const {
                type,
                sort,
                breed,
                age,
                size,
                gender,
                good_with,
                coat,
                color,
                name,
            } = addedSearch;

            let isAlreadyExist = await supabase
                .from("savedSearches")
                .select("*")
                .eq("type", type)
                .eq("sort", sort)
                .eq("breed", breed)
                .eq("age", age)
                .eq("size", size)
                .eq("gender", gender)
                .eq("good_with", good_with)
                .eq("coat", coat)
                .eq("color", color)
                .eq("name", name);

            console.log(isAlreadyExist.data);

            if (!isAlreadyExist.error) {
                if (isAlreadyExist.data && isAlreadyExist.data.length) {
                    setStatus("already");
                } else {
                    let { data, error } = await supabase
                        .from("savedSearches")
                        .insert([addedSearch]);

                    if (!error) {
                        5;
                        setStatus("successful");
                    } else {
                        setStatus("error");
                    }
                }
            } else {
                setStatus("error");
            }
        }
    };

    useEffect(() => {
        fetchAddedSearch();

        return () => {
            addSearch(null);
        };
    }, [addedSearch]);

    useEffect(() => {
        setStatus("idle");
    }, [filters]);

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

                {status === "idle" && (
                    <button
                        className={`${
                            isAnyAppliedFilters || "hidden"
                        } min-h-[25px] rounded-4xl bg-red-300 px-2 text-center text-white`}
                        onClick={() =>
                            addSearch({
                                id: uuid4(),
                                ...filters,
                                type: pet,
                                user_id: "e5b9d961-27ec-48df-a935-c7d8abad2054",
                            })
                        }
                    >
                        Save this search
                    </button>
                )}

                {status === "loading" && (
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-300"
                            viewBox="0 0 100 101"
                            fill="rgb(55 65 81)"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}

                {status === "error" && (
                    <span className="text-red-300 border-[1px] rounded-sm border-red-300 p-2 ">
                        Something went wrong. Please, update the page
                    </span>
                )}

                {status === "successful" && (
                    <div
                        className={`min-h-[25px] rounded-4xl bg-red-300 px-2 flex justify-center items-center gap-1 text-white`}
                    >
                        <span>saved</span>
                        <Icon
                            icon="fluent-mdl2:check-mark"
                            color="white"
                            width="19"
                            height="19"
                        />
                    </div>
                )}

                {status === "already" && (
                    <div
                        className={`min-h-[25px] rounded-4xl bg-red-300 px-2 flex justify-center items-center gap-1 text-white`}
                    >
                        <span>This search was already saved</span>
                        <Icon
                            icon="bx:wink-smile"
                            color="white"
                            width="20"
                            height="20"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default observer(AppliedFilters);
