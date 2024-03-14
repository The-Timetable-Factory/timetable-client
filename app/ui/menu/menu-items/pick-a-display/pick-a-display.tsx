'use client'
import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import DisplaySettings from "./display-settings/display-settings"
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import Collapsible from "../../collapsible/Collapsible";
import { useDisplayStore } from "@/app/lib/store/display-store";
// import { settingsActions } from "../../../../store/settings-slice";
// import { getTimetable } from "../../../../store/timetable-action";
// import { RootState, useDispatch } from '../../../../store';
// import { getPages } from "../../../../store/pages-action";
// import { useSelector } from "react-redux";



export default function PickADisplay() {
    // const dispatch = useDispatch()
    // const device = useSelector((state: RootState) => state.settings.device)
    const devices = ["iphone", "ipad", "letter", "a4"]
    const display = useDisplayStore((state: any) => state.display)

    // console.log("Pick A Display Rendered")

    function handleDeviceChange(deviceType: string) {
        // dispatch(settingsActions.fetchSettings(deviceType))
        // dispatch(getPages())
        // dispatch(getTimetable())
        useDisplayStore.setState({ display: deviceType })
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
                <DisplaySettings display={display} />
            </Collapsible>
        </>
    )

}

