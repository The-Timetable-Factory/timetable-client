'use client'
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import SchoolIsFactoryBlackLogo from "../../../public/SchoolIsFactoryBlackLogo.png";
import SchoolIsFactoryBrownLogo from "../../../public/SchoolIsFactoryBrownLogo.png";
import DarkModeToggle from "./dark-mode-toggle";
import { useDarkModeContext } from "../context/dark-mode-context";
import { Icon, Toolbar } from "@mui/material";
import TimetableLogo from "../timetable-logo";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import IconButton from "@mui/material/IconButton";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Link from "next/link";
import Paper from "@mui/material/Paper";
import BuyMeACoffee from "../buy-me-a-coffee";

/**
 * The `Navbar` component displays a navigation bar with branding, a title, and dark mode toggle functionality.
 *
 * @component
 */
export default function Navbar() {
    // Access the darkMode state and setDarkMode function from the DarkModeContext
    const { darkMode } = useDarkModeContext();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    }

    return (
        <>
            {/* The top navigation bar */}
            <AppBar
                position="static"
                color="secondary"
                sx={{
                    boxShadow: "0px 0px 0px",
                    borderStyle: "none none solid none",
                    borderColor: `${darkMode ? "#232323" : "#C2B8A3"}`,
                    borderWidth: "1px"
                }}
            >
                <Toolbar>
                    <TimetableLogo />
                    <Link href="/about">
                        <IconButton color="info" data-testid="info">
                            <InfoOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Link>
                    <IconButton color="info" data-testid="info">
                        <ShoppingBagOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="info" data-testid="info" onClick={handleClick}>
                        <LocalCafeOutlinedIcon fontSize="small" />
                    </IconButton>
                    <Popper
                        open={open}
                        placement="bottom-start"
                        anchorEl={anchorEl}
                        transition
                    >

                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper style={{ height: "600px", borderRadius: "20px", overflow: "hidden" }}>
                                    <BuyMeACoffee />
                                </Paper>
                            </Fade>
                        )}
                    </Popper>


                    <div style={{ marginLeft: "auto" }}>
                        <Link href="/home">
                            <IconButton color="info" data-testid="info">
                                <HomeOutlinedIcon />
                            </IconButton>
                        </Link>
                        <Link href="/profile">
                            <IconButton color="info" data-testid="info">
                                <PersonOutlinedIcon />
                            </IconButton>
                        </Link>

                        <IconButton color="info" data-testid="info">
                            <SettingsOutlinedIcon fontSize="small" />
                        </IconButton>
                        <DarkModeToggle />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}