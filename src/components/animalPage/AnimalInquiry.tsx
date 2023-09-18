"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import uuid from "uuid4";
import { useEffect, useState } from "react";
import { useSupabase } from "../../config/supabaseClient";
import { useLikedStore, ILikedAnimal } from "../../store/likedStore/likedStore";

import { IPetCard } from "../../types/types";

interface Props extends IPetCard {}

type StatusType = "idle" | "error" | "loading" | "saved";

const AnimalInquiry: React.FC<Props> = (props) => {
    const { name, petLink, id } = props;

    const { supabase, user } = useSupabase();
    const router = useRouter();

    const [likedStatus, setLikedStatus] = useState<StatusType>("idle");
    const [added, setAdded] = useState<boolean>(false);

    const { likedAnimals, addLiked, deleteLiked, isSaved } = useLikedStore();

    console.log(`Animal page status: ${likedStatus}`);
    console.log(`Added: ${added}`);

    const sendLikedAnimalInformation = async (likedData: ILikedAnimal) => {
        setLikedStatus("loading");

        let { data, error } = await supabase
            .from("likedAnimals")
            .insert([likedData]);

        if (!error) {
            setLikedStatus("saved");
        } else {
            setLikedStatus("error");
        }
    };

    const deleteLikedAnimalInformation = async () => {
        setLikedStatus("loading");

        const { data, error } = await supabase
            .from("likedAnimals")
            .delete()
            .eq("api_id", id)
            .eq("user_id", user?.id ?? "");

        if (!error) {
            setLikedStatus("idle");
        } else {
            setLikedStatus("error");
        }
    };

    const checkAndChangeAddState = () => {
        if (!user) {
            router.push("authAndReg/SignIn");
            return;
        }

        setAdded((added) => !added);
    };

    useEffect(() => {
        if (isSaved(id)) {
            setLikedStatus("saved");
        }
    }, []);

    useEffect(() => {
        if (likedStatus === "idle" && added) {
            const likedData = {
                ...props,
                likedAt: new Date().toISOString(),
                user_id: user?.id ?? "",
                api_id: id,
                id: uuid(),
            };

            addLiked(likedData);

            sendLikedAnimalInformation(likedData);
        }

        if (likedStatus === "saved") {
            deleteLiked(id);

            deleteLikedAnimalInformation();
        }
    }, [added]);

    return (
        <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
                Considering {name} for adoption?
            </h5>

            <button
                className={` w-full px-3 py-2 mb-3 text-sm font-medium text-center text-white uppercase bg-red-300 rounded-lg hover:bg-red-400
                transition-all focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            >
                <a href={petLink}>Start your inquiry</a>
            </button>

            {likedStatus === "idle" && (
                <button
                    onClick={checkAndChangeAddState}
                    className=" w-full px-3 py-2 flex justify-center items-center gap-2 text-sm font-medium text-center text-white uppercase bg-red-300 rounded-lg hover:bg-red-400 transition-all focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <div>add to favorites</div>
                    {/* <AiOutlineHeart></AiOutlineHeart> */}
                    <Icon
                        icon="mdi:cards-heart-outline"
                        color="white"
                        width={19}
                        height={19}
                    />
                </button>
            )}

            {likedStatus === "loading" && (
                <button className=" w-full px-3 py-2 h-8 rounded-lg animate-pulse bg-gray-400"></button>
            )}

            {likedStatus === "saved" && (
                <button
                    onClick={() => setAdded((add) => !add)}
                    className=" w-full px-3 py-2 flex justify-center items-center gap-2 text-sm font-medium text-center border-red-300 border-[1px] text-gray-900 uppercase bg-white rounded-lg hover:bg-red-300 hover:text-white transition-all focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <div>exclude of favorites</div>
                    <Icon
                        icon="mdi:cards-heart"
                        color="#fda4af"
                        width={19}
                        height={19}
                    />
                </button>
            )}

            {likedStatus === "error" && (
                <button
                    onClick={() => setAdded((add) => !add)}
                    className=" w-full px-3 py-2 flex justify-center items-center gap-2 text-sm font-medium text-center border-red-300 border-[1px] text-gray-900 uppercase bg-white rounded-lg cursor-default"
                >
                    <div>Something went wrong(. Please update the page</div>
                </button>
            )}
        </div>
    );
};

export default AnimalInquiry;
