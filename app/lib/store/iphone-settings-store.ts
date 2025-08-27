import { create } from 'zustand'
import { DaysRange } from "@/app/lib/interfaces/settings-interfaces";
import { persist } from 'zustand/middleware'
import { useTimetableStore } from './timetable-store';

const initialIphoneDays = {
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: false,
    sun: false
}

interface IphoneSettingsState {
    daysRange: DaysRange,
    courseGridWidth: number,
    courseGridHeight: number,
    widgets: boolean,
    setDaysRange: (newDaysRange: DaysRange) => void,
    increaseCourseGridWidth: () => void,
    decreaseCourseGridWidth: () => void,
    increaseCourseGridHeight: () => void,
    decreaseCourseGridHeight: () => void,
    setWidgets: (newWidgets: boolean) => void
    setIphoneDisplaySettings: (newSettings: any) => void
}

export const useIphoneSettingsStore = create<IphoneSettingsState>()(
    persist((set, get) => ({
        daysRange: initialIphoneDays,
        courseGridWidth: 49,
        courseGridHeight: 49,
        widgets: false,
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
        setWidgets: (newWidgets: boolean) => {
            set(() => ({ widgets: newWidgets }))
        },
        setIphoneDisplaySettings: (newSettings: any) => {
            set(() => ({ ...newSettings }))
        }
    }),
        { name: 'iphone-display-settings' }
    )
)



//     fetchSettings: () => {
//         const localSettings = localStorage.getItem('iphoneSettings')
//         if (localSettings) {
//             const settings = JSON.parse(localSettings)
//             set(() => ({ daysRange: settings.daysRange, courseGridWidth: settings.courseGridWidth, courseGridHeight: settings.courseGridHeight, widgets: settings.widgets }))
//         }
//     },
//     //TODO: figure out how often to update it.
//     setSettings: (newSettings: TimetableSettings) => {
//         set({ settings: newSettings })
//         localStorage.setItem('iphoneSettings', JSON.stringify(newSettings))
//     }
// }