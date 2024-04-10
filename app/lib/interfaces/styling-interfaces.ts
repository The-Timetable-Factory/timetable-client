import { Dayjs } from "dayjs";

// export type ClockType = '12-hour' | '24-hour'

export enum ClockType {
    TWELVE_HOUR = '12-hour',
    TWENTY_FOUR_HOUR = '24-hour'
}

export interface StylingState {
    title: string,
    startTime: Dayjs,
    endTime: Dayjs,
    backgroundColor: string,
    headerColor: string,
    clockType: ClockType,
    displayTime: boolean
}