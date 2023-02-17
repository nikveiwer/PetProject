'use client';

import { useEffect } from 'react';
import { PetsFetching } from '../../service/fetching';
import { useAuthStore } from '../../store/authStore/authStore';
import FilterItem from './FilterItem';

const Filters: React.FC = () => {
    const { accessToken } = useAuthStore();

    const { status, setStatus, getFilters } = PetsFetching();

    const allFiltersFetching = async (accessToken: string) => {
        const types = await getFilters(accessToken);

        console.log(types);
    };

    useEffect(() => {
        console.log('effect');
        if (accessToken) {
            allFiltersFetching(accessToken);
        }
    }, [accessToken]);

    return (
        <aside className="w-[250px]">
            <FilterItem></FilterItem>
            <FilterItem></FilterItem>
            <FilterItem></FilterItem>
            <FilterItem></FilterItem>
        </aside>
    );
};

export default Filters;
