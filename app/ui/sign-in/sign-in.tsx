'use-client'
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import LoginIcon from '@mui/icons-material/Login';
import { signIn } from 'next-auth/react'
import React, { useState } from 'react';
import { redirect } from 'next/navigation'
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from 'next/navigation';


enum EmailStatus {
    VALID, INVALID, NULL
}

interface Email {
    email: string,
    status: EmailStatus
}

export default function SignIn() {
    // const [isHovered, setIsHovered] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState<Email>({ email: '', status: EmailStatus.NULL });
    const [password, setPassword] = useState('');

    const handleEmailChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const emailValue = e.target.value;

        if (emailValue === '') {
            setEmail(email => ({ ...email, email: emailValue, status: EmailStatus.NULL }));
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailPattern.test(emailValue);

        if (!isEmail) {
            setEmail(email => ({ ...email, status: EmailStatus.INVALID }));
            return;
        }

        setEmail(email => ({ ...email, email: emailValue, status: EmailStatus.VALID }));

    }, 1000)

    function handleClickShowPassword() {
        setShowPassword((show) => !show)
    }

    async function handleSignIn() {
        if (email.status !== EmailStatus.VALID) {
            return;
        }
        const res = await signIn('credentials', {
            email: email.email,
            password: password,
            action: 'signin',
            callbackUrl: '/timetables'
        })

        console.log('res: ', res)

        redirect('/timetables')
    }

    return (
        <div id='signin'
            // className={`${isHovered ? "menuItemContainer" : ""}`}
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}

            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


            <table style={{ borderSpacing: '20px' }}>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <Typography variant="h4">Sign In</Typography>

                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Typography variant="body1">Email:</Typography>
                        </td>
                        <td>
                            <OutlinedInput
                                id="sign-up-email"
                                type="email"
                                fullWidth
                                onChange={handleEmailChange}
                                // sx={{ marginBottom: "10px" }}
                                endAdornment={
                                    <InputAdornment position='end'>

                                        {
                                            email.status === EmailStatus.INVALID ?
                                                <Tooltip title="Invalid email" arrow>
                                                    <CloseIcon color='error' />
                                                </Tooltip> :
                                                ''}
                                    </InputAdornment>
                                }
                            />

                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Typography variant="body1">Password:</Typography>
                        </td>
                        <td>
                            <OutlinedInput
                                fullWidth
                                // sx={{ marginBottom: "10px" }}
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={e => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            //   onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </td>

                    </tr>
                    <tr>
                        <td colSpan={2} style={{ textAlign: 'center' }}>

                            <Button
                                variant="outlined"
                                color="info"
                                fullWidth
                                onClick={() => { handleSignIn() }}
                            >
                                <LoginIcon sx={{ marginRight: "6px" }} fontSize='small' />
                                Sign In
                            </Button>
                            <Typography variant="body2" sx={{ marginTop: "20px" }}>Or</Typography>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{ textAlign: 'center' }}>
                            <Button
                                variant="outlined"
                                color="info"
                                fullWidth
                                onClick={() => { signIn('google', { callbackUrl: '/timetables' }) }}
                            >
                                <GoogleIcon sx={{ marginRight: "6px" }} fontSize='small' />
                                Sign in with Google
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{ textAlign: 'center' }}>
                            <Button
                                variant="outlined"
                                color="info"
                                fullWidth
                            >
                                <AppleIcon sx={{ marginRight: "6px" }} fontSize='small' />
                                Sign in with Apple</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
