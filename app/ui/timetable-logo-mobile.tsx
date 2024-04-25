'use client'
import Typography from "@mui/material/Typography";
import Image from 'next/image'
import TimetableFactoryBlackLogo from "../../public/timetable-factory-logo-black.png";
import TimetableFactoryBrownLogo from "../../public/timetable-factory-logo-brown.png";
import { useDarkMode } from "./context/dark-mode-context";
import { useRouter } from 'next/navigation'
import Button from "@mui/material/IconButton"
import Link from "next/link";

export default function TimetableLogoMobile() {
    const { darkMode, setDarkMode } = useDarkMode();
    const router = useRouter()

    return (
        <>

            {/* Display the School Is Factory logo based on dark mode */}
            <div onClick={() => router.push('/')} style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}>
                {darkMode ? (
                    <Image
                        src={TimetableFactoryBrownLogo}
                        alt="School Is Factory Brown Logo"
                        height={44}
                        style={{}} />
                ) : (
                    <Image
                        src={TimetableFactoryBlackLogo}
                        alt="School Is Factory Black Logo"
                        height={44} style={{}} />
                )}
            </div>

        </>
    )
}