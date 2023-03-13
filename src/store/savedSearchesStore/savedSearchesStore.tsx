import { makeAutoObservable } from 'mobx';

import { createContext, useContext } from 'react';

import { ICurrentFilters } from '../../types/types';
type VisibleSearches = 'all' | 'cats' | 'dogs';

import _ from 'lodash';

export default class SavedSearchesStore {
    constructor() {
        makeAutoObservable(this);
    }

    savedSearches: ICurrentFilters[] = [
        {
            type: 'cats',
            sort: 'random',
            breed: 'some breed',
            age: 'young',
            size: 'small',
            gender: 'male',
            good_with: '',
            coat: '',
            color: '',
            name: '',
        },
    ];

    visibleSearches: VisibleSearches = 'all';

    lounching: boolean = false;

    addSearch = (addedSearch: ICurrentFilters) => {
        let isSearchAlredyThere = this.savedSearches.some((item) => _.isEqual(item, addedSearch));

        console.log(isSearchAlredyThere);

        if (isSearchAlredyThere) {
            return;
        } else {
            this.savedSearches.push(addedSearch);
        }
    };

    deleteSearch = (deletedSearch: ICurrentFilters) => {
        this.savedSearches = this.savedSearches.filter((item) => !_.isEqual(item, deletedSearch));
    };

    setVisibleSearches = (param: VisibleSearches) => {
        this.visibleSearches = param;
    };

    get allCount() {
        return this.savedSearches.length;
    }

    get catsCount() {
        return this.savedSearches.filter((item) => item.type === 'cats').length;
    }

    get dogsCount() {
        return this.savedSearches.filter((item) => item.type === 'dogs').length;
    }
}

export const SavedSearchesStoreContext = createContext<SavedSearchesStore>(
    null as unknown as SavedSearchesStore,
);

export const useSavedSearchesStore = () => useContext(SavedSearchesStoreContext);
