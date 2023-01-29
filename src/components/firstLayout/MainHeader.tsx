import Image from 'next/image';

import ProfilePart  from './ProfilePart';

import mainLogo from '../../../public/assets/icons/logo.svg';
import heartIcon from '../../../public/assets/icons/heart.svg';
import profiletIcon from '../../../public/assets/icons/profile.svg';



export const MainHeader: React.FC = () => {
    return (
        <header>
            <nav className=" min-h-[70px] lg:px-40 px-3">
                <div className=" flex min-h-[inherit] lg:flex-row justify-between flex-col items-center gap-7 -z-0">
                    <div className=" flex gap-3 items-center cursor-pointer">
                        <Image width={48} height={48} src={mainLogo} alt="mainLogo"></Image>

                        <div className=" text-3xl text-red-300">PetProject</div>
                    </div>
                    {/* <div className=" flex items-center relative">
                        <div className="mr-5 cursor-pointer  hover:border-red-300  hover:border-[1px] rounded-lg transition-all">
                            <Image width={48} height={48} src={heartIcon} alt="heartIcon"></Image>
                        </div>
                        <span className="h-[45px] border-red-300  border-[1px]"></span>
                        <button
                            type="button"
                            className={`peer flex items-center hover:border-red-300  hover:border-[1px]  cursor-pointer transition-all ml-5 px-2 rounded-lg hover:shadow-sm hover:bg-white`}>
                            <div>
                                <Image
                                    width={40}
                                    height={40}
                                    src={profiletIcon}
                                    alt="profiletIcon"
                                    style={{ fill: '#fca5a5' }}></Image>
                            </div>
                            <div className=" pl-5 text-lg text-gray-700">nikveiwer dfvdfvf</div>
                        </button>

                        <ul
                            // ref={dropdownRef}
                            className={` peer-hover:block hover:block hidden group/dropdown absolute overflow-visible left-[92px] top-11 z-10 w-48 sm:w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all`}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button">
                            <li
                                className="py-1 hover:border-red-300  hover:border-[1px] rounded-lg"
                                role="none">
                                <a
                                    href="#"
                                    className="text-gray-700 block px-4 py-2 text-sm"
                                    role="menuitem"
                                    id="menu-item-0">
                                    Edit
                                </a>
                            </li>
                            <li
                                className="py-1 hover:border-red-300  hover:border-[1px] rounded-lg"
                                role="none">
                                <a
                                    href="#"
                                    className="text-gray-700 block px-4 py-2 text-sm"
                                    role="menuitem"
                                    id="menu-item-0">
                                    Edit
                                </a>
                            </li>
                        </ul>
                    </div> */}
                    <ProfilePart></ProfilePart>
                </div>
            </nav>
        </header>
    );
};
