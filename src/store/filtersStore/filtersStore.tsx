import { makeAutoObservable } from "mobx";

import { createContext, useContext } from "react";

import { ICurrentFilters } from "../../types/types";

export default class FiltersStore {
    constructor() {
        makeAutoObservable(this);
    }

    filters: ICurrentFilters = {
        sort: "recent",
        breed: "",
        age: "",
        size: "",
        gender: "",
        good_with: "",
        coat: "",
        color: "",
    };

    setRequiredFilter = (
        requiredFilter: keyof ICurrentFilters,
        value: string
    ) => {
        value === "any"
            ? (this.filters = {
                  ...this.filters,
                  [requiredFilter]: "",
              })
            : (this.filters = {
                  ...this.filters,
                  [requiredFilter]: value,
              });
    };

    deleteRequiredFilter = (requiredFilter: keyof ICurrentFilters) => {
        this.filters = {
            ...this.filters,
            [requiredFilter]: "",
        };
    };

    deleteAllFilters = () => {
        this.filters = {
            sort: this.filters.sort,
            breed: "",
            age: "",
            size: "",
            gender: "",
            good_with: "",
            coat: "",
            color: "",
        };
    };
}

export const FiltersStoreContext = createContext<FiltersStore>(
    null as unknown as FiltersStore
);

export const useFiltersStore = () => useContext(FiltersStoreContext);
