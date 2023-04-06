import Image from "next/image";
import Link from "next/link";

import heartIcon from "../../../public/assets/icons/heart.svg";
import cardBackground from "../../../public/assets/backgrounds/cardBackground.jpg";

type Props = {
    imagePath: string;
    name: string;
    id: number;
    likedInfo?: string;
    breed?: string;
    petLink?: string;
};

// xl:w-56 lg:w-52 w-[184px] h-[340px]

export const PetCard = ({
    imagePath,
    name,
    id,
    likedInfo,
    breed,
    petLink,
}: Props) => {
    return (
        <div className=" relative min-[1380px]:w-64 w-52  rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 cursor-pointer">
            <div className="peer absolute top-4 right-[15px] z-20">
                <Image
                    width={30}
                    height={30}
                    src={heartIcon}
                    alt="heartIcon"
                ></Image>
            </div>
            <div className=" top-2 right-2 absolute w-11 h-11 flex justify-center items-center rounded-full opacity-50 z-10 bg-white  peer-hover:opacity-100  hover:opacity-100 transition-all ">
                {/* <div className="z-20"><Image width={30} height={30} src={heartIcon} alt="heartIcon"></Image></div> */}
            </div>

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

                        {likedInfo && breed && petLink && (
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
