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

export const useA4SettingsStore = create(
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
