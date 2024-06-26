import { daysSelection, haveCourseGrid } from "./courses-interfaces"
import dayjs, { Dayjs } from "dayjs"
import { DaysRange } from './settings-interfaces';

export interface timetableTdInsertion {
    // timetableTd: React.FunctionComponent<timetableTdProps>,
    timetableTdProps: null | haveCourseGrid
}

export interface timetableHours {
    6?: null | timetableTdInsertion,
    7?: null | timetableTdInsertion,
    8?: null | timetableTdInsertion,
    9?: null | timetableTdInsertion,
    10?: null | timetableTdInsertion,
    11?: null | timetableTdInsertion,
    12?: null | timetableTdInsertion,
    13?: null | timetableTdInsertion,
    14?: null | timetableTdInsertion,
    15?: null | timetableTdInsertion,
    16?: null | timetableTdInsertion,
    17?: null | timetableTdInsertion,
    18?: null | timetableTdInsertion,
    19?: null | timetableTdInsertion,
    20?: null | timetableTdInsertion,
    21?: null | timetableTdInsertion,
    22?: null | timetableTdInsertion,
    23?: null | timetableTdInsertion,

}

export interface timetableInfos {
    mon?: timetableHours,
    tue?: timetableHours,
    wed?: timetableHours,
    thu?: timetableHours,
    fri?: timetableHours,
    sat?: timetableHours,
    sun?: timetableHours

}

export const emptyTimetableTdProps: haveCourseGrid = {
    rowspan: 0,
    courseGridInfos: []
}

const emptyTimetableTdInsertion: timetableTdInsertion = {
    timetableTdProps: null
}

// Define an empty timetableHours object with empty timetableHour for each hour
// Create a function to generate empty timetable hours
function generateEmptyTimetableHours(startTime: Dayjs, endTime: Dayjs) {
    const timetableHours: Record<number, typeof emptyTimetableTdInsertion> = {}

    const currentHour = dayjs(startTime).hour();
    const endHour = dayjs(endTime).hour();

    for (let hour = currentHour; hour <= endHour; hour++) {
        timetableHours[hour] = { ...emptyTimetableTdInsertion }
    }
    return timetableHours
}

export function generateEmptyTimetableInfos(daysRange: DaysRange, startTime: Dayjs, endTime: Dayjs): timetableInfos {
    const emptyTimetableInfos = {} as Record<keyof daysSelection, timetableHours>;

    if (daysRange.mon) {
        emptyTimetableInfos.mon = generateEmptyTimetableHours(startTime, endTime);
    }
    if (daysRange.tue) {
        emptyTimetableInfos.tue = generateEmptyTimetableHours(startTime, endTime);
    }
    if (daysRange.wed) {
        emptyTimetableInfos.wed = generateEmptyTimetableHours(startTime, endTime);
    }
    if (daysRange.thu) {
        emptyTimetableInfos.thu = generateEmptyTimetableHours(startTime, endTime);
    }
    if (daysRange.fri) {
        emptyTimetableInfos.fri = generateEmptyTimetableHours(startTime, endTime);
    }
    if (daysRange.sat) {
        emptyTimetableInfos.sat = generateEmptyTimetableHours(startTime, endTime);
    }
    if (daysRange.sun) {
        emptyTimetableInfos.sun = generateEmptyTimetableHours(startTime, endTime);
    }

    return emptyTimetableInfos;

};