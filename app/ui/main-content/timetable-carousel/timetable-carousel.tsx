import React, { useState, useRef } from "react"
// import Swiper and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

//import MUI component and icon
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TimetableBackground from "../timetable/timetable-background/timetable-background";


export default function TimetableCarousel() {
    const swiperRef = useRef<SwiperType>();
    const [currPage, setCurrPage] = useState(1);
    const isPhone = window.innerWidth < 600;

    function handleSlideChange(swiper: any) {
        const { activeIndex } = swiper;
        setCurrPage(activeIndex + 1)
    }

    return (
        <>

            {
                !isPhone &&

                <IconButton
                    onClick={() => swiperRef.current?.slidePrev()}
                    sx={{ height: "40px", width: "40px" }}
                    className="swiper-navigate-prev"
                    color="info"
                    data-testid="before-button">
                    <NavigateBeforeIcon />
                </IconButton>
            }
            <Swiper
                className="mySwiper"
                navigation={{
                    prevEl: 'swiper-navigate-prev',
                    nextEl: 'swiper-navigate-next',
                }}
                onSlideChange={handleSlideChange}
                onBeforeInit={(swiper: SwiperType) => {
                    swiperRef.current = swiper;
                }}
                data-testid="carousel"
            >
                <TimetableBackground id={1} />

            </Swiper>

            {
                !isPhone &&
                <IconButton
                    onClick={() => swiperRef.current?.slideNext()}
                    sx={{ height: "40px", width: "40px" }}
                    className="swiper-navigate-next"
                    color="info"
                    data-testid="next-button">
                    <NavigateNextIcon />
                </IconButton>
            }

        </>
    )
}