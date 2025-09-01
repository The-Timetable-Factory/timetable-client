'use client'
import { PropsWithChildren, useState, useEffect } from "react"
import { getDisplayConstant, getScale } from "@/app/lib/utils/developer-display"
import { isColorDark } from "@/app/lib/utils/color"
import iPhoneImg from "@/app/assets/images/iphone.png"
import style from "./timetable-background.module.css"
import { useDisplayStore } from "@/app/lib/store/display-store"
import { useStylingStore } from "@/app/lib/store/styling-store"
import useStore from "@/app/lib/hooks/useStore"
import Image from "next/image"
import dayjs from "dayjs"
import localFont from "next/font/local"
import DisplayMock from "../display-mock/display-mock"

interface TimetableBackgroundProps extends PropsWithChildren {
    id: number //For download purposes, as a selector id
}

const SFProDisplay = localFont({ src: './SF-Pro.ttf' })

export default function TimetableBackground(props: TimetableBackgroundProps) {
    const display = useDisplayStore((state: any) => state.display)
    const widgets = false //TODO: get from settings
    const backgroundColor = useStore(useStylingStore, (state: any) => state.backgroundColor)
    const [time, setTime] = useState(dayjs())

    const fontColor = backgroundColor ? isColorDark(backgroundColor) ? "white" : "black" : "black"

    const { ASPECT_RATIO, BORDER_RADIUS, HEIGHT, WIDTH, SCALE, WATERMARK_POSITION, DEVICE_IMAGES } = getDisplayConstant(display, widgets)
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(dayjs());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const divStyle = {
        height: HEIGHT,
        aspectRatio: ASPECT_RATIO,
        backgroundColor: backgroundColor,
        borderRadius: BORDER_RADIUS,
        border: "solid 1px",
        borderColor: "info.main",
        transform: `scale(${getScale(SCALE, window.innerWidth, WIDTH)})`,
        top: "-6px",
    }
    return (
        <>

            <DisplayMock fontColor={fontColor} />
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




{
    // DEVICE_IMAGES &&
    // <>
    //     {/* <div> */}

    //     {/* <img
    //         key={display}
    //         className={style.dateTime}
    //         src={backgroundColor && isColorDark(backgroundColor) ? DEVICE_IMAGES.DATE_TIME.SRC.WHITE : DEVICE_IMAGES.DATE_TIME.SRC.BLACK}
    //         style={DEVICE_IMAGES?.DATE_TIME.STYLE}
    //         alt={`${display} date time`} /> */}
    //     {/* </div> */}

    //     <img
    //         src={DEVICE_IMAGES?.DEVICE_MOCK.SRC}
    //         className={style.img}
    //         style={DEVICE_IMAGES?.DEVICE_MOCK.STYLE}
    //         alt={display} />
    //     <div style={{ textAlign: "center", zIndex: 6 }}>
    //         <h1 className={SFProDisplay.className} style={{ fontSize: '16px', margin: 0, lineHeight: 1, fontWeight: 'bolder' }} >{time.format('dddd, DD MMMM')}</h1>
    //         <h1 className={SFProDisplay.className} style={{ fontSize: '74px', margin: 0, lineHeight: 1 }} >{time.format('H:m')}</h1>
    //     </div>

    // </>
}
{/* <Image
    src={DEVICE_IMAGES?.DEVICE_MOCK.SRC}
    className={style.img}
    // style={DEVICE_IMAGES?.DEVICE_MOCK.STYLE}
    style={DEVICE_IMAGES?.DEVICE_MOCK.STYLE}
    height={DEVICE_IMAGES?.DEVICE_MOCK.HEIGHT}
    alt="iphone"
/> */}