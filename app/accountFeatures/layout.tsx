import Link from "next/link";

import AccauntLinks from "../../src/components/accountFeaturesPage/AccauntLinks";

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
                <AccauntLinks />
                {children}
            </div>
        </section>
    );
}
