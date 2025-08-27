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

import { createClient } from "@/utils/supabase/client";

import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { useParams } from "next/navigation";
import { time } from "console";

import { v4 } from 'uuid'

dayjs.extend(utc)

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
    const { id: timetable_id } = useParams()
    const { id, existed } = props
    const [courseCodeState, dispatchCourseCode] = useReducer(courseCodeReducer, { courseCode: props.courseCode || '', courseCodeError: null });
    const [backgroundColor, setBackgroundColor] = useState<string>(props.backgroundColor)
    const [meetingTimeSchedules, setMeetingTimeSchedules] = useState<Array<meetingTime>>(props.meetingTimes)
    const [meetingTimeSchedulesErrors, setMeetingTimeSchedulesErrors] = useState<Array<string | null>>(new Array(meetingTimeSchedules.length).fill(null))
    const upsertCourse = useCoursesStore((state: any) => state.upsertCourse)
    const removeCourse = useCoursesStore((state: any) => state.removeCourse)
    const updateTimetable = useTimetableStore((state: any) => state.updateTimetable)
    const COLORS = useThemeStore((state: any) => state.theme.COLORS)
    const USED_COLORS = useThemeStore((state: any) => state.theme.USED_COLORS)
    const addUsedColor = useThemeStore((state: any) => state.addUsedColor)
    const removeUsedColor = useThemeStore((state: any) => state.removeUsedColor)
    const { t } = useTranslation()
    const supabase = createClient()

    console.log('course id abc', id)

    let timeoutBackgroundColorId: ReturnType<typeof setTimeout>;


    async function handleBackgroundColorChange(value: string) {
        if (USED_COLORS.includes(backgroundColor)) {

            removeUsedColor(backgroundColor)
        }
        setBackgroundColor(value)
        addUsedColor(value)
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

            if (dayjs.utc(meetingTime.startTime).isAfter(meetingTime.endTime)) {
                error = true
            }
        })
        return error
    }

    async function handleSubmit() {
        const error = validateCourseInfoForm()
        if (error) {
            return
        }
        upsertCourse({ id: props.id, courseCode: courseCodeState.courseCode, backgroundColor: backgroundColor, meetingTimes: meetingTimeSchedules, existed: props.existed })
        updateTimetable()


        let { data: upsertCourseData, error: upsertCourseError } = await supabase.rpc('upsertcourse', { course_data: { id: v4(), timetable_id: timetable_id, course_code: courseCodeState.courseCode, background_color: backgroundColor } })
        if (error) console.error(`Error upserting course: ${upsertCourseError}`)
        else console.log(`Course upserted: ${upsertCourseData}`)

        // for meetingTime in meetingTimes
        // 





        // if (!existed) {
        //     console.log(`course-info-form: not existed`)
        //     const { data: courseData, error: courseError } = await supabase.from('courses').insert([{ id: id, timetable_id: timetable_id, course_code: courseCodeState.courseCode, background_color: backgroundColor }])

        //     if (courseError) {
        //         console.error('Error adding course:', courseError)
        //     } else {
        //         console.log('Course added:', courseData)
        //     }

        //     meetingTimeSchedules.map(async (meetingTime) => {
        //         const { data: meetingTimeData, error: meetingTimeError } = await supabase.from('meeting_times').insert({
        //             id: meetingTime.id,
        //             course_id: id,
        //             startTime: meetingTime.startTime,
        //             endTime: meetingTime.endTime,
        //             days_selection: meetingTime.days,
        //             location: meetingTime.location
        //         })

        //         if (error) {
        //             console.error('Error adding meeting time:', meetingTimeError)
        //         } else {
        //             console.log('Meeting time added:', meetingTimeData)
        //         }
        //     })

        //     // const { data: meetingTimeData1, error: meetingTimeError1 } = await supabase.from('meeting_times').insert({
        //     //     course_id: id,
        //     //     start_time: dayjs.utc('2022-01-01T00:00:00Z'),
        //     //     end_time: dayjs.utc('2022-01-01T00:00:00Z'),
        //     //     days: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
        //     // })

        // } else {
        //     console.log(`course-info-form: existed`)
        //     const { data: courseData, error: courseError } = await supabase.from('courses').update({ courseCode: courseCodeState.courseCode, backgroundColor: backgroundColor }).eq('id', id)

        //     if (courseError) {
        //         console.error('Error updating course:', courseError)
        //     } else {
        //         console.log('Course updated:', courseData)
        //     }

        //     meetingTimeSchedules.map(async (meetingTime) => {
        //         const { data: meetingTimeData, error: meetingTimeError } = await supabase.from('meeting_times').update({
        //             course_id: id,
        //             startTime: meetingTime.startTime,
        //             endTime: meetingTime.endTime,
        //             days_selection: [meetingTime.days.mon, meetingTime.days.tue, meetingTime.days.wed, meetingTime.days.thu, meetingTime.days.fri, meetingTime.days.sat, meetingTime.days.sun],
        //             location: meetingTime.location
        //         }).eq('id', meetingTime.id)

        //         if (error) {
        //             console.error('Error adding meeting time:', meetingTimeError)
        //         } else {
        //             console.log(`Meeting time added: ${meetingTimeData}, meetingTime.id: ${meetingTime.id}`)
        //         }
        //     })
        // }
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

