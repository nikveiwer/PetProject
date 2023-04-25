import { makeAutoObservable } from "mobx";

import { createContext, useContext } from "react";

import { IPetCard } from "../../types/types";

export interface ILikedAnimal extends IPetCard {
    likedAt: string;
}

export default class LikedStore {
    constructor() {
        makeAutoObservable(this);
    }

    likedAnimals: ILikedAnimal[] = [];

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
}

export const LikedStoreContext = createContext<LikedStore>(
    null as unknown as LikedStore
);

export const useLikedStore = () => useContext(LikedStoreContext);
