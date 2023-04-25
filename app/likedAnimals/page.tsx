import AvailableCards from "../../src/components/availablePetsPage/AvailableCards";
import SortBy from "../../src/components/availablePetsPage/SortBy";
import AvailableLikedCards from "../../src/components/likedAnimalsPage/AvailableLikedCards";
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
            <AvailableLikedCards />
        </section>
    );
}
