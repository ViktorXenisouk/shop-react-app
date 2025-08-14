import React, { useEffect, useState } from 'react';
import { arrayMove, } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';
import { ArticleBlock } from '../../types/article';
import { Block, ArticleVariant } from './types';
import ArticleEditorView from './ArticleEditorView';

type Props = {
  onChange?: (blocks: Block[]) => void;
  defaultValue?: ArticleBlock[];
}

const ArticleEditor: React.FC<Props> = ({ onChange, defaultValue }) => {
  const [blocks, setBlocks] = useState<Block[]>(defaultValue ? defaultValue.map((v) => { return { ...v, id: uuidv4() } }) : []);

  const addBlock = (type: ArticleVariant) => {
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
    <ArticleEditorView
      blocks={blocks}
      updateBlock={updateBlock}
      deleteBlock={deleteBlock}
      handleDragEnd={handleDragEnd}
      addBlock={addBlock} />
  )
};

export default ArticleEditor