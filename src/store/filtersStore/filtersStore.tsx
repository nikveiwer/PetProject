import { makeAutoObservable } from "mobx";

import { createContext, useContext } from "react";

import { ICurrentFilters } from "../../types/types";

export default class FiltersStore {
    constructor() {
        makeAutoObservable(this);
    }

    breed: string = "";
    age: string = "";
    size: string = "";
    gender: string = "";
    "good with": string = "";
    "coat length": string = "";
    color: string = "";

    setRequiredFilter = (
        requiredFilter: keyof ICurrentFilters,
        value: string
    ) => {
        value === "any"
            ? (this[requiredFilter] = "")
            : (this[requiredFilter] = value);
    };
}

export const FiltersStoreContext = createContext<FiltersStore>(
    null as unknown as FiltersStore
);

export const useFiltersStore = () => useContext(FiltersStoreContext);
