'use client';

import { observer } from 'mobx-react-lite';

import supabase from '../../config/supabaseClient';

import { Icon } from '@iconify/react';

import SingleSearch from './SingleSearch';

import { useSavedSearchesStore } from '../../store/savedSearchesStore/savedSearchesStore';
import { useFiltersStore } from '../../store/filtersStore/filtersStore';

import { ISavedSearches } from '../../store/savedSearchesStore/savedSearchesStore';
import { isSavedSearches } from '../../store/savedSearchesStore/savedSearchesStore';
import { useState } from 'react';

type Status = 'loading' | 'idle' | 'error';

const SavedSearches: React.FC = () => {
    const [status, setStatus] = useState<Status>('loading');

    const { savedSearches, setSavedSearches, visibleSearches } = useSavedSearchesStore();
    const { onSearchLaunch } = useFiltersStore();

    const fetchSearches = async () => {
        const { data, error } = await supabase.from('savedSearches').select();

        if (error || !isSavedSearches(data)) {
            setStatus('error');
        } else {
            // setSavedSearches(data);
            // setStatus('idle');
        }
    };

    let searches = savedSearches;

    if (visibleSearches !== 'all') {
        searches = savedSearches.filter((item) => item.type === visibleSearches);
    }

    return (
        <>
            <ul className="mt-5 flex flex-col justify-start gap-3">
                {searches.map(({ id, ...item }) => {
                    return (
                        <li
                            key={id}
                            className="min-h-[150px] px-3 py-5 flex min-[479px]:justify-start min-[479px]:gap-0  min-[479px]:flex-row flex-col justify-between gap-4 overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <SingleSearch id={id} item={item}></SingleSearch>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default observer(SavedSearches);
