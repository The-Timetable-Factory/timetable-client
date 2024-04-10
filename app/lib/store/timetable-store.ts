'use client'
import { create } from 'zustand';
import dayjs from 'dayjs';
import { timetableInfos, generateEmptyTimetableInfos } from '../interfaces/timetable-interfaces';
import { useCoursesStore } from './courses-store';
import { usePagesStore } from './pages-store';
import { useIphoneSettingsStore } from './iphone-settings-store';
import { useIpadSettingsStore } from './ipad-settings-store';
import { useLetterSettingsStore } from './letter-settings-store';
import { useA4SettingsStore } from './a4-settings-store';
import { useDisplayStore } from './display-store';
import useStore from '../hooks/useStore';
import { generateTimetables } from '../utils/format-timetable';

const initialDaysRange = {
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: false,
    sun: false
}

export const initialTimetableState = [generateEmptyTimetableInfos(initialDaysRange, dayjs('2022-04-17T09:00'), dayjs('2022-04-17T18:00'))]

interface TimetableState {
    timetable: timetableInfos[],
    updateTimetable: () => void

}


export const useTimetableStore = create<TimetableState>((set) => ({
    timetable: initialTimetableState,
    updateTimetable: () => {
        const display = (useDisplayStore.getState() as { display: any }).display
        const displaySettingsStore = display === 'iphone' ? useIphoneSettingsStore : display === 'ipad' ? useIpadSettingsStore : display === 'letter' ? useLetterSettingsStore : useA4SettingsStore
        const daysRange = (displaySettingsStore.getState() as { daysRange: any }).daysRange
        // console.log('Timetable Store')
        // console.log('display', display)
        // console.log('daysRange', daysRange)
        const courses = (useCoursesStore.getState() as { courses: any }).courses
        // const courses = useStore(useCoursesStore, (state: any) => state.courses)
        usePagesStore.getState().setPagesStore()
        const pages = (usePagesStore.getState() as { pages: any }).pages

        const newTimetable = generateTimetables(courses, daysRange, pages)
        set({ timetable: newTimetable })

    }
}))