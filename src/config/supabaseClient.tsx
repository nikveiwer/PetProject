"use client";
// import { createClient } from '@supabase/supabase-js';
// import { Database } from '../types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// export default supabase;

import { createContext, useContext, useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../types/supabase";
import { User } from "@supabase/supabase-js";

type SupabaseContext = {
    supabase: SupabaseClient<Database>;
    user?: User | null;
};

const SupabaseContext = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [supabase] = useState(() =>
        createBrowserSupabaseClient({ supabaseKey, supabaseUrl })
    );
    const [user, setUser] = useState<User | undefined | null>(undefined);
    const router = useRouter();

    const getUserInfo = async () => {
        const userInfo = (await supabase.auth.getUser()).data.user;

        setUser(userInfo);
    };

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_OUT") {
                router.push("/");
            }

            router.refresh();

            setUser(session?.user);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, supabase]);

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <SupabaseContext.Provider value={{ supabase, user }}>
            <>{children}</>
        </SupabaseContext.Provider>
    );
}

export const useSupabase = () => {
    const context = useContext(SupabaseContext);

    if (context === undefined) {
        throw new Error("useSupabase must be used inside SupabaseProvider");
    }

    return context;
};
