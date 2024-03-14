import React from "react";
//MUI import

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useDarkMode } from "../../../../context/dark-mode-context";
import { ThemeState } from "../../../../../lib/interfaces/theme-interfaces"


interface ColorPalletesProps {
    theme: ThemeState
    handleChange: (value: string) => void
    checked: boolean
}

export default function ColorPalattes(props: ColorPalletesProps) {
    const checked = props.checked
    const { TITLE, SUBTITLE, COLORS } = props.theme

    console.log("Checked" + checked)

    const { darkMode } = useDarkMode()

    function handleChecked() {
        props.handleChange(TITLE)
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>

                <Card variant="outlined" sx={{
                    backgroundColor: checked
                        ? (darkMode ? "#DDDDDD66" : "#00000034")
                        : undefined, // If not checked, use default background color
                    maxWidth: "140px",
                    "& .MuiPaper-root": {
                        backgroundColor: "transparent",
                    }
                }} >
                    <CardActionArea onClick={handleChecked}>

                        <CardContent>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gridTemplateRows: "40px" }}>
                                {
                                    COLORS.map(color => {
                                        return (
                                            <div style={{ width: "40px", height: "40px", backgroundColor: color, border: "none", padding: 0 }}>

                                            </div>
                                        )
                                    })
                                }

                            </div>

                            <Typography variant="h6">
                                {TITLE}
                            </Typography>
                            <Typography variant="subtitle2">
                                {SUBTITLE}
                            </Typography>

                        </CardContent>
                    </CardActionArea>


                </Card >
            </div>

        </>
    )
}