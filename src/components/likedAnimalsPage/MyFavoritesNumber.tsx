"use client";

import { observer } from "mobx-react-lite";
import { useLikedStore } from "../../store/likedStore/likedStore";

const MyFavoritesNumber: React.FC = () => {
    const { numberOfLiked } = useLikedStore();

    return (
        <h2 className=" mb-5 sm:text-5xl text-4xl text-red-300 ">
            My Favorites({numberOfLiked})
        </h2>
    );
};

export default observer(MyFavoritesNumber);
