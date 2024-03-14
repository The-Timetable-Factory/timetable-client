import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SettingCSS from "./DisplaySettings.module.css"
import GridSizing from "./grid-sizing/grid-sizing";
import DaysSelection from "../../../inputs/day-selection/day-selection";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert"
// import { getTimetable } from "../../../../store/timetable-action";
import Widgets from "./widgets/widgets";
// import { getPages } from "../../../../store/pages-action";
import { useIphoneSettingsStore } from "@/app/lib/store/iphone-settings-store";
import { useIpadSettingsStore } from "@/app/lib/store/ipad-settings-store";
import { useLetterSettingsStore } from "@/app/lib/store/letter-settings-store";
import { useA4SettingsStore } from "@/app/lib/store/a4-settings-store";
import { DaysRange } from "@/app/lib/interfaces/settings-interfaces";

interface SettingsProps {
    display: string
}

export default function Settings(props: SettingsProps) {
    let displaySettingsStore: any;
    switch (props.display) {
        case "iphone":
            displaySettingsStore = useIphoneSettingsStore
            break;
        case "ipad":
            displaySettingsStore = useIpadSettingsStore
            break;
        case "letter":
            displaySettingsStore = useLetterSettingsStore
            break;
        case "a4":
            displaySettingsStore = useA4SettingsStore
            break;
        default:
            throw new Error("Invalid device type")
    }


    const daysRange = displaySettingsStore((state: any) => state.daysRange)
    const courseGridWidth = displaySettingsStore((state: any) => state.courseGridWidth)
    const courseGridHeight = displaySettingsStore((state: any) => state.courseGridHeight)
    const widgets = displaySettingsStore((state: any) => state.widgets)
    const [errorMessage, setErrorMessage] = useState<string>('')

    function handleDaysChange(name: string, value: DaysRange) {
        displaySettingsStore.setState({ daysRange: value })
    }

    const handleCourseGridWidthChange = useCallback((value: number) => {
        displaySettingsStore.setState({ courseGridWidth: value })
    }, [])

    const handleCourseGridHeightChange = useCallback((value: number) => {
        displaySettingsStore.setState({ courseGridHeight: value })
    }, [])

    function handleWidgetsChange(value: boolean) {
        displaySettingsStore.setState({ widgets: value })
    }

    function resetToDefault() {

    }

    function onSubmit() {

    }

    return (
        <>
            <div className="center menuItemInnerInput" data-testid="setting">

                <Typography variant="h6">{props.display} Display Settings</Typography>

                {errorMessage && <Alert severity="error" onClose={() => { setErrorMessage("") }}>{errorMessage}</Alert>}
                <DaysSelection days={daysRange} handleChange={handleDaysChange} />

                <table className={SettingCSS.table}>
                    <tbody>
                        <tr>
                            <th>
                                <Typography variant="body1">Grid Width: </Typography>
                            </th>
                            <td>

                                <GridSizing title={"Course Grid Width"} value={courseGridWidth} handleChange={handleCourseGridWidthChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Typography variant="body1">Grid Height: </Typography>
                            </th>
                            <td>
                                <GridSizing title={"Course Grid Height"} value={courseGridHeight} handleChange={handleCourseGridHeightChange} />

                            </td>
                        </tr>

                        {
                            props.display === "iphone" &&
                            <tr>
                                <th>
                                    <Typography variant="body1">Widgets: </Typography>
                                </th>
                                <td style={{ textAlign: "left" }}>
                                    <Widgets value={widgets} handleChange={handleWidgetsChange} />
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>


                <Button variant="outlined" color="info" onClick={resetToDefault} sx={{ margin: '4px' }}>Reset to default</Button>

                <Button type="submit" variant="outlined" color="info" onClick={onSubmit} sx={{ margin: '4px' }}>Update</Button>
            </div>
        </>
    )
}