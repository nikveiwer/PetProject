import heartIcon from '../../../public/assets/icons/heartIcon.svg';

import { AiOutlineHeart } from 'react-icons/ai';

type Props = {
    name: string;
    petLink: string;
};

const AnimalInquiry: React.FC<Props> = ({ name, petLink }) => {
    return (
        <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 text-xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
                Considering {name} for adoption?
            </h5>

            <button className=" w-full px-3 py-2 mb-3 text-sm font-medium text-center text-white uppercase bg-red-300 rounded-lg hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <a href={petLink}>Start your inquiry</a>
            </button>
            <button className=" w-full px-3 py-2 flex justify-center items-center gap-2 text-sm font-medium text-center text-white uppercase bg-red-300 rounded-lg hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <div>add to favorites</div>
                <AiOutlineHeart></AiOutlineHeart>
            </button>
        </div>
    );
};

export default AnimalInquiry;
