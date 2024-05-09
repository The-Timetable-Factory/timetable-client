'use client'
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

export default function usernameInput() {
    const [open, setOpen] = useState(false)
    return (
        <Modal open={open}>
            <div>
                <TextField
                    label="Username"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        </Modal>
    )
}