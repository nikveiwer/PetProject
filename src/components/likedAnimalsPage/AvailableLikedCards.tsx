"use client";

import { useEffect, useState } from "react";

import PetCard from "../mainPage/PetCard";
import { SkeletonCard } from "../mainPage/SkeletonCard";
import { NoLikedWindow } from "./NoLikedWindow";

import { observer } from "mobx-react-lite";

import { useLikedStore } from "../../store/likedStore/likedStore";
import { useSupabase } from "../../config/supabaseClient";

import { StatusType } from "../../service/request";

const AvailableLikedCards: React.FC = () => {
    const { likedAnimals, loadLiked, sortLiked, numberOfLiked } =
        useLikedStore();
    const { supabase, user } = useSupabase();

    const [status, setStatus] = useState<StatusType>("idle");

    const fetchLikedPets = async () => {
        setStatus("loading");

        const queryColumn = sortLiked === "-name" ? "name" : sortLiked;
        const queryOrder =
            sortLiked === "-name" || sortLiked === "likedAt"
                ? { ascending: false }
                : { ascending: true };

        const { data, error } = await supabase
            .from("likedAnimals")
            .select("*")
            .eq("user_id", user?.id ?? "")
            .order(queryColumn, queryOrder);

        if (!error && data) {
            loadLiked(data);

            console.log(data);

            setStatus("idle");
        } else {
            setStatus("error");
        }
    };

    useEffect(() => {
        if (user) {
            fetchLikedPets();
        }
    }, [sortLiked, user]);

    if (status === "idle" && !numberOfLiked) {
        return <NoLikedWindow />;
    }

    switch (status) {
        case "loading":
            return (
                <div className=" py-9 px-3 grid lg:grid-cols-4 min-[873px]:grid-cols-4 min-[683px]:grid-cols-3 min-[455px]:grid-cols-2 grid-cols-1 grid-rows-3 auto-rows-auto justify-between justify-items-center gap-7 ">
                    {[...new Array(12)].map((item, i) => {
                        return <SkeletonCard key={i}></SkeletonCard>;
                    })}
                </div>
            );
        case "idle":
            return (
                <div className="  py-9 px-3 grid min-[1630px]:grid-cols-4 lg:grid-cols-3 min-[873px]:grid-cols-4 min-[683px]:grid-cols-3 min-[455px]:grid-cols-2 grid-cols-1  grid-rows-3 auto-rows-auto justify-between justify-items-center gap-7 ">
                    {likedAnimals.map(({ api_id, id, ...rest }) => {
                        return (
                            <PetCard
                                key={api_id}
                                api_id={api_id}
                                {...rest}
                                expanded
                            ></PetCard>
                        );
                    })}
                </div>
            );
        case "error":
            return <div>Error</div>;
        default:
            return <div>Error</div>;
    }
};

export default observer(AvailableLikedCards);
