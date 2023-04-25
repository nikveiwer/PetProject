"use client";

import Image from "next/image";
import Link from "next/link";

import { observer } from "mobx-react-lite";

import heartIcon from "../../../public/assets/icons/heart.svg";
import cardBackground from "../../../public/assets/backgrounds/cardBackground.jpg";

import { IPetCard } from "../../types/types";
import { useEffect, useState } from "react";

import { useSupabase } from "../../config/supabaseClient";
import { ILikedAnimal, useLikedStore } from "../../store/likedStore/likedStore";

type StatusType = "idle" | "error" | "loading" | "saved";
interface Props extends IPetCard {
    expanded: boolean;
}

// xl:w-56 lg:w-52 w-[184px] h-[340px]

// export const sendLikedAnimalInformation = (
//     data: IPetCard,
//     setStatus: Dispatch<SetStateAction<StatusType>>
// ) => {
//     setStatus("loading");

//     let { data, error } = await supabase
//         .from("savedSearches")
//         .insert([addedSearch]);
// };

const PetCard = ({
    imagePath,
    name,
    id,
    likedInfo,
    breed,
    petLink,
    publishedAt,
    expanded,
}: Props) => {
    const [status, setStatus] = useState<StatusType>("idle");
    const [added, setAdded] = useState<boolean>(false);

    const { supabase } = useSupabase();
    const { addLiked, deleteLiked, isSaved } = useLikedStore();

    console.log(`Pet card status: ${status}`);

    const sendLikedAnimalInformation = async (likedData: ILikedAnimal) => {
        setStatus("loading");

        let { data, error } = await supabase
            .from("likedAnimals")
            .insert([likedData]);

        if (!error) {
            setStatus("saved");
        } else {
            setStatus("error");
        }
    };

    const deleteLikedAnimalInformation = async () => {
        setStatus("loading");

        const { data, error } = await supabase
            .from("likedAnimals")
            .delete()
            .eq("id", id);

        if (!error) {
            setStatus("idle");
        } else {
            setStatus("error");
        }
    };

    useEffect(() => {
        if (isSaved(id)) setStatus("saved");
    }, []);

    useEffect(() => {
        if (status === "idle" && added) {
            const likedData = {
                imagePath,
                name,
                id,
                likedInfo,
                breed,
                petLink,
                publishedAt,
                likedAt: new Date().toISOString(),
            };

            addLiked(likedData);

            sendLikedAnimalInformation(likedData);
        }

        if (status === "saved") {
            deleteLiked(id);

            deleteLikedAnimalInformation();
        }
    }, [added]);

    return status === "error" ? (
        <ErrorCard />
    ) : (
        <div className=" relative min-[1380px]:w-64 w-52  rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 cursor-pointer">
            {status === "loading" ? (
                <>
                    <div className="top-2 right-2 absolute">
                        <svg
                            aria-hidden="true"
                            className="inline w-10 h-10 mr-2 text-white animate-spin dark:text-gray-600 fill-red-300"
                            viewBox="0 0 100 101"
                            fill="rgb(55 65 81)"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </>
            ) : (
                <button
                    className="absolute top-2 right-2"
                    onClick={() => setAdded((added) => !added)}
                >
                    <div className="peer absolute top-2 right-[7px] z-20">
                        <Image
                            width={30}
                            height={30}
                            src={heartIcon}
                            alt="heartIcon"
                        ></Image>
                    </div>
                    <div
                        className={`${
                            status === "saved" ? "opacity-100" : "opacity-50 "
                        }  w-11 h-11 flex justify-center items-center rounded-full z-10 bg-white  peer-hover:opacity-100  hover:opacity-100 transition-all `}
                    ></div>
                </button>
            )}

            {/* <div className="top-2 right-2 absolute">
                <svg
                    aria-hidden="true"
                    className="inline w-11 h-11 mr-2 text-gray-400 animate-spin dark:text-gray-600 fill-red-300"
                    viewBox="0 0 100 101"
                    fill="rgb(55 65 81)"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span className="sr-only">Loading...</span>
            </div> */}

            <Link href={`/${id}`}>
                <div>
                    <div className=" h-60">
                        {/* <Image
                            className=" rounded-t-2xl w-full h-full object-cover"
                            src={imagePath || cardBackground.src}
                            alt={"animalImage"}
                            fill={true}
                            blurDataURL={cardBackground.src}
                        ></Image> */}
                        <img
                            className=" rounded-t-2xl w-full h-full object-cover"
                            src={imagePath || cardBackground.src}
                            alt={"animalImage"}
                        ></img>
                    </div>

                    <div className=" flex justify-between items-center  flex-col py-6">
                        <div className=" text-red-300 text-2xl text-center">
                            {name}
                        </div>

                        {expanded && (
                            <>
                                <span className="text-gray-700 text-sm text-center">
                                    {likedInfo}
                                </span>
                                <span className="text-gray-700 text-sm text-center">
                                    {breed}
                                </span>

                                <div className="mt-1 text-lg underline text-red-300">
                                    Start Your Inquiry
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

const ErrorCard: React.FC = () => {
    return (
        <div className=" relative min-[1380px]:w-64 w-52  rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 cursor-pointer">
            <div>
                <div className=" p-3 h-64 flex items-center text-center text-red-300 text-2xl">
                    Something went wrong(. Please update the page.
                </div>
            </div>
        </div>
    );
};

export default observer(PetCard);
