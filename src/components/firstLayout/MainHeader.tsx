import Image from 'next/image';

import ProfilePart  from './ProfilePart';

import mainLogo from '../../../public/assets/icons/logo.svg';
import heartIcon from '../../../public/assets/icons/heart.svg';
import profiletIcon from '../../../public/assets/icons/profile.svg';



export const MainHeader: React.FC = () => {
    return (
        <header>
            <nav className=" min-h-[70px] lg:px-40 lg:py-0 py-4 px-3">
                <div className=" flex min-h-[inherit] lg:flex-row justify-between flex-col items-center gap-7 -z-0">
                    <div className=" flex gap-3 items-center cursor-pointer">
                        <Image width={48} height={48} src={mainLogo} alt="mainLogo"></Image>

                        <div className=" text-3xl text-red-300">PetProject</div>
                    </div>
                    <ProfilePart></ProfilePart>
                </div>
            </nav>
        </header>
    );
};
