import style from './timetable-td.module.css'
import CourseGrid from '../course-grid/course-grid'
import { haveCourseGrid } from '@/app/lib/interfaces/courses-interfaces'
import { Dayjs } from 'dayjs'

interface timetableTdProps extends Partial<haveCourseGrid> {
    time: Dayjs
    courseGridHeight: number,
    courseGridWidth: number
}

export default function TimetableTd(props: timetableTdProps) {

    function calculateTop(index: number) {
        const startTime = props.courseGridInfos![index].displayStartTime;
        const timeDiff = startTime.diff(props.time, 'hour', true)

        return timeDiff
    }

    return (
        <>

            <td className={style.td} rowSpan={props.rowspan} style={{ width: props.courseGridWidth, height: props.courseGridHeight }}>
                {props.courseGridInfos?.map((courseGridInfos, index) => {
                    return <CourseGrid {...courseGridInfos}
                        key={index}
                        top={calculateTop(index)}
                        rowspan={props.rowspan}
                        courseGridHeight={props.courseGridHeight}
                    />

                })}

            </td>
        </>
    )
}