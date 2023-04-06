import { makeAutoObservable } from "mobx";

import { createContext, useContext } from "react";

import { ICurrentFilters } from "../../types/types";
type VisibleSearches = "all" | "cats" | "dogs";

import _ from "lodash";

export interface ISavedSearches extends ICurrentFilters {
    id: string;
}

export function isSavedSearches(T: unknown): T is ISavedSearches {
    if (T && typeof T === "object" && "id" in T && "type" in T) {
        return true;
    }

    return false;
}

export default class SavedSearchesStore {
    constructor() {
        makeAutoObservable(this);
    }

    savedSearches: ISavedSearches[] = [];

    visibleSearches: VisibleSearches = "all";

    deletedSearch: ISavedSearches["id"] | null = null;
    changedSearch: ISavedSearches | null = null;
    addedSearch: ISavedSearches | null = null;

    setSavedSearches = (response: ISavedSearches[]) => {
        this.savedSearches = response;
    };

    addSearch = (addedSearch: ISavedSearches | null) => {
        // const { id, ...rest } = addedSearch;

        // let isSearchAlredyThere = this.savedSearches.some(({ id, ...item }) =>
        //     _.isEqual(item, rest)
        // );

        // console.log(isSearchAlredyThere);

        // if (isSearchAlredyThere) {
        //     return;
        // } else {
        //     this.savedSearches.push(addedSearch);

        this.addedSearch = addedSearch;
        // }
    };

    deleteSearch = (deletedId: ISavedSearches["id"]) => {
        this.savedSearches = this.savedSearches.filter(
            (item) => item.id !== deletedId
        );

        this.deletedSearch = deletedId;
    };

    setVisibleSearches = (param: VisibleSearches) => {
        this.visibleSearches = param;
    };

    changeSearch = (id: ISavedSearches["id"], newSearch: ICurrentFilters) => {
        this.savedSearches = this.savedSearches.map((item) => {
            if (item.id === id) {
                return {
                    id,
                    ...newSearch,
                };
            }
            return item;
        });

        this.changedSearch = { id, ...newSearch };
    };

    get allCount() {
        return this.savedSearches.length;
    }

    get catsCount() {
        return this.savedSearches.filter((item) => item.type === "cats").length;
    }

    get dogsCount() {
        return this.savedSearches.filter((item) => item.type === "dogs").length;
    }
}

export const SavedSearchesStoreContext = createContext<SavedSearchesStore>(
    null as unknown as SavedSearchesStore
);

export const useSavedSearchesStore = () =>
    useContext(SavedSearchesStoreContext);
