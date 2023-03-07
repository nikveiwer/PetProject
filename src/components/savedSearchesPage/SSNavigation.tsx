"use client";

import { observer } from "mobx-react-lite";

const SSNavigation: React.FC = () => {
    return (
        <nav className="mt-10 w-full flex justify-center gap-3">
            <div className="px-3 pb-2 hover:border-red-300 border-b-[3px] border-white text-gray-700 cursor-pointer transition-all ">
                All(num)
            </div>
            <div className="px-3 pb-2 hover:border-red-300 border-b-[3px] border-white text-gray-700 cursor-pointer transition-all ">
                Cats(num)
            </div>
            <div className="px-3 pb-2 hover:border-red-300 border-b-[3px] border-white text-gray-700 cursor-pointer transition-all ">
                Dogs(num)
            </div>
        </nav>
    );
};

export default observer(SSNavigation);
