'use client';

import { Icon } from '@iconify/react';

const AppliedFilters: React.FC = () => {
    return (
        <div className=" max-w-[750px] px-3">
            <h4 className=" mb-3 text-sm">Filters Applied</h4>
            <div className=" flex justify-start gap-2 flex-wrap">
                <div className=" min-w-[80px] h-[25px] px-2 bg-red-300 rounded-lg flex justify-between items-center">
                    <div className=" w-full text-white text-center">Yongj</div>
                    <button className=" ml-1 w-[15px] ">
                        <Icon icon="basil:cross-outline" color="white" width={25} height={25} />
                    </button>
                </div>
                {/* <div className=" min-w-[80px] h-[25px] px-2 bg-red-300 rounded-lg flex justify-between items-center">
                    <div className=" w-full text-white text-center">Yongj</div>
                    <button className=" ml-1 w-[15px] ">
                        <Icon icon="basil:cross-outline" color="white" width={25} height={25} />
                    </button>
                </div>
                <div className=" min-w-[80px] h-[25px] px-2 bg-red-300 rounded-lg flex justify-between items-center">
                    <div className=" w-full text-white text-center">Yongj</div>
                    <button className=" ml-1 w-[15px] ">
                        <Icon icon="basil:cross-outline" color="white" width={25} height={25} />
                    </button>
                </div>
                <div className=" min-w-[80px] h-[25px] px-2 bg-red-300 rounded-lg flex justify-between items-center">
                    <div className=" w-full text-white text-center">Yongj</div>
                    <button className=" ml-1 w-[15px] ">
                        <Icon icon="basil:cross-outline" color="white" width={25} height={25} />
                    </button>
                </div> */}

                <button className="text-red-300">Clear all</button>
            </div>
        </div>
    );
};

export default AppliedFilters;
