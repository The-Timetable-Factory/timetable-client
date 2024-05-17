"use client"
import { useSession } from "next-auth/react"
import { useTranslation } from "react-i18next"
import Typography from '@mui/material/Typography'
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import EmailIcon from '@mui/icons-material/Email';
import NumbersIcon from '@mui/icons-material/Numbers';

export default function Profile() {
    const { data: session, update, status } = useSession()
    const { t } = useTranslation()

    if (!session || !session.user) {
        return <div> Please sign in</div>
    }

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
                                    defaultValue={session?.user?.name}
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
                                    defaultValue={session?.user?.email}
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