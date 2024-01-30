'use client'
import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import DisplaySettings from "./DisplaySettings/DisplaySettings"
// import { settingsActions } from "../../../../store/settings-slice";
// import { getTimetable } from "../../../../store/timetable-action";
// import { RootState, useDispatch } from '../../../../store';
// import { getPages } from "../../../../store/pages-action";
// import { useSelector } from "react-redux";



export default function PickADisplay() {
    // const dispatch = useDispatch()
    // const device = useSelector((state: RootState) => state.settings.device)
    const devices = ["iphone", "ipad", "letter", "a4"]
    const [device, setDevice] = React.useState("iphone")

    // console.log("Pick A Display Rendered")

    function handleDeviceChange(deviceType: string) {
        // dispatch(settingsActions.fetchSettings(deviceType))
        // dispatch(getPages())
        // dispatch(getTimetable())
        setDevice(deviceType)
    }

    return (
        <>
            <div className="center menuItemContainer">

                <div className="centerR " data-testid="pickADisplay">

                    <ToggleButtonGroup aria-label="select device" color="info" value={device}>
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
                <DisplaySettings device={device} />
            </div>
        </>
    )

}

