// import { auth } from "../../auth"

"use client"

import { useSession } from "next-auth/react"
import Typography from '@mui/material/Typography'
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import EmailIcon from '@mui/icons-material/Email';
import NumbersIcon from '@mui/icons-material/Numbers';

export default function Page() {

    const { data: session, update, status } = useSession()
    if (!session || !session.user) {
        return <div> Please sign in</div>
    }

    console.log('session: ', session)

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
                                <Typography variant="h4">My Profile</Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <TextField
                                    color="info"
                                    label="Username"
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
                                    label="Email"
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
                                    label="Date Joined"
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
                                    label="Number of Timetable"
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