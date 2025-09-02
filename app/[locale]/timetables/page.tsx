'use client'

import React, { useState, useEffect } from "react";
import { useDarkMode } from "../../ui/context/dark-mode-context";
import Typography from "@mui/material/Typography"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/navigation'
import TimetableButton from "../../ui/dashboard/timetable-button";
import { fetchTimetableTitles } from "../../lib/data/server";
import Button from "@mui/material/Button";

export default function Page() {
    const { darkMode } = useDarkMode()
    const router = useRouter()

    // Track screen width
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 600)
        }

        checkScreenSize() // Initial check
        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    // ✅ Use state to calculate styles
    const outerDivStyle = {
        padding: isMobile ? "1rem 2rem" : "1rem 4rem",
    }

    const timetableButtonsDivStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))",
        gap: "1.5rem",
        margin: "1rem 0"
    }

    // ❗ Make sure this is not async
    const timetables = fetchTimetableTitles("1")

    return (
        <div style={outerDivStyle}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
                <Typography variant="h4">My Timetables</Typography>
                <Button
                    variant="outlined"
                    color="info"
                    onClick={() => { router.push('/timetables/create') }}
                    sx={{ position: "absolute", right: "0" }}
                    startIcon={<AddCircleOutlineIcon />}>
                    Add New
                </Button>
            </div>

            <div style={timetableButtonsDivStyle}>
                {
                    timetables.map((timetable) => (
                        <TimetableButton key={timetable.id} title={timetable.title} id={timetable.id} />
                    ))
                }
            </div>
        </div>
    )
}
