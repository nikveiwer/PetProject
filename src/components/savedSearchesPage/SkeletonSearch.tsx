export const SkeletonSearch = () => {
    return (
        <li className="min-h-[150px] px-3 py-5 flex min-[479px]:justify-start min-[479px]:gap-0  min-[479px]:flex-row flex-col justify-between gap-4 overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <div role="status" className="animate-pulse w-full">
                <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
                <div className="h-5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
                <div className="flex items-center justify-center mt-8">
                    <div className=" w-80 h-5 bg-gray-200 rounded-full dark:bg-gray-700 mr-3"></div>
                    <div className="w-80 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        </li>
    );
};
