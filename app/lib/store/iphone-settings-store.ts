import { create } from 'zustand'
import { DaysRange, TimetableSettings } from "@/app/lib/interfaces/settings-interfaces";
import { persist } from 'zustand/middleware'

const initialIphoneDays = {
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: false,
    sun: false
}

export const useIphoneSettingsStore = create(
    persist((set, get) => ({
        daysRange: initialIphoneDays,
        courseGridWidth: 49,
        courseGridHeight: 49,
        widgets: false,
        setDaysRange: (newDaysRange: DaysRange) => {
            set(() => ({ daysRange: newDaysRange }))
        },
        setCourseGridWidth: (newWidth: number) => {
            set(() => ({ courseGridWidth: newWidth }))
        },
        setCourseGridHeight: (newHeight: number) => {
            set(() => ({ courseGridHeight: newHeight }))
        },
        setWidgets: (newWidgets: boolean) => {
            set(() => ({ widget: newWidgets }))
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