import { CourseGridInfos } from '@/app/lib/interfaces/courses-interfaces';
import style from './course-grid.module.css'

interface CourseGridProps extends CourseGridInfos {
    top: number;
    /**
     * TODO: fix rowspan type
     */
    rowspan?: number | undefined;
}

export default function CourseGrid(props: CourseGridProps) {
    const displayTime = true // TODO: connect to settings
    const courseGridHeight = 49 // TODO: connect to settings
    const clockType = "12 Hour" // TODO: connect to settings
    const device = "iphone" // TODO: connect to settings

    function calculateHeight() {
        const rowspan = props.rowspan ? props.rowspan : 1
        return (props.height / rowspan) * 100 + "%"
    }
    return (
        <div
            style={{
                backgroundColor: props.backgroundColor,
                height: calculateHeight(),
                width: "100%",
                top: props.top * courseGridHeight
            }}
        >
            <p className={`${style.courseInput} ${style.courseCode}`}>{props.courseCode}</p>
            <p className={`${style.courseInput}`}>{props.format}</p>
            <p className={`${style.courseInput}`}>{props.location}</p>
            {displayTime &&
                (device === "iphone" ?
                    <>
                        <p className={`${style.courseInput}`}>{props.startTime.format(`${clockType === "12 Hour" ? "hh:mm A" : "HH:mm"}`)}</p>
                        <p className={`${style.courseInput} ${style.label}`}>  - </p>
                        <p className={`${style.courseInput}`}> {props.endTime.format(`${clockType === "12 Hour" ? "hh:mm A" : "HH:mm"}`)}</p>
                    </> :
                    <>
                        <p className={`${style.courseInput}`}>{props.startTime.format(`${clockType === "12 Hour" ? "hh:mm A" : "HH:mm"}`)} - {props.endTime.format(`${clockType === "12 Hour" ? "hh:mm A" : "HH:mm"}`)}</p>
                    </>)

            }

        </div>
    )
}