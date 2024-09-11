import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TitleState {
    title: string,
    setTitle: (newTitle: string) => void
}

export const useTitleStore = create<TitleState>()(
    persist((set, get) => ({
        title: 'Untitled',
        setTitle: (newTitle: string) => {
            set({ title: newTitle })
        }
    }),
        { name: 'title' }
    ))