'use client'

import { useDarkMode } from "../../ui/context/dark-mode-context";
import { useRouter } from 'next/navigation'
import Typography from "@mui/material/Typography"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TimetableButton from "@/app/ui/dashboard/timetable-button";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { type User } from '@supabase/supabase-js'

export default function Dashboard({ user }: { user: User | null }) {
    const router = useRouter()
    const { t } = useTranslation()
    const supabase = createClient();

    const [username, setUsername] = useState<string | null>(null)
    const [timetables, setTimetables] = useState<any[]>([])
    const [isMobile, setIsMobile] = useState(false)

    // ✅ Detect screen size on mount & resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 600)
        handleResize() // initial check
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // ✅ Supabase: get username
    const getUsername = useCallback(async () => {
        try {
            const { data, error, status } = await supabase
                .from('profiles')
                .select('username')
                .eq('email', user?.email)
                .single()

            if (error && status !== 406) throw error
            if (data) setUsername(data.username)
        } catch (error) {
            alert('Error loading user data!')
        }
    }, [user, supabase])

    // ✅ Supabase: get timetables
    const getTimetable = useCallback(async () => {
        try {
            const { data, error, status } = await supabase
                .from('timetables')
                .select(`title, id`)
                .eq('user_id', user?.id)

            if (error && status !== 406) throw error
            if (data) setTimetables(data)
        } catch (error) {
            alert('Error loading timetables!')
        }
    }, [user, supabase])

    useEffect(() => {
        getUsername()
        getTimetable()
    }, [user, getUsername, getTimetable])

    // ✅ Use state-based conditional styles
    const outerDivStyle = {
        padding: isMobile ? "1rem 2rem" : "1rem 4rem",
    }

    const timetableButtonsDivStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))",
        gap: "1.5rem",
        margin: "1rem 0"
    }

    return (
        <div style={outerDivStyle}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative"
            }}>
                <Typography variant="h4">{username}'s {t('my_timetables')}</Typography>

                <Button
                    variant="outlined"
                    color="info"
                    onClick={() => router.push('/timetables/create')}
                    sx={{ position: "absolute", right: "0" }}
                    startIcon={<AddCircleOutlineIcon />}
                >
                    {t('add_new')}
                </Button>
            </div>

            <div style={timetableButtonsDivStyle}>
                {timetables.map(timetable => (
                    <TimetableButton
                        key={timetable.id}
                        title={timetable.title}
                        id={timetable.id}
                    />
                ))}
            </div>
        </div>
    )
}
