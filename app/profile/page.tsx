// import { auth } from "../../auth"

"use client"

import { useSession } from "next-auth/react"
import Typography from '@mui/material/Typography'

export default function Page() {

    const { data: session, update, status } = useSession()

    console.log('session: ', session)

    return (
        <>
            <div className="menuItemContainer" style={{ maxWidth: "600px", marginRight: "auto", marginLeft: "auto" }}>

                <Typography variant="h4">My Profile</Typography>
                <table>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td><Typography variant="body1">{session?.user?.name}</Typography></td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td><Typography variant="body1">{session?.user?.email}</Typography></td>
                        </tr>
                        <tr>
                            <td>Date Joined:</td>
                            <td><Typography variant="body1">TBD</Typography></td>
                        </tr>
                        <tr>
                            <td>Number of Timetable: </td>
                            <td><Typography variant="body1">TBD</Typography></td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </>
    )
}