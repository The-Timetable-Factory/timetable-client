'use client'
import React, { use, useState } from "react"
import { useDebouncedCallback } from "use-debounce";
import { createClient } from "@/utils/supabase/client";
// import MUI components
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { ClockType } from "@/app/lib/interfaces/styling-interfaces";

// import MUI date picker components
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import utc from 'dayjs/plugin/utc';

// import components
import ColorSelector from "../../inputs/color-selector/color-selector";

import YesNoRadio from "./yes-no-radio/YesNoRadio";
import Collapsible from "../../collapsible/Collapsible";

// import stores
import { useStylingStore } from "@/app/lib/store/styling-store";
import { useThemeStore } from "@/app/lib/store/theme-store";
import useStore from "@/app/lib/hooks/useStore";
import { useTranslation } from "react-i18next";

import dayjs, { Dayjs } from "dayjs";
import { useParams } from "next/navigation";

dayjs.extend(utc)

//TODO: function resetToDefault need to update database


export default function Styling() {
    const supabase = createClient()
    const { id } = useParams()
    const { t } = useTranslation()
    const title = useStore(useStylingStore, (state: any) => state.title) === true ? "Yes" : "No"
    const startTime = useStylingStore((state: any) => state.startTime)
    const endTime = useStylingStore((state: any) => state.endTime)
    const backgroundColor = useStore(useStylingStore, (state: any) => state.backgroundColor)
    const headerColor = useStylingStore((state: any) => state.headerColor)
    const clockType = useStylingStore((state: any) => state.clockType)
    const displayTime = useStylingStore((state: any) => state.displayTime) === true ? "Yes" : "No"
    const resetToDefault = useStylingStore((state: any) => state.resetToDefault)
    const COLORS = useThemeStore((state: any) => state.theme.COLORS)
    const setStartTime = useStylingStore((state: any) => state.setStartTime)
    const setEndTime = useStylingStore((state: any) => state.setEndTime)

    let timeoutTitleId: ReturnType<typeof setTimeout>;
    let timeoutStartTimeId: ReturnType<typeof setTimeout>;
    let timeoutEndTimeId: ReturnType<typeof setTimeout>;
    let timeoutBackgroundColorId: ReturnType<typeof setTimeout>;
    let timeoutHeaderColorId: ReturnType<typeof setTimeout>;
    let timeoutClockTypeId: ReturnType<typeof setTimeout>;
    let timeoutDisplayTimeId: ReturnType<typeof setTimeout>;

    async function handleTitleChange(value: string) {

        let title = value === "Yes"
        useStylingStore.setState({ title: title })


        if (timeoutTitleId) {
            clearTimeout(timeoutTitleId)
        }

        timeoutTitleId = setTimeout(async () => {
            const { data, error } = await supabase.from('styling').update({ title: title }).eq('timetable_id', id).select() // only run this if no change in 2 seconds
            if (error) {
                console.log('Update failed: ', error)
                //TODO: Add error handling
            } else {
                console.log('Update succeeded: ', data)
                //TODO: Add success handling

            }
        }, 2000)

    }

    function validateStartTimeEndTime() {
        if (dayjs.utc(startTime).isAfter(endTime)) {
            return false
        }
        return true
    }

    function handleStartTimeChange(value: Dayjs | null) {
        if (value && validateStartTimeEndTime()) {
            setStartTime(value)

            if (timeoutStartTimeId) {
                clearTimeout(timeoutStartTimeId)
            }

            timeoutStartTimeId = setTimeout(async () => {
                // console.log('stylingHandleStartTimeChange: ', JSON.stringify(value))

                const { data, error } = await supabase.from('styling').update({ startTime: JSON.stringify(value) }).eq('timetable_id', id).select() // only run this if no change in 2 seconds
                if (error) {
                    console.log('Update failed: ', error)
                } else {
                    console.log('Update succeeded: ', data)
                }
            }, 2000)

        }
    }

    function handleEndTimeChange(value: Dayjs | null) {
        if (value && validateStartTimeEndTime()) {
            setEndTime(value)
        }

        if (timeoutEndTimeId) {
            clearTimeout(timeoutEndTimeId)
        }

        timeoutEndTimeId = setTimeout(async () => {
            const { data, error } = await supabase.from('styling').update({ endTime: JSON.stringify(value) }).eq('timetable_id', id).select() // only run this if no change in 2 seconds
            if (error) {
                console.log('Update failed: ', error)
            } else {
                console.log('Update succeeded: ', data)
            }
        }, 2000)
    }

    function handleBackgroundColorChange(value: string) {
        // setBackgroundColor(value)
        useStylingStore.setState({ backgroundColor: value })

        if (timeoutBackgroundColorId) {
            clearTimeout(timeoutBackgroundColorId)
        }

        timeoutBackgroundColorId = setTimeout(async () => {

            const { data, error } = await supabase.from('styling').update({ backgroundColor: value }).eq('timetable_id', id).select() // only run this if no change in 2 seconds
            if (error) {
                console.log('Update failed: ', error)
            } else {
                console.log('Update succeeded: ', data)
            }
        }, 1000)
    }

    function handleHeaderColorChange(value: string) {
        // setHeaderColor(value)
        useStylingStore.setState({ headerColor: value })

        if (timeoutHeaderColorId) {
            clearTimeout(timeoutHeaderColorId)
        }

        timeoutHeaderColorId = setTimeout(async () => {

            const { data, error } = await supabase.from('styling').update({ headerColor: value }).eq('timetable_id', id).select() // only run this if no change in 2 seconds
            if (error) {
                console.log('Update failed: ', error)
            } else {
                console.log('Update succeeded: ', data)
            }
        }, 1000)
    }

    function handleClockTypeChange(value: ClockType) {
        // setClockType(value)
        useStylingStore.setState({ clockType: value })

        if (timeoutClockTypeId) {
            clearTimeout(timeoutClockTypeId)
        }

        timeoutClockTypeId = setTimeout(async () => {

            const { data, error } = await supabase.from('styling').update({ clockType: value }).eq('timetable_id', id).select() // only run this if no change in 2 seconds
            if (error) {
                console.log('Update failed: ', error)
            } else {
                console.log('Update succeeded: ', data)
            }
        }, 1000)
    }

    function handleDisplayTimeChange(value: string) {
        let displayTime = value === "Yes"
        useStylingStore.setState({ displayTime: displayTime })

        if (timeoutDisplayTimeId) {
            clearTimeout(timeoutDisplayTimeId)
        }

        timeoutDisplayTimeId = setTimeout(async () => {

            const { data, error } = await supabase.from('styling').update({ displayTime: displayTime }).eq('timetable_id', id).select() // only run this if no change in 2 seconds
            if (error) {
                console.log('Update failed: ', error)
            } else {
                console.log('Update succeeded: ', data)
            }
        }, 1000)

    }

    return (
        <>
            <Collapsible
                title={t("styling")}
                icon={<ColorLensOutlinedIcon sx={{ position: "absolute", right: "4%" }} />}
                backgroundColor="#DAD6CE"
                isCourse={false}
            >

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <table>
                        <tbody>

                            <tr>
                                <th>
                                    <Typography variant="body1">{t('common:title')}</Typography>
                                </th>
                                <td>
                                    {/* <TextField label="(optional)" onChange={handleTitleChange} value={title} sx={{ m: "8px", maxWidth: "160px" }} /> */}
                                    <YesNoRadio
                                        value={title}
                                        optionA={"Yes"}
                                        optionB={"No"}
                                        handleChange={(value: string) => handleTitleChange(value)} />
                                </td>
                            </tr>

                            <tr>
                                <th>
                                    <Typography variant="body1">{t('common:start_time')}</Typography>
                                </th>
                                <td>
                                    <DesktopTimePicker
                                        value={dayjs.utc(startTime)}
                                        maxTime={dayjs.utc(endTime)}
                                        minutesStep={60}
                                        skipDisabled={true}
                                        onChange={handleStartTimeChange}
                                        timezone="UTC"
                                        sx={{ m: 1 }} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <Typography variant="body1">{t('common:end_time')}</Typography>
                                </th>
                                <td>

                                    <DesktopTimePicker
                                        value={dayjs.utc(endTime)}
                                        minTime={dayjs.utc(startTime)}
                                        minutesStep={60}
                                        skipDisabled={true}
                                        onChange={handleEndTimeChange}
                                        timezone="UTC"
                                        sx={{ m: 1 }} />

                                    {/* Why is the value shifted by 4 hours? */}

                                    {dayjs.utc(startTime).isAfter(endTime) && <Typography variant="caption" color="error">Start time must be before end time.</Typography>}
                                </td>
                            </tr>
                            <tr>
                                <th >
                                    <Typography variant="body1">{t('styling:background_colour')}</Typography>

                                </th>
                                <td>
                                    <ColorSelector name="backgroundColor" options={COLORS} handleChange={handleBackgroundColorChange} value={backgroundColor} direction="row" />

                                </td>
                            </tr>

                            <tr>
                                <th>
                                    <Typography variant="body1">{t('styling:header_colour')}</Typography>

                                </th>
                                <td >
                                    <ColorSelector name="textColor" options={COLORS} handleChange={handleHeaderColorChange} value={headerColor} direction="row" />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <Typography variant="body1">{t('styling:clock_type')}</Typography>
                                </th>
                                <td>
                                    <YesNoRadio
                                        value={clockType}
                                        optionA={ClockType.TWELVE_HOUR}
                                        optionB={ClockType.TWENTY_FOUR_HOUR}
                                        handleChange={(value: string) => handleClockTypeChange(value as ClockType)} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <Typography variant="body1">{t('styling:display_time')}</Typography>
                                </th>
                                <td>
                                    <YesNoRadio
                                        value={displayTime}
                                        optionA="Yes"
                                        optionB="No"
                                        handleChange={(value: string) => handleDisplayTimeChange(value)} />
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