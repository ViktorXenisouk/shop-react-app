import React from "react"
import CustomRadio from "./CustomRadio"
import { MyFilter } from "../types"
import { Box, Grid, Typography } from "@mui/material"

type Props = {
    name: string,
    tags: string[],
    direction: 'column' | 'row',
    filterParams: MyFilter,
    addOrRemoveTag: (tag: string) => void
}

const FilterList: React.FC<Props> = ({ name, tags, direction, filterParams, addOrRemoveTag }) => {

    return (
        <Box>
            <Typography 
            variant='body2' 
            sx={{ 
                fontWeight: 'bold',
                 ml: 1,
                 color:'text.primary'
                 }}>
                {name}
                </Typography>
            <Grid container direction={direction}>
                {tags.map((item, i) => <CustomRadio label={item} value={item} isSelected={filterParams.tags.includes(item)} addOrRemoveTag={addOrRemoveTag} />)}
            </Grid>
        </Box>
    )
}

export default FilterList