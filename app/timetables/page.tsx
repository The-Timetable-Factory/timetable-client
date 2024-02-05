'use client'
import React, { useState, useEffect } from "react";
import { useDarkModeContext } from "../ui/context/dark-mode-context";
import Typography from "@mui/material/Typography"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from "@mui/material/IconButton"
import { useRouter } from 'next/navigation'
import TimetableButton from "../ui/timetables/timetable-button";

export default function Page() {
    const { darkMode } = useDarkModeContext()
    const router = useRouter()
    const timetablesList = ['Fall 2023', 'Winter 2024', 'Summer 2024', 'Fall 2024']


    const outerDivStyle = { padding: window.innerWidth > 600 ? "1rem 4rem" : "1rem 2rem" }
    const timetableButtonsDivStyle = {
        display: "grid",
        gridTemplateColumns: window.innerWidth > 600 ? "repeat(4, minmax(0, 1fr))" : "repeat(2, minmax(0, 1fr))",
        gap: "1.5rem",
        margin: "1rem 0"

    }

    return (
        <div style={outerDivStyle}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>

                <Typography variant="h4">Your Timetables</Typography>
                <IconButton
                    color="info"
                    onClick={() => { router.push('/timetables/create') }}
                    sx={{ position: "absolute", right: "1rem" }}>
                    <AddCircleOutlineIcon />
                </IconButton>

            </div>

            <div style={timetableButtonsDivStyle}>
                {
                    timetablesList.map(timetable => {
                        return <TimetableButton title={timetable} />
                    })
                }
            </div>

        </div>
    )
}