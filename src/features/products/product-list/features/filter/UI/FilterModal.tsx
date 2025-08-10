import { Modal,Paper,Button,Box,IconButton,ListItemButton,List,Grid } from "@mui/material"
import CustomRadio from "./CustomRadio"
import { Cancel } from "@mui/icons-material"
import { useState } from "react"
import { MyFilter } from "../types"
import { FilterItem } from "../../../../../../types/catalog"
import FilterNumber from "./FilterNumber"

type Props = {
    data: FilterItem[];
    addOrRemoveTag: (tag: string) => void,
    addOrRemoveField : (field:string,value:string) => void
    filter: MyFilter,
    onSearchClick: () => void,
    onReset: () => void,
}

const FilterModal = ({ data, addOrRemoveTag,addOrRemoveField, filter, onSearchClick, onReset }: Props) => {
    const [id, setId] = useState(0)
    const [open, setOpen] = useState(false)

    const searchHandler = () => {
        setOpen(false)
        onSearchClick()
    }

    return (
        <>
            <Button sx={{width:'100%',my:'10px',px:'5px'}} variant="contained" onClick={() => setOpen(true)}>Show All Tags</Button>
            <Modal open={open} onClose={() => setOpen(false)} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '900px', mt: '100px', height: '0px' }}>
                    <Paper>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton onClick={() => setOpen(false)}>
                                <Cancel />
                            </IconButton>
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', position: 'relative' }}>
                            <List sx={{ borderRight: '#ccc solid 1px', overflowY: 'scroll', overflowX: 'hidden', height: '600px', width: '200px' }}>
                                {data.map((item, i) =>
                                    <ListItemButton selected={id == i} onClick={() => setId(i)}>
                                        {item.title}
                                    </ListItemButton>)}
                            </List>
                            <Box sx={{ width: '100%', ml: '20px', height: '100%' }}>
                                <Grid container>
                                    {data[id] && data[id].props.tags?.length > 0 ? 
                                    data[id].props.tags.map((value) =>
                                        <Grid size={{ sm: 4 }}>
                                            <CustomRadio label={value} value={value} isSelected={filter.tags.includes(value)} addOrRemoveTag={addOrRemoveTag} />
                                        </Grid>)
                                        :
                                        <Grid size={12}>
<FilterNumber title={data[id]?.title} props={data[id]?.props} filter={filter} id={data[id]?.title.replace(' ','_')} addOrRemoveField={addOrRemoveField}/>
                                        </Grid>
                                    }
                                </Grid>
                                <Box sx={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', alignContent: 'flex-end' }}>
                                        <Button onClick={onReset}>Reset Filter</Button>
                                        <Button onClick={searchHandler}>Search</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Modal>
        </>
    )
}

export default FilterModal