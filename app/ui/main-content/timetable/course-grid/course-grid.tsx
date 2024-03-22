import { CourseGridInfos } from '@/app/lib/interfaces/courses-interfaces';
import { useStylingStore } from '@/app/lib/store/styling-store';
import { useDisplayStore } from '@/app/lib/store/display-store';
import { ClockType } from '@/app/lib/interfaces/styling-interfaces';
import style from './course-grid.module.css'

interface CourseGridProps extends CourseGridInfos {
    top: number;
    /**
     * TODO: fix rowspan type
     */
    courseGridHeight: number;
    rowspan?: number | undefined;
}

export default function CourseGrid(props: CourseGridProps) {

    const displayTime = useStylingStore((state: any) => state.displayTime) // TODO: connect to settings
    // const courseGridHeight = displaySettingsStore((state: any) => state.courseGridHeight)
    const clockType = useStylingStore((state: any) => state.clockType)
    const display = useDisplayStore((state: any) => state.display)

    console.log('ClockType ' + ClockType.TWELVE_HOUR + ' from interface')
    console.log('clockType ' + clockType + ' from store')

    function calculateHeight() {
        const rowspan = props.rowspan ? props.rowspan : 1
        return (props.height / rowspan) * 100 + "%"
    }
    return (
        <div
            className={`center ${style.center}`}
            style={{
                backgroundColor: props.backgroundColor,
                height: calculateHeight(),
                width: "100%",
                top: props.top * props.courseGridHeight
            }}
        >
            <p className={`${style.courseInput} ${style.courseCode}`}>{props.courseCode}</p>
            <p className={`${style.courseInput}`}>{props.format}</p>
            <p className={`${style.courseInput}`}>{props.location}</p>
            {displayTime &&
                (display === "iphone" ?
                    <>
                        <p className={`${style.courseInput}`}>{props.startTime.format(`${clockType === ClockType.TWELVE_HOUR ? "hh:mm A" : "HH:mm"}`)}</p>
                        <p className={`${style.courseInput} ${style.label}`}>  - </p>
                        <p className={`${style.courseInput}`}> {props.endTime.format(`${clockType === ClockType.TWELVE_HOUR ? "hh:mm A" : "HH:mm"}`)}</p>
                    </> :
                    <>
                        <p className={`${style.courseInput}`}>{props.startTime.format(`${clockType === ClockType.TWELVE_HOUR ? "hh:mm A" : "HH:mm"}`)} - {props.endTime.format(`${clockType === ClockType.TWELVE_HOUR ? "hh:mm A" : "HH:mm"}`)}</p>
                    </>)

            }

        </div>
    )
}