'use client'
import React, { useState, useEffect } from "react";
import { useDarkMode } from "../../ui/context/dark-mode-context";
import Grid from "@mui/material/Grid";
import Menu from '../../ui/menu/menu';
import TimetableCarousel from "@/app/ui/main-content/timetable-carousel/timetable-carousel";
import TimetableBackground from "@/app/ui/main-content/timetable/timetable-background/timetable-background";
import Timetable from "@/app/ui/main-content/timetable/timetable";
export default function Page() {
    const { darkMode } = useDarkMode()

    return (
        <div>

            <Grid container direction="row" sx={{ minHeight: "780px" }}>
                <Grid item xs={12} sm={12} md={12} lg={8.5}
                    justifyContent="center"
                    display="flex"
                    alignItems="center"
                >

                    {/* <TimetableCarousel /> */}
                    <TimetableBackground id={1}>
                        <Timetable currPage={1} />
                    </TimetableBackground>
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
    )
}