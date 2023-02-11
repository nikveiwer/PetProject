'use client';

import React from 'react';
import { useEffect, useState } from 'react';

import AnimalSlider from './AnimalSlider';
import AnimalInfo from './AnimalInfo';

import { observer } from 'mobx-react-lite';
import { useAuthStore } from '../../store/authStore/authStore';

import { PetsFetching } from '../../service/fetching';

type Props = {
    animalId: number;
};

const AnimalContent: React.FC<Props> = ({ animalId }) => {
    const { accessToken } = useAuthStore();

    console.log('pet');

    const { getPets, status, setStatus } = PetsFetching();

    const [singleAnimal, setSingleAnimal] = useState<any>(null);

    const getSinglePet = async (animalId: number, accessToken: string) => {
        const data = (await getPets('animals', '', accessToken, [String(animalId)])) as any;

        console.log(data);

        // if (isAnimals(pets)) {
        //     const petCardInfo = pets.animals.map((pet) => _tranformToPetCard(pet));
        //     setPets(petCardInfo);
        // } else {
        //     setStatus('error');
        //     throw new Error('Pets do not match(Recent)');
        // }
    };

    useEffect(() => {
        if (accessToken) {
            getSinglePet(animalId, accessToken);
        }
    }, [accessToken]);

    switch (status) {
        case 'loading':
            return (
                <div className=" py-9 px-3 flex justify-center gap-4 lg:flex-nowrap flex-wrap">
                    Loading...
                </div>
            );
        case 'idle':
            return (
                <>
                    <AnimalSlider></AnimalSlider>

                    <section className=" mt-7">
                        <AnimalInfo></AnimalInfo>
                    </section>
                </>
            );
        case 'error':
            return <div>Ошибка</div>;
    }
};

export default observer(AnimalContent);
