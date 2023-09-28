export default function AccountInfoLoading() {
    return (
        <section>
            <div className="bg-gray-50 mt-5 px-4 py-2 flex flex-col gap-3  sm:gap-4 sm:px-6">
                <div className=" h-5 border border-gray-200 rounded shadow animate-pulse"></div>
                <div className="flex flex-col gap-2 sm:gap-5 sm:flex-row">
                    <div className=" h-5 border border-gray-200 rounded shadow animate-pulse"></div>

                    <button className="py-2 px-3 bg-red-300 rounded-lg text-white ">
                        Change username
                    </button>
                </div>
            </div>
        </section>
    );
}
