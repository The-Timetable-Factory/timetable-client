'use client'
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useDarkMode } from '@/app/ui/context/dark-mode-context';
import Button from '@mui/material/Button';

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
        py: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100%",
        maxHeight: "100%",
        my: 1
    };

    return style
}

export default function usernameInput() {
    const [open, setOpen] = useState(true)
    const [username, setUsername] = useState("")
    const { darkMode } = useDarkMode();



    function handleClose() {

    }
    return (
        <Modal open={open} onClose={handleClose} >
            <Box sx={getModalStyle(darkMode)}>
                <TextField
                    label="Username"
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                    color="info"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    variant='outlined'
                    color='info'
                    onClick={() => setOpen(false)}>
                    Submit
                </Button>


            </Box>
        </Modal>
    )
}