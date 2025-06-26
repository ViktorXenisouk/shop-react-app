import { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
    SortableContext, arrayMove, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';

import {
    Box, Button, IconButton, MenuItem, Paper, Select, TextField, Typography,
} from '@mui/material';

import SortableBlock from "./Item"

type Item = { id: string, name: string, tags: string[],type:string }

const DragAndDropCollection = ({onChange}:{onChange:(items:Item[]) => void}) => {
    const [blocks, setBlocks] = useState<Item[]>([]);

     useEffect(() => {
    if (onChange)
      onChange(blocks)
  }, [blocks])

    const addBlock = () => {
        const newBlock: Item = {
            name:'',
            tags:[],
            type:'',
            id: uuidv4(),
        };
        setBlocks((prev) => [...prev, newBlock]);
    };

    const updateBlock = (id: string, updates: Partial<Item>) => {
        console.log('update block')
        setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
    };

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
            <Box component='div' onClick={addBlock} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button>add new</Button>
            </Box>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                    {blocks.map((block) => (
                        <SortableBlock info={block} updateBlock={updateBlock} deleteBlock={deleteBlock} />
                    ))}
                </SortableContext>
            </DndContext>
        </Box>
    )
}

export default DragAndDropCollection