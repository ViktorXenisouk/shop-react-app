import CustomRadio from "./CustomRadio"
import { FilterParams } from "../types"

import {Box,Grid,Typography} from "@mui/material"

const FilterList = ({ name, tags ,direction,filterParams,addOrRemoveTag}: { name: string, tags:string[],direction: 'column' | 'row',filterParams:FilterParams,addOrRemoveTag:(tag:string)=>void }) => {

    console.log('render new Filter List:'+name)
    return (
        <Box>
            <Typography variant='h6'>{name}</Typography>
            <Grid container direction={direction}>
                {tags.map((item,i) => <CustomRadio label={item} value={item} isSelected={filterParams.tags.includes(item)} addOrRemoveTag={addOrRemoveTag} />)}
            </Grid>
        </Box>
    )
}

export default FilterList