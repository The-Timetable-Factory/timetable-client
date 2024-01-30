'use client'
import Typography from "@mui/material/Typography";
import Image from 'next/image'
import TimetableFactoryBlackLogo from "../../public/timetable-factory-logo-black.png";
import TimetableFactoryBrownLogo from "../../public/timetable-factory-logo-brown.png";
import { useDarkModeContext } from "./context/dark-mode-context";
import { useRouter } from 'next/navigation'
import Link from "next/link";

export default function TimetableLogo() {
    const { darkMode, setDarkMode } = useDarkModeContext();
    const router = useRouter()

    return (
        <>

            {/* Display the School Is Factory logo based on dark mode */}
            <div onClick={() => router.push('/')} style={{ display: "flex", flexDirection: "row" }}>

                {darkMode ? (
                    <Image
                        src={TimetableFactoryBrownLogo}
                        alt="School Is Factory Brown Logo"
                        height={46}
                        style={{ marginRight: "0.6rem" }} />
                ) : (
                    <Image
                        src={TimetableFactoryBlackLogo}
                        alt="School Is Factory Black Logo"
                        height={46} style={{ marginRight: "0.6rem" }} />
                )}
                {/* Branding and title */}
                <div className="center">
                    <Typography variant="h4" sx={{ fontSize: "1.8rem", lineHeight: 1 }}>Timetable Factory</Typography>
                    <Typography variant="caption" sx={{ lineHeight: 1 }}>By SCHOOL IS FACTORY</Typography>
                </div>
            </div>

        </>
    )
}