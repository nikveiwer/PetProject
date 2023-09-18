import { makeAutoObservable } from "mobx";

import { createContext, useContext } from "react";

import { IPetCard } from "../../types/types";

export interface ILikedAnimal {
    id: string;
    api_id: number;
    likedAt: string;
    user_id: string;
    name: string;
    imagePath: string;
    likedInfo: string;
    breed: string;
    petLink: string;
    publishedAt: string;
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

    isSaved = (cardId: ILikedAnimal["api_id"]) => {
        return this.likedAnimals.some((item) => item.api_id === cardId);
    };

    loadLiked = (fetchedLiked: ILikedAnimal[]) => {
        this.likedAnimals = fetchedLiked;
    };

    addLiked = (addedLiked: ILikedAnimal) => {
        this.likedAnimals.push(addedLiked);
    };

    deleteLiked = (deletedId: ILikedAnimal["api_id"]) => {
        this.likedAnimals = this.likedAnimals.filter(
            ({ api_id }) => api_id !== deletedId
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
