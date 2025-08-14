import React from "react";
import CountBlock from "./CountBlock";
import { Paper } from "@mui/material"

type Props = {
    count: number,
    onChange?: (count: number) => void,
    id: string
}

const BasketCountBlock: React.FC<Props> = ({ count, onChange, id }) => {

    const changeHandler = (count: number) => {
        onChange?.(count)
    }

    return (
        <Paper component={'div'} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <CountBlock onChange={changeHandler} count={count} />
        </Paper>
    )
}

export default BasketCountBlock