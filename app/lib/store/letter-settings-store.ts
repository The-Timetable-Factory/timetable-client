import { create } from 'zustand'
import { DaysRange } from "@/app/lib/interfaces/settings-interfaces";
import { persist } from 'zustand/middleware'
import { useTimetableStore } from './timetable-store';

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
    increaseCourseGridWidth: () => void,
    decreaseCourseGridWidth: () => void,
    increaseCourseGridHeight: () => void,
    decreaseCourseGridHeight: () => void,
}

export const useLetterSettingsStore = create<LetterSettingsState>()(
    persist((set, get) => ({
        daysRange: initialLetterDays,
        courseGridWidth: 76,
        courseGridHeight: 49,
        setDaysRange: (newDaysRange: DaysRange) => {
            set(() => ({ daysRange: newDaysRange }))
            useTimetableStore.getState().updateTimetable()
        },
        increaseCourseGridWidth: () => {
            set(state => ({ courseGridWidth: state.courseGridWidth + 1 }))
        },
        decreaseCourseGridWidth: () => {
            set(state => ({ courseGridWidth: state.courseGridWidth - 1 }))
        },
        increaseCourseGridHeight: () => {
            set(state => ({ courseGridHeight: state.courseGridHeight + 1 }))
        },
        decreaseCourseGridHeight: () => {
            set(state => ({ courseGridHeight: state.courseGridHeight - 1 }))
        },
    }),
        { name: 'letter-display-settings' }
    ))
