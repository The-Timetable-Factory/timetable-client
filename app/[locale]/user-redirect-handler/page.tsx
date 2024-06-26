'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UsernameInput from "../../ui/sign-in/username-input";


export default function Page() {
    const { data: session } = useSession()
    console.log(session)
    console.log(session?.user)

    if (!session || !session.user) {
        return <div>Please sign in</div>
    }

    if (!session.user.isNew) {
        redirect("/timetables")
    }

    if (session.user.isNew) {
        return <UsernameInput />
    }

    // return <UsernameInput />


}