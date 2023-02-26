import AppliedFilters from '../../../src/components/availablePetsPage/AppliedFilters';
import SortBy from '../../../src/components/availablePetsPage/SortBy';
import Filters from '../../../src/components/availablePetsPage/Filters';
import AvailableCards from '../../../src/components/availablePetsPage/AvailableCards';
import Pagination from '../../../src/components/availablePetsPage/Pagination';

type Props = {
    params: {
        pet: 'cats' | 'dogs';
    };
};

export default async function AvailablePets({ params: { pet } }: Props) {
    return (
        <>
            <section className=" relative min-h-[500px] xl:px-40 lg:px-14 py-4 px-3">
                <h2 className=" mb-11 sm:text-5xl text-3xl text-red-300 text-center">
                    {pet.charAt(0).toUpperCase() + pet.slice(1)} Available for Adoption
                </h2>

                <div className=" flex justify-start gap-7 ">
                    <Filters pet={pet} />
                    <main className="w-[1500px]">
                        <div className=" flex justify-between">
                            <AppliedFilters />
                            <SortBy />
                        </div>
                        <AvailableCards searchedType={pet}></AvailableCards>
                        <Pagination></Pagination>
                    </main>
                </div>
            </section>
        </>
    );
}
