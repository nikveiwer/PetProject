import Image from "next/image";
import Link from "next/link";

import ProfilePart from "./ProfilePart";

import mainLogo from "../../../public/assets/icons/logo.svg";
import heartIcon from "../../../public/assets/icons/heart.svg";
import profiletIcon from "../../../public/assets/icons/profile.svg";

export const MainHeader: React.FC = () => {
    return (
        <header>
            <nav className=" min-h-[70px] xl:px-40 lg:px-14 py-4 px-3">
                <div className=" flex min-h-[inherit] sm:flex-row justify-between flex-col items-center gap-7 -z-0">
                    <div className=" flex gap-3 items-center cursor-pointer">
                        <Link href="/">
                            <div className=" flex gap-3 items-center cursor-pointer">
                                <Image
                                    width={48}
                                    height={48}
                                    src={mainLogo}
                                    alt="mainLogo"
                                ></Image>
                                <div className=" text-3xl text-red-300">
                                    PetProject
                                </div>
                            </div>
                        </Link>
                    </div>
                    <ProfilePart></ProfilePart>
                </div>
            </nav>
        </header>
    );
};
