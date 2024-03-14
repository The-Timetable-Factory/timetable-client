"use server"
import { signIn, signOut } from "../../../auth"
import Button from '@mui/material/Button'

export function GoogleSignIn() {
    return (

        <form
            action={async () => {
                'use server'
                await signIn('google')
            }}
        >
            <Button
                variant="outlined"
                color="info"
                sx={{ marginBottom: "10px" }}
                type="submit"
            >
                Sign in with Google</Button>
        </form>
        // <Button
        //     variant="outlined"
        //     color="info"
        //     sx={{ marginBottom: "10px" }}
        //     onClick={async () => {
        //         "use server"
        //         console.log('signing in')
        //         await signIn('google')
        //     }}
        // >
        //     Sign in with Google</Button>
    )
}