// 'use client'
import React from "react";
// import { useDarkMode } from "../../../ui/context/dark-mode-context";
import Grid from "@mui/material/Grid";
import Menu from '../../../ui/menu/menu';
import TimetableCarousel from "@/app/ui/main-content/timetable-carousel/timetable-carousel";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/app/translation-provider";

const i18nNamespaces = ["timetable", "theme", "course"];

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
    // const { darkMode } = useDarkMode()
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}>
            <div>

                <Grid container direction="row" sx={{ minHeight: "780px" }}>
                    <Grid item xs={12} sm={12} md={12} lg={8.5}
                        justifyContent="center"
                        display="flex"
                        sx={{ overflow: "visible" }}
                    >
                        <TimetableCarousel />
                        {/* <TimetableCarousel /> */}
                        {/* <ColorRadioSelection name="deviceDivColor" handleChange={setDeviceDivColor} value={deviceDivColor} options={["#FFFFFF", "#DAD6CE", "#121212", "#000000"]} direction="column" /> */}
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={3.5}
                    // sx={{ borderRadius: "10px 0px 0px 10px", borderStyle: "none none none solid", borderColor: `${darkMode ? "#232323" : "#C2B8A3"}`, borderWidth: "1px" }}
                    >
                        {/* I want to make this grid scrollable */}
                        <Menu />
                    </Grid>
                </Grid>
            </div>
        </TranslationsProvider>
    )
}