'use client'
import React, { useState } from "react"
import { useDarkMode } from "@/app/ui/context/dark-mode-context"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import { UAParser } from "ua-parser-js"

//import utils
import { getDisplayConstant } from "@/app/lib/utils/developer-display";
import { getScale } from "@/app/lib/utils/developer-display";
import { generateBase64Image } from "@/app/lib/utils/download";

//import stores
import { useDisplayStore } from "@/app/lib/store/display-store";
import { usePagesStore } from "@/app/lib/store/pages-store";
import { useStylingStore } from "@/app/lib/store/styling-store";

import ImagePopUp from "./image-pop-up/image-pop-up";

import { useTranslation } from "react-i18next"



export default function DownloadImage() {
    const { darkMode } = useDarkMode()
    const display = useDisplayStore((state: any) => state.display)
    const widgets = true
    const numberOfPages = usePagesStore((state: any) => state.numberOfPages)
    const backgroundColor = useStylingStore((state: any) => state.backgroundColor)

    const { SCALE, WIDTH } = getDisplayConstant(display, widgets)

    const [open, setOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [timetableImgs, setTimetableImgs] = useState<Array<string>>([]);

    const { t } = useTranslation()

    const divStyle = {
        boxShadow: isHovered ? `2px 2px 20px #C2B8A3, -2px 2px 20px #C2B8A3` : "",
    }

    async function handleDownload() {
        if (typeof window === 'undefined') return; // prevent SSR crash
        const parser = new UAParser(window.navigator.userAgent);
        const isLaptop = parser.getDevice().type !== "mobile" && parser.getDevice().type !== "tablet";

        const downloadFunction = isLaptop ? handleLaptopDownload : handleMobileDownload;
        downloadFunction();
        console.log("Download Image")
    }

    async function handleMobileDownload() {
        setOpen(true)
        setDownloadState();
        await generateTimetableImages();
        revertDownloadState();
    }

    async function handleLaptopDownload() {
        for (let i = 0; i < numberOfPages; i++) {
            const base64Image = await generateBase64Image(display, i + 1, 6, backgroundColor);
            downloadImage(base64Image);
            await new Promise(resolve => setTimeout(resolve, 600));
        }
    }

    /**
     * Set the initial state for the download process
     */
    function setDownloadState() {
        setTimetableImgs([])
        for (let i = 0; i < numberOfPages; i++) {
            const deviceDiv = document.getElementById(`${display}${i + 1}`);
            deviceDiv!.style.transform = "scale(1)";
        }
    }
    function revertDownloadState() {
        if (typeof window === 'undefined') return;

        for (let i = 0; i < numberOfPages; i++) {
            const deviceDiv = document.getElementById(`${display}${i + 1}`);
            if (deviceDiv) {
                deviceDiv.style.transform = `scale(${getScale(SCALE, window.innerWidth, WIDTH)})`;
            }
        }
    }

    async function generateTimetableImages() {
        const timetableImages: string[] = [];
        for (let i = 0; i < numberOfPages; i++) {
            const base64Image = await generateBase64Image(display, i + 1, 4, backgroundColor);
            timetableImages.push(base64Image);
            await new Promise(resolve => setTimeout(resolve, 600));
        }
        setTimetableImgs(timetableImages);
    }

    // Function to initiate the download of a base64-encoded image
    function downloadImage(base64Image: string) {
        const anchor = document.createElement("a");
        anchor.setAttribute("href", base64Image);
        anchor.setAttribute("download", "Timetable-Wallpaper.png");
        anchor.click();
        anchor.remove();
    }

    function handleMouseEnter() {
        setIsHovered(true)

    }

    function handleMouseLeave() {
        setIsHovered(false)
    }


    return (
        <div
            className={`downloadContainer ${darkMode && 'downloadContainerDarkMode'}`}
            style={divStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <IconButton color="info" onClick={handleDownload} sx={{ width: "100%" }}>
                <Typography variant="h4">{t("download_image")}</Typography>
                <DownloadIcon sx={{ position: "absolute", right: "4%" }} />
            </IconButton>

            <ImagePopUp open={open} setOpen={setOpen} contents={timetableImgs} />

        </div>
    )
}