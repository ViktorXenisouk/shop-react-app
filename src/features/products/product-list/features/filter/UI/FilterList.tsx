import CustomRadio from "./CustomRadio"
import { MyFilter } from "../types"

import {Box,Grid,Typography} from "@mui/material"

const FilterList = ({ name, tags ,direction,filterParams,addOrRemoveTag}: { name: string, tags:string[],direction: 'column' | 'row',filterParams:MyFilter,addOrRemoveTag:(tag:string)=>void }) => {

    console.log('render new Filter List:'+name)
    return (
        <Box>
            <Typography variant='body2' sx={{fontWeight:'bold',ml:'2px'}}>{name}</Typography>
            <Grid container direction={direction}>
                {tags.map((item,i) => <CustomRadio label={item} value={item} isSelected={filterParams.tags.includes(item)} addOrRemoveTag={addOrRemoveTag} />)}
            </Grid>
        </Box>
    )
}

export default FilterList