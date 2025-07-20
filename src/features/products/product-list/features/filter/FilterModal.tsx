import { Modal,Paper,Button,Box,IconButton,ListItemButton,List,Grid } from "@mui/material"
import CustomRadio from "./UI/CustomRadio"
import { Cancel } from "@mui/icons-material"
import { useState } from "react"
import { FilterParams } from "./types"

type Props = {
    tags: { name: string, tags: string[] }[];
    addOrRemoveTag: (tag: string) => void,
    filterParams: FilterParams,
    onSearchClick: () => void,
    onReset: () => void,
}

const FilterModal = ({ tags, addOrRemoveTag, filterParams, onSearchClick, onReset }: Props) => {
    const [id, setId] = useState(0)
    const [open, setOpen] = useState(false)

    const searchHandler = () => {
        setOpen(false)
        onSearchClick()
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>Show All Tags</Button>
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
                                {tags.map((item, i) =>
                                    <ListItemButton selected={id == i} onClick={() => setId(i)}>
                                        {item.name}
                                    </ListItemButton>)}
                            </List>
                            <Box sx={{ width: '100%', ml: '20px', height: '100%' }}>
                                <Grid container>
                                    {tags[id] && tags[id].tags.map((value) =>
                                        <Grid size={{ sm: 4 }}>
                                            <CustomRadio label={value} value={value} isSelected={filterParams.tags.includes(value)} addOrRemoveTag={addOrRemoveTag} />
                                        </Grid>)}
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