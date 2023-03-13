'use client';

import { observer } from 'mobx-react-lite';

import { useSavedSearchesStore } from '../../store/savedSearchesStore/savedSearchesStore';

const SSNavigation: React.FC = () => {
    const { allCount, catsCount, dogsCount, visibleSearches, setVisibleSearches } =
        useSavedSearchesStore();

    return (
        <nav className="mt-10 w-full flex justify-center gap-3">
            <button
                className={` ${
                    visibleSearches === 'all' ? 'border-red-300' : ''
                } px-3 pb-2 hover:border-red-100 border-b-[3px] border-white text-gray-700 cursor-pointer transition-all `}
                onClick={() => setVisibleSearches('all')}>
                All({allCount})
            </button>
            <button
                className={`${catsCount || 'hidden'} ${
                    visibleSearches === 'cats' ? 'border-red-300' : ''
                } px-3 pb-2 hover:border-red-100 border-b-[3px] border-white text-gray-700 cursor-pointer transition-all `}
                onClick={() => setVisibleSearches('cats')}>
                Cats({catsCount})
            </button>
            <button
                className={`${dogsCount || 'hidden'}  ${
                    visibleSearches === 'dogs' ? 'border-red-300' : ''
                } px-3 pb-2 hover:border-red-100 border-b-[3px] border-white text-gray-700 cursor-pointer transition-all `}
                onClick={() => setVisibleSearches('dogs')}>
                Dogs({dogsCount})
            </button>
        </nav>
    );
};

export default observer(SSNavigation);
