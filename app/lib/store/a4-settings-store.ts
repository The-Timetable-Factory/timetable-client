import { create } from 'zustand'
import { DaysRange } from "@/app/lib/interfaces/settings-interfaces";
import { persist } from 'zustand/middleware'

const initialA4Days = {
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true
}

interface A4SettingsState {
    daysRange: DaysRange,
    courseGridWidth: number,
    courseGridHeight: number,
    setDaysRange: (newDaysRange: DaysRange) => void,
    setCourseGridWidth: (newWidth: number) => void,
    setCourseGridHeight: (newHeight: number) => void
}

export const useA4SettingsStore = create<A4SettingsState>()(
    persist((set, get) => ({
        daysRange: initialA4Days,
        courseGridWidth: 76,
        courseGridHeight: 49,
        setDaysRange: (newDaysRange: DaysRange) => {
            set(() => ({ daysRange: newDaysRange }))
        },
        setCourseGridWidth: (newWidth: number) => {
            set(() => ({ courseGridWidth: newWidth }))
        },
        setCourseGridHeight: (newHeight: number) => {
            set(() => ({ courseGridHeight: newHeight }))
        },
    }),
        { name: 'a4-display-settings' }
    ))
