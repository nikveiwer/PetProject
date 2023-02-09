import Image from 'next/image';

import heartIcon from '../../../public/assets/icons/heart.svg';

type Props = {
    imagePath: string;
    name: string;
}

export const PetCard = ({imagePath, name}: Props) => {

    return (
        <div className=" relative w-64 h-[340px] rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 cursor-pointer">

            <div className="peer absolute top-4 right-[15px] z-20"><Image width={30} height={30} src={heartIcon} alt="heartIcon"></Image></div>
            <div className=" top-2 right-2 absolute w-11 h-11 flex justify-center items-center rounded-full opacity-50 z-10 bg-white  peer-hover:opacity-100  hover:opacity-100 transition-all ">
                {/* <div className="z-20"><Image width={30} height={30} src={heartIcon} alt="heartIcon"></Image></div> */}
            </div>


            <div className=' h-60'>
                <img className=" rounded-t-2xl w-full h-full object-cover" src={imagePath} alt={"animalImage"}></img>
            </div>

            <div className=" flex justify-center pt-6">
            <div className=' text-red-300 text-2xl text-center'>{name}</div>
            </div>
        </div>
    );
};
