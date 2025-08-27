'use client'

import { useDarkMode } from "../../ui/context/dark-mode-context";
import { useRouter } from 'next/navigation'
import Typography from "@mui/material/Typography"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { fetchTimetableTitles } from '@/app/lib/data/server'
import TimetableButton from "@/app/ui/dashboard/timetable-button";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { type User } from '@supabase/supabase-js'

export default function Dashboard({ user }: { user: User | null }) {
    console.log(JSON.stringify(user))
    const router = useRouter()
    // Fetch the user's timetable titles
    // const timetables = fetchTimetableTitles("1")
    const { t } = useTranslation()
    const supabase = createClient();
    const [username, setUsername] = useState<string | null>(null)
    const [timetables, setTimetables] = useState<any[]>([])


    const getUsername = useCallback(async () => {
        try {
            const { data, error, status } = await supabase
                .from('profiles')
                .select('username')
                .eq('email', user?.email)
                .single() //What does .single do??

            if (error && status !== 406) {
                console.log(error)
                throw error
            }
            if (data) {
                setUsername(data.username)
            }
        } catch (error) {
            alert('Error loading user data!')
        }
    }, [user, supabase])

    const getTimetable = useCallback(async () => {
        try {
            console.log("user_id", user?.id)
            const { data, error, status } = await supabase
                .from('timetables')
                .select(`title, id`)
                .eq('user_id', user?.id)

            if (error && status !== 406) {
                console.log(error)
                throw error
            }
            if (data) {
                console.log("timetable", data)
                setTimetables(data)
            }
        } catch (error) {
            alert('Error loading user data!')
        }
    }, [user, supabase])


    useEffect(() => {
        getUsername()
        getTimetable()
    }, [user, getUsername, getTimetable])


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

                <Typography variant="h4">{username}'s {t('my_timetables')}</Typography>

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
                        // onclick should take you to the timetable page

                        return <TimetableButton title={timetable.title} id={timetable.id} />
                    })
                }
            </div>

            <p>{ }</p>

        </div>
    )
}