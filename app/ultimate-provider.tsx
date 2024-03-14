'use client';
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./mui-theme";
import { DarkMode } from "./ui/context/dark-mode-context";

export default function UltimateProvider({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <DarkMode.Provider value={{ darkMode, setDarkMode }}>
            <ThemeProvider theme={getTheme(darkMode)}>
                {children}
            </ThemeProvider>
        </DarkMode.Provider>
    )
}

// import {auth} from "../auth"
// import { SessionProvider } from "next-auth/react"

// export default async function Page(){
//     const session = await auth()
//     if (session?.user){
//         session.user = {
//             name: session.user.name,
//             email: session.user.email,
//             image: session.user.image,
//         }
//     }

//     return (
//         <SessionProvider session={session}>
//             <h1>Profile</h1>
//         </SessionProvider>
//     )
// }