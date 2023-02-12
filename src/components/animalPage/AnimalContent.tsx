'use client';

import React from 'react';
import { useEffect, useState } from 'react';

import AnimalSlider from './AnimalSlider';
import AnimalInfo from './AnimalInfo';

import { observer } from 'mobx-react-lite';
import { useAuthStore } from '../../store/authStore/authStore';

import { PetsFetching } from '../../service/fetching';

import { isAnimal } from '../../types/types';
import { IPetInformation } from '../../types/types';

type Props = {
    animalId: number;
};

const AnimalContent: React.FC<Props> = ({ animalId }) => {
    const { accessToken } = useAuthStore();

    console.log('pet');

    const { getPets, status, setStatus, _tranformToPetInformation } = PetsFetching();

    const [singleAnimal, setSingleAnimal] = useState<IPetInformation>(
        null as any as IPetInformation,
    );

    const getSinglePet = async (animalId: number, accessToken: string) => {
        const data = (await getPets('animals', '', accessToken, [String(animalId)])) as any;

        console.log(data);

        if (isAnimal(data)) {
            setSingleAnimal(_tranformToPetInformation(data.animal));
        } else {
            setStatus('error');
            throw new Error('Pets do not match(Recent)');
        }
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
            if (singleAnimal !== null) {
                return (
                    <>
                        <AnimalSlider photos={singleAnimal.photos}></AnimalSlider>

                        <section className=" my-7 px-2 flex justify-around">
                            <AnimalInfo singleAnimal={singleAnimal}></AnimalInfo>
                        </section>
                    </>
                );
            } else {
                return (
                    <div className=" py-9 px-3 flex justify-center gap-4 lg:flex-nowrap flex-wrap">
                        Loading...
                    </div>
                );
            }
        case 'error':
            return <div>Ошибка</div>;
    }
};

export default observer(AnimalContent);
