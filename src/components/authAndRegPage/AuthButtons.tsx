"use client";

import { useSupabase } from "../../config/supabaseClient";

export const AuthButtons: React.FC = () => {
    const { supabase } = useSupabase();

    const signUp = async () => {
        const answer = await supabase.auth.signUp({
            email: "ulanov20029@gmail.com",
            password: "1234vddd2545vf",
            options: {
                data: {
                    username: "someUsername",
                },
            },
        });

        console.log("SignUpAnswer", answer);
    };

    const signIn = async () => {
        const answer = await supabase.auth.signInWithPassword({
            email: "ulanov20029@gmail.com",
            password: "1234vddd2545vf", //"1234vddd2"
        });

        console.log("SignInAnswer", answer);
    };

    const signOut = async () => {
        const answer = await supabase.auth.signOut();

        console.log("SignOutAnswer", answer);
    };

    return (
        <section className=" pt-20 flex justify-center text-center font-semibold text-gray-700">
            <button
                onClick={signUp}
                className="mt-7 bg-red-300 rounded-xl text-white text-center hover:bg-red-400 transition-all"
            >
                signUp
            </button>

            <button
                onClick={signIn}
                className="mt-7 bg-red-300 rounded-xl text-white text-center hover:bg-red-400 transition-all"
            >
                signIn
            </button>

            <button
                onClick={signOut}
                className="mt-7 bg-red-300 rounded-xl text-white text-center hover:bg-red-400 transition-all"
            >
                signOut
            </button>
        </section>
    );
};
