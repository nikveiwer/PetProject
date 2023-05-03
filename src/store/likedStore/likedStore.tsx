import { makeAutoObservable } from "mobx";

import { createContext, useContext } from "react";

import { IPetCard } from "../../types/types";

export interface ILikedAnimal extends IPetCard {
    likedAt: string;
}

type SortLiked = "likedAt" | "name" | "-name" | "publishedAt";

export default class LikedStore {
    constructor() {
        makeAutoObservable(this);
    }

    likedAnimals: ILikedAnimal[] = [];

    sortLiked: SortLiked = "likedAt";

    get numberOfLiked() {
        return this.likedAnimals.length;
    }

    isSaved = (cardId: ILikedAnimal["id"]) => {
        return this.likedAnimals.some((item) => item.id === cardId);
    };

    loadLiked = (fetchedLiked: ILikedAnimal[]) => {
        this.likedAnimals = fetchedLiked;
    };

    addLiked = (addedLiked: ILikedAnimal) => {
        this.likedAnimals.push(addedLiked);
    };

    deleteLiked = (deletedId: ILikedAnimal["id"]) => {
        this.likedAnimals = this.likedAnimals.filter(
            ({ id }) => id !== deletedId
        );
    };

    changeSortLiked = (option: SortLiked) => {
        this.sortLiked = option;
    };
}

export const LikedStoreContext = createContext<LikedStore>(
    null as unknown as LikedStore
);

export const useLikedStore = () => useContext(LikedStoreContext);
