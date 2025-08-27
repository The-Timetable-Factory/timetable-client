import { create } from 'zustand'
import dayjs, { Dayjs } from "dayjs"
import { persist, createJSONStorage } from 'zustand/middleware'
import { useTimetableStore } from './timetable-store';
import { ClockType, StylingState } from '../interfaces/styling-interfaces';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)

interface StylingStoreState {
    title: boolean,
    startTime: Dayjs,
    endTime: Dayjs,
    backgroundColor: string,
    headerColor: string,
    clockType: ClockType,
    displayTime: boolean,
    setTitle: (newTitle: boolean) => void,
    setStartTime: (newStartTime: Dayjs) => void,
    setEndTime: (newEndTime: Dayjs) => void,
    setBackgroundColor: (newColor: string) => void,
    setHeaderColor: (newColor: string) => void,
    setClockType: (newClockType: ClockType) => void,
    setDisplayTime: (newDisplayTime: boolean) => void

}

export const useStylingStore = create<StylingStoreState>()(
    persist((set, get) => ({
        title: true,
        startTime: dayjs.utc('2022-04-17T09:00'),
        endTime: dayjs.utc('2022-04-17T21:00'),
        backgroundColor: "#D6D0C2",
        headerColor: "#C2B8A3",
        clockType: ClockType.TWELVE_HOUR,
        displayTime: true,
        setTitle: (newTitle: boolean) => {
            set(() => ({ title: newTitle }))
        },
        setStartTime: (newStartTime: Dayjs) => {
            set(() => ({ startTime: newStartTime }))
            useTimetableStore.getState().updateTimetable()
        },
        setEndTime: (newEndTime: Dayjs) => {
            set(() => ({ endTime: newEndTime }))
            useTimetableStore.getState().updateTimetable()
        },
        setBackgroundColor: (newColor: string) => {
            set(() => ({ backgroundColor: newColor }))
        },
        setHeaderColor: (newColor: string) => {
            set(() => ({ headerColor: newColor }))
        },
        setClockType: (newClockType: ClockType) => {
            set(() => ({ clockType: newClockType }))
        },
        setDisplayTime: (newDisplayTime: boolean) => {
            set(() => ({ displayTime: newDisplayTime }))
        },
        resetToDefault: () => {
            set(() => ({
                title: true,
                startTime: dayjs.utc('2022-04-17T09:00'),
                endTime: dayjs.utc('2022-04-17T21:00'),
                backgroundColor: "#D6D0C2",
                headerColor: "#C2B8A3",
                clockType: ClockType.TWELVE_HOUR,
                displayTime: true
            }))
        },
        setStyling: (newStyling: StylingState) => {
            set(() => ({
                title: newStyling.title,
                startTime: newStyling.startTime,
                endTime: newStyling.endTime,
                backgroundColor: newStyling.backgroundColor,
                headerColor: newStyling.headerColor,
                clockType: newStyling.clockType,
                displayTime: newStyling.displayTime
            }))
        }
    }),
        {
            name: 'styling',
            storage: createJSONStorage(() => localStorage, {
                reviver: (key, value) => {
                    if (key === "startTime" || key === "endTime") {
                        if (typeof value === "string") {
                            return dayjs.utc(value);
                        }
                    }

                    return value;
                }
            })
        }

    ))