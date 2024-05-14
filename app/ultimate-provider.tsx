'use client';
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./mui-theme";
import { DarkMode } from "./ui/context/dark-mode-context";
import initTranslations from "./i18n";
import { Resource, createInstance } from "i18next";
import { I18nextProvider } from "react-i18next";

export default function UltimateProvider({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);
    // const i18n = createInstance();
    // initTranslations(locale, namespaces, i18n, resources);

    return (

        // <I18nextProvider i18n={i18n}>
        <DarkMode.Provider value={{ darkMode, setDarkMode }}>
            <ThemeProvider theme={getTheme(darkMode)}>
                {children}
            </ThemeProvider>
        </DarkMode.Provider>
        // </I18nextProvider>
    )
}
