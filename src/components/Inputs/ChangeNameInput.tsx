"use client";

import { observer } from "mobx-react-lite";
import { useState } from "react";
import { changeUsername } from "../../../app/actions/accountActions";
import { useAuthStore } from "../../store/authStore/authStore";
import { MainInput } from "./MainInput";

function ChangeNameInput() {
    const { username, setUsername } = useAuthStore();

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [newUsername, setNewUsername] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        setErrorMessage("");
        setIsLoading(true);

        const message = await changeUsername(newUsername);

        if (message) {
            setErrorMessage(message);
        } else {
            setUsername(newUsername);
            setNewUsername("");
        }

        setIsLoading(false);
    };

    return (
        <div className="flex flex-col gap-2 sm:gap-5 sm:flex-row sm:items-start">
            <MainInput
                identificator="username"
                value={newUsername}
                setValue={(e) => setNewUsername(e.target.value)}
                errorMessage={errorMessage}
                placeholder={username}
                disabled={isLoading}
            ></MainInput>

            <button
                type="button"
                disabled={isLoading}
                className={`py-[3px] px-3  rounded-lg text-white  ${
                    isLoading ? "bg-red-200" : "bg-red-300 hover:bg-red-400"
                } transition-all`}
                onClick={onSubmit}
            >
                Change username
            </button>
        </div>
    );
}

export default observer(ChangeNameInput);
