"use client"

import { useEffect, useState } from 'react';

import { PetsFetching } from '../../service/fetching';

import { PetCard } from './PetCard';
import { SkeletonCard } from './SkeletonCard';

import { useAuthStore } from '../../store/authStore/authStore';

import { isAnimals } from '../../types/types';
import { IAnimals } from '../../types/types';
import { IPetCard } from '../../types/types';

import { observer } from 'mobx-react-lite';

const RecentPets: React.FC =  () => {

    const {accessToken} = useAuthStore()

    const { status, setStatus, getPets, _tranformToPetCard} = PetsFetching()

    const [pets, setPets] = useState<IPetCard[]>([])




    const getRecentPets = async (accessToken: string) => {

        const pets = await getPets( "animals" , "" , accessToken, ["sort", "recent"], ["limit", "4"])

        console.log(pets)

        if (isAnimals(pets)) {
            const petCardInfo = pets.animals.map(pet => _tranformToPetCard(pet))
            setPets(petCardInfo);
        } else {
            setStatus("error")
            throw new Error("Pets do not match(Recent)")
        }

    }

    useEffect(() => {

        if (accessToken) {
            getRecentPets(accessToken)
        }

    }, [accessToken])

    switch (status) {
        case "loading":
            return (
                <div className=" py-9 px-3 flex justify-center gap-4 lg:flex-nowrap flex-wrap">
                    {[...new Array(4)].map((item, i) => {
                        return (
                            <SkeletonCard key={i}></SkeletonCard>
                        )
                    })}
                </div>
            )
        case "idle":
            return (
                <div className=" py-9 px-3 flex justify-center gap-4 lg:flex-nowrap flex-wrap">
                    {pets.map(({id, name, imagePath}) => {
                        return (
                            <PetCard key={id} imagePath={imagePath} name={name}></PetCard>
                        )
                    })}
                </div>
            )
        case "error":
            return (
                <div>Ошибка</div>
            )
    }


};

export default observer(RecentPets);
