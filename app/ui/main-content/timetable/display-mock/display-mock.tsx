'use client'
import { PropsWithChildren, useState, useEffect } from "react"
import { useDisplayStore } from "@/app/lib/store/display-store"
import { useStylingStore } from "@/app/lib/store/styling-store"
import { getDisplayConstant, getScale } from "@/app/lib/utils/developer-display"
import { isColorDark } from "@/app/lib/utils/color"
import useStore from "@/app/lib/hooks/useStore"
import dayjs from "dayjs"
import localFont from "next/font/local"
import Image from "next/image"
// import LandingPageIpad from "@/public/LandingPageIpad.png"

const SFProDisplay = localFont({ src: './SF-Pro.ttf' })

interface DisplayMockProps {
    fontColor: string
}

export default function DisplayMock(props: DisplayMockProps) {
    const display = useDisplayStore((state: any) => state.display)
    const widgets = false //TODO: get from settings
    const [time, setTime] = useState(dayjs())
    // const backgroundColor = useStore(useStylingStore, (state: any) => state.backgroundColor)
    // const fontColor = isColorDark(props.backgroundColor) ? "white" : "black"


    const { ASPECT_RATIO, BORDER_RADIUS, HEIGHT, WIDTH, SCALE, WATERMARK_POSITION, DEVICE_IMAGES } = getDisplayConstant(display, widgets)
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(dayjs());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {
                DEVICE_IMAGES &&
                <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', zIndex: 6 }}>

                    <Image
                        src={DEVICE_IMAGES?.DEVICE_MOCK.SRC}
                        style={DEVICE_IMAGES?.DEVICE_MOCK.STYLE}
                        alt={display} />


                    <div style={{ textAlign: "center", position: 'absolute', top: '96px' }}>
                        <h1
                            className={SFProDisplay.className}
                            style={{ fontSize: '16px', margin: 0, lineHeight: 1, fontWeight: 'bolder', color: props.fontColor }} >{time.format('dddd, DD MMMM')}</h1>
                        <h1 className={SFProDisplay.className} style={{ fontSize: '74px', margin: 0, lineHeight: 1, color: props.fontColor }} >{time.format('h:mm')}</h1>
                    </div>
                </div>}
        </>
    )
}