import { create } from 'zustand'
import dayjs, { Dayjs } from "dayjs"
import { persist } from 'zustand/middleware'

interface StylingState {
    title: string,
    startTime: Dayjs,
    endTime: Dayjs,
    backgroundColor: string,
    headerColor: string,
    clockType: boolean,
    displayTime: boolean,
    setTitle: (newTitle: string) => void,
    setStartTime: (newStartTime: Dayjs) => void,
    setEndTime: (newEndTime: Dayjs) => void,
    setBackgroundColor: (newColor: string) => void,
    setHeaderColor: (newColor: string) => void,
    setClockType: (newClockType: boolean) => void,
    setDisplayTime: (newDisplayTime: boolean) => void

}

export const useStylingStore = create<StylingState>()(
    persist((set, get) => ({
        title: '',
        startTime: dayjs('2022-04-17T09:00'),
        endTime: dayjs('2022-04-17T21:00'),
        backgroundColor: "#D6D0C2",
        headerColor: "#C2B8A3",
        clockType: true,
        displayTime: true,
        setTitle: (newTitle: string) => {
            set(() => ({ title: newTitle }))
        },
        setStartTime: (newStartTime: Dayjs) => {
            set(() => ({ startTime: newStartTime }))
        },
        setEndTime: (newEndTime: Dayjs) => {
            set(() => ({ endTime: newEndTime }))
        },
        setBackgroundColor: (newColor: string) => {
            set(() => ({ backgroundColor: newColor }))
        },
        setHeaderColor: (newColor: string) => {
            set(() => ({ headerColor: newColor }))
        },
        setClockType: (newClockType: boolean) => {
            set(() => ({ clockType: newClockType }))
        },
        setDisplayTime: (newDisplayTime: boolean) => {
            set(() => ({ displayTime: newDisplayTime }))
        },
    }),
        { name: 'styling' }
    ))