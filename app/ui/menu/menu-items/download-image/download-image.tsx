import { useDarkMode } from "@/app/ui/context/dark-mode-context"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';



export default function DownloadImage() {
    const { darkMode } = useDarkMode()

    function handleDownload() {
        console.log("Save as PDF")
    }

    return (
        <div
            className={`downloadContainer ${darkMode && 'downloadContainerDarkMode'}`}
        >
            <IconButton color="info" onClick={handleDownload} sx={{ width: "100%" }}>
                <Typography variant="h4">Download Image</Typography>
                <DownloadIcon sx={{ position: "absolute", right: "4%" }} />
            </IconButton>

        </div>
    )
}