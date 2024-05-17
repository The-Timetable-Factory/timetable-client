'use client'
import React, { use, useState } from "react"
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

// import components
import ColorSelector from "../../inputs/color-selector/color-selector";

import YesNoRadio from "./yes-no-radio/YesNoRadio";
import Collapsible from "../../collapsible/Collapsible";

// import stores
import { useStylingStore } from "@/app/lib/store/styling-store";
import { useThemeStore } from "@/app/lib/store/theme-store";
import useStore from "@/app/lib/hooks/useStore";
import { useTranslation } from "react-i18next";

import { Dayjs } from "dayjs";

export default function Styling() {

    const title = useStore(useStylingStore, (state: any) => state.title)
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
    const { t } = useTranslation()


    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        useStylingStore.setState({ title: event.target.value })
        // setTitle(event.target.value)
    }

    function validateStartTimeEndTime() {
        if (startTime.isAfter(endTime)) {
            return false
        }
        return true
    }

    function handleStartTimeChange(value: Dayjs | null) {
        if (value && validateStartTimeEndTime()) {
            setStartTime(value)
        }
    }

    function handleEndTimeChange(value: Dayjs | null) {
        if (value && validateStartTimeEndTime()) {
            setEndTime(value)
        }
    }

    function handleBackgroundColorChange(value: string) {
        // setBackgroundColor(value)
        useStylingStore.setState({ backgroundColor: value })
    }

    function handleHeaderColorChange(value: string) {
        // setHeaderColor(value)
        useStylingStore.setState({ headerColor: value })
    }

    function handleClockTypeChange(value: ClockType) {
        // setClockType(value)
        useStylingStore.setState({ clockType: value })
    }

    function handleDisplayTimeChange(value: string) {
        let displayTime;
        if (value === "Yes") {
            displayTime = true
        }
        else {
            displayTime = false
        }
        useStylingStore.setState({ displayTime: displayTime })
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
                                    <TextField label="(optional)" onChange={handleTitleChange} value={title} sx={{ m: "8px", maxWidth: "160px" }} />
                                </td>
                            </tr>

                            <tr>
                                <th>
                                    <Typography variant="body1">{t('common:start_time')}</Typography>
                                </th>
                                <td>
                                    <DesktopTimePicker
                                        value={startTime}
                                        maxTime={endTime}
                                        minutesStep={60}
                                        skipDisabled={true}
                                        onChange={handleStartTimeChange}
                                        sx={{ m: 1 }} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <Typography variant="body1">{t('common:end_time')}</Typography>
                                </th>
                                <td>

                                    <DesktopTimePicker
                                        value={endTime}
                                        minTime={startTime}
                                        minutesStep={60}
                                        skipDisabled={true}
                                        onChange={handleEndTimeChange}
                                        sx={{ m: 1 }} />

                                    {startTime.isAfter(endTime) && <Typography variant="caption" color="error">Start time must be before end time.</Typography>}
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