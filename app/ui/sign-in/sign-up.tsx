'use client'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
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
import { useTranslation } from "react-i18next";
import { createClient } from '@/utils/supabase/client';

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
    const supabase = createClient();
    const [username, setUsername] = useState<User>({ username: '', status: UsernameStatus.NULL });
    const [email, setEmail] = useState<Email>({ email: '', status: EmailStatus.NULL });
    const [password, setPassword] = useState<Password>({ password: '', status: PasswordStatus.NULL, error: '' });
    const [verifyPassword, setVerifyPassword] = useState<VerifyPassword>({ verifyPassword: '', status: VerifyPasswordStatus.NULL, error: '' });
    let signUpDisabled = username.status !== UsernameStatus.AVAILABLE || email.status !== EmailStatus.VALID || password.status !== PasswordStatus.IS_VALID || verifyPassword.status !== VerifyPasswordStatus.IS_VALID
    const { t } = useTranslation()
    const [redirectUrl, setRedirectUrl] = useState<string>("");

    useEffect(() => {
    if (typeof window !== "undefined") {
        setRedirectUrl(`${window.location.origin}/dashboard`);
    }
    }, []);


    const handleUsernameChange = useDebouncedCallback(async (e: any) => {
        e.preventDefault();

        if (e.target.value === '') {
            setUsername(user => ({ ...user, status: UsernameStatus.NULL }));
            return;
        }
        setUsername(user => ({ ...user, username: e.target.value, status: UsernameStatus.LOADING }));

        const { data, error } = await supabase.rpc('username_exists', { username_to_check: e.target.value })

        console.log(data, error)

        setUsername(user => ({
            username: e.target.value,
            status: !data ? UsernameStatus.AVAILABLE : UsernameStatus.NOT_AVAILABLE
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

        const { data, error } = await supabase.rpc('email_exists', { email_to_check: e.target.value })

        setEmail({ email: e.target.value, status: data ? EmailStatus.NOT_AVALIABLE : EmailStatus.VALID })

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
        let { data, error } = await supabase.auth.signUp({
            email: email.email,
            password: password.password,
            options: {
                data: {
                    username: username.username,
                    email: email.email,
                    first_name: 'Apple',
                    last_name: 'Bees'
                },
                emailRedirectTo: redirectUrl //redirect to /dashboard by using useRouter()
            }
        })

        //TODO: NEED TO HANDLE ERROR
        // email already registered

        console.log(data)
        console.log(error)
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

                                <Typography variant="h4" sx={{ textAlign: 'left' }}>{t('sign_up')}</Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="body1">{t('username')}:</Typography>
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
                                                <Tooltip title={t('username_is_avaliable')} arrow>
                                                    <CheckIcon />
                                                </Tooltip> :
                                                username.status === UsernameStatus.NOT_AVAILABLE ?
                                                    <Tooltip title={t('username_is_not_avaliable')} arrow>
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
                                <Typography variant="body1">{t('email')}:</Typography>
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
                                                <Tooltip title={t('valid_email')} arrow>
                                                    <CheckIcon />
                                                </Tooltip> :
                                                email.status === EmailStatus.INVALID ?
                                                    <Tooltip title={t('invalid_email')} arrow>
                                                        <CloseIcon color='error' />
                                                    </Tooltip> :
                                                    email.status === EmailStatus.NOT_AVALIABLE ?
                                                        <Tooltip title={t('email_is_already_registered')} arrow>
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
                                <Typography variant="body1">{t('password')}:</Typography>
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
                                                    <Tooltip title={t('password_is_valid')} arrow>
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
                                <Typography variant="body1">{t('verify_password')}:</Typography>
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
                                                    <Tooltip title={t('password_is_valid')} arrow>
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
                                    {t('sign_up')}
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}