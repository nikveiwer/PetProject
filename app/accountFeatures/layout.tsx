import Link from "next/link";

export default function AccountFeaturesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className=" min-h-[calc(100vh-172px)] xl:px-40 lg:px-14 py-4 px-3">
            <div className=" min-h-[300px] mt-5 mx-auto px-8 py-10 overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <span className=" text-4xl text-gray-700">
                    Account Feauters
                </span>
                <div className="mt-5 pb-3 w-full flex justify-start border-b-[1px] border-gray-700 ">
                    <div className="px-3 pb-2 hover:border-red-300 border-b-[3px] border-white text-gray-700 transition-all ">
                        <Link href={"/accountFeatures/accountInfo"}>
                            Account Info
                        </Link>
                    </div>
                    <div className="px-3 pb-2 hover:border-red-300 border-b-[3px] border-white text-gray-700 transition-all">
                        <Link href={"/accountFeatures/savedSearches"}>
                            Saved Searches
                        </Link>
                    </div>
                </div>
                {children}
            </div>
        </section>
    );
}
