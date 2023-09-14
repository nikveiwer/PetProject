"use client";

import { errorMonitor } from "events";
import { ChangeEvent } from "react";

interface MainInputProps {
    identificator: string;
    title?: string;
    type?: string;
    placeholder?: string;
    autoComplete?: string;
    required?: boolean;
    disabled?: boolean;
    errorMessage?: string;
    value: string;
    setValue?: (event: ChangeEvent<HTMLInputElement>) => void;
    resetError?: () => void;
}

export const MainInput: React.FC<MainInputProps> = ({
    title,
    identificator,
    type = "text",
    placeholder,
    autoComplete,
    required,
    disabled,
    errorMessage,
    value,
    setValue,
    resetError,
}) => {
    return (
        <div>
            <label
                htmlFor={identificator}
                className="block text-sm font-medium leading-6 text-gray-700"
            >
                {title}
            </label>
            <div className="mt-2">
                <input
                    id={identificator}
                    name={identificator}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required={required}
                    disabled={disabled}
                    value={value}
                    onChange={setValue}
                    onBlur={resetError}
                    onFocus={resetError}
                    className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-red-300 sm:text-sm sm:leading-6 ${
                        errorMessage &&
                        "ring-red-500 focus:ring-red-500 ring-2 ring-inset"
                    } ${disabled && "opacity-50 cursor-default"}`}
                />
            </div>
            {errorMessage && (
                <div className=" text-red-500 text-sm break-words">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};
