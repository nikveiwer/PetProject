import { makeAutoObservable } from "mobx";

import { createContext, useContext } from "react";

import { ICurrentFilters } from "../../types/types";

import _ from "lodash";

export default class SavedSearchesStore {
    constructor() {
        makeAutoObservable(this);
    }

    savedSearches: ICurrentFilters[] = [
        {
            type: "cats",
            sort: "random",
            breed: "some breed",
            age: "young",
            size: "small",
            gender: "male",
            good_with: "",
            coat: "",
            color: "",
            name: "",
        },
    ];

    lounching: boolean = false;

    addSearch = (addedSearch: ICurrentFilters) => {
        let isSearchAlredyThere = this.savedSearches.some((item) =>
            _.isEqual(item, addedSearch)
        );

        console.log(isSearchAlredyThere);

        if (isSearchAlredyThere) {
            return;
        } else {
            this.savedSearches.push(addedSearch);
        }
    };

    deleteSearch = (deletedSearch: ICurrentFilters) => {
        this.savedSearches = this.savedSearches.filter(
            (item) => !_.isEqual(item, deletedSearch)
        );
    };

    get allCount() {
        return this.savedSearches.length;
    }

    // get catsCount() {}
}

export const SavedSearchesStoreContext = createContext<SavedSearchesStore>(
    null as unknown as SavedSearchesStore
);

export const useSavedSearchesStore = () =>
    useContext(SavedSearchesStoreContext);
