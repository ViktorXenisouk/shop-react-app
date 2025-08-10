import { useState } from 'react';
import {
  Box, Button, IconButton, MenuItem, Paper, Select, TextField, Typography,
} from '@mui/material';
import {useSortable,} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DeleteIcon from '@mui/icons-material/Delete';
import { ArticleBlock } from '../../../types/article';
import { DragIndicator } from "@mui/icons-material"
import ImagePickerModal from '../../image-picker-modal/ImagePickerModal';

type Block = ArticleBlock & { id: string }

type Props = { block: Block, deleteBlock: (id: string) => void, updateBlock: (id: string, updates: Partial<Block>) => void }

const ArticleEditorBlock = ({ block, deleteBlock, updateBlock, }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id:block.id });

  const style = {
  transform: CSS.Transform.toString(transform),
  transition,
  marginBottom: 16,
};

const [open,setOpen] = useState(false)

const onModalClose = () => {
setOpen(false)
}
  return (
    <Box key={block.id} id={block.id} ref={setNodeRef} style={style}>
      <Box {...attributes}{...listeners} ><DragIndicator /></Box>
      <Paper sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1">{block.type}</Typography>
          <IconButton onClick={() => deleteBlock(block.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>

        {'variant' in block && (
          <Select
            fullWidth
            size="small"
            value={block.variant}
            onChange={(e) =>
              updateBlock(block.id, { variant: e.target.value })
            }
            sx={{ mb: 2 }}
          >
            <MenuItem value="left">Слева</MenuItem>
            <MenuItem value="right">Справа</MenuItem>
            <MenuItem value="center">По центру</MenuItem>
          </Select>
        )}

        {(block.type === 'paragraph' || block.type === 'imageWithText') && (
          <TextField
            fullWidth
            multiline
            label="Текст"
            value={block.text}
            onChange={(e) => updateBlock(block.id, { text: e.target.value })}
          />
        )}

        {(block.type === 'gallery' || block.type === 'imageWithText') && (
          <>
            <Button
              variant="outlined"
              onClick={() => setOpen(true)}
            >
              Добавить изображения
            </Button>
            <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
              <img
                src={block.image}
                alt={`gallery-${0}`}
                style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }}
              />
            </Box>
            <ImagePickerModal open={open} onClose={onModalClose} onSelect={(imgs) => updateBlock(block.id,{image:imgs[0].url})} folder=''/>
          </>
        )}
      </Paper>
    </Box>
  )
}

export default ArticleEditorBlock