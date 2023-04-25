"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

import { PetsFetching } from "../../service/fetching";

import { useAuthStore } from "../../store/authStore/authStore";

import { observer } from "mobx-react-lite";

import { isAuthData } from "../../types/types";

import heartIcon from "../../../public/assets/icons/heart.svg";
import profiletIcon from "../../../public/assets/icons/profile.svg";
import Link from "next/link";
import { useSupabase } from "../../config/supabaseClient";
import { useLikedStore } from "../../store/likedStore/likedStore";

const ProfilePart: React.FC = () => {
    const { accessToken, setAPIAuthData, accessTimeLeft } = useAuthStore();
    const { supabase } = useSupabase();
    const { loadLiked } = useLikedStore();

    const { status, setStatus, getAuthData } = PetsFetching();

    // const [likedStatus, setLikedStatus] = useState<"idle" | "loading" | "error">("loading")

    console.log(accessToken);

    const moveAPIAuth = async () => {
        const data = await getAuthData();

        if (isAuthData(data)) {
            console.log(data);
            setAPIAuthData(data);
        } else {
            setStatus("error");
            throw new Error("Authorization data does not match");
        }
    };

    const fetchLikedPets = async () => {
        setStatus("loading");

        const { data, error } = await supabase
            .from("likedAnimals")
            .select("*")
            .order("likedAt", { ascending: false });

        if (!error && data) {
            loadLiked(data);

            setStatus("idle");
        } else {
            setStatus("error");
        }
    };

    useEffect(() => {
        moveAPIAuth();

        const intervalId = setInterval(moveAPIAuth, 3000000);

        fetchLikedPets();

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    if (status === "idle") {
        return (
            <div className=" flex items-center relative">
                <div className="mr-5 cursor-pointer  hover:border-red-300 border-[1px] border-white rounded-lg transition-all">
                    <Link href={"/likedAnimals"}>
                        <Image
                            width={48}
                            height={48}
                            src={heartIcon}
                            alt="heartIcon"
                        ></Image>
                    </Link>
                </div>
                <span className="h-[45px] border-red-300  border-[1px]"></span>
                <button
                    type="button"
                    className={`peer flex items-center hover:border-red-300 border-[1px] border-white  cursor-pointer transition-all ml-5 px-2 rounded-lg hover:shadow-sm hover:bg-white`}
                >
                    <div>
                        <Image
                            width={40}
                            height={40}
                            src={profiletIcon}
                            alt="profiletIcon"
                            style={{ fill: "#fca5a5" }}
                        ></Image>
                    </div>
                    <div className=" pl-5 text-lg text-gray-700">
                        nikveiwer dfvdfvf
                    </div>
                </button>

                <ul
                    className={` py-1 peer-hover:block hover:block hidden  group/dropdown absolute overflow-visible left-[92px] top-11 z-10 w-48 sm:w-56 origin-top-right  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                >
                    <li
                        className="py-1 hover:border-red-300 border-[1px] border-white rounded-lg"
                        role="none"
                    >
                        <a
                            href="#"
                            className="text-gray-700 block px-4 py-2 text-sm"
                            role="menuitem"
                            id="menu-item-0"
                        >
                            Edit
                        </a>
                    </li>
                    <li
                        className="py-1 hover:border-red-300 border-[1px] border-white rounded-lg"
                        role="none"
                    >
                        <Link
                            className="text-gray-700 block px-4 py-2 text-sm  "
                            href="accountFeatures/savedSearches"
                        >
                            Saved Searches
                        </Link>
                    </li>
                </ul>
            </div>
        );
    } else {
        return <div>Log in</div>;
    }
};

export default observer(ProfilePart);
