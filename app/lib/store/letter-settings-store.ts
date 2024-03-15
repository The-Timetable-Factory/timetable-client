import { create } from 'zustand'
import { DaysRange } from "@/app/lib/interfaces/settings-interfaces";
import { persist } from 'zustand/middleware'

const initialLetterDays = {
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true
}

interface LetterSettingsState {
    daysRange: DaysRange,
    courseGridWidth: number,
    courseGridHeight: number,
    setDaysRange: (newDaysRange: DaysRange) => void,
    setCourseGridWidth: (newWidth: number) => void,
    setCourseGridHeight: (newHeight: number) => void
}

export const useLetterSettingsStore = create<LetterSettingsState>()(
    persist((set, get) => ({
        daysRange: initialLetterDays,
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
        { name: 'letter-display-settings' }
    ))
