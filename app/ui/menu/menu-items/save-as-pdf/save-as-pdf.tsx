import { useDarkMode } from "@/app/ui/context/dark-mode-context";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useDisplayStore } from "@/app/lib/store/display-store";
import { usePagesStore } from "@/app/lib/store/pages-store";
import { getDisplayConstant } from "@/app/lib/utils/developer-display";
import { getScale } from "@/app/lib/utils/developer-display";
import { useState } from "react";
import { jsPDF } from "jspdf";
import { generateBase64Image } from "@/app/lib/utils/download";
import { UAParser } from "ua-parser-js"
import { useTranslation } from "react-i18next";

export default function SaveAsPDF() {
    const { darkMode } = useDarkMode()
    const display = useDisplayStore((state: any) => state.display)
    const widgets = true
    const numberOfPages = usePagesStore((state: any) => state.numberOfPages)
    const { PDF_SETTINGS, SCALE, WIDTH } = getDisplayConstant(display, widgets)
    const [isHovered, setIsHovered] = useState(false)

    const parser = new UAParser(window.navigator.userAgent);
    const isLaptop = parser.getDevice().type !== "mobile" && parser.getDevice().type !== "tablet";

    const divStyle = {
        boxShadow: isHovered ? `2px 2px 20px #C2B8A3, -2px 2px 20px #C2B8A3` : "",
    }

    const { t } = useTranslation()

    async function setDownloadState() {
        for (let i = 0; i < numberOfPages; i++) {
            const deviceDiv = document.getElementById(`${display}${i + 1}`);
            deviceDiv!.style.transform = "scale(1)";
        }
    }

    function revertDownloadState() {
        if (typeof window === 'undefined') return; // ✅ Prevent SSR crash

        for (let i = 0; i < numberOfPages; i++) {
            const deviceDiv = document.getElementById(`${display}${i + 1}`);
            if (deviceDiv) {
                const scale = getScale(SCALE, window.innerWidth, WIDTH);
                deviceDiv.style.transform = `scale(${scale})`;
            }
        }
    }



    async function handleSaveAsPDF() {
        console.log('Save As PDF')
        setDownloadState();

        const input = document.getElementById(`TimetableBackground${display}1`)
        const doc = new jsPDF(PDF_SETTINGS.PAGE_ORIENTATION, "px", [input!.offsetWidth, input!.offsetHeight]);

        for (let i = 0; i < numberOfPages - 1; i++) {
            const scale = isLaptop ? 6 : 4
            if (input) {
                const base64Image = await generateBase64Image(display, i + 1, scale);
                await doc.addImage(base64Image, 'PNG', 0, 0, input.offsetWidth, input.offsetHeight);
            }

            if (i < numberOfPages - 2) {
                doc.addPage();
            }
            await new Promise(resolve => setTimeout(resolve, 600));

        }

        doc.save('timetable.pdf');
        revertDownloadState();
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
            <IconButton color="info" onClick={handleSaveAsPDF} sx={{ width: "100%" }}>
                <Typography variant="h4">{t('save_as_pdf')}</Typography>
                <PictureAsPdfIcon sx={{ position: "absolute", right: "4%" }} />
            </IconButton>

        </div>
    )
}