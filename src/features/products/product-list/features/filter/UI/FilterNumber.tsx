import { MyFilter } from "../types"
import { CategoryProps } from "../../../../../../types/catalog"
import { Box, Typography, TextField } from "@mui/material"

type Props = {
    title: string,
    props: CategoryProps
    filter: MyFilter,
    id: string
    addOrRemoveField: (field: string, value: string) => void
}
const FilterNumber = ({ title, props, filter, id, addOrRemoveField }: Props) => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'center',alignItems:'center'}}>
            <Typography>{title}:</Typography>
            <TextField value={filter.other[id] ?? ''} onChange={(ev) => {
                addOrRemoveField(id, ev.target.value)
            }} />
        </Box>
    )
}

export default FilterNumber