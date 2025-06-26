import {
    Box, Button, IconButton, MenuItem, Paper, Select, TextField, Typography,
} from '@mui/material';
import { DragIndicator, Delete } from "@mui/icons-material"
import { CSS } from '@dnd-kit/utilities';
import { useSortable, } from '@dnd-kit/sortable';
import CategoryTagsInput from '../CategoryTagsInput';
import CategoryTypeInput from '../CategoryTypeInput';

type Item = { id: string, name: string, tags: string[],type:string }

type Props = { info: Item, deleteBlock: (id: string) => void, updateBlock: (id: string, updates: Partial<Item>) => void }

const Item = ({ info, deleteBlock, updateBlock }: Props) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: info.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        marginBottom: 16,
    };

    return (
        <Box key={info.id} id={info.id} ref={setNodeRef} style={style}>
            <Box {...attributes}{...listeners} ><DragIndicator /></Box>
            <Paper>
                <IconButton component='div'  onClick={() => deleteBlock(info.id)}><Delete /></IconButton>
                <TextField value={info.name} onChange={(ev) => updateBlock(info.id, { name: ev.target.value })} label='name' />
                <CategoryTypeInput onChange={(type) => updateBlock(info.id,{type:type})} />
                <CategoryTagsInput defaultValue={info.tags} freeSolo onChange={(tags) => updateBlock(info.id, { tags: tags })} />
            </Paper>
        </Box>
    )
}

export default Item