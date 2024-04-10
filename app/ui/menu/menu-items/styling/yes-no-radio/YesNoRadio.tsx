import React from "react"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { ClockType } from "@/app/lib/interfaces/styling-interfaces"


interface YesNoRadioProps {
    value: string
    optionA: string
    optionB: string
    handleChange: (value: string) => void
}

function YesNoRadio(props: YesNoRadioProps) {
    // const [displayTime, setDisplayTime] = useState<boolean>(props.value)

    function handleYesNoChange(newDisplayTime: string) {
        // setDisplayTime(newDisplayTime)
        props.handleChange(newDisplayTime)
    }
    return (
        <>
            <div >
                <ToggleButtonGroup color="info" value={props.value} size="small">


                    <ToggleButton
                        value={props.optionA}
                        component="button" // Add the component prop with the value of "button"
                        aria-label={props.optionA.toString()} // Explicitly cast the aria-label prop to a string
                        onClick={(event, value) => handleYesNoChange(value)}>
                        {props.optionA}
                    </ToggleButton>
                    <ToggleButton
                        value={props.optionB}
                        component="button" // Add the component prop with the value of "button"
                        aria-label="No" // Explicitly cast the aria-label prop to a string
                        onClick={(event, value) => handleYesNoChange(value)}
                    >
                        {props.optionB}
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        </>
    )
}

export default React.memo(YesNoRadio)