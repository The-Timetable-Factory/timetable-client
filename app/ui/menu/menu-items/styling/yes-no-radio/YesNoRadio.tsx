import React from "react"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"


interface YesNoRadioProps {
    value: boolean
    handleChange: (value: boolean) => void
}

function YesNoRadio(props: YesNoRadioProps) {
    // const [displayTime, setDisplayTime] = useState<boolean>(props.value)

    function handleYesNoChange(event: React.MouseEvent<HTMLElement>, newDisplayTime: boolean) {
        // setDisplayTime(newDisplayTime)
        props.handleChange(newDisplayTime)
    }
    return (
        <>
            <div>

                <ToggleButtonGroup aria-label="hour formatting" color="info" value={props.value} size="small">
                    <ToggleButton value={true} aria-label="yes" onClick={handleYesNoChange}>Yes</ToggleButton>
                    <ToggleButton value={false} aria-label="yes" onClick={handleYesNoChange}>No</ToggleButton>

                </ToggleButtonGroup>
            </div>
        </>
    )
}

export default React.memo(YesNoRadio)