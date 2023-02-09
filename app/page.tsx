import Image from 'next/image';

import RecentPets from '../src/components/mainPage/RecentPets';

import catIcon from '../public/assets/icons/cat.svg';
import dogIcon from '../public/assets/icons/dog.svg';

import CustomErrorBoundary from '../src/components/errorBoundary/customErrorBoundary';


export default async function Home() {
    return (
        <>
            <section className=" relative min-h-[500px] bg-[url('../public/assets/backgrounds/mainBacground.jpg')] py-40 px-3 bg-no-repeat">
                <h1 className=" text-center sm:text-5xl text-3xl text-red-300">
                    Find your new best friend
                </h1>
                <h2 className=" pt-3 text-red-300 text-center sm:text-2xl text-xl">
                    {' '}
                    We have huge amount of informaton about pets!
                </h2>
                <div className=" absolute left-[50%] top-96 translate-x-[-50%] flex justify-center gap-3 ">
                    <div className=" flex flex-col items-center justify-between sm:pt-2 pb-10 sm:w-52 sm:h-52 w-36 h-36 rounded-2xl  hover:border-red-300  hover:border-[3px] bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all">
                        <div>
                            <Image width={100} height={100} src={catIcon} alt="mainLogo"></Image>
                        </div>
                        <div className="text-xl">Cats</div>
                    </div>
                    <div className=" flex flex-col items-center justify-between sm:pt-2 pb-10 sm:w-52 sm:h-52 w-36 h-36 rounded-2xl  hover:border-red-300  hover:border-[3px] bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all">
                        <div>
                            <Image width={100} height={100} src={dogIcon} alt="mainLogo"></Image>
                        </div>
                        <div className="text-xl">Dogs</div>
                    </div>
                </div>
            </section>

            <section className="min-h-[700px] pt-52">
                <h3 className=" sm:text-5xl text-3xl text-red-300 text-center">
                    Recently Viewed Pets
                </h3>
                <CustomErrorBoundary fallback={<div>Ошибка поймана</div>}>
                    <RecentPets></RecentPets>
                </CustomErrorBoundary>
            </section>
        </>
    );
}
