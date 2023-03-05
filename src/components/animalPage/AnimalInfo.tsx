import { IPetInformation } from '../../types/types';

type Props = {
    singleAnimal: IPetInformation;
};

const AnimalInfo: React.FC<Props> = ({ singleAnimal }) => {
    const { name, breed, location, photos, petLink, ...rest } = singleAnimal;

    console.log(singleAnimal);

    return (
        <div className=" w-full overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{name}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{`${breed}; ${location}`}</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    {Object.entries(rest).map(([key, value]) => {
                        return (
                            <div
                                key={key}
                                className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    {key.toUpperCase()}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    {value}
                                </dd>
                            </div>
                        );
                    })}
                </dl>
            </div>
        </div>
    );
};

export default AnimalInfo;
