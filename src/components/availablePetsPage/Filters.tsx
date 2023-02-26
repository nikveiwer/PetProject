'use client';

import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { PetsFetching } from '../../service/fetching';

import { useAuthStore } from '../../store/authStore/authStore';

import FilterItem from './FilterItem';
import SearchByName from './SearchByName';

import { isRequestFilters, isRequestBreeds, IFilters } from '../../types/types';

import { SkeletonFilters } from './SkeletonFilters';

type Props = {
    pet: 'cats' | 'dogs';
};

const Filters: React.FC<Props> = ({ pet }) => {
    const { accessToken } = useAuthStore();

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
    }, [accessToken]);

    switch (status) {
        case 'loading':
            return (
                <aside className="w-[250px]">
                    <SkeletonFilters></SkeletonFilters>
                </aside>
            );
        case 'idle':
            return (
                <aside className="w-[250px]">
                    {Object.entries(filters).map((item) => {
                        return (
                            <FilterItem
                                key={item[0]}
                                filTitle={item[0] as keyof IFilters}
                                filArray={item[1]}></FilterItem>
                        );
                    })}
                    <SearchByName />
                </aside>
            );
        case 'error':
            return <div>Ошибка</div>;
    }
};

export default observer(Filters);
