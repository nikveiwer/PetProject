"use client";

import LikedStore from "./likedStore";
import { LikedStoreContext } from "./likedStore";

export default function LikedStoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LikedStoreContext.Provider value={new LikedStore()}>
            {children}
        </LikedStoreContext.Provider>
    );
}
