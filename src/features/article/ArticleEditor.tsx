import { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext, arrayMove, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';
import { ArticleBlock } from '../../types/article';
import ArticleEditorBlock from './components/ArticleEditorBlock';
import {
  Box, Button, Typography, Accordion, AccordionDetails, AccordionSummary
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Article from './Article';


type A = "imageWithText" | "paragraph" | "gallery"

type Block = ArticleBlock & { id: string }

const ArticleEditor = ({ onChange, defaultValue }: { onChange?: (blocks: Block[]) => void, defaultValue?: ArticleBlock[] }) => {
  const [blocks, setBlocks] = useState<Block[]>(defaultValue ? defaultValue.map((v) => {return {...v,id:uuidv4()}}) : []);

  const addBlock = (type: A) => {
    const newBlock: Block = {
      id: uuidv4(),
      title: '',
      type: type,
      text: '',
      image: '',
      variant: 'left',
    };
    setBlocks((prev) => [...prev, newBlock]);
  };

  useEffect(() => {
    if (onChange)
      onChange(blocks)
  }, [blocks])

  const updateBlock = (id: string, updates: Partial<Block>) => {
    console.log('update block')
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  useEffect(() => {
    console.log(blocks)
  }, [blocks])

  const deleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      setBlocks((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}>
          <Typography>Editor</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography variant="h5" gutterBottom>Редактор статьи</Typography>

            <Box display="flex" gap={2} mb={3}>
              <Button onClick={() => addBlock('paragraph')} variant="outlined">+ paragraf</Button>
              <Button onClick={() => addBlock('imageWithText')} variant="outlined">+ image with text</Button>
              <Button onClick={() => addBlock('gallery')} variant="outlined">+ galery</Button>
            </Box>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                {blocks.map((block) => (
                  <ArticleEditorBlock block={block} updateBlock={updateBlock} deleteBlock={deleteBlock} />
                ))}
              </SortableContext>
            </DndContext>
            <Box mt={4}>
              <Typography variant="subtitle2">JSON:</Typography>
              <pre style={{ fontSize: 12 }}>{JSON.stringify(blocks, null, 2)}</pre>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}>
          <Typography>Presentation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Article articles={blocks} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ArticleEditor