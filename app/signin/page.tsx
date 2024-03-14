'use client'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
// import { GoogleSignIn } from '../ui/sign-in/auth-components';
import { signIn } from 'next-auth/react'

export default function Page() {
    return (
        <>
            <div className="center" style={{ maxWidth: "400px", marginLeft: "auto", marginRight: "auto", }}>

                <Typography variant="h4">Sign In</Typography>

                {/* <GoogleSignIn /> */}

                <Button
                    variant="outlined"
                    color="info"
                    onClick={() => { signIn('google') }}
                >
                    <GoogleIcon sx={{ marginRight: "6px" }} />
                    Sign in with Google
                </Button>

                <Button
                    variant="outlined"
                    color="info"
                >
                    <AppleIcon sx={{ marginRight: "6px" }} />
                    Sign in with Apple</Button>
            </div>
        </>
    )
}