import { create } from 'zustand'
import { DaysRange } from "@/app/lib/interfaces/settings-interfaces";
import { persist } from 'zustand/middleware'

const initialIpadDays = {
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true
}

export const useIpadSettingsStore = create(
    persist((set, get) => ({
        daysRange: initialIpadDays,
        courseGridWidth: 90,
        courseGridHeight: 44,
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
        { name: 'ipad-display-settings' }
    ))
