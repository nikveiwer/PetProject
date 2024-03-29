"use client";

import React from "react";
import { useEffect, useState } from "react";

import AnimalSlider from "./AnimalSlider";
import AnimalInfo from "./AnimalInfo";
import AnimalInquiry from "./AnimalInquiry";

import { observer } from "mobx-react-lite";
import { useAuthStore } from "../../store/authStore/authStore";
import { useSupabase } from "../../config/supabaseClient";
import { ILikedAnimal, useLikedStore } from "../../store/likedStore/likedStore";

import { PetsFetching } from "../../service/fetching";

import { IPetCard, isAnimal } from "../../types/types";
import { IPetInformation } from "../../types/types";

type Props = {
    animalId: number;
};

const AnimalContent: React.FC<Props> = ({ animalId }) => {
    const { accessToken } = useAuthStore();

    const {
        getPets,
        status,
        setStatus,
        _tranformToPetCard,
        _tranformToPetInformation,
    } = PetsFetching();

    const [singleAnimal, setSingleAnimal] = useState<IPetInformation>(
        null as any as IPetInformation
    );
    const [likedAnimalInformation, setLikedAnimalInformation] =
        useState<IPetCard>(null as any as IPetCard);

    const getSinglePet = async (animalId: number, accessToken: string) => {
        const data = (await getPets("animals", "", accessToken, [
            String(animalId),
        ])) as unknown;

        console.log(data);

        if (isAnimal(data)) {
            setSingleAnimal(_tranformToPetInformation(data.animal));

            setLikedAnimalInformation(_tranformToPetCard(data.animal));
        } else {
            setStatus("error");
            throw new Error("Pets do not match(Recent)");
        }
    };

    useEffect(() => {
        if (accessToken) {
            getSinglePet(animalId, accessToken);
        }
    }, [accessToken]);

    switch (status) {
        case "loading":
            return <LoadingSinglePet></LoadingSinglePet>;
        case "idle":
            if (singleAnimal !== null) {
                return (
                    <>
                        <AnimalSlider
                            photos={singleAnimal.photos}
                        ></AnimalSlider>

                        <section className=" my-7 px-2 flex lg:flex-row justify-center flex-col gap-5 items-start">
                            <AnimalInfo
                                singleAnimal={singleAnimal}
                            ></AnimalInfo>
                            <AnimalInquiry
                                {...likedAnimalInformation}
                            ></AnimalInquiry>
                        </section>
                    </>
                );
            } else {
                return <LoadingSinglePet></LoadingSinglePet>;
            }
        case "error":
            return <div>Ошибка</div>;
    }
};

const LoadingSinglePet: React.FC = () => {
    return (
        <div className=" py-9 px-3 h-[1200px] flex justify-center gap-4 lg:flex-nowrap flex-wrap">
            <div
                role="status"
                className=" w-[1500px] h-[900px] p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
            >
                <div className="flex items-center justify-center h-[700px] mb-4 bg-gray-300 rounded dark:bg-gray-700">
                    <svg
                        className="w-12 h-12 text-gray-200 dark:text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 640 512"
                    >
                        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                    </svg>
                </div>

                {[
                    [...new Array(5)].map((item, i) => {
                        return (
                            <div key={i}>
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-2 mb-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                        );
                    }),
                ]}

                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default observer(AnimalContent);
