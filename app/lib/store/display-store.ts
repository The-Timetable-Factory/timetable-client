import { create } from 'zustand'

export const useDisplayStore = create((set) => ({
    display: 'iphone',
    updateDisplay: (newDisplay: string) => {
        set({ display: newDisplay })
    }
}))
