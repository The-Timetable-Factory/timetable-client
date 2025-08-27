import { create } from 'zustand'
import { ThemeState } from "@/app/lib/interfaces/theme-interfaces";
import { MILK_TEA } from '../constants/theme-constants'
import { getTheme } from '../utils/styling-theme';
import { useStylingStore } from './styling-store'
import { useCoursesStore } from './courses-store';
import { useTimetableStore } from './timetable-store'
import { use } from 'react';

export const useThemeStore = create((set) => ({
    theme: MILK_TEA,
    updateTheme: (newTheme: any) => {
        set((state: any) => ({ theme: { ...state, ...newTheme } }))
        localStorage.setItem('theme', newTheme.TITLE)
    },
    fetchTheme: () => {
        const localTheme = localStorage.getItem('theme')
        if (localTheme) {
            set({ theme: getTheme(localTheme) })
        }
    },
    addUsedColor: (color: string) => {
        set((state: any) => {
            const newUsedColors = state.theme.USED_COLORS
            newUsedColors.push(color)
            return { theme: { ...state.theme, USED_COLORS: newUsedColors } }
        })
    },
    removeUsedColor: (color: string) => {
        set((state: any) => {
            const newUsedColors = state.theme.USED_COLORS.filter((usedColor: string) => usedColor !== color)
            return { theme: { ...state.theme, USED_COLORS: newUsedColors } }
        })
    },
    setThemeColors: (newTheme: string) => {
        console.log(newTheme)

        localStorage.setItem('theme', newTheme)

        const theme = getTheme(newTheme)
        set({ theme: theme })

        const courses = useCoursesStore.getState().courses
        useStylingStore.setState({ backgroundColor: theme.COLORS[0], headerColor: theme.COLORS[1] })

        // Pointer to the next colour to be used 
        // i = 2 because the first two colours are used for the background and header
        let i = 2

        for (const course of courses) {
            const updatedCourse = {
                ...course,
                backgroundColor: theme.COLORS[i],
                existed: true // This is to prevent the course is added to the timetable again
            };

            useCoursesStore.getState().upsertCourse(updatedCourse)

            i === theme.COLORS.length - 1 ? i = 2 : i += 1 // If the pointer is at the end of the array, reset it to 2, else increment it by 1
        }

        useTimetableStore.getState().updateTimetable()
    }
}))