"use client";

import FiltersStore from "./filtersStore";
import { FiltersStoreContext } from "./filtersStore";

export default function FiltersStoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <FiltersStoreContext.Provider value={new FiltersStore()}>
            {children}
        </FiltersStoreContext.Provider>
    );
}
