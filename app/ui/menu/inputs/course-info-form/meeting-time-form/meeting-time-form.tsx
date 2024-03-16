'use client'
import React from "react";

// import interfaces
import { meetingTime, daysSelection } from "@/app/lib/interfaces/courses-interfaces";
// import components
import DaysSelection from "../../day-selection/day-selection";

// import MUI components
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';

// import MUI date picker components
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

// import styles
import MeetingTimeFormCSS from './meetingTimeForm.module.css'

// import context
import { useDarkMode } from "../../../../context/dark-mode-context";


export interface MeetingTimeFormProps {
    key: number,
    id: number,
    length: number,
    handleRemoveMeetingTime: (index: number) => void,
    meetingTime: meetingTime;
    handleMeetingTimeSchedulesChange: (index: number, meetingTime: meetingTime) => void
    daysSelectionError: string | null;
}

function MeetingTimeForm(props: MeetingTimeFormProps) {
    const courseType = props.meetingTime.courseType;
    const location = props.meetingTime.location;
    const startTime = dayjs(props.meetingTime.startTime);
    const endTime = dayjs(props.meetingTime.endTime);
    const days = props.meetingTime.days;
    const { darkMode } = useDarkMode()


    const handleChange = (name: string, value: string | Dayjs | daysSelection) => {
        const newMeetingTime: meetingTime = {
            courseType: courseType,
            location: location,
            startTime: startTime,
            endTime: endTime,
            days: days,
            [name]: value
        }
        props.handleMeetingTimeSchedulesChange(props.id, newMeetingTime)
    }


    return (
        <>
            <div className={`center ${MeetingTimeFormCSS.div}`} style={{ position: 'relative' }}>

                <div style={{ display: "flex", alignItems: "center", margin: "8px 0px" }} data-testid="meeting-time-form">
                    <Typography variant="h6"> Meeting Time {props.id + 1}</Typography>
                    {props.length > 1 &&
                        (<IconButton onClick={() => props.handleRemoveMeetingTime(props.id)} sx={{ position: 'absolute', top: 10, right: 10 }}>
                            <CloseIcon />
                        </IconButton>)
                    }

                </div>

                <DaysSelection days={days} handleChange={handleChange} error={props.daysSelectionError} />

                <table>
                    <tbody>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <tr>
                                <td>
                                    <Typography variant="body1">Start Time: </Typography>
                                </td>
                                <td>
                                    <DesktopTimePicker
                                        minutesStep={5}
                                        skipDisabled={true}
                                        value={startTime}
                                        maxTime={endTime}
                                        onChange={(newValue) => newValue !== null && handleChange("startTime", newValue)}
                                        sx={{
                                            m: 1, "&.Mui-selected: hover": {
                                                backgroundColor: darkMode ? "#DDDDDD66 !important" : "#00000024 !important",
                                            }
                                        }}
                                        data-testid="start-time"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography variant="body1">End Time: </Typography>
                                </td>
                                <td>
                                    <DesktopTimePicker
                                        minutesStep={5}
                                        skipDisabled={true}
                                        value={endTime}
                                        minTime={startTime}
                                        onChange={(newValue) => newValue !== null && handleChange("endTime", newValue)}
                                        sx={{ m: 1 }}
                                        data-testid="end-time"
                                    />
                                    {startTime.isAfter(endTime) && <Typography variant="caption" color="error">Start time must be before end time.</Typography>}
                                </td>
                            </tr>
                        </LocalizationProvider>
                        <tr>
                            <td>
                                <Typography variant="body1">Course Type: </Typography>
                            </td>
                            <td>
                                <TextField label="(optional)" value={courseType} sx={{ m: "8px" }} onChange={(event) => handleChange("courseType", event.target.value)} data-testid="course-type" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="body1">Location: </Typography>
                            </td>
                            <td>
                                <TextField label="(optional)" value={location} sx={{ m: "8px" }} onChange={(event) => handleChange("location", event.target.value)} data-testid="location" />
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default React.memo(MeetingTimeForm)