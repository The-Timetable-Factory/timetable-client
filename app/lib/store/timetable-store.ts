import { create } from 'zustand';
import dayjs from 'dayjs';
import { generateEmptyTimetableInfos } from '../interfaces/timetable-interfaces';
import { useCoursesStore } from './courses-store';
import { usePagesStore } from './pages-store';
import { useIphoneSettingsStore } from './iphone-settings-store';
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

export const useTimetableStore = create((set) => ({
    timetable: initialTimetableState,
    updateTimetable: () => {
        console.log('update timetable')
        const courses = (useCoursesStore.getState() as { courses: any }).courses
        const daysRange = (useIphoneSettingsStore.getState() as { daysRange: any }).daysRange
        const pages = (usePagesStore.getState() as { pages: any }).pages

        const newTimetable = generateTimetables(courses, daysRange, pages)
        set({ timetable: newTimetable })

    }
}))