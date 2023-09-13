"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useSupabase } from "../../config/supabaseClient";
import { MainInput } from "../Inputs/MainInput";
import { AuthButtons } from "./AuthButtons";

export type ErrorMessages = {
    email?: string;
    username?: string;
    password?: string;
    passwordConfirm?: string;
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
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
        email: "Error Message",
        username: "",
        password: "",
        passwordConfirm: "",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [authError, setAuthError] = useState<string>("");

    const resetError = (errorKey: keyof ErrorMessages) => {
        setErrorMessages((prev) => ({
            ...prev,
            [errorKey]: "",
        }));
    };

    const SignInValidationErrors = (): ErrorMessages => {
        const errors: ErrorMessages = {};

        if (!email.length) {
            errors.email = "Required field";
        }

        if (!password.length) {
            errors.password = "Required field";
        }

        return errors;
    };

    const SignUpValidationErrors = (): ErrorMessages => {
        const errors: ErrorMessages = {};

        if (username.length < 5) {
            errors.username = "Username must contain at least 5 symbols";
        }

        if (!email.length) {
            errors.email = "Required field";
        }

        if (!password.length) {
            errors.password = "Required field";
        }

        const validateEmailRegex = /^\S+@\S+\.\S+$/;
        if (!validateEmailRegex.test(email)) {
            errors.email = "Incorrect email";
        }

        if (password !== passwordConfirm) {
            errors.passwordConfirm = "Passwords must be the same";
        }

        return errors;
    };

    // const onSignIn = () => {
    //     const errors
    // }

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
                {authError && (
                    <div className=" my-3 mx-auto py-5 px-4 border-[2px] border-red-300 rounded-md text-red-300 text-md text-center">
                        {authError}
                    </div>
                )}
                <form className="space-y-6" action="#" method="POST">
                    {type === "SignUp" && (
                        <MainInput
                            title="Username"
                            identificator="username"
                            autoComplete="username"
                            value={username}
                            disabled={isLoading}
                            setValue={(e: ChangeEvent<HTMLInputElement>) =>
                                setUsername(e.target.value)
                            }
                            resetError={() => resetError("username")}
                            errorMessage={errorMessages.username}
                        />
                    )}

                    <MainInput
                        title="Email address"
                        identificator="email"
                        type="email"
                        value={email}
                        disabled={isLoading}
                        setValue={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                        resetError={() => resetError("email")}
                        errorMessage={errorMessages.email}
                    />

                    <MainInput
                        title="Password"
                        identificator="password"
                        type={"password"}
                        value={password}
                        disabled={isLoading}
                        setValue={(e: ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                        resetError={() => resetError("email")}
                        errorMessage={errorMessages.password}
                    />

                    {type === "SignUp" && (
                        <MainInput
                            title="Password confirmation"
                            identificator="passwordConfirm"
                            type={"password"}
                            placeholder={"Repeat your password here"}
                            value={passwordConfirm}
                            disabled={isLoading}
                            setValue={(e: ChangeEvent<HTMLInputElement>) =>
                                setPasswordConfirm(e.target.value)
                            }
                            resetError={() => resetError("passwordConfirm")}
                            errorMessage={errorMessages.passwordConfirm}
                        />
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
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
