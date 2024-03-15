import { create } from 'zustand'

interface DisplayState {
    display: string,
    updateDisplay: (newDisplay: string) => void

}

export const useDisplayStore = create<DisplayState>((set) => ({
    display: 'iphone',
    updateDisplay: (newDisplay: string) => {
        set({ display: newDisplay })
    }
}))
