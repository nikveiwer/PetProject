import { makeAutoObservable } from "mobx";

import { createContext, useContext } from "react";

import { ICurrentFilters, IPagination } from "../../types/types";

export default class FiltersStore {
    constructor() {
        makeAutoObservable(this);
    }

    filters: ICurrentFilters = {
        type: "",
        sort: "random",
        breed: "",
        age: "",
        size: "",
        gender: "",
        good_with: "",
        coat: "",
        color: "",
        name: "",
    };

    switcher: boolean = false;

    changeSwitcher = () => {
        this.switcher = !this.switcher;
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

        this.setCurrentPage(1);
    };

    setPetType = (currentPet: "cats" | "dogs" | "") => {
        this.filters = {
            ...this.filters,
            type: currentPet,
        };
    };

    deleteRequiredFilter = (requiredFilter: keyof ICurrentFilters) => {
        this.filters = {
            ...this.filters,
            [requiredFilter]: "",
        };
    };

    deleteAllFilters = () => {
        this.filters = {
            type: this.filters.type,
            sort: this.filters.sort,
            breed: "",
            age: "",
            size: "",
            gender: "",
            good_with: "",
            coat: "",
            color: "",
            name: "",
        };
    };

    pagination: IPagination = {
        currentPage: 1,
        totalPages: 12,
    };

    setCurrentPage = (page: number) => {
        this.pagination.currentPage = page;
    };

    setTotalPages = (value: number) => {
        this.pagination.totalPages = value;
    };
}

export const FiltersStoreContext = createContext<FiltersStore>(
    null as unknown as FiltersStore
);

export const useFiltersStore = () => useContext(FiltersStoreContext);
