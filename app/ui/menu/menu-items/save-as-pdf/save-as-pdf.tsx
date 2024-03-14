import { useDarkMode } from "@/app/ui/context/dark-mode-context";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function SaveAsPDF() {
    const { darkMode } = useDarkMode()
    function handleSaveAsPDF() {

    }
    return (
        <div
            className={`downloadContainer ${darkMode && 'downloadContainerDarkMode'}`}
        >
            <IconButton color="info" onClick={handleSaveAsPDF} sx={{ width: "100%" }}>
                <Typography variant="h4">Save As PDF</Typography>
                <PictureAsPdfIcon sx={{ position: "absolute", right: "4%" }} />
            </IconButton>

        </div>
    )
}