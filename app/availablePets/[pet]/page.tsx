import AppliedFilters from '../../../src/components/availablePetsPage/AppliedFilters';
import SortBy from '../../../src/components/availablePetsPage/SortBy';
import Filters from '../../../src/components/availablePetsPage/Filters';

type Props = {
    params: {
        pet: 'cats' | 'dogs';
    };
};

export default async function AvailablePets({ params: { pet } }: Props) {
    return (
        <>
            <section className=" relative min-h-[500px] py-5 px-3 ">
                <h2 className=" mb-11 sm:text-5xl text-3xl text-red-300 text-center">
                    {pet.charAt(0).toUpperCase() + pet.slice(1)} Available for Adoption
                </h2>

                <div className=" flex justify-center gap-7 ">
                    <Filters />
                    <main className="w-[1000px]">
                        <div className=" flex justify-between">
                            <AppliedFilters />
                            <SortBy />
                        </div>
                    </main>
                </div>
            </section>
        </>
    );
}
