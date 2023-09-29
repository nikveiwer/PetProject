"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { z } from "zod";

const supabase = createServerComponentClient({ cookies });

const usernameSchema = z.string().max(20).min(5);

export async function changeUsername(username: string): Promise<string> {
    try {
        usernameSchema.parse(username);

        await supabase.auth.updateUser({ data: { username } });

        return "";
    } catch (e: any) {
        return e?.issues[0]?.message ?? e.message;
    }
}
