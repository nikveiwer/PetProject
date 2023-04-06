import SortBy from "../../src/components/availablePetsPage/SortBy";
import { SkeletonCard } from "../../src/components/mainPage/SkeletonCard";

const sortFiltersOptions = [
    ["recent", "Newest addition"],
    ["-recent", "Oldest addition"],
    ["random", "Randomize"],
];

export default function LikedAnimalsPage() {
    return (
        <section className=" min-h-[calc(100vh-172px)] xl:px-40 lg:px-14 py-4 px-3">
            <div className="flex justify-between sm:items-center sm:flex-row flex-col items-start">
                <h2 className=" mb-5 sm:text-5xl text-4xl text-red-300 ">
                    My Favorites(num)
                </h2>
                <SortBy
                    target={"favorites"}
                    options={sortFiltersOptions}
                ></SortBy>
            </div>

            <div className=" py-9 px-3 grid lg:grid-cols-4 min-[873px]:grid-cols-4 min-[683px]:grid-cols-3 min-[455px]:grid-cols-2 grid-cols-1 grid-rows-3 auto-rows-auto justify-between justify-items-center gap-7 ">
                {[...new Array(12)].map((item, i) => {
                    return <SkeletonCard key={i}></SkeletonCard>;
                })}
            </div>
        </section>
    );
}
