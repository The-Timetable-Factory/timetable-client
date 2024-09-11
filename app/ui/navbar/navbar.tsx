'use client'
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import DarkModeToggle from "./dark-mode-toggle";
import { useDarkMode } from "../context/dark-mode-context";
import { Icon, Toolbar } from "@mui/material";
import TimetableLogo from "../timetable-logo";
import Link from "next/link";
import BuyMeACoffeeButton from "./buy-me-a-coffee-button";
import TimetableLogoMobile from "../timetable-logo-mobile";
import { usePathname } from 'next/navigation'
import LanguageSelector from "./language-selector";
import { useTitleStore } from "@/app/lib/store/title-store";

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
import { createClient } from "@/utils/supabase/client";
import { User } from '@supabase/supabase-js'


const NavbarContent = ({ locale, isLoggedIn, title }: { locale: string, isLoggedIn: boolean, title: boolean }) => {
    const { darkMode } = useDarkMode();
    const pathname = usePathname()
    const supabase = createClient();

    async function signOut() {
        await supabase.auth.signOut();
    }

    return (
        <>
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
                    <TimetableLogo />
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
                            value={title}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
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

                            <Link href="/dashboard">
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

                        {isLoggedIn &&

                            <IconButton color="info" data-testid="info" onClick={signOut}>
                                <LogoutIcon fontSize="small" />
                            </IconButton>

                        }
                        <LanguageSelector locale={locale} />
                        <DarkModeToggle />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}


export default function Navbar({ locale }: { locale: string }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [title, setTitle] = useState(false);
    const title = useTitleStore((state: any) => state.title);

    useEffect(() => {
        const checkAuth = async () => {
            const supabase = createClient();
            const { data: { user }, } = await supabase.auth.getUser();
            setIsLoggedIn(user ? true : false);
        };

        checkAuth();
    }, []);

    useEffect(() => {
        const pathname = window.location.pathname;
        // setTitle(pathname.includes("/timetables/"));
    }, []);

    return <NavbarContent locale={locale} isLoggedIn={isLoggedIn} title={title} />;
}