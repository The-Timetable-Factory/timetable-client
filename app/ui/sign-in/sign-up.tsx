'use client'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import { signIn } from 'next-auth/react'
import OutlinedInput from "@mui/material/OutlinedInput";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { useDebouncedCallback } from "use-debounce";
import { checkUsernameExistance, checkEmailRegistered } from "@/app/lib/data/server";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from '@mui/material/Tooltip';

enum UsernameStatus {
    AVAILABLE = 'available',
    NOT_AVAILABLE = 'notAvailable',
    LOADING = 'loading',
    NULL = ''
}

interface User {
    username: string;
    status: UsernameStatus;
}

enum EmailStatus {
    VALID = 'valid',
    INVALID = 'invalid',
    NOT_AVALIABLE = 'notAvailable', //Email is already registered
    LOADING = 'loading',
    NULL = ''
}

interface Email {
    email: string;
    status: EmailStatus;
}

enum PasswordStatus {
    IS_VALID = 'valid',
    NULL = '',
    ERROR = 'error'
}

interface Password {
    password: string;
    status: PasswordStatus;
    error: string;
}

enum VerifyPasswordStatus {
    IS_VALID = 'valid',
    NULL = '',
    ERROR = 'error'
}

interface VerifyPassword {
    verifyPassword: string;
    status: VerifyPasswordStatus;
    error: string;
}


export default function SignUp() {
    const [username, setUsername] = useState<User>({ username: '', status: UsernameStatus.NULL });
    const [email, setEmail] = useState<Email>({ email: '', status: EmailStatus.NULL });
    const [password, setPassword] = useState<Password>({ password: '', status: PasswordStatus.NULL, error: '' });
    const [verifyPassword, setVerifyPassword] = useState<VerifyPassword>({ verifyPassword: '', status: VerifyPasswordStatus.NULL, error: '' });
    let signUpDisabled = username.status !== UsernameStatus.AVAILABLE || email.status !== EmailStatus.VALID || password.status !== PasswordStatus.IS_VALID || verifyPassword.status !== VerifyPasswordStatus.IS_VALID


    const handleUsernameChange = useDebouncedCallback(async (e: any) => {
        e.preventDefault();

        if (e.target.value === '') {
            setUsername(user => ({ ...user, status: UsernameStatus.NULL }));
            return;
        }
        setUsername(user => ({ ...user, username: e.target.value, status: UsernameStatus.LOADING }));

        // Fetch to see if username is available
        const usernameExistance = await checkUsernameExistance(e.target.value)

        setUsername(user => ({
            username: e.target.value,
            status: !usernameExistance ? UsernameStatus.AVAILABLE : UsernameStatus.NOT_AVAILABLE
        }));

    }, 600);


    const handleEmailChange = useDebouncedCallback(async (e: any) => {
        // Regular expression pattern for validating email address format
        e.preventDefault();
        const emailValue = e.target.value;

        if (emailValue === '') {
            setEmail(email => ({ ...email, email: emailValue, status: EmailStatus.NULL }));
            return;
        }

        setEmail(email => ({ ...email, email: emailValue, status: EmailStatus.LOADING }));

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailPattern.test(emailValue);

        if (!isEmail) {
            setEmail(email => ({ ...email, status: EmailStatus.INVALID }));
            return;
        }

        // Fetch to see if email is already registered

        const registered = await checkEmailRegistered(e.target.value)

        setEmail({ email: e.target.value, status: registered ? EmailStatus.NOT_AVALIABLE : EmailStatus.VALID })

    }, 600)

    const handlePasswordChange = useDebouncedCallback((e: any) => {
        e.preventDefault()

        if (e.target.value === '') {
            setPassword({ password: e.target.value, status: PasswordStatus.NULL, error: '' })
            return
        }

        if (e.target.value.length < 8) {
            setPassword({ password: e.target.value, status: PasswordStatus.ERROR, error: 'Password must be at least 8 characters long' })
            return
        }

        setPassword({ password: e.target.value, status: PasswordStatus.IS_VALID, error: '' })
    }, 600)

    const handleVerifyPasswordChange = useDebouncedCallback((e: any) => {
        e.preventDefault()

        if (e.target.value === '') {
            setVerifyPassword({ verifyPassword: e.target.value, status: VerifyPasswordStatus.NULL, error: '' })
            return
        }

        if (e.target.value !== password.password) {
            setVerifyPassword({ verifyPassword: e.target.value, status: VerifyPasswordStatus.ERROR, error: 'Passwords do not match' })
            return
        }

        setVerifyPassword({ verifyPassword: e.target.value, status: VerifyPasswordStatus.IS_VALID, error: '' })
    }, 600)

    async function handleSignUp() {

        console.log('sign up')
        const res = await signIn('credentials', {
            username: username.username,
            email: email.email,
            password: password.password,
            action: 'signup',
            redirect: false
        })

        //Redirect to verify email page
        console.log(res)
    }
    return (
        <>


            <div id='signup'
                // className="menuItemContainer" 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <table style={{ borderSpacing: '20px' }}>
                    <tbody>
                        <tr>
                            <td>

                                <Typography variant="h4" sx={{ textAlign: 'left' }}>Sign Up</Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="body1">Username:</Typography>
                            </td>
                            <td>
                                <OutlinedInput
                                    id="sign-up-username"
                                    fullWidth
                                    onChange={handleUsernameChange}
                                    // sx={{ marginBottom: "10px" }}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            {username.status === UsernameStatus.AVAILABLE ?
                                                <Tooltip title="Username is available" arrow>
                                                    <CheckIcon />
                                                </Tooltip> :
                                                username.status === UsernameStatus.NOT_AVAILABLE ?
                                                    <Tooltip title="Username is not available" arrow>
                                                        <CloseIcon color='error' />
                                                    </Tooltip> :
                                                    username.status == UsernameStatus.LOADING ?
                                                        <CircularProgress size='20px' /> :
                                                        ''}
                                        </InputAdornment>
                                    }
                                />
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

                                            {email.status === EmailStatus.VALID ?
                                                <Tooltip title="Valid email" arrow>
                                                    <CheckIcon />
                                                </Tooltip> :
                                                email.status === EmailStatus.INVALID ?
                                                    <Tooltip title="Invalid email" arrow>
                                                        <CloseIcon color='error' />
                                                    </Tooltip> :
                                                    email.status === EmailStatus.NOT_AVALIABLE ?
                                                        <Tooltip title="Email is already registered" arrow>
                                                            <PersonIcon color='error' />
                                                        </Tooltip> :
                                                        email.status == EmailStatus.LOADING ?
                                                            <CircularProgress size='20px' /> :
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
                                    id="sign-up-password"
                                    type="password"
                                    fullWidth
                                    onChange={handlePasswordChange}
                                    // sx={{ marginBottom: "10px" }}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            {password.status === PasswordStatus.ERROR ?
                                                <Tooltip title="Password must be at least 8 characters long" arrow>
                                                    <CloseIcon color='error' />
                                                </Tooltip> :
                                                password.status === PasswordStatus.IS_VALID ?
                                                    <Tooltip title="Password is valid" arrow>
                                                        <CheckIcon />
                                                    </Tooltip> :
                                                    ''
                                            }
                                        </InputAdornment>
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="body1">Verify Password:</Typography>
                            </td>
                            <td>
                                <OutlinedInput
                                    id="sign-up-verify-password"
                                    type="password"
                                    onChange={handleVerifyPasswordChange}
                                    fullWidth
                                    // sx={{ marginBottom: "10px" }}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            {verifyPassword.status === VerifyPasswordStatus.ERROR ?
                                                <Tooltip title={verifyPassword.error} arrow>
                                                    <CloseIcon color='error' />
                                                </Tooltip> :
                                                verifyPassword.status === VerifyPasswordStatus.IS_VALID ?
                                                    <Tooltip title="Password is valid" arrow>
                                                        <CheckIcon />
                                                    </Tooltip> :
                                                    ''
                                            }
                                        </InputAdornment>
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ textAlign: 'center' }}>
                                <Button
                                    fullWidth
                                    disabled={signUpDisabled}
                                    variant={signUpDisabled ? 'contained' : 'outlined'}
                                    color="info"
                                    onClick={handleSignUp}

                                >
                                    <PersonAddAlt1Icon sx={{ marginRight: "6px" }} fontSize='small' />
                                    Sign Up
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}