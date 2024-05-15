'use client'
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from "@mui/material/Paper";
import BuyMeACoffee from "../buy-me-a-coffee";
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';

export default function BuyMeACoffeeButton() {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    }

    function handleMouse(event: React.MouseEvent<HTMLButtonElement>, open: boolean) {
        setAnchorEl(event.currentTarget);
        setOpen(open)
    }

    return (
        <>
            <IconButton
                color="info"
                data-testid="info"
                onClick={handleClick}
                onMouseEnter={(event) => handleMouse(event, true)}
            >
                <LocalCafeOutlinedIcon fontSize="small" />
            </IconButton>
            <Popper
                open={open}
                placement="bottom-start"
                anchorEl={anchorEl}
                transition
                onMouseLeave={() => setOpen(false)}
                sx={{ zIndex: 1000 }}
            >

                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper style={{ height: "600px", borderRadius: "20px", overflow: "hidden" }}>
                            <BuyMeACoffee />
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </>
    )
}