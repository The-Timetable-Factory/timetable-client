'use client'

import { redirect } from "next/navigation";
import UsernameInput from "../../ui/sign-in/username-input";
import { createClient } from "@/utils/supabase/client";

// TODO: Comeback and refactor this page

export default async function Page() {
    // const { data: session } = useSession()
    // console.log(session)
    // console.log(session?.user)

    // if (!session || !session.user) {
    //     return <div>Please sign in</div>
    // }

    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();



    // if (!session.user.isNew) {
    //     redirect("/timetables")
    // }

    // if (session.user.isNew) {
    //     return <UsernameInput />
    // }

    // return <UsernameInput />


}