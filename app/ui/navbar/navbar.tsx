'use client'
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import DarkModeToggle from "./dark-mode-toggle";
import { useDarkMode } from "../context/dark-mode-context";
import { Icon, Toolbar } from "@mui/material";
import TimetableLogo from "../timetable-logo";
import Link from "next/link";
import BuyMeACoffeeButton from "./buy-me-a-coffee-button";
import TimetableLogoMobile from "../timetable-logo-mobile";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from 'next/navigation'

// import MUI icon
import LogoutIcon from '@mui/icons-material/Logout';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import IconButton from "@mui/material/IconButton";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

/**
 * The `Navbar` component displays a navigation bar with branding, a title, and dark mode toggle functionality.
 *
 * @component
 */
export default function Navbar() {
    // Access the darkMode state and setDarkMode function from the DarkModeContext
    const { darkMode } = useDarkMode();
    const session = useSession()
    const isLoggedIn = session && session.data && session.data.user
    const pathname = usePathname()
    // if pathname contains /timetables/, then show the Outlined Textfield to edi the title
    const title = pathname.includes("/timetables/") ? true : false
    console.log(pathname)
    // Get path name

    let isDesktop;
    if (typeof window !== "undefined") {
        isDesktop = window.innerWidth > 600

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
                    borderWidth: "0px",
                    height: "60px"
                }}
            >
                <Toolbar>
                    {
                        isDesktop ? <TimetableLogo /> : <TimetableLogoMobile />
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

                    {
                        title &&

                        <OutlinedInput
                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                            fullWidth
                            className="downloadContainer"
                            size="small"
                            sx={{ borderRadius: "100px", width: "30%", margin: "auto", textAlign: 'center' }}
                            id="outlined-adornment-password"
                            placeholder="title"
                            type='text'
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"

                                        //   onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        <EditOutlinedIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />

                    }



                    <div style={{ marginLeft: "auto" }}>

                        {isLoggedIn &&

                            <Link href="/timetables">
                                <IconButton color="info" data-testid="info">
                                    <HomeOutlinedIcon />
                                </IconButton>
                            </Link>
                        }

                        <Link href={isLoggedIn ? "/profile" : "/signin"}>
                            <IconButton color="info" data-testid="info">
                                <PersonOutlinedIcon />
                            </IconButton>
                        </Link>

                        {/* {session && session.data && session.data.user &&

                            <IconButton color="info" data-testid="info">
                                <SettingsOutlinedIcon fontSize="small" />
                            </IconButton>

                        } */}
                        {session && session.data && session.data.user &&

                            <IconButton color="info" data-testid="info" onClick={() => signOut({ callbackUrl: '/signin' })}>
                                <LogoutIcon fontSize="small" />
                            </IconButton>

                        }
                        <DarkModeToggle />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}