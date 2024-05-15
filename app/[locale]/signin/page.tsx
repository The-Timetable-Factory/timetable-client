'use client'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
// import { GoogleSignIn } from '../ui/sign-in/auth-components';
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SignIn from '@/app/ui/sign-in/sign-in';
import SignUp from '@/app/ui/sign-in/sign-up';

export default function Page() {

    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', columnGap: '120px', marginLeft: '240px', marginRight: '240px', marginTop: '100px' }}>
                <SignUp />
                <SignIn />
            </div>
        </>
    )
}