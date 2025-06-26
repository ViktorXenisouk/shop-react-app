import CustomRadio from "./FilterBlock"

import {Box,Grid,Typography} from "@mui/material"

const FilterList = ({ name, tags ,direction}: { name: string, tags:string[],direction: 'column' | 'row' }) => {

    return (
        <Box>
            <Typography>{name}</Typography>
            <Grid container direction={direction}>
                {tags.map((item,i) => <CustomRadio label={item} value={item} name={`${name}${i}`} />)}
            </Grid>
        </Box>
    )
}

export default FilterList