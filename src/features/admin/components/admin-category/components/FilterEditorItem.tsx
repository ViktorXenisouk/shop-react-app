import { FilterItem, Variant } from "../../../../../types/catalog"
import { Box, Stack, TextField, Typography, Select, MenuItem, Grid, Button } from "@mui/material"
import { useSortable, } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragIndicator } from "@mui/icons-material"
import TagsInput from "../../../UI/TagsInput";
import RangeInput from "../../../../../UI/RangeInput";
import {DeleteOutline} from "@mui/icons-material"


type F = FilterItem & { id: string }

type Props = {
    info: F
    updateBlock: (id: string, parts: Partial<F>) => void,
    deleteBlock: (id: string) => void,
}

const AdminCategoryCardTag : React.FC<Props> = ({ info, updateBlock, deleteBlock }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: info.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        marginBottom: 16,
    };

    const selectHandler = (event: any) => {
        console.log(event.target.value)
        updateBlock(info.id, { variant: event.target.value })
    }

    const titleHandler = (ev: any) => {
        updateBlock(info.id, { title: ev.target.value })
    }

    const onTagChange = (tags?: string[]) => {
        updateBlock(info.id, { props: { tags: tags || [], min: 0, max: 0 } })
    }

    const rangeHandler = (range: { min: number, max: number }) => {
        updateBlock(info.id, { props: { tags: [], min: range.min, max: range.max } })
    }

    return (
        <Box key={info.id} id={info.id} ref={setNodeRef} style={style} sx={{ boxShadow:3, pb: '12px',p:'16px' }}>
            <Box {...attributes}{...listeners} ><DragIndicator /></Box>
            <Box sx={{display:'grid',gridTemplateColumns:'1fr 150px',gap:3}}>
                <Grid spacing={3} container>
                    <Grid size={{ xs: 6 }}>
                        <Select value={info.variant} onChange={selectHandler}>
                            <MenuItem value={'tags-horizontal' as Variant}>
                                tags horizontal
                            </MenuItem>
                            <MenuItem value={'tags-vertical' as Variant}>
                                tags vertical
                            </MenuItem>
                            <MenuItem value={'min-max' as Variant}>
                                min - max
                            </MenuItem>
                            <MenuItem value={'number' as Variant}>
                                number
                            </MenuItem>
                        </Select>
                    </Grid>
                    <Grid size={6}>
                        <TextField label='title' focused value={info.title} onChange={titleHandler} />
                    </Grid>
                    <Grid size={12}>
                        {
                            (info.variant === 'tags-horizontal' || info.variant === 'tags-vertical') &&
                            <TagsInput onChange={onTagChange} defaultValue={info.props.tags} />
                        }
                        {
                            (info.variant === 'min-max' || info.variant === 'number') &&
                            <>
                                <RangeInput min={0} max={0} onChange={rangeHandler} />
                            </>
                        }
                    </Grid>
                </Grid>
                <Box>
                    <Button onClick={() => deleteBlock(info.id)} sx={{pr:'10px'}} variant="contained" endIcon={<DeleteOutline/>}>
                        Delete
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default AdminCategoryCardTag