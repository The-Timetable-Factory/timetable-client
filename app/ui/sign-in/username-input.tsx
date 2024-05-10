'use client'
import { useSession } from "next-auth/react";
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDarkMode } from '@/app/ui/context/dark-mode-context';
import Button from '@mui/material/Button';
import { useDebouncedCallback } from "use-debounce";
import { checkUsernameExistance, updateUsername } from "@/app/lib/data/server";
import OutlinedInput from "@mui/material/OutlinedInput";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/navigation'

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

function getModalStyle(darkMode: boolean) {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: darkMode ? "#121212DD" : "#DAD6CEDD",
        borderRadius: "20px",
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
        maxHeight: "100%",
        gap: "1rem"
    };

    return style
}

export default function usernameInput() {
    const router = useRouter()
    const { data: session } = useSession()
    const [open, setOpen] = useState(true)
    const [username, setUsername] = useState<User>({ username: '', status: UsernameStatus.NULL });
    const { darkMode } = useDarkMode();

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

    async function handleContinue() {
        if (!session?.user?.accessToken) return;
        const { email } = await updateUsername(username.username, session?.user?.accessToken)
        if (email) {
            router.push('/timetables')
        }

    }


    return (
        <Modal open={open}  >
            <Box sx={getModalStyle(darkMode)}>
                <Typography variant="subtitle1">Please enter a username before continuing</Typography>
                <OutlinedInput
                    id="sign-up-username"
                    fullWidth
                    onChange={handleUsernameChange}
                    autoComplete="off"
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

                <Button
                    disabled={username.status !== UsernameStatus.AVAILABLE}
                    variant='outlined'
                    color='info'
                    onClick={handleContinue}>
                    Continue
                </Button>


            </Box>
        </Modal>
    )
}