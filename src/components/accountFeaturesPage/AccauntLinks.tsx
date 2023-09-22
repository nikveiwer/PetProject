"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type LinkDescr = {
    route: string;
    descr: string;
};

const accountRoutes: LinkDescr[] = [
    {
        route: "/accountFeatures/accountInfo",
        descr: "Account Info",
    },
    {
        route: "/accountFeatures/savedSearches",
        descr: "Saved Searches",
    },
];

const AccauntLinks: React.FC = () => {
    const pathname = usePathname();

    return (
        <div className="mt-5 pb-3 w-full flex justify-start border-b-[1px] border-gray-700 ">
            {accountRoutes.map(({ route, descr }) => (
                <div
                    key={route}
                    className={`px-3 pb-2 border-b-[3px] border-white text-gray-700 transition-all
                ${
                    route === pathname
                        ? " border-red-300"
                        : " hover:border-red-100"
                }`}
                >
                    <Link href={route}>{descr}</Link>
                </div>
            ))}
        </div>
    );
};

export default AccauntLinks;
