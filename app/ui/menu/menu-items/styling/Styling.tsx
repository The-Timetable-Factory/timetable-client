import React, { useState } from "react"
import FormControl from "@mui/material/FormControl"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ColorSelector from "../../inputs/color-selector/color-selector";
import { SESAME } from "@/app/lib/data/theme-constants";
import YesNoRadio from "./yes-no-radio/YesNoRadio";

export default function Styling() {
    const [title, setTitle] = useState("")
    const [backgroundColor, setBackgroundColor] = useState("#123456")
    const [headerColor, setHeaderColor] = useState("#654321")
    const [clockType, setClockType] = useState(false)
    const [displayTime, setDisplayTime] = useState(true)

    function handleSubmit() {

    }

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    function handleBackgroundColorChange(value: string) {
        setBackgroundColor(value)
    }

    function handleHeaderColorChange(value: string) {
        setHeaderColor(value)
    }

    function handleClockTypeChange(value: boolean) {
        setClockType(value)
    }

    function handleDisplayTimeChange(value: boolean) {

    }

    function resetToDefault() {

    }
    return (
        <>
            <div className="menuItemContainer center">
                <form onSubmit={handleSubmit}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <table>
                            <tbody>

                                <tr>
                                    <th>
                                        <Typography variant="body1">Title: </Typography>
                                    </th>
                                    <td>
                                        <TextField label="(optional)" onChange={handleTitleChange} value={title} sx={{ m: "8px", maxWidth: "160px" }} />
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        <Typography variant="body1">Start Time: </Typography>
                                    </th>
                                    <td>
                                        <DesktopTimePicker minutesStep={60} skipDisabled={true} sx={{ m: 1 }} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <Typography variant="body1">End Time:</Typography>
                                    </th>
                                    <td>

                                        <DesktopTimePicker minutesStep={60} skipDisabled={true} sx={{ m: 1 }} />
                                    </td>
                                </tr>
                                <tr>
                                    <th >
                                        <Typography variant="body1">Background Color: </Typography>

                                    </th>
                                    <td>
                                        <ColorSelector name="backgroundColor" options={SESAME.COLORS} handleChange={handleBackgroundColorChange} value={backgroundColor} direction="row" />

                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        <Typography variant="body1">Header Color: </Typography>

                                    </th>
                                    <td >
                                        <ColorSelector name="textColor" options={SESAME.COLORS} handleChange={handleHeaderColorChange} value={headerColor} direction="row" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <Typography variant="body1">Clock Type: </Typography>
                                    </th>
                                    <td>
                                        <YesNoRadio value={clockType} handleChange={handleClockTypeChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <Typography variant="body1">Display Time: </Typography>
                                    </th>
                                    <td>
                                        <YesNoRadio value={displayTime} handleChange={handleDisplayTimeChange} />
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </LocalizationProvider>

                    <Button variant="outlined" color="info" onClick={resetToDefault} sx={{ margin: '4px' }}>Reset to default</Button>
                    <Button variant="outlined" type="submit" color="info">Submit</Button>
                </form>

            </div>
        </>
    )
}