'use client';
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./mui-theme";
import { DarkModeContext } from "./ui/context/dark-mode-context";

export default function UltimateProvider({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <ThemeProvider theme={getTheme(darkMode)}>
                {children}
            </ThemeProvider>
        </DarkModeContext.Provider>
    )
}