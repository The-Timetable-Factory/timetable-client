'use client'

import React, { useState, useCallback, useReducer } from "react";

// import interfaces
import { courseInfo, meetingTime, generateEmptyMeetingTime } from "@/app/lib/interfaces/courses-interfaces";

// import components
import MeetingTimeForm from "./meeting-time-form/meeting-time-form";
import ColorSelector from "../../inputs/color-selector/color-selector";

//import stores
import { useCoursesStore } from "@/app/lib/store/courses-store";
import { useTimetableStore } from "@/app/lib/store/timetable-store";
import { useThemeStore } from "@/app/lib/store/theme-store";

// import MUI components
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";

import { useTranslation } from "react-i18next";

import { SESAME } from "@/app/lib/constants/theme-constants";

interface CourseCodeState {
    courseCode: string,
    courseCodeError: string | null;
}

interface CourseCodeHandleChangeAction {
    type: 'handleChange',
    newCourseCode: string
}

interface CourseCodeAction {
    type: 'handleCheck' | 'handleReset'
}

function courseCodeReducer(state: CourseCodeState, action: CourseCodeHandleChangeAction | CourseCodeAction) {
    switch (action.type) {
        case 'handleChange':
            return { ...state, courseCode: action.newCourseCode, courseCodeError: action.newCourseCode !== '' ? null : state.courseCodeError }
        case 'handleCheck':
            return { ...state, courseCodeError: state.courseCode === '' ? 'Course Code cannot be empty' : null }
        case 'handleReset':
            return { courseCode: '', courseCodeError: null }
        default:
            return state
    }
}

export default function CourseInfoForm(props: courseInfo) {

    const { id, existed, } = props
    const [courseCodeState, dispatchCourseCode] = useReducer(courseCodeReducer, { courseCode: props.courseCode || '', courseCodeError: null });
    const [backgroundColor, setBackgroundColor] = useState<string>(props.backgroundColour)
    const [meetingTimeSchedules, setMeetingTimeSchedules] = useState<Array<meetingTime>>(props.meetingTimes)
    const [meetingTimeSchedulesErrors, setMeetingTimeSchedulesErrors] = useState<Array<string | null>>(new Array(meetingTimeSchedules.length).fill(null))
    const test = useCoursesStore((state: any) => state.test)
    const removeCourse = useCoursesStore((state: any) => state.removeCourse)
    const updateTimetable = useTimetableStore((state: any) => state.updateTimetable)
    const COLORS = useThemeStore((state: any) => state.theme.COLORS)
    const USED_COLORS = useThemeStore((state: any) => state.theme.USED_COLORS)
    const { t } = useTranslation()


    function handleBackgroundColorChange(value: string) {
        setBackgroundColor(value)
    }

    function handleAddMeetingTime() {
        setMeetingTimeSchedules(prev => {
            const newMeetingTime = generateEmptyMeetingTime();
            return [...prev, newMeetingTime]
        }
        )
    }

    const handleMeetingTimeSchedulesChange = useCallback((index: number, meetingTime: meetingTime) => {
        setMeetingTimeSchedules((prev) => {
            const updatedMeetingTime = [...prev]
            updatedMeetingTime[index] = meetingTime
            return updatedMeetingTime
        })
    }, []);

    const handleRemoveMeetingTime = useCallback((index: number) => {
        setMeetingTimeSchedules(prev => {
            const newMeetingTimeSchedules = [...prev]
            newMeetingTimeSchedules.splice(index, 1)
            return newMeetingTimeSchedules
        })
    }, []);

    function handleRemoveCourse() {
        removeCourse(id)
    }

    function validateCourseInfoForm() {
        let error = false;
        dispatchCourseCode({ type: 'handleCheck' })
        if (courseCodeState.courseCodeError !== null) {
            error = true;
        }

        meetingTimeSchedules.forEach((meetingTime, index) => {
            if (Object.values(meetingTime.days).every(day => day === false)) {
                setMeetingTimeSchedulesErrors(prev => {
                    const newErrors = [...prev]
                    newErrors[index] = 'Please select at least one day'
                    return newErrors
                })
                error = true
            }
            else {
                meetingTimeSchedulesErrors[index] = null
            }

            if (meetingTime.startTime.isAfter(meetingTime.endTime)) {
                error = true
            }
        })
        return error
    }

    function handleSubmit() {
        const error = validateCourseInfoForm()
        if (error) {
            return
        }
        test({ id: props.id, courseCode: courseCodeState.courseCode, backgroundColour: backgroundColor, meetingTimes: meetingTimeSchedules, existed: props.existed })
        updateTimetable()
    }
    return (
        <>

            <table>
                <tbody>
                    <tr>
                        <td>
                            <Typography variant="body1">{t('course:course_code')} :</Typography>
                        </td>
                        <td>
                            <TextField
                                onChange={(e) => dispatchCourseCode({ type: 'handleChange', newCourseCode: e.target.value })}
                                value={courseCodeState.courseCode}
                                required
                                sx={{ m: "8px", maxWidth: "160px" }}
                                helperText={courseCodeState.courseCodeError}
                                error={courseCodeState.courseCodeError !== null}
                                fullWidth

                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Typography variant="body1">{t('course:grid_colour')} : </Typography>

                        </td>
                        <td>
                            <ColorSelector name={props.id} options={COLORS} handleChange={handleBackgroundColorChange} value={backgroundColor} direction="row" />
                        </td>
                    </tr>
                </tbody>

            </table>


            {meetingTimeSchedules.map((meetingTime, index) => (
                <MeetingTimeForm
                    key={index} // Add a key prop for each rendered element in the array
                    id={index}
                    length={meetingTimeSchedules.length}
                    meetingTime={meetingTime}
                    handleRemoveMeetingTime={handleRemoveMeetingTime}
                    handleMeetingTimeSchedulesChange={handleMeetingTimeSchedulesChange}
                    daysSelectionError={meetingTimeSchedulesErrors[index]}
                />
            ))}

            <Button variant='outlined' color="info" onClick={handleAddMeetingTime} sx={{ margin: '4px' }}>{t('course:add_another_meeting_time')}</Button>

            {existed && <Button color="error" variant="outlined" onClick={handleRemoveCourse} sx={{ margin: '4px' }}>Remove Course</Button>}

            <Button type="submit" variant="outlined" color="info" onClick={handleSubmit} sx={{ margin: '4px' }}>{t('course:submit')}</Button>
        </>
    );
}

