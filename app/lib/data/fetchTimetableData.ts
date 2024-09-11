import { createClient } from '@/utils/supabase/server'
import dayjs from 'dayjs'
import { courseInfo } from '@/app/lib/interfaces/courses-interfaces'


export async function fetchTimetableData(id: string) {
    console.log('fetchTimetableData')
    const supabase = createClient()
    const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .eq('timetable_id', id)

    if (coursesError) {
        console.error('Error fetching courses:', coursesError)
        throw coursesError
    }

    // Enhance courses with meeting times
    const courses: courseInfo[] = await Promise.all(
        coursesData?.map(async ({ created_at, timetable_id, ...course }) => {
            const { data: meetingTimes, error: meetingTimesError } = await supabase
                .from('meeting_times')
                .select('*')
                .eq('course_id', course.id)

            if (meetingTimesError) {
                console.error(`Error fetching meeting times for course ${course.id}:`, meetingTimesError)
                throw meetingTimesError
            }

            const processedMeetingTimes = meetingTimes?.map(({ id, course_id, created_at, days_selection, ...meetingTime }) => ({
                ...meetingTime,
                days: {
                    mon: days_selection[0],
                    tue: days_selection[1],
                    wed: days_selection[2],
                    thu: days_selection[3],
                    fri: days_selection[4],
                    sat: days_selection[5],
                    sun: days_selection[6],
                },
                startTime: dayjs(meetingTime.startTime),
                endTime: dayjs(meetingTime.endTime),
            }))

            return {
                ...course,
                meetingTimes: processedMeetingTimes || [],
                existed: true,
            }
        }) ?? []
    )

    // Fetch display settings
    let { data: iphoneDisplaySettings, error: iphoneSettingsError } = await supabase.from('iphone-display-settings').select('*').eq('timetable_id', id).single()
    let { data: ipadDisplaySettings, error: ipadSettingsError } = await supabase.from('ipad-display-settings').select('*').eq('timetable_id', id).single()
    let { data: letterDisplaySettings, error: letterSettingsError } = await supabase.from('letter-display-settings').select('*').eq('timetable_id', id).single()
    let { data: a4DisplaySettings, error: a4SettingsError } = await supabase.from('a4-display-settings').select('*').eq('timetable_id', id).single()

    if (iphoneDisplaySettings) {
        const { timetable_id, id, daysRange, ...restIphone } = iphoneDisplaySettings;

        iphoneDisplaySettings = {
            daysRange: {
                mon: daysRange[0],
                tue: daysRange[1],
                wed: daysRange[2],
                thu: daysRange[3],
                fri: daysRange[4],
                sat: daysRange[5],
                sun: daysRange[6],
            },
            ...restIphone
        };
    }

    if (ipadDisplaySettings) {
        const { timetable_id, id, daysRange, ...restIpad } = ipadDisplaySettings
        ipadDisplaySettings = {
            daysRange: {
                mon: daysRange[0],
                tue: daysRange[1],
                wed: daysRange[2],
                thu: daysRange[3],
                fri: daysRange[4],
                sat: daysRange[5],
                sun: daysRange[6],
            },
            ...restIpad
        }
    }

    if (letterDisplaySettings) {
        const { timetable_id, id, daysRange, ...restLetter } = letterDisplaySettings
        letterDisplaySettings = {
            daysRange: {
                mon: daysRange[0],
                tue: daysRange[1],
                wed: daysRange[2],
                thu: daysRange[3],
                fri: daysRange[4],
                sat: daysRange[5],
                sun: daysRange[6],
            },
            ...restLetter
        }
    }

    if (a4DisplaySettings) {
        const { timetable_id, id, daysRange, ...restA4 } = a4DisplaySettings
        a4DisplaySettings = {
            daysRange: {
                mon: daysRange[0],
                tue: daysRange[1],
                wed: daysRange[2],
                thu: daysRange[3],
                fri: daysRange[4],
                sat: daysRange[5],
                sun: daysRange[6],
            },
            ...restA4
        }
    }

    // Fetch and transform styling
    let { data: styling, error: stylingError } = await supabase.from('styling').select('*').eq('timetable_id', id).single()

    if (styling) {
        const { id, timetable_id, created_at, startTime, endTime, ...restStyling } = styling
        styling = {
            ...restStyling,
            startTime: dayjs(startTime),
            endTime: dayjs(endTime),
        }
    }

    return {
        courses: courses,
        styling,
        iphoneDisplaySettings: iphoneDisplaySettings,
        ipadDisplaySettings: ipadDisplaySettings,
        letterDisplaySettngs: letterDisplaySettings,
        a4DisplaySettings: a4DisplaySettings
    }
}



