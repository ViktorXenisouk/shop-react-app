import FilterBlock from "./FilterBlock"

import {Box,Grid,Typography} from "@mui/material"

const FilterList = ({ name, tags ,direction}: { name: string, tags:string[],direction: 'column' | 'row' }) => {

    return (
        <Box>
            <Typography>{name}</Typography>
            <Grid container direction={direction}>
            {tags.map((item) => <FilterBlock>{item}</FilterBlock>)}
            </Grid>
        </Box>
    )
}

export default FilterList