"use client"
import { useTranslation } from "react-i18next"
import Typography from '@mui/material/Typography'
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import EmailIcon from '@mui/icons-material/Email';
import NumbersIcon from '@mui/icons-material/Numbers';
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react"
import { type User } from '@supabase/supabase-js'
import { metadata } from "@/app/[locale]/layout"


export default function Profile({ user }: { user: User | null }) {
    // const { data: session, update, status } = useSession()
    const { t } = useTranslation()
    const supabase = createClient();
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)

    const getProfile = useCallback(async () => {
        const { data: { user } } = await supabase.auth.getUser()
        let metadata = user?.user_metadata
        setUsername(metadata?.username)
        setEmail(metadata?.email)

    }, [])

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <>
            <div
                // className="menuItemContainer" 
                className="center"
                style={{ maxWidth: "600px", marginRight: "auto", marginLeft: "auto" }}>

                <table style={{ borderSpacing: '2rem' }}>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <Typography variant="h4">{t('my_profile')}</Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <TextField
                                    color="info"
                                    label={t('username')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AlternateEmailIcon color="info" fontSize="small" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                    disabled
                                    defaultValue={username}
                                    fullWidth
                                />
                            </td>
                            <td>
                                <TextField
                                    color="info"
                                    label={t('email')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon color="info" fontSize="small" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                    disabled
                                    defaultValue={email}
                                    fullWidth
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <TextField
                                    color="info"
                                    label={t('date_joined')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CalendarTodayOutlinedIcon color="info" fontSize="small" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                    disabled
                                    defaultValue="TBD"
                                    fullWidth
                                />
                            </td>
                            <td>
                                <TextField
                                    color="info"
                                    label={t('number_of_timetable')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <NumbersIcon color="info" fontSize="small" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                    disabled
                                    defaultValue="TBD"
                                    fullWidth
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )

}