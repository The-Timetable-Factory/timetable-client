import { create } from 'zustand'
import { useStylingStore } from './styling-store'
import { useDisplayStore } from './display-store'
import { useIphoneSettingsStore } from './iphone-settings-store'
import { getDisplayConstant } from '../utils/developer-display'
import { useIpadSettingsStore } from './ipad-settings-store'
import { useLetterSettingsStore } from './letter-settings-store'
import { useA4SettingsStore } from './a4-settings-store'
import dayjs, { Dayjs } from "dayjs"



function generatePages(startTime: any, endTime: any, numberOfRows: number): any {
    let pages = []
    let remainingTime = endTime.diff(startTime, 'hour') + 1
    let currPageNumber = 1

    while (remainingTime > 0) {
        const pageStartTime = startTime
        const pageEndTime = startTime.add(Math.min(remainingTime, numberOfRows) - 1, 'hour')
        const page = {
            pageNumber: currPageNumber,
            startTime: pageStartTime,
            endTime: pageEndTime
        }

        pages.push(page)
        currPageNumber += 1
        remainingTime -= numberOfRows
        startTime = pageEndTime.add(1, 'hour')
    }

    return pages;

}

interface PagesState {
    numberOfPages: number,
    pages: {
        pageNumber: number,
        startTime: Dayjs,
        endTime: Dayjs
    }[],
    setPagesStore: () => void

}

export const usePagesStore = create<PagesState>((set) => ({
    numberOfPages: 2,
    pages: [
        {
            pageNumber: 1,
            startTime: dayjs('2022-04-17T09:00'),
            endTime: dayjs('2022-04-17T18:00'),
        }
    ],
    setPagesStore: () => {
        // Get start time and end time from styling store
        const startTime = (useStylingStore.getState() as { startTime: Dayjs }).startTime;
        const endTime = (useStylingStore.getState() as { endTime: Dayjs }).endTime;
        const startTimeHour = startTime.hour();
        const endTimeHour = endTime.hour() + 1; // End time is inclusive, e.g. End time is 18:00, it should be 18:00 - 19:00
        const title = (useStylingStore.getState() as { title: string }).title;


        const display = (useDisplayStore.getState() as { display: string }).display;
        const displaySettingsStore = display === "iphone" ? useIphoneSettingsStore : display === "ipad" ? useIpadSettingsStore : display === "letter" ? useLetterSettingsStore : useA4SettingsStore;
        const courseGridHeight = (displaySettingsStore.getState() as { courseGridHeight: number }).courseGridHeight;
        let widgets: boolean;
        display === "iphone" ? widgets = (useIphoneSettingsStore.getState() as { widgets: boolean }).widgets : widgets = false;

        // 1. Set the limit
        let { LENGTH_LIMIT: limit } = getDisplayConstant(display, widgets);

        if (title) {
            limit -= 19;
        }

        // 2. Calculate number of rows
        const numberOfRows = Math.floor(limit / courseGridHeight);

        /**
         * 3. Calculate number of pages startTime and endTime
         * +1 for blank page
         */

        const numberOfPages = Math.ceil((endTimeHour - startTimeHour) / numberOfRows) + 1

        /**
         * 4. Generate pages
         */

        let pages = generatePages(startTime, endTime, numberOfRows)
        set(() => ({ numberOfPages: numberOfPages, pages: pages }))

    }
}))