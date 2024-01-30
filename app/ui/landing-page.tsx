'use client'
import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LandingPageIphone from "../../public/LandingPageIphone.png"
import LandingPageIpad from "../../public/LandingPageIpad.png"
import Image from "next/image";
import { useRouter } from 'next/navigation'



export default function LandingPage() {
    const router = useRouter()

    return (
        <>
            <div>
                <Grid container direction="row" sx={{ minHeight: "90vh", overflow: "hidden" }}>
                    <Grid item xs={12} md={6} className="center">
                        <div style={{ padding: "0vw 4vw 10vw 8vw", textAlign: "left" }}>
                            <Typography variant="h3" sx={{ py: "10vh", }}> Timetables That Perfectly Fit Your Iphone and Ipad Lockscreen</Typography>
                            <Button variant="contained" color="info" size="large" onClick={() => router.push('/timetable')}> Create Now</Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{ display: "flex", alignItems: "center" }}>
                        <div
                            style={{ position: "relative" }}>

                            <Image
                                src={LandingPageIpad}
                                alt="Landing Page Ipad"
                                height={820}
                            />
                            <Image
                                src={LandingPageIphone}
                                alt="Landing Page Iphone"
                                height={600}
                                style={{ position: "absolute", left: "-320px", top: "190px" }} />

                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}