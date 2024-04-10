'use client'
import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import DisplaySettings from "./display-settings/display-settings"
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import Collapsible from "../../collapsible/Collapsible";
import { useDisplayStore } from "@/app/lib/store/display-store";
import { useTimetableStore } from "@/app/lib/store/timetable-store";

import { useIphoneSettingsStore } from "@/app/lib/store/iphone-settings-store";
import { useIpadSettingsStore } from "@/app/lib/store/ipad-settings-store";
import { useLetterSettingsStore } from "@/app/lib/store/letter-settings-store";
import { useA4SettingsStore } from "@/app/lib/store/a4-settings-store";
// import { iPhoneSettingsConstants } from "@/app/lib/constants/developer-settings-constants";




export default function PickADisplay() {

    const devices = ["iphone", "ipad", "letter", "a4"]
    const display = useDisplayStore((state: any) => state.display)
    const updateTimetable = useTimetableStore((state: any) => state.updateTimetable)


    function handleDeviceChange(deviceType: string) {
        useDisplayStore.setState({ display: deviceType })
        updateTimetable()
    }

    return (
        <>

            <Collapsible
                title="Pick A Display"
                icon={<DevicesOutlinedIcon sx={{ position: "absolute", right: "4%" }} />}
                backgroundColor="#DAD6CE"
                isCourse={false}
            >

                <div className="centerR " data-testid="pickADisplay">

                    <ToggleButtonGroup aria-label="select device" color="info" value={display}>
                        {
                            devices.map((deviceType) => {
                                return (
                                    <ToggleButton
                                        key={deviceType}
                                        value={deviceType}
                                        aria-label={deviceType}
                                        onClick={() => handleDeviceChange(deviceType)}
                                        data-testid={deviceType}
                                    >
                                        {deviceType}

                                    </ToggleButton>
                                )
                            })
                        }
                    </ToggleButtonGroup>

                </div>
                {
                    display === "iphone" ?
                        <DisplaySettings display={"iphone"} useDisplaySettingsStore={useIphoneSettingsStore} /> :
                        display === "ipad" ?
                            <DisplaySettings display={"ipad"} useDisplaySettingsStore={useIpadSettingsStore} /> :
                            display === "letter" ?
                                <DisplaySettings display={"letter"} useDisplaySettingsStore={useLetterSettingsStore} /> :
                                <DisplaySettings display={"a4"} useDisplaySettingsStore={useA4SettingsStore} />

                }
            </Collapsible>
        </>
    )

}

