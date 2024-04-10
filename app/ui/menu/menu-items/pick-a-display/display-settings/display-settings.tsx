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

import { DaysRange } from "@/app/lib/interfaces/settings-interfaces";
import { UseBoundStore } from "zustand";

interface SettingsProps {
    display: string
    useDisplaySettingsStore: UseBoundStore<any>
}
/**
 * @description Do I need to add a useCallback for increaseCourseGridWidth, decreaseCourseGridWidth, increaseCourseGridHeight, decreaseCourseGridHeight?
 * @param props 
 * @returns 
 */



export default function Settings(props: SettingsProps) {
    const { display, useDisplaySettingsStore } = props


    const daysRange = useDisplaySettingsStore((state: any) => state.daysRange)
    const courseGridWidth = useDisplaySettingsStore((state: any) => state.courseGridWidth)
    const courseGridHeight = useDisplaySettingsStore((state: any) => state.courseGridHeight)
    const widgets = useDisplaySettingsStore((state: any) => state.widgets)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const increaseCourseGridWidth = useDisplaySettingsStore((state: any) => state.increaseCourseGridWidth)
    const decreaseCourseGridWidth = useDisplaySettingsStore((state: any) => state.decreaseCourseGridWidth)

    const increaseCourseGridHeight = useDisplaySettingsStore((state: any) => state.increaseCourseGridHeight)
    const decreaseCourseGridHeight = useDisplaySettingsStore((state: any) => state.decreaseCourseGridHeight)

    const setDaysRange = useDisplaySettingsStore((state: any) => state.setDaysRange)


    function handleDaysChange(name: string, value: DaysRange) {
        console.log("Display Settings handleDaysChange")
        // useDisplaySettingsStore.setState({ daysRange: value })
        setDaysRange(value)
    }
    
    function handleWidgetsChange(value: boolean) {
        useDisplaySettingsStore.setState({ widgets: value })
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

                                <GridSizing
                                    title={"Course Grid Width"}
                                    value={courseGridWidth}
                                    increase={increaseCourseGridWidth}
                                    decrease={decreaseCourseGridWidth} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Typography variant="body1">Grid Height: </Typography>
                            </th>
                            <td>
                                <GridSizing
                                    title={"Course Grid Height"}
                                    value={courseGridHeight}

                                    increase={increaseCourseGridHeight}
                                    decrease={decreaseCourseGridHeight} />


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

            // const handleCourseGridWidthChange = useCallback((value: number) => {
            //     console.log("Update Course Grid Width for" + props.display + " to " + value)
            //     useDisplaySettingsStore.setState({ courseGridWidth: value })
            // }, [])
        
        
        
            // const handleCourseGridHeightChange = useCallback((value: number) => {
            //     useDisplaySettingsStore.setState({ courseGridHeight: value })
            // }, [])