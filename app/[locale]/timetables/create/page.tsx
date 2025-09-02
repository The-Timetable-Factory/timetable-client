// 'use client'
import React from "react";
// import { useDarkMode } from "../../../ui/context/dark-mode-context";
// import Grid from "@mui/material/Grid";
// import Menu from '../../../ui/menu/menu';
// import TimetableCarousel from "@/app/ui/main-content/timetable-carousel/timetable-carousel";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/app/translation-provider";
import TimetablePage from "@/app/ui/timetable-page";

const i18nNamespaces = ["timetable", "theme", "course", "common", "styling", "settings"];

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
    // const { darkMode } = useDarkMode()
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}>
                <div>
                    
                </div>
            {/* <TimetablePage /> */}
        </TranslationsProvider>
    )
}