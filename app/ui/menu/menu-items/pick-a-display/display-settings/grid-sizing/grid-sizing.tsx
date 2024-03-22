import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from "@mui/material/Typography";

interface GridSizingProps {
    title: string,
    value: number,
    increase: () => void,
    decrease: () => void
}

function GridSizing(props: GridSizingProps) {

    function incrementSize() {
        props.increase()
    }

    function decrementSize() {
        props.decrease()
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                <IconButton
                    data-testid="remove-button"
                    onClick={decrementSize}
                    sx={{ border: 'solid black 1px', borderRadius: '10px', margin: '10px' }}
                    size="small">
                    <RemoveIcon />
                </IconButton>

                <Typography variant="body1">{props.value}</Typography>

                <IconButton data-testid="add-button" onClick={incrementSize} sx={{ border: 'solid black 1px', borderRadius: '10px', margin: '10px' }} size="small">
                    <AddIcon />
                </IconButton>
            </div>

        </>
    )

}

export default React.memo(GridSizing)