"use client";

import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { useFiltersStore } from "../../store/filtersStore/filtersStore";

const Pagination: React.FC = () => {
    const {
        pagination: { currentPage, totalPages },
        setCurrentPage,
    } = useFiltersStore();

    const [pageCounter, setPageCounter] = useState<number>(1);
    const [switchCounter, setSwitchCounter] = useState<number>(1);

    const onNextClick = () => {
        setPageCounter((counter) => counter + 1);
        setCurrentPage(currentPage + 1);

        if (pageCounter + 2 > switchCounter + paginationLength) {
            setSwitchCounter((counter) => counter + 1);
        }
    };

    const onPrevClick = () => {
        setPageCounter((counter) => counter - 1);
        setCurrentPage(currentPage - 1);

        if (pageCounter - 1 < switchCounter) {
            setSwitchCounter((counter) => counter - 1);
        }
    };

    let paginationLength = totalPages > 7 ? 7 : totalPages;

    return (
        <div
            className={`${
                totalPages > 1 || "hidden"
            } flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6`}
        >
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    className={`${
                        pageCounter <= 1 ? "hidden" : ""
                    } relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
                    onClick={onPrevClick}
                >
                    Previous
                </button>
                <button
                    className={`${
                        pageCounter + 1 > totalPages ? "hidden" : ""
                    } relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
                    onClick={onNextClick}
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        There are
                        <span className="font-medium"> {totalPages} </span>
                        pages on this search
                    </p>
                </div>

                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <button
                            className={`${
                                pageCounter <= 1 ? "hidden" : ""
                            } relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 hover:border-red-300 transition-all`}
                            onClick={onPrevClick}
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {[...new Array(paginationLength)].map((item, i) => {
                            return (
                                <button
                                    key={i + switchCounter}
                                    className={`${
                                        currentPage === i + switchCounter
                                            ? "border-red-300 bg-red-50 text-red-300"
                                            : ""
                                    } relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}
                                    onClick={() => {
                                        setPageCounter(i + switchCounter);
                                        setCurrentPage(i + switchCounter);
                                    }}
                                >
                                    {i + switchCounter}
                                </button>
                            );
                        })}

                        <button
                            className={`${
                                pageCounter + 1 > totalPages ? "hidden" : ""
                            } relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 hover:border-red-300 transition-all`}
                            onClick={onNextClick}
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default observer(Pagination);
