"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useSupabase } from "../../config/supabaseClient";
import { MainInput } from "../Inputs/MainInput";
import { AuthButtons } from "./AuthButtons";

export type ErrorMessages = {
    email: string;
    username: string;
};

export const SignInAndUp: React.FC<{ type: string }> = ({ type }) => {
    const { supabase, user } = useSupabase();
    const router = useRouter();

    // useEffect(() => {
    //     if (user) {
    //         router.push("/");
    //     }
    // }, [user, router]);

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
        email: "Error Message",
        username: "",
    });

    const resetError = (errorKey: keyof ErrorMessages) => {
        setErrorMessages((prev) => ({
            ...prev,
            [errorKey]: "",
        }));
    };

    const SignInValidate = () => {
        const errors = {} as ErrorMessages;

        if (username.length < 5) {
            errors.username = "Username must contain at least 5 symbols";
        }

        const validateEmailRegex = /^\S+@\S+\.\S+$/;
        if (!validateEmailRegex.test(email)) {
        }
    };

    const signUp = () => {
        supabase.auth.signUp({
            email: "ulanov20029@gmail.com",
            password: "1234vddd2545vf",
            options: {
                data: {
                    username: "someUsername",
                },
            },
        });
    };

    const signIn = () => {
        supabase.auth.signInWithPassword({
            email: "ulanov20029@gmail.com",
            password: "1234vddd2545vf", //"1234vddd2"
        });
    };

    const signOut = () => {
        supabase.auth.signOut();
    };

    return (
        <section className="flex min-h-[calc(100vh-153px)] flex-col justify-center px-6 pb-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">
                    {type === "SignIn"
                        ? "Sign In to your account"
                        : "Sign Up your new account"}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-700"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-300 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <MainInput
                        title="Email address"
                        identificator="email"
                        autoComplete="email"
                        value={email}
                        setValue={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                        resetError={() => resetError("email")}
                        errorMessage={errorMessages.email}
                    />

                    {type === "SignUp" && (
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-700"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-300 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-700"
                            >
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-300 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-red-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>

                    <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-600 ">
                        <div>
                            {type === "SignIn"
                                ? "New to PetProject?"
                                : "Already have an account?"}
                        </div>

                        <div className="underline cursor-pointer">
                            {type === "SignIn" ? (
                                <Link href="authAndReg/SignUp">
                                    Create an account
                                </Link>
                            ) : (
                                <Link href="authAndReg/SignIn">Login</Link>
                            )}
                        </div>
                    </div>
                </form>

                <AuthButtons></AuthButtons>
            </div>
        </section>
    );
};
