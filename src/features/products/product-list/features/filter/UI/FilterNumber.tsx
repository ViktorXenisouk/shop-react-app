import React from "react"
import { MyFilter } from "../types"
import { CategoryProps } from "../../../../../../types/catalog"
import { Box, Typography, TextField } from "@mui/material"
import RangeInput from "../../../../../../UI/RangeInput"

type Props = {
    title: string,
    props: CategoryProps
    filter: MyFilter,
    id: string
    addOrRemoveField: (field: string, value: any) => void
}

const FilterNumber : React.FC<Props> = ({ title, props, filter, id, addOrRemoveField }) => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',mx:'8px',pb:'20px' }}>
            <Typography variant="caption" color='text.primary'>
                {title}
                </Typography>
            <RangeInput min={filter.other[title.replace(' ','_')]?.min || 0} max={filter.other[title.replace(' ','_')]?.max || 0} onChange={(range) => addOrRemoveField(title.replace(' ','_'), range)} />
        </Box>
    )
}

export default FilterNumber