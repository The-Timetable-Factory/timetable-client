import { createClient } from '@/utils/supabase/server'
import TimetablePage from '@/app/ui/timetable-page'
import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/app/translation-provider"
import { courseInfo } from '@/app/lib/interfaces/courses-interfaces'
import { fetchTimetableData } from '@/app/lib/data/fetchTimetableData'
import dayjs from 'dayjs'

const i18nNamespaces = ["timetable", "theme", "course", "common", "styling", "settings"]

export default async function Page({ params: { locale, id } }: { params: { locale: string, id: string } }) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces)
    // const { courses, styling, iphoneDisplaySettings, ipadDisplaySettings, letterDisplaySettngs, a4DisplaySettings } = await fetchTimetableData(id)

    const supabase = createClient()
    const { data, error } = await supabase.rpc('fetch_timetable_data', { p_timetable_id: id }).single()

    const { courses, styling, iphoneDisplaySettings, ipadDisplaySettings, letterDisplaySettings, a4DisplaySettings, timetabletitle } = data as { courses: any[], styling: any, iphoneDisplaySettings: any, ipadDisplaySettings: any, letterDisplaySettings: any, a4DisplaySettings: any, timetabletitle: string }

    console.log('fetch_timetable_data', data)

    return (
        <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
        >
            <></>
            <TimetablePage
                courses={courses}
                styling={styling}
                iphoneDisplaySettings={iphoneDisplaySettings}
                ipadDisplaySettings={ipadDisplaySettings}
                letterDisplaySettings={letterDisplaySettings}
                a4DisplaySettings={a4DisplaySettings}
                timetableTitle={timetabletitle}
            />
        </TranslationsProvider>
    )
}