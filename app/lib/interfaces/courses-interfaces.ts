import dayjs, { Dayjs } from 'dayjs';

export interface daysSelection {
    mon: boolean,
    tue: boolean,
    wed: boolean,
    thu: boolean,
    fri: boolean,
    sat: boolean,
    sun: boolean,
}

export interface meetingTime {
    courseType: string,
    location: string,
    startTime: Dayjs,
    endTime: Dayjs
    days: daysSelection
}

export interface courseInfo {
    id: string,
    courseCode: string,
    backgroundColor: string,
    meetingTimes: meetingTime[],
    existed: boolean
}

export interface CourseGridInfos {
    courseCode: string;
    backgroundColor: string;
    format: string;
    location: string;
    startTime: Dayjs;
    endTime: Dayjs;
    displayStartTime: Dayjs;
    displayEndTime: Dayjs;
    height: number;
}

export interface haveCourseGrid {
    rowspan: number,
    courseGridInfos: CourseGridInfos[]
}

const initialDaysSelection: daysSelection = {
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
}


export function generateEmptyMeetingTime() {
    const emptyMeetingTime = {
        courseType: "",
        location: "",
        startTime: dayjs('2022-04-17T09:00'),
        endTime: dayjs('2022-04-17T11:00'),
        days: initialDaysSelection
    }

    return emptyMeetingTime

}