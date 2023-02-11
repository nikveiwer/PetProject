import AnimalContent from '../../src/components/animalPage/AnimalContent';

import { PetsFetching } from '../../src/service/fetching';

// const { getPets } = PetsFetching();

// const getSinglePet = async (animalId: number, accessToken: string) => {
//     const res = await getPets('animals', '', accessToken, [String(animalId)]);

//     return res;
// };

type Props = {
    params: {
        animal: number;
    };
};

export default async function Animal({ params: { animal } }: Props) {
    return (
        <>
            <AnimalContent animalId={animal} />
        </>
    );
}
