"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

import { PetsFetching } from "../../service/fetching";

import { useAuthStore } from "../../store/authStore/authStore";

import { observer } from "mobx-react-lite";

import { isAuthData } from "../../types/types";

import heartIcon from "../../../public/assets/icons/heart.svg";
import profiletIcon from "../../../public/assets/icons/profile.svg";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useSupabase } from "../../config/supabaseClient";
import { ILikedAnimal, useLikedStore } from "../../store/likedStore/likedStore";
import { usePathname } from "next/navigation";

const ProfilePart: React.FC = () => {
    const { accessToken, setAPIAuthData, accessTimeLeft } = useAuthStore();
    const { supabase, user } = useSupabase();
    const { loadLiked } = useLikedStore();
    const pathname = usePathname();

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
            .eq("user_id", user?.id ?? "")
            .order("likedAt", { ascending: false });

        if (!error && data) {
            loadLiked(data);

            setStatus("idle");
        } else {
            setStatus("error");
        }
    };

    // const checkIfAdoptable = async (currentLikedPets: ILikedAnimal[]) => {

    // };

    const signOut = () => {
        supabase.auth.signOut();
    };

    useEffect(() => {
        moveAPIAuth();

        const intervalId = setInterval(moveAPIAuth, 3000000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        if (user) {
            fetchLikedPets();
        }
    }, [user]);

    if (status === "idle" && user) {
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
                        {user.user_metadata.username}
                    </div>
                </button>
                <ul
                    className={` py-1 peer-hover:block hover:block hidden  group/dropdown absolute overflow-visible right-0 top-11 z-10 w-48 sm:w-56 origin-top-right  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all`}
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
                    <li className="py-1 hover:border-red-300 border-[1px] border-white rounded-lg">
                        <Link
                            className="text-gray-700 block px-4 py-2 text-sm"
                            href="accountFeatures/savedSearches"
                        >
                            Saved Searches
                        </Link>
                    </li>

                    <li
                        className="py-1 px-4 flex justify-start items-center gap-1 hover:border-red-300 border-[1px] border-white rounded-lg"
                        onClick={signOut}
                        role={"button"}
                    >
                        <div className="text-gray-700 py-2 text-sm">
                            Sign Out
                        </div>
                        <Icon
                            icon="uit:signout"
                            width={25}
                            height={25}
                            fill={"#374151"}
                        />
                    </li>
                </ul>
            </div>
        );
    } else if (
        pathname !== "/authAndReg/SignUp" &&
        pathname !== "/authAndReg/SignIn"
    ) {
        return (
            <div>
                <span>
                    <Link
                        href="authAndReg/SignIn"
                        className=" text-lg text-red-300 underline"
                    >
                        Sign In
                    </Link>
                    {" or "}
                    <Link
                        href="authAndReg/SignUp"
                        className=" text-lg text-red-300 underline"
                    >
                        Sign Up
                    </Link>
                </span>
            </div>
        );
    } else {
        return null;
    }
};

export default observer(ProfilePart);
