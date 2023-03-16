"use client";

import Link from "next/link";

import { observer } from "mobx-react-lite";

import { Icon } from "@iconify/react";

import { useFiltersStore } from "../../store/filtersStore/filtersStore";
import { useSavedSearchesStore } from "../../store/savedSearchesStore/savedSearchesStore";

import { useRouter } from "next/navigation";
import { ICurrentFilters } from "../../types/types";
import { useState } from "react";

type Props = {
    id: string;
    item: ICurrentFilters;
};

// xl:w-56 lg:w-52 w-[184px] h-[340px]

const SingleSearch: React.FC<Props> = ({ id, item }) => {
    const router = useRouter();

    const { onSearchLaunch } = useFiltersStore();
    const { deleteSearch, changeSearch } = useSavedSearchesStore();

    const [change, setChange] = useState<boolean>(false);
    const [changedSearch, setChangedSearch] = useState<ICurrentFilters>(item);

    const launchResolver = (item: ICurrentFilters) => {
        onSearchLaunch(item);

        setTimeout(() => {
            router.push(`availablePets/${item.type}`);
        });
    };

    const onCrossClick = () => {
        setChange(false);
        setChangedSearch(item);
    };

    const onChangeClick = () => {
        changeSearch(id, changedSearch);

        setChange(false);
    };

    const onDelete = (key: keyof ICurrentFilters) => {
        setChangedSearch((changedSearch) => {
            return {
                ...changedSearch,
                [key]: "",
            };
        });
    };

    return (
        <>
            <div className="min-[479px]:w-[70%] w-full pr-3  border-gray-700 flex flex-wrap min-[479px]:justify-start justify-center items-center gap-3">
                {Object.entries(change ? changedSearch : item).map(
                    ([key, value]) => {
                        if (value === "") {
                            return;
                        } else {
                            return (
                                <div
                                    key={value}
                                    className=" min-w-[80px] md:h-[55px] min-[534px]:h-[40px] h-[30px] px-2 bg-red-300 rounded-lg flex justify-between items-center"
                                >
                                    <div className=" w-full text-white min-[534px]:text-lg text-sm text-center">
                                        {value.charAt(0).toUpperCase() +
                                            value.slice(1)}
                                    </div>

                                    {change &&
                                        key !== "type" &&
                                        key !== "sort" && (
                                            <button
                                                onClick={() =>
                                                    onDelete(
                                                        key as keyof ICurrentFilters
                                                    )
                                                }
                                                className=" ml-1 pr-1 w-[30px] "
                                            >
                                                <Icon
                                                    icon="basil:cross-outline"
                                                    color="white"
                                                    width={35}
                                                    height={35}
                                                />
                                            </button>
                                        )}
                                </div>
                            );
                        }
                    }
                )}
            </div>
            <div className="flex flex-start min-[479px]:w-[30%] min-[479px]:h-full h-14 w-full">
                <div className="w-[70%] border-x-[1px] border-white min-[479px]:border-gray-700 flex flex-col justify-center text-center">
                    {change ? (
                        <button
                            className="min-[534px]:text-lg min-[479px]:text-sm text-lg uppercase hover:text-red-400 text-red-300 cursor-pointer transition-all"
                            onClick={onChangeClick}
                        >
                            {/* <Link href={`availablePets/${item.type}`}> */}
                            change
                            {/* </Link> */}
                        </button>
                    ) : (
                        <button
                            className="min-[534px]:text-lg min-[479px]:text-sm text-lg uppercase hover:text-red-400 text-red-300 cursor-pointer transition-all"
                            onClick={() => launchResolver(item)}
                        >
                            {/* <Link href={`availablePets/${item.type}`}> */}
                            Launch search
                            {/* </Link> */}
                        </button>
                    )}
                </div>
                <div className="w-[30%] min-[534px]ml-[15px] ml-3 flex min-[479px]:flex-col min-[479px]:justify-center justify-between items-center min-[479px]:gap-3 ">
                    <button
                        className="h-[50%] flex flex-col justify-center "
                        onClick={() => setChange(true)}
                        disabled={change}
                    >
                        <Icon
                            className={` ${
                                change && "cursor-default"
                            } mx-auto my-0 cursor-pointer`}
                            icon="ph:pen-fill"
                            color={change ? `#FEE2E2` : `#fda4af`}
                            width="40"
                            height="40"
                        />
                    </button>

                    <div className="border-b-[1px] h-[1px] border-white  min-[479px]:border-gray-700"></div>

                    {change ? (
                        <button
                            className=" h-[50%] flex flex-col justify-center   "
                            onClick={onCrossClick}
                        >
                            <Icon
                                className="mx-auto my-0 cursor-pointer"
                                color="#fda4af"
                                icon="radix-icons:cross-2"
                                width="40"
                                height="40"
                            />
                        </button>
                    ) : (
                        <button
                            className=" h-[50%] flex flex-col justify-center  "
                            onClick={() => deleteSearch(id)}
                        >
                            <Icon
                                className="mx-auto my-0 cursor-pointer"
                                icon="tabler:trash-filled"
                                color="#fda4af"
                                width="40"
                                height="40"
                            />
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default observer(SingleSearch);
