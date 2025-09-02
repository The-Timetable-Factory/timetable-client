'use client'

import Typography from "@mui/material/Typography"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from "@mui/material/CardActionArea";
import { useRouter } from 'next/navigation'
import { useMediaQuery } from '@mui/material'

interface TimetableButtonProps {
    id: string
    title: string
}

export default function TimetableButton({ id, title }: TimetableButtonProps) {
    const router = useRouter()

    const isMobile = useMediaQuery('(max-width:600px)')

    const cardContentStyle: React.CSSProperties = {
        height: "12rem",
        position: "relative",
        padding: isMobile ? "0.6rem" : "1.2rem",
    }

    const handleClick = () => {
        router.push(`/timetables/${id}/edit`)
    }

    return (
        <Card variant="outlined">
            <CardActionArea onClick={handleClick}>
                <CardContent style={cardContentStyle}>
                    <Typography
                        variant="h4"
                        style={{
                            position: "absolute",
                            bottom: "1rem",
                            display: "flex"
                        }}
                    >
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
