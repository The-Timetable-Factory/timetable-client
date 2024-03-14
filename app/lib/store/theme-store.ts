import { create } from 'zustand'
import { ThemeState } from "@/app/lib/interfaces/theme-interfaces";
import { MILK_TEA } from '../constants/theme-constants'
import { getTheme } from '../utils/styling-theme';

export const themeStore = create((set) => ({
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
    }
}))