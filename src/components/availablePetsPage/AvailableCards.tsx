'use client';

import { useEffect, useState } from 'react';

import { PetsFetching } from '../../service/fetching';

import { PetCard } from '../mainPage/PetCard';
import { SkeletonCard } from '../mainPage/SkeletonCard';

import { ICurrentFilters, isAnimals } from '../../types/types';
import { IAnimals } from '../../types/types';
import { IPetCard } from '../../types/types';

import { observer } from 'mobx-react-lite';
import { useAuthStore } from '../../store/authStore/authStore';
import { useFiltersStore } from '../../store/filtersStore/filtersStore';

type Props = {
    searchedType: 'cats' | 'dogs';
};

const AvailableCards: React.FC<Props> = ({ searchedType }) => {
    const { accessToken } = useAuthStore();

    const { status, setStatus, getPets, _tranformToPetCard } = PetsFetching();

    const { filters, setRequiredFilter } = useFiltersStore();

    const [pets, setPets] = useState<IPetCard[]>([]);

    const getAvailablePets = async (accessToken: string) => {
        const searchParameters: (string | boolean)[][] = [];

        (Object.keys(filters) as Array<keyof ICurrentFilters>).forEach((key) => {
            if (filters[key] !== '') {
                if (key === 'good_with') {
                    searchParameters.push([`${key}_${filters[key]}`, true]);
                } else {
                    searchParameters.push([key, filters[key]]);
                }
            }
        });

        const pets = await getPets(
            'animals',
            '',
            accessToken,
            ['type', searchedType.slice(0, -1)],
            ...searchParameters,
        );

        console.log(pets);

        if (isAnimals(pets)) {
            const petCardInfo = pets.animals.map((pet) => _tranformToPetCard(pet));
            setPets(petCardInfo);
        } else {
            setStatus('error');
            throw new Error('Pets do not match(Recent)');
        }
    };

    useEffect(() => {
        if (accessToken) {
            getAvailablePets(accessToken);
        }
    }, [accessToken, filters]);

    // let status = "loading";

    switch (status) {
        case 'loading':
            return (
                <div className=" py-9 px-3 grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-rows-3 auto-rows-auto justify-between ">
                    {[...new Array(12)].map((item, i) => {
                        return <SkeletonCard key={i}></SkeletonCard>;
                    })}
                </div>
            );
        case 'idle':
            return (
                <div className=" py-9 px-3 flex justify-center gap-4 lg:flex-nowrap flex-wrap">
                    {/* {pets.map(({ id, name, imagePath }) => {
                        return (
                            <PetCard
                                key={id}
                                id={id}
                                imagePath={imagePath}
                                name={name}
                            ></PetCard>
                        );
                    })} */}
                </div>
            );
        case 'error':
            return <div>Ошибка</div>;
        default:
            return <div>Ошибка</div>;
    }
};

export default observer(AvailableCards);
