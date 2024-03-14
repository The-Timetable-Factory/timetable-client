import style from './timetable-td.module.css'
import CourseGrid from '../course-grid/course-grid'
import { haveCourseGrid } from '@/app/lib/interfaces/courses-interfaces'
import { useIphoneSettingsStore } from '@/app/lib/store/iphone-settings-store'
import { useIpadSettingsStore } from '@/app/lib/store/ipad-settings-store'
import { Dayjs } from 'dayjs'

interface timetableTdProps extends Partial<haveCourseGrid> {
    time: Dayjs
}

export default function TimetableTd(props: timetableTdProps) {
    const courseGridWidth = useIphoneSettingsStore((state: any) => state.courseGridWidth)

    function calculateTop(index: number) {
        const startTime = props.courseGridInfos![index].displayStartTime;
        const timeDiff = startTime.diff(props.time, 'hour', true)

        return timeDiff
    }

    return (
        <>

            <td className={style.td} rowSpan={props.rowspan} style={{ width: courseGridWidth }}>
                {props.courseGridInfos?.map((courseGridInfos, index) => {
                    return <CourseGrid {...courseGridInfos}
                        key={index}
                        top={calculateTop(index)}
                        rowspan={props.rowspan}
                    />

                })}

            </td>
        </>
    )
}