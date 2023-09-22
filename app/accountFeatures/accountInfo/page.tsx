import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AccountInfo() {
    const supabase = createServerComponentSupabaseClient({ cookies, headers });

    async function changeUsername() {
        "use server";

        console.log("server action");

        // await supabase.auth.updateUser()
    }

    const { data } = await supabase.auth.getSession();

    if (!data.session?.user) {
        redirect("authAndReg/SignIn");
    }

    return (
        <section>
            <div>Account Info</div>
            <form action="/api/accountInfo" method="post">
                <input type="text" id="username" name="username" />
                <button>click me to check</button>
            </form>
        </section>
    );
}
