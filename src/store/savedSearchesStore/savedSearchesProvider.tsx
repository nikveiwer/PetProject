"use client";

import SavedSearchesStore from "./savedSearchesStore";
import { SavedSearchesStoreContext } from "./savedSearchesStore";

export default function SavedSearchesStoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SavedSearchesStoreContext.Provider value={new SavedSearchesStore()}>
            {children}
        </SavedSearchesStoreContext.Provider>
    );
}
