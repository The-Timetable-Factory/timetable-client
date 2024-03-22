'use client'
import { PropsWithChildren } from "react"
import { getDisplayConstant, getScale } from "@/app/lib/utils/developer-display"
import { isColorDark } from "@/app/lib/utils/color"
import iPhoneImg from "@/app/assets/images/iphone.png"
import style from "./timetable-background.module.css"
import { useDisplayStore } from "@/app/lib/store/display-store"
import { useStylingStore } from "@/app/lib/store/styling-store"
import useStore from "@/app/lib/hooks/useStore"
import Image from "next/image"

interface TimetableBackgroundProps extends PropsWithChildren {
    id: number //For download purposes, as a selector id
}

export default function TimetableBackground(props: TimetableBackgroundProps) {
    const display = useDisplayStore((state: any) => state.display) //TODO: get from settings
    const widgets = false //TODO: get from settings

    // const backgroundColor = useStylingStore((state: any) => state.backgroundColor)
    // const backgroundColor = useStore(useStylingStore, (state: any) => state.backgroundColor)
    const backgroundColor = useStore(useStylingStore, (state: any) => state.backgroundColor)

    const { ASPECT_RATIO, BORDER_RADIUS, HEIGHT, WIDTH, SCALE, WATERMARK_POSITION, DEVICE_IMAGES } = getDisplayConstant(display, widgets)


    const divStyle = {
        backgroundColor: backgroundColor,
        borderRadius: BORDER_RADIUS,
        border: "solid 1px",
        borderColor: "info.main",
        transform: `scale(${getScale(SCALE, WIDTH)})`
    }
    return (
        <>
            <div style={{ position: "absolute", zIndex: 3 }} className="center">

                {
                    DEVICE_IMAGES &&
                    <>
                        {/* <div> */}

                        <img
                            key={display}
                            className={style.dateTime}
                            src={backgroundColor && isColorDark(backgroundColor) ? DEVICE_IMAGES.DATE_TIME.SRC.WHITE : DEVICE_IMAGES.DATE_TIME.SRC.BLACK}
                            style={DEVICE_IMAGES?.DATE_TIME.STYLE}
                            alt={`${display} date time`} />
                        {/* </div> */}

                        <img
                            src={DEVICE_IMAGES?.DEVICE_MOCK.SRC}
                            className={style.img}
                            style={DEVICE_IMAGES?.DEVICE_MOCK.STYLE}
                            alt={display} />
                    </>
                }
            </div>
            <div
                key={`${display}${props.id}`}
                className={`center ${style.background}`}
                style={divStyle}
                id={`${display}${props.id}`}
            >

                <div
                    className={`${style.backgroundInvisible}`}
                    style={{ aspectRatio: ASPECT_RATIO, height: HEIGHT }}
                    id={`TimetableBackground${display}${props.id}`}>
                    {props.children}
                    <p
                        className={style.name}
                        style={{ color: backgroundColor && isColorDark(backgroundColor) ? "#FFFFFF" : "#000000", bottom: WATERMARK_POSITION }}>
                        by thetimetablefactory.com
                    </p>
                </div>
            </div>

        </>
    )
}



{/* <Image
    key={display}
    className={style.dateTime}
    src={isColorDark(backgroundColor) ? DEVICE_IMAGES.DATE_TIME.SRC.WHITE : DEVICE_IMAGES.DATE_TIME.SRC.BLACK}
    style={DEVICE_IMAGES?.DATE_TIME.STYLE}
    height={DEVICE_IMAGES?.DATE_TIME.HEIGHT}
    alt="iphone date time"
/> */}




{/* <Image
    src={DEVICE_IMAGES?.DEVICE_MOCK.SRC}
    className={style.img}
    // style={DEVICE_IMAGES?.DEVICE_MOCK.STYLE}
    style={DEVICE_IMAGES?.DEVICE_MOCK.STYLE}
    height={DEVICE_IMAGES?.DEVICE_MOCK.HEIGHT}
    alt="iphone"
/> */}