import Image from 'next/image';

import mainLogo from '../../../public/assets/icons/logo.svg';
import heartIcon from '../../../public/assets/icons/heart.svg';
import profiletIcon from '../../../public/assets/icons/profile.svg';

export const MainHeader: React.FC = () => {
    return (
        <nav className=" min-h-[70px] px-40">
            <div className=" flex min-h-[inherit] justify-between">
                <div className=" flex gap-3 items-center cursor-pointer">
                    <Image src={mainLogo} alt="mainLogo"></Image>
                    <div className=" text-3xl">PetProject</div>
                </div>
                <div className=" flex items-center ">
                    <div className="w-[48px] h-[48px] pr-5">
                        <Image className="w-[48px] h-[48px]" src={heartIcon} alt="heartIcon"></Image>
                    </div>
                    <span className="h-[70px] border-slate-700  border-[1px]"></span>
                    <div className="w-[48px] h-[48px] pl-5">
                        <Image className="w-[48px] h-[48px]" src={profiletIcon} alt="profiletIcon"></Image>
                    </div>
                </div>
            </div>
        </nav>
    );
};
