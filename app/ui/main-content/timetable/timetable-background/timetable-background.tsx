'use client'
import { PropsWithChildren, useState, useEffect } from "react"
import { getDisplayConstant, getScale } from "@/app/lib/utils/developer-display"
import { isColorDark } from "@/app/lib/utils/color"
import { useDisplayStore } from "@/app/lib/store/display-store"
import { useStylingStore } from "@/app/lib/store/styling-store"
import useStore from "@/app/lib/hooks/useStore"
import dayjs from "dayjs"
import localFont from "next/font/local"
import style from "./timetable-background.module.css"
import DisplayMock from "../display-mock/display-mock"

interface TimetableBackgroundProps extends PropsWithChildren {
  id: number
}

const SFProDisplay = localFont({ src: './SF-Pro.ttf' })

export default function TimetableBackground({ id, children }: TimetableBackgroundProps) {
  const display = useDisplayStore((state: any) => state.display)
  const widgets = false
  const backgroundColor = useStore(useStylingStore, (state: any) => state.backgroundColor)
  const [time, setTime] = useState(dayjs())
  const [windowWidth, setWindowWidth] = useState<number | null>(null)

  const {
    ASPECT_RATIO,
    BORDER_RADIUS,
    HEIGHT,
    WIDTH,
    SCALE,
    WATERMARK_POSITION,
  } = getDisplayConstant(display, widgets)

  const fontColor = backgroundColor
    ? isColorDark(backgroundColor)
      ? "white"
      : "black"
    : "black"

  useEffect(() => {
    // Only run on the client
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)

      const handleResize = () => setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setTime(dayjs()), 60000)
    return () => clearInterval(interval)
  }, [])

  // Fallback scale (e.g. mobile scale) if windowWidth is not yet set
  const scale = getScale(SCALE, windowWidth ?? 375, WIDTH)

  const scaledStyle = {
    height: HEIGHT,
    aspectRatio: ASPECT_RATIO,
    backgroundColor,
    borderRadius: BORDER_RADIUS,
    border: "solid 1px",
    borderColor: "info.main",
    transform: `scale(${scale})`,
    top: "-6px",
  }

  return (
    <>
      <DisplayMock fontColor={fontColor} />

      <div
        key={`${display}${id}`}
        className={`center ${style.background}`}
        style={scaledStyle}
        id={`${display}${id}`}
      >
        <div
          className={style.backgroundInvisible}
          style={{ aspectRatio: ASPECT_RATIO, height: HEIGHT }}
          id={`TimetableBackground${display}${id}`}
        >
          {children}
          <p
            className={style.name}
            style={{
              color: fontColor,
              bottom: WATERMARK_POSITION,
            }}
          >
            by thetimetablefactory.com
          </p>
        </div>
      </div>
    </>
  )
}
