import { Inter } from "@next/font/google";
import "./globals.css";

import { MainHeader } from "../src/components/firstLayout/MainHeader";
import { MainFooter } from "../src/components/firstLayout/MainFooter";

import AuthStoreProvider from "../src/store/authStore/authStoreProvider";
import FiltersStoreProvider from "../src/store/filtersStore/filtersStoreProvider";
import SavedSearchesStoreProvider from "../src/store/savedSearchesStore/savedSearchesProvider";
import LikedStoreProvider from "../src/store/likedStore/likedStoreProvider";

import SupabaseProvider from "../src/config/supabaseClient";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
    subsets: ["latin"],
    // default, can also use "swap" to ensure custom font always shows
    display: "optional",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.className}>
            <head />
            <body>
                <SupabaseProvider>
                    <LikedStoreProvider>
                        <SavedSearchesStoreProvider>
                            <AuthStoreProvider>
                                <FiltersStoreProvider>
                                    <MainHeader></MainHeader>
                                    {children}
                                </FiltersStoreProvider>
                            </AuthStoreProvider>
                        </SavedSearchesStoreProvider>
                    </LikedStoreProvider>
                </SupabaseProvider>
                <MainFooter></MainFooter>
            </body>
        </html>
    );
}
