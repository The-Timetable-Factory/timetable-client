'use client'
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
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
import Link from "next/link";
import BuyMeACoffeeButton from "./buy-me-a-coffee-button";
import TimetableLogoMobile from "../timetable-logo-mobile";

/**
 * The `Navbar` component displays a navigation bar with branding, a title, and dark mode toggle functionality.
 *
 * @component
 */
export default function Navbar() {
    // Access the darkMode state and setDarkMode function from the DarkModeContext
    const { darkMode } = useDarkModeContext();
    const deviceWidth = window.innerWidth
    if (window.innerWidth > 600) {

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
                    {
                        window.innerWidth > 600 ? <TimetableLogo /> : <TimetableLogoMobile />
                    }
                    <Link href="/about">
                        <IconButton color="info" data-testid="info">
                            <InfoOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Link>
                    <IconButton color="info" data-testid="info">
                        <ShoppingBagOutlinedIcon fontSize="small" />
                    </IconButton>
                    <BuyMeACoffeeButton />

                    <div style={{ marginLeft: "auto" }}>
                        <Link href="/timetables">
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