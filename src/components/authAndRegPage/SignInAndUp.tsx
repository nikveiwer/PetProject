"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSupabase } from "../../config/supabaseClient";
import { MainInput } from "../Inputs/MainInput";

export type ErrorMessages = {
    email?: string;
    username?: string;
    password?: string;
    passwordConfirm?: string;
};

export const SignInAndUp: React.FC<{ type: string }> = ({ type }) => {
    const { supabase, user } = useSupabase();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
        email: "",
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

    const settingNewErrors = (newErrors: ErrorMessages) => {
        setErrorMessages((prev) => ({
            ...prev,
            ...newErrors,
        }));
    };

    const signInValidationErrors = (): ErrorMessages => {
        const errors: ErrorMessages = {};

        if (!email.length) {
            errors.email = "Required field";
        }

        if (!password.length) {
            errors.password = "Required field";
        }

        return errors;
    };

    const signUpValidationErrors = (): ErrorMessages => {
        const errors: ErrorMessages = {};

        if (username.length < 5) {
            errors.username = "Username must contain at least 5 symbols";
        }

        if (username.length > 20) {
            errors.username = "Username can contain only 20 symbols";
        }

        if (username.includes(" ")) {
            errors.username = "Username must be without spaces";
        }

        const validateEmailRegex = /^\S+@\S+\.\S+$/;
        if (!validateEmailRegex.test(email)) {
            errors.email = "Incorrect email";
        }

        if (!email.length) {
            errors.email = "Required field";
        }

        if (password.length < 6) {
            errors.password = "Password should be at least 6 characters";
        }

        if (!password.length) {
            errors.password = "Required field";
        }

        if (password !== passwordConfirm) {
            errors.passwordConfirm = "Passwords must be the same";
        }

        return errors;
    };

    const onSubmit = async () => {
        const isSignIn = type === "SignIn";

        const errors = isSignIn
            ? signInValidationErrors()
            : signUpValidationErrors();

        if (Object.keys(errors).length) {
            settingNewErrors(errors);
            return;
        }

        setIsLoading(true);
        setAuthError("");

        try {
            if (isSignIn) {
                await signIn();
            } else {
                await signUp();
            }
        } catch (e) {
            const message = (e as { error_description: string })
                .error_description;

            setAuthError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async () => {
        const response = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                },
            },
        });

        if (response.error) {
            setAuthError(response.error.message);
            return;
        }

        router.push("/");
    };

    const signIn = async () => {
        const response = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (response.error) {
            setAuthError(response.error.message);
            return;
        }
        router.back();
    };

    return (
        <section className="flex min-h-[calc(100vh-153px)] flex-col justify-center px-6 pb-12 lg:px-8 bg-red-300">
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm px-8 pt-3 pb-5 bg-white rounded-lg">
                <div className="mb-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">
                        {type === "SignIn"
                            ? "Sign In to your account"
                            : "Sign Up your new account"}
                    </h2>
                </div>

                {authError && (
                    <div className=" my-3 mx-auto py-5 px-4 border-[2px] border-red-300 rounded-md text-red-300 text-md text-center">
                        {authError}
                    </div>
                )}
                <form className="space-y-6">
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
                        resetError={() => resetError("password")}
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
                            type="button"
                            onClick={onSubmit}
                            disabled={isLoading}
                            className={`flex w-full justify-center rounded-md bg-red-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600,
                            ${
                                isLoading &&
                                "opacity-50 cursor-default hover:none"
                            }`}
                        >
                            Sign {type.slice(4)}
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
            </div>
        </section>
    );
};
