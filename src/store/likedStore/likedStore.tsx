import { makeAutoObservable } from 'mobx';

import { createContext, useContext } from 'react';

import { IPetCard } from '../../types/types';

interface ILikedAnimal extends IPetCard {}

export default class LikedStore {
    constructor() {
        makeAutoObservable(this);
    }

    likedAnimals: ILikedAnimal[] = [];
}

export const LikedStoreContext = createContext<LikedStore>(null as unknown as LikedStore);

export const useLikedStore = () => useContext(LikedStoreContext);
