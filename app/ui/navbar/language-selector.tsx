'use client'
import LanguageIcon from '@mui/icons-material/Language';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import i18nConfig from '@/i18nConfig';
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation';
import { useDarkMode } from "@/app/ui/context/dark-mode-context";
import Box from '@mui/material/Box';


export default function LanguageSelector({ locale: currentLocale }: { locale: string }) {
    const [locale, setLocale] = useState<string>('en');
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    // const { i18n } = useTranslation();
    // const currentLocale = i18n.language;
    const router = useRouter();
    const currentPathname = usePathname();

    // const currentLocale = currentPathname.split('/')[1];
    const { darkMode } = useDarkMode()


    useEffect(() => {
        setLocale(currentLocale);
    })

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    }

    function handleLanguageChange(newLocale: string) {
        setLocale(newLocale);
        if (
            currentLocale === i18nConfig.defaultLocale &&
            !i18nConfig.prefixDefault
        ) {
            router.push('/' + newLocale + currentPathname);
        } else {
            router.push(
                currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
            );
        }

        router.refresh();
        setOpen(false);
    }

    return (
        <>
            <IconButton
                color="info"
                data-testid="info"
                onClick={handleClick}
            >
                <LanguageIcon fontSize="small" />
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
                        {/* <Paper style={{ height: "600px", borderRadius: "20px", overflow: "hidden" }}> */}

                        <Box sx={{ backgroundColor: (darkMode ? "#121212" : "#DAD6CE"), borderRadius: '20px', padding: '1rem' }}>

                            <ToggleButtonGroup
                                color="info"
                                value={locale}
                                orientation='vertical'
                            // sx={{ display: 'grid', gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
                            >
                                <ToggleButton size='small' value='en' onClick={() => handleLanguageChange('en')}>English</ToggleButton>
                                <ToggleButton size='small' value='fr' onClick={() => handleLanguageChange('fr')} sx={{ margin: '4px 14px' }}>Français</ToggleButton>
                                <ToggleButton size='small' value='zh' onClick={() => handleLanguageChange('zh')}>中文</ToggleButton>
                                <ToggleButton size='small' value='zh-HK' onClick={() => handleLanguageChange('zh-HK')}>繁體中文</ToggleButton>
                                <ToggleButton size='small' value='ko' onClick={() => handleLanguageChange('ko')}>한국어</ToggleButton>
                                <ToggleButton size='small' value='ja' onClick={() => handleLanguageChange('ja')}>日本語</ToggleButton>
                                <ToggleButton size='small' value='ms' onClick={() => handleLanguageChange('ms')}>Melayu</ToggleButton>
                                <ToggleButton size='small' value='es' onClick={() => handleLanguageChange('es')}>Español</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                        {/* </Paper> */}
                    </Fade>
                )}
            </Popper>
        </>
    )
}