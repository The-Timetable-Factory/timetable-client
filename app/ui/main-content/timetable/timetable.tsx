'use client'
import React, { useEffect } from "react";
import TimetableTd from "./timetable-td/timetable-td";
import { timetableHours, timetableInfos } from "@/app/lib/interfaces/timetable-interfaces"
import TimetableCSS from "./timetable.module.css"
import { capitalize } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { getDisplayConstant } from "@/app/lib/utils/developer-display";
import { useStylingStore } from "@/app/lib/store/styling-store";
import { useDisplayStore } from "@/app/lib/store/display-store";
import { useIphoneSettingsStore } from "@/app/lib/store/iphone-settings-store";
import { useIpadSettingsStore } from "@/app/lib/store/ipad-settings-store";
import { useLetterSettingsStore } from "@/app/lib/store/letter-settings-store";
import { useA4SettingsStore } from "@/app/lib/store/a4-settings-store";
import { usePagesStore } from "@/app/lib/store/pages-store";
import { useTimetableStore } from "@/app/lib/store/timetable-store";
import { ClockType } from "@/app/lib/interfaces/styling-interfaces";
import useStore from "@/app/lib/hooks/useStore";
import { useCoursesStore } from "@/app/lib/store/courses-store";
import { useTitleStore } from "@/app/lib/store/title-store";

import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)


interface TimetableProps {
    currPage: number
}

function generateHours(startTime: Dayjs, endTime: Dayjs) {
    // generate hour as key for rendering
    const hours = [];

    let tempTime = startTime;
    while (dayjs.utc(tempTime).isBefore(endTime) || dayjs.utc(tempTime).isSame(endTime)) {
        hours.push(tempTime);
        tempTime = dayjs.utc(tempTime).add(1, "hour")
    }

    return hours
}

export default function Timetable(props: TimetableProps) {

    const display = useDisplayStore((state: any) => state.display)
    let displaySettingsStore: any;
    switch (display) {
        case "iphone":
            displaySettingsStore = useIphoneSettingsStore
            break;
        case "ipad":
            displaySettingsStore = useIpadSettingsStore
            break;
        case "letter":
            displaySettingsStore = useLetterSettingsStore
            break;
        case "a4":
            displaySettingsStore = useA4SettingsStore
            break;
        default:
            throw new Error("Invalid display type")
    }
    useEffect(() => {
        useTimetableStore.getState().updateTimetable()
    }, [])

    const currPage = props.currPage
    const titleBoolean = useStore(useStylingStore, (state: any) => state.title)
    const title = useTitleStore((state: any) => state.title)
    // console.log("Title from timetable", title)
    // const title = useStylingStore((state: any) => state.title)
    // const timetable = useSelector((state: RootState) => state.timetable[currPage - 1])
    const startTime = usePagesStore((state: any) => state.pages[currPage - 1].startTime)
    const endTime = usePagesStore((state: any) => state.pages[currPage - 1].endTime)
    const headerColor = useStylingStore((state: any) => state.headerColor)
    const clockType = useStylingStore((state: any) => state.clockType)
    const timetable = useTimetableStore((state: any) => state.timetable[currPage - 1])
    const courseGridHeight = displaySettingsStore((state: any) => state.courseGridHeight)
    const courseGridWidth = displaySettingsStore((state: any) => state.courseGridWidth)
    const widgets = displaySettingsStore((state: any) => state.widgets)
    const TOP = getDisplayConstant(display, widgets).TOP
    const hours = generateHours(startTime, endTime)


    return (
        <>

            <table className={`${TimetableCSS.table}`} style={{ top: TOP }} id="timetable">
                <tbody>
                    {
                        titleBoolean && title &&
                        <tr>
                            <th className={TimetableCSS.th} colSpan={Object.keys(timetable).length + 1} style={{ backgroundColor: headerColor, fontSize: "10px" }}>
                                {title}
                            </th>
                        </tr>
                    }
                    <tr>
                        <th className={TimetableCSS.th} style={{ backgroundColor: headerColor }}>
                        </th>
                        {Object.keys(timetable).map((day) => (

                            <th className={TimetableCSS.th} key={day} style={{ backgroundColor: headerColor, width: courseGridWidth }}>
                                {capitalize(day)}
                            </th>
                        ))
                        }
                    </tr>

                    {hours.map(time => (
                        <tr className={TimetableCSS.tr} key={dayjs.utc(time).hour()} style={{ height: courseGridHeight }}>
                            <th className={TimetableCSS.th} style={{ backgroundColor: headerColor, width: 32 }}>{clockType === ClockType.TWELVE_HOUR ? dayjs.utc(time).format("hh:mm \n A") : time.format("HH:mm")}</th>
                            {Object.keys(timetable).map((day) => {
                                const timetableHour = timetable[day as keyof timetableInfos]![dayjs.utc(time).hour() as unknown as keyof timetableHours];
                                return (
                                    timetableHour &&
                                    <TimetableTd
                                        key={day}
                                        time={time}
                                        {...timetableHour.timetableTdProps}
                                        courseGridHeight={courseGridHeight}
                                        courseGridWidth={courseGridWidth} />
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}