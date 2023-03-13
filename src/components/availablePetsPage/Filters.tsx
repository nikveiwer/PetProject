'use client';

import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { PetsFetching } from '../../service/fetching';

import { useAuthStore } from '../../store/authStore/authStore';
import { useFiltersStore } from '../../store/filtersStore/filtersStore';

import FilterItem from './FilterItem';
import SearchByName from './SearchByName';

import { isRequestFilters, isRequestBreeds, IFilters } from '../../types/types';

import { SkeletonFilters } from './SkeletonFilters';

import { Icon } from '@iconify/react';

type Props = {
    pet: 'cats' | 'dogs';
};

const Filters: React.FC<Props> = ({ pet }) => {
    const { accessToken } = useAuthStore();
    const { switcher, changeSwitcher, deleteAllFilters, setPetType } = useFiltersStore();

    const { status, setStatus, getFilters, getBreeds, _transformToFilters } = PetsFetching();

    const [filters, setFilters] = useState<IFilters>(null as any as IFilters);

    const allFiltersFetching = async (accessToken: string) => {
        const types = await getFilters(accessToken);

        const breeds = await getBreeds(accessToken, pet);

        console.log(breeds);

        console.log(types);

        if (isRequestFilters(types) && isRequestBreeds(breeds)) {
            const filters = _transformToFilters(
                pet === 'dogs' ? types.types[0] : types.types[1],
                breeds,
            );
            setFilters(filters);

            console.log(filters);
        } else {
            setStatus('error');
            throw new Error('Filters do not match(Available)');
        }
    };

    useEffect(() => {
        console.log('effect');
        if (accessToken) {
            allFiltersFetching(accessToken);
        }

        return () => {
            deleteAllFilters();
        };
    }, [accessToken]);

    switch (status) {
        case 'loading':
            return (
                <aside className={` hidden lg:block w-[250px]`}>
                    <SkeletonFilters></SkeletonFilters>
                </aside>
            );
        case 'idle':
            return (
                <aside
                    className={`${
                        !switcher && 'hidden'
                    } absolute top-0 left-0 z-50 pt-9 lg:pt-0 bg-white w-full h-full lg:w-[250px] lg:static lg:z-0 lg:block `}>
                    <button
                        className=" lg:hidden block absolute top-0 right-0 focus:ring-red-300 focus:border-red-300 focus:outline-none"
                        onClick={changeSwitcher}>
                        <Icon icon="basil:cross-solid" color="#fda4af" width="50" height="50" />
                    </button>
                    {Object.entries(filters).map((item) => {
                        return (
                            <FilterItem
                                key={item[0]}
                                filTitle={item[0] as keyof IFilters}
                                filArray={item[1]}></FilterItem>
                        );
                    })}
                    <SearchByName />
                    <div className="mt-7 flex justify-between">
                        <button
                            className="p-2.5 ml-2 lg:w-[100%] w-[45%] text-sm font-medium text-white uppercase bg-red-300 rounded-lg border border-red-300 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 transition-all"
                            onClick={() => {
                                deleteAllFilters(), changeSwitcher();
                            }}>
                            Reset all filters
                        </button>
                        <button
                            className=" lg:hidden p-2.5 ml-2 w-[45%] text-sm font-medium text-white uppercase bg-red-300 rounded-lg border border-red-300 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 transition-all"
                            onClick={changeSwitcher}>
                            Apply Filters
                        </button>
                    </div>
                </aside>
            );
        case 'error':
            return <div>Ошибка</div>;
    }
};

export default observer(Filters);
