import { create } from 'zustand'
import { DaysRange } from "@/app/lib/interfaces/settings-interfaces";
import { persist } from 'zustand/middleware'
import { useTimetableStore } from './timetable-store';

const initialIpadDays = {
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true
}

interface IpadSettingsState {
    daysRange: DaysRange,
    courseGridWidth: number,
    courseGridHeight: number,
    setDaysRange: (newDaysRange: DaysRange) => void,
    increaseCourseGridWidth: () => void,
    decreaseCourseGridWidth: () => void,
    increaseCourseGridHeight: () => void,
    decreaseCourseGridHeight: () => void,
}

/**
 * TODO: update Timetable when daysRange is changed
 */

export const useIpadSettingsStore = create<IpadSettingsState>()(
    persist((set, get) => ({
        daysRange: initialIpadDays,
        courseGridWidth: 90,
        courseGridHeight: 44,
        setDaysRange: (newDaysRange: DaysRange) => {
            console.log('Ipad setDaysRange')
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
        { name: 'ipad-display-settings' }
    ))
