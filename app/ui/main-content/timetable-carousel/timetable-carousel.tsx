'use client'
import { register } from 'swiper/element/bundle'
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { usePagesStore } from '@/app/lib/store/pages-store';
import TimetableBackground from '../timetable/timetable-background/timetable-background';
import Timetable from '../timetable/timetable';
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'swiper-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'swiper-slide': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

register();

export default function TimetableCarousel() {
    const numberOfPages = usePagesStore((state: any) => state.numberOfPages)

    return (
        <>
            <div className="slider-main-container">

                <swiper-container
                    slides-per-view="1"
                    navigation-next-el=".custom-next-button"
                    navigation-prev-el=".custom-prev-button"
                    pagination-clickable="true"
                    center-slides="true"

                    style={
                        {
                            width: "100%",
                            "--swiper-pagination-color": "#000",
                            "--swiper-pagination-bullet-size": "15px",
                        } as React.CSSProperties
                    }
                >


                    {
                        Array.from({ length: numberOfPages }, (_, i) => i + 1).map((page) => {
                            return (
                                <swiper-slide key={page}>
                                    <div style={{ justifyContent: "center", display: "flex", marginBottom: '40px' }}>
                                        <TimetableBackground id={page}>
                                            {page !== numberOfPages && <Timetable key={page} currPage={page} />}
                                        </TimetableBackground>
                                    </div>
                                </swiper-slide>
                            )
                        })
                    }


                </swiper-container>

                <div className="nav-btn custom-prev-button">

                    <IconButton

                        sx={{ height: "40px", width: "40px", alignSelf: 'center' }}

                        color="info"
                        data-testid="before-button">
                        <NavigateBeforeIcon />
                    </IconButton>
                </div>

                <div className="nav-btn custom-next-button">

                    <IconButton
                        sx={{ height: "40px", width: "40px", alignSelf: 'center' }}
                        color="info"
                        data-testid="next-button">
                        <NavigateNextIcon />
                    </IconButton>
                </div>
            </div>
        </>
    )
}