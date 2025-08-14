import React from "react";
import { SortableContext, verticalListSortingStrategy,} from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import ArticleEditorBlock from './components/ArticleEditorBlock';
import {Box, Button, Typography, Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Article from './Article';
import { ArticleVariant,Block } from "./types";

type Props = {
addBlock:(type:ArticleVariant) => void
blocks:Block[]
handleDragEnd:(ev:any)=>void
updateBlock:(id:string,updates:Partial<Block>)=>void
deleteBlock:(id:string) => void
}

const ArticleEditorView : React.FC<Props> = ({addBlock,blocks,handleDragEnd,updateBlock,deleteBlock}) => {
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
}


export default ArticleEditorView