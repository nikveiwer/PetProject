'use client';

import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { PetsFetching } from '../../service/fetching';

import { useAuthStore } from '../../store/authStore/authStore';
import FilterItem from './FilterItem';

import { isRequestFilters, IFilters } from '../../types/types';
import { SkeletonCard } from '../mainPage/SkeletonCard';

type Props = {
    pet: 'cats' | 'dogs';
};

const Filters: React.FC<Props> = ({ pet }) => {
    const { accessToken } = useAuthStore();

    const { status, setStatus, getFilters, _transformToFilters } = PetsFetching();

    const [filters, setFilters] = useState<IFilters>(null as any as IFilters);

    const allFiltersFetching = async (accessToken: string) => {
        const types = await getFilters(accessToken);

        console.log(types);

        if (isRequestFilters(types)) {
            const filters = _transformToFilters(pet === 'dogs' ? types.types[0] : types.types[1]);
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
                <div className=" py-9 px-3 flex justify-center gap-4 lg:flex-nowrap flex-wrap">
                    {[...new Array(4)].map((item, i) => {
                        return <SkeletonCard key={i}></SkeletonCard>;
                    })}
                </div>
            );
        case 'idle':
            return (
                <aside className="w-[250px]">
                    {Object.entries(filters).map((item) => {
                        return (
                            <FilterItem
                                key={item[0]}
                                filTitle={item[0]}
                                filArray={item[1]}></FilterItem>
                        );
                    })}
                </aside>
            );
        case 'error':
            return <div>Ошибка</div>;
    }
};

export default observer(Filters);
