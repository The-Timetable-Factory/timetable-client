import React, { use, useState } from "react"
import FormControl from "@mui/material/FormControl"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ColorSelector from "../../inputs/color-selector/color-selector";
import { SESAME } from "@/app/lib/constants/theme-constants";
import YesNoRadio from "./yes-no-radio/YesNoRadio";
import Collapsible from "../../collapsible/Collapsible";
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { useStylingStore } from "@/app/lib/store/styling-store";

export default function Styling() {

    const title = useStylingStore((state: any) => state.title)
    const startTime = useStylingStore((state: any) => state.startTime)
    const endTime = useStylingStore((state: any) => state.endTime)
    const backgroundColor = useStylingStore((state: any) => state.backgroundColor)
    const headerColor = useStylingStore((state: any) => state.headerColor)
    const clockType = useStylingStore((state: any) => state.clockType)
    const displayTime = useStylingStore((state: any) => state.displayTime)




    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        useStylingStore.setState({ title: event.target.value })
        // setTitle(event.target.value)
    }

    function handleBackgroundColorChange(value: string) {
        // setBackgroundColor(value)
        useStylingStore.setState({ backgroundColor: value })
    }

    function handleHeaderColorChange(value: string) {
        // setHeaderColor(value)
        useStylingStore.setState({ headerColor: value })
    }

    function handleClockTypeChange(value: boolean) {
        // setClockType(value)
        useStylingStore.setState({ clockType: value })
    }

    function handleDisplayTimeChange(value: boolean) {

        useStylingStore.setState({ displayTime: value })
    }

    function resetToDefault() {

    }

    function handleSubmit() {

    }
    return (
        <>
            <Collapsible
                title="Styling"
                icon={<ColorLensOutlinedIcon sx={{ position: "absolute", right: "4%" }} />}
                backgroundColor="#DAD6CE"
                isCourse={false}
            >

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
                                    <DesktopTimePicker
                                        value={startTime}
                                        maxTime={endTime}
                                        minutesStep={60}
                                        skipDisabled={true}
                                        sx={{ m: 1 }} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <Typography variant="body1">End Time:</Typography>
                                </th>
                                <td>

                                    <DesktopTimePicker
                                        value={endTime}
                                        minTime={startTime}
                                        minutesStep={60}
                                        skipDisabled={true}
                                        sx={{ m: 1 }} />
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


            </Collapsible>

        </>
    )
}