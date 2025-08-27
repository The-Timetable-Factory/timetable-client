import Typography from "@mui/material/Typography"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from "@mui/material/CardActionArea";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from "@mui/material/IconButton"
import { useRouter } from 'next/navigation'

interface TimetableButtonProps {
    id: string
    title: string
}

export default function TimetableButton(props: TimetableButtonProps) {
    const cardContentStyle: React.CSSProperties = {
        height: "12rem",
        position: "relative",
        padding: window.innerWidth > 600 ? "1.2rem" : "0.6rem"
    }

    const router = useRouter()

    function handleClick() {
        // Redirect to the timetable page /timetables/[id]
        router.push(`/timetables/${props.id}/edit`)

    }


    return (
        <>
            <Card variant="outlined" >
                <CardActionArea onClick={handleClick}>
                    <CardContent style={cardContentStyle}>
                        <Typography variant="h4" style={{ position: "absolute", display: "flex", bottom: "1rem" }}>{props.title}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )

}