import { create } from 'zustand'
import dayjs, { Dayjs } from "dayjs"
import { persist, createJSONStorage } from 'zustand/middleware'
import { useTimetableStore } from './timetable-store';
import { ClockType } from '../interfaces/styling-interfaces';

interface StylingState {
    title: string,
    startTime: Dayjs,
    endTime: Dayjs,
    backgroundColor: string,
    headerColor: string,
    clockType: ClockType,
    displayTime: boolean,
    setTitle: (newTitle: string) => void,
    setStartTime: (newStartTime: Dayjs) => void,
    setEndTime: (newEndTime: Dayjs) => void,
    setBackgroundColor: (newColor: string) => void,
    setHeaderColor: (newColor: string) => void,
    setClockType: (newClockType: ClockType) => void,
    setDisplayTime: (newDisplayTime: boolean) => void

}

export const useStylingStore = create<StylingState>()(
    persist((set, get) => ({
        title: '',
        startTime: dayjs('2022-04-17T09:00'),
        endTime: dayjs('2022-04-17T21:00'),
        backgroundColor: "#D6D0C2",
        headerColor: "#C2B8A3",
        clockType: ClockType.TWELVE_HOUR,
        displayTime: true,
        setTitle: (newTitle: string) => {
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
                title: '',
                startTime: dayjs('2022-04-17T09:00'),
                endTime: dayjs('2022-04-17T21:00'),
                backgroundColor: "#D6D0C2",
                headerColor: "#C2B8A3",
                clockType: ClockType.TWELVE_HOUR,
                displayTime: true
            }))
        }
    }),
        {
            name: 'styling',
            storage: createJSONStorage(() => localStorage, {
                reviver: (key, value) => {
                    if (key === "startTime" || key === "endTime") {
                        if (typeof value === "string") {
                            return dayjs(value);
                        }
                    }

                    return value;
                }
            })
        }

    ))