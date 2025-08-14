import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { Variant, FilterItem } from "../../../../../types/catalog"
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
    SortableContext, arrayMove, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Box, Typography, Button } from "@mui/material"
import FilterEditorItem from "./FilterEditorItem"

type F = FilterItem & { id: string }

type Props = {
onChange?: (value: FilterItem[]) => void, defaultValue?: FilterItem[]
}

const CategoryListTagsManager : React.FC<Props> = ({ onChange, defaultValue }) => {
    const [blocks, setBlocks] = useState<F[]>(defaultValue ? defaultValue.map((v) => { return { ...v, id: uuidv4() } }) : []);

    useEffect(() => {
        onChange?.(blocks)
    }, [blocks])

    const addBlock = (type: Variant) => {
        const newBlock: FilterItem & { id: string } = {
            id: uuidv4(),
            title: '',
            props: { min: 0, max: 0, tags: [] },
            variant: type,
        };
        setBlocks((prev) => [...prev, newBlock]);
    };

    const updateBlock = (id: string, updates: Partial<FilterItem>) => {
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
        <Box sx={{width:'100%', display:'flex', justifyContent:'center'}}>
            <Box sx={{width:'600px'}}>
                <Typography variant="h5" gutterBottom>Filter Editor</Typography>

                <Box display="flex" gap={2} mb={3}>
                    <Button onClick={() => addBlock('tags-horizontal')} variant="outlined">+ tags</Button>
                    <Button onClick={() => addBlock('min-max')} variant="outlined">+ number</Button>
                </Box>

                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                        {blocks.map((block) => (
                            <FilterEditorItem info={block} updateBlock={updateBlock} deleteBlock={deleteBlock} />
                        ))}
                    </SortableContext>
                </DndContext>
            </Box>
        </Box>
    )
}

export default CategoryListTagsManager