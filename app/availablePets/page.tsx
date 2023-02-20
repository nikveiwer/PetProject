import AppliedFilters from "../../src/components/availablePetsPage/AppliedFilters";

export default async function AvailablePets() {
  return (
    <>
      <section className=" relative min-h-[500px] py-5 px-3 ">
        <h2 className=" mb-5 sm:text-5xl text-3xl text-red-300 text-center">
          Dogs Available for Adoption
        </h2>

        <div className=" flex justify-center gap-3 ">
          <aside className="max-w-[250px]"></aside>
          <main className=" max-w-[1000px]">
            <div className=" flex justify-between">
              <AppliedFilters></AppliedFilters>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
