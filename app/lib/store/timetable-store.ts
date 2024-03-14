import { create } from 'zustand';
import dayjs from 'dayjs';
import { generateEmptyTimetableInfos } from '../interfaces/timetable-interfaces';

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
    timetable: initialTimetableState
}))