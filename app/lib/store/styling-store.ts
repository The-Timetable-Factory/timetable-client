import { create } from 'zustand'
import dayjs, { Dayjs } from "dayjs"
import { persist } from 'zustand/middleware'

export const useStylingStore = create(
    persist((set, get) => ({
        title: '',
        startTime: dayjs('2022-04-17T09:00'),
        endTime: dayjs('2022-04-17T21:00'),
        backgroundColor: "#D6D0C2",
        headerColor: "#C2B8A3",
        clockType: '12 Hour',
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
        setClockType: (newClockType: string) => {
            set(() => ({ clockType: newClockType }))
        },
        setDisplayTime: (newDisplayTime: boolean) => {
            set(() => ({ displayTime: newDisplayTime }))
        },

    }),
        { name: 'styling' }
    ))