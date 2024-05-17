'use client'

import { useDarkMode } from "../../ui/context/dark-mode-context";
import { useRouter } from 'next/navigation'
import Typography from "@mui/material/Typography"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { fetchTimetableTitles } from '@/app/lib/data/server'
import TimetableButton from "@/app/ui/dashboard/timetable-button";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
    const router = useRouter()
    // Fetch the user's timetable titles
    const timetables = fetchTimetableTitles("1")
    const { t } = useTranslation()


    const outerDivStyle = {
        padding: window.innerWidth > 600 ? "1rem 4rem" : "1rem 2rem",
    }
    const timetableButtonsDivStyle = {
        display: "grid",
        gridTemplateColumns: window.innerWidth > 600 ? "repeat(4, minmax(0, 1fr))" : "repeat(2, minmax(0, 1fr))",
        gap: "1.5rem",
        margin: "1rem 0"

    }

    return (
        <div style={outerDivStyle}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>

                <Typography variant="h4">{t('my_timetables')}</Typography>

                <Button
                    variant="outlined"
                    color="info"
                    onClick={() => { router.push('/timetables/create') }}
                    sx={{ position: "absolute", right: "0" }}
                    startIcon={<AddCircleOutlineIcon />}>
                    {t('add_new')}
                </Button>

            </div>

            <div style={timetableButtonsDivStyle}>
                {
                    timetables.map(timetable => {
                        return <TimetableButton title={timetable.title} id={timetable.id} />
                    })
                }
            </div>

        </div>
    )
}