"use client";

import { useEffect, useState } from "react";

import { PetsFetching } from "../../service/fetching";

import { PetCard } from "../mainPage/PetCard";
import { SkeletonCard } from "../mainPage/SkeletonCard";

import { ICurrentFilters, isAnimals } from "../../types/types";
import { IAnimals } from "../../types/types";
import { IPetCard } from "../../types/types";

import { observer } from "mobx-react-lite";
import { useAuthStore } from "../../store/authStore/authStore";
import { useFiltersStore } from "../../store/filtersStore/filtersStore";

type Props = {
    searchedType: "cats" | "dogs";
};

const AvailableCards: React.FC<Props> = ({ searchedType }) => {
    const { accessToken } = useAuthStore();

    const { status, setStatus, getPets, _tranformToPetCard } = PetsFetching();

    const {
        filters,
        setRequiredFilter,
        pagination: { currentPage },
        setTotalPages,
        setPetType,
    } = useFiltersStore();

    const [pets, setPets] = useState<IPetCard[]>([]);

    const getAvailablePets = async (accessToken: string) => {
        const searchParameters: (string | boolean)[][] = [];

        (Object.keys(filters) as Array<keyof ICurrentFilters>).forEach(
            (key) => {
                if (filters[key] !== "") {
                    if (key === "good_with") {
                        searchParameters.push([`${key}_${filters[key]}`, true]);
                    }
                    if (key === "type") {
                        searchParameters.push([key, filters[key].slice(0, -1)]);
                    } else {
                        searchParameters.push([key, filters[key]]);
                    }
                }
            }
        );

        const fetchedPets = await getPets(
            "animals",
            "",
            accessToken,
            ["page", String(currentPage)],
            // ["type", filters.type.slice(0, -1)],
            ...searchParameters
        );

        console.log(fetchedPets);

        if (isAnimals(fetchedPets)) {
            const petCardInfo = fetchedPets.animals.map((pet) =>
                _tranformToPetCard(pet)
            );

            setTotalPages(fetchedPets.pagination.total_pages);

            setPets(petCardInfo);
        } else {
            setStatus("error");
            throw new Error("Pets do not match(Recent)");
        }
    };

    useEffect(() => {
        setPetType(searchedType);

        return () => {
            setPetType("");
        };
    }, []);

    useEffect(() => {
        if (accessToken && filters.type) {
            getAvailablePets(accessToken);
        }
    }, [accessToken, filters, currentPage]);

    // let status = "loading";

    switch (status) {
        case "loading":
            return (
                <div className=" py-9 px-3 grid min-[1630px]:grid-cols-4 lg:grid-cols-3 min-[873px]:grid-cols-4 min-[683px]:grid-cols-3 min-[455px]:grid-cols-2 grid-cols-1 grid-rows-3 auto-rows-auto justify-between gap-7 ">
                    {[...new Array(12)].map((item, i) => {
                        return <SkeletonCard key={i}></SkeletonCard>;
                    })}
                </div>
            );
        case "idle":
            return (
                <div className="  py-9 px-3 grid min-[1630px]:grid-cols-4 lg:grid-cols-3 min-[873px]:grid-cols-4 min-[683px]:grid-cols-3 min-[455px]:grid-cols-2 grid-cols-1  grid-rows-3 auto-rows-auto justify-between justify-items-center gap-7 ">
                    {pets.map(({ id, name, imagePath }) => {
                        return (
                            <PetCard
                                key={id}
                                id={id}
                                imagePath={imagePath}
                                name={name}
                            ></PetCard>
                        );
                    })}
                </div>
            );
        case "error":
            return <div>????????????</div>;
        default:
            return <div>????????????</div>;
    }
};

export default observer(AvailableCards);
