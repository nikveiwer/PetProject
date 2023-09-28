// import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ChangeNameInput from "../../../src/components/Inputs/ChangeNameInput";
import { MainInput } from "../../../src/components/Inputs/MainInput";

import { changeUsername } from "../../actions/accountActions";

export default async function AccountInfo() {
    const supabase = createServerComponentClient({ cookies });

    const { data } = await supabase.auth.getSession();

    if (!data.session?.user) {
        redirect("authAndReg/SignIn");
    }

    return (
        <section>
            <form
                action={changeUsername as unknown as string}
                className="bg-gray-50 mt-5 px-4 py-2 flex flex-col gap-3  sm:gap-4 sm:px-6"
            >
                <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-500 uppercase"
                >
                    What is your username?
                </label>
                <div className="flex flex-col gap-2 sm:gap-5 sm:flex-row">
                    {/* <input
                        className={`block max-w-sm rounded-md border-0 py-1.5 px-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-red-300 sm:text-sm sm:leading-6`}
                        type="text"
                        id="username"
                        name="username"
                        defaultValue={data.session?.user.user_metadata.username}
                    /> */}

                    <ChangeNameInput />
                    {/* <button className=" px-3 bg-red-300 rounded-lg text-white ">
                        Change username
                    </button> */}
                </div>
            </form>
        </section>
    );
}
