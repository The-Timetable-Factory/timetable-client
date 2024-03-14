import React from "react";
import { capitalize } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup';
import { daysSelection } from "@/app/lib/interfaces/courses-interfaces";
import { DaysRange } from "@/app/lib/interfaces/settings-interfaces";

interface daysSelectionProps<T extends daysSelection | DaysRange> {
    days: T,
    handleChange: (name: string, value: T) => void;
}

function DaysSelection<T extends daysSelection | DaysRange>(props: daysSelectionProps<T>) {
    const { days, handleChange } = props;

    const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDays = {
            ...days,
            [event.target.name]: event.target.checked,
        }

        handleChange("days", newDays)
    }

    return (
        <>
            {/* <div style={{ justifyContent: "center" }}> */}

            <FormGroup row sx={{ justifyContent: "center" }}>
                {Object.keys(days).map((day) => (
                    <FormControlLabel
                        key={day}
                        control={<Checkbox onChange={handleDayChange} name={day} checked={days[day as keyof T] as boolean} size="small" />}
                        label={capitalize(day)}
                        labelPlacement='bottom'
                        sx={{ m: 0 }}
                    />
                ))}
            </FormGroup>
            {/* </div> */}
        </>
    )
}

export default React.memo(DaysSelection)
