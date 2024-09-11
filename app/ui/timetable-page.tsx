'use client'
import React, { useEffect } from "react";
// import { useDarkMode } from "../../../ui/context/dark-mode-context";
import Grid from "@mui/material/Grid";
import Menu from '@/app/ui/menu/menu';
import TimetableCarousel from "@/app/ui/main-content/timetable-carousel/timetable-carousel";
import { useParams } from "next/navigation";
import { courseInfo } from "../lib/interfaces/courses-interfaces";
import { useCoursesStore } from "../lib/store/courses-store";
import { useStylingStore } from "../lib/store/styling-store";
import { useIpadSettingsStore } from "../lib/store/ipad-settings-store";
import { useIphoneSettingsStore } from "../lib/store/iphone-settings-store";
import { useA4SettingsStore } from "../lib/store/a4-settings-store";
import { useLetterSettingsStore } from "../lib/store/letter-settings-store";
import { StylingState } from "../lib/interfaces/styling-interfaces";
import { useTitleStore } from "../lib/store/title-store";

interface TimetablePageProps {
    courses?: courseInfo[]
    styling?: StylingState
    iphoneDisplaySettings?: any
    ipadDisplaySettings?: any
    letterDisplaySettings?: any
    a4DisplaySettings?: any
    timetableTitle?: string
}

export default function TimetablePage(props: TimetablePageProps) {

    console.log('TimetablePage')
    console.log(props.timetableTitle)

    const setCourses = useCoursesStore((state: any) => state.setCourses)
    const setStyling = useStylingStore((state: any) => state.setStyling)
    const setIpadDisplaySettings = useIpadSettingsStore((state: any) => state.setIpadDisplaySettings)
    const setIphoneDisplaySettings = useIphoneSettingsStore((state: any) => state.setIphoneDisplaySettings)
    const setLetterDisplaySettings = useLetterSettingsStore((state: any) => state.setLetterDisplaySettings)
    const setA4DisplaySettings = useA4SettingsStore((state: any) => state.setA4DisplaySettings)
    const setTitle = useTitleStore((state: any) => state.setTitle)

    useEffect(() => {
        console.log('useEffect running on mount');
        if (props.courses) {
            console.log('setting courses');
            setCourses(props.courses);
        }
        if (props.styling) {
            console.log('setting styling');
            setStyling(props.styling);
        }

        if (props.iphoneDisplaySettings) {
            console.log('setting iphoneDisplaySettings');
            setIphoneDisplaySettings(props.iphoneDisplaySettings);
        }

        if (props.ipadDisplaySettings) {
            console.log('setting ipadDisplaySettings');
            setIpadDisplaySettings(props.ipadDisplaySettings);
        }

        if (props.letterDisplaySettings) {
            console.log('setting letterDisplaySettings');
            setLetterDisplaySettings(props.letterDisplaySettings);
        }

        if (props.a4DisplaySettings) {
            console.log('setting a4DisplaySettings');
            setA4DisplaySettings(props.a4DisplaySettings);
        }

        if (props.timetableTitle) {
            console.log('setting timetableTitle');
            setTitle(props.timetableTitle)
        }
    }, []);//This useEffect did not run, how to fix it?


    return (
        <div>

            <Grid container direction="row" sx={{ minHeight: "780px" }}>
                <Grid item xs={12} sm={12} md={12} lg={8.5}
                    justifyContent="center"
                    display="flex"
                    sx={{ overflow: "visible" }}
                >
                    <TimetableCarousel />

                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={3.5}
                // sx={{ borderRadius: "10px 0px 0px 10px", borderStyle: "none none none solid", borderColor: `${darkMode ? "#232323" : "#C2B8A3"}`, borderWidth: "1px" }}
                >
                    {/* I want to make this grid scrollable */}
                    <Menu />
                </Grid>
            </Grid>

        </div>
    )
}

// {/* <Grid container direction="row" sx={{ minHeight: "780px" }}>
//                  <Grid item xs={12} sm={12} md={12} lg={8.5}
//                      justifyContent="center"
//                      display="flex"
//                      sx={{ overflow: "visible" }}
//                  >
//                      <TimetableCarousel />
//                  </Grid>

//                  <Grid item xs={12} sm={12} md={12} lg={3.5}
//                  // sx={{ borderRadius: "10px 0px 0px 10px", borderStyle: "none none none solid", borderColor: `${darkMode ? "#232323" : "#C2B8A3"}`, borderWidth: "1px" }}
//                  >
//                      {/* I want to make this grid scrollable */}
//                      <Menu />
//                  </Grid>
//              </Grid> */}