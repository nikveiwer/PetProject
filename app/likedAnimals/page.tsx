import SortBy from "../../src/components/availablePetsPage/SortBy";
import AvailableLikedCards from "../../src/components/likedAnimalsPage/AvailableLikedCards";
import MyFavoritesNumber from "../../src/components/likedAnimalsPage/MyFavoritesNumber";
import { NoLikedWindow } from "../../src/components/likedAnimalsPage/NoLikedWindow";

export type TypeLikedSortOptions = [
    ["likedAt", "Recently favorited"],
    ["name", "Pet name(a-z)"],
    ["-name", "Pet name(z-a)"],
    ["publishedAt", "Most days on Petproject"]
];

const sortLikedOptions: TypeLikedSortOptions = [
    ["likedAt", "Recently favorited"],
    ["name", "Pet name(a-z)"],
    ["-name", "Pet name(z-a)"],
    ["publishedAt", "Most days on Petproject"],
];

export default function LikedAnimalsPage() {
    return (
        <section className=" min-h-[calc(100vh-172px)] xl:px-40 lg:px-14 py-4 px-3">
            <div className="flex justify-between sm:items-center sm:flex-row flex-col items-start">
                <MyFavoritesNumber />

                <SortBy
                    target={"favorites"}
                    options={sortLikedOptions}
                ></SortBy>
            </div>
            <AvailableLikedCards />
        </section>
    );
}
