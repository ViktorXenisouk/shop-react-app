import React, { useState } from 'react';
import {
    Box,
    Typography,
    SxProps,
    Theme,
    Paper
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import BillboardButton from './BillboardButton';
import BillboardCard from './BillboardCard';
import { BillboardItem } from './types';

type Props = {
    items: BillboardItem[];
    width?: number | string;
    height?: number | string;
    sx?: SxProps<Theme>;
    interval?: number; // в мс, например, 3000
};

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        position: 'absolute' as const,
    }),
    center: {
        x: 0,
        opacity: 1,
        position: 'relative' as const,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -300 : 300,
        opacity: 0,
        position: 'absolute' as const,
    }),
};

const BillboardCarousel: React.FC<Props> = ({ items,sx }) => {
    const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);

    const paginate = (newDirection: number) => {
        setIndex(([prevIndex]) => {
            const newIndex = (prevIndex + newDirection + items.length) % items.length;
            return [newIndex, newDirection];
        });
    };

    return (
        <Paper sx={{
            position: 'relative',
            overflow: 'hidden',
            width: '800px',
            height: '600px',
            borderRadius: 2,
            ...sx
        }}>
            <Box sx={{ position: 'relative', height: 200 }}>
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 1 }}
                    >
                        <BillboardCard item={items[index]} />
                    </motion.div>
                </AnimatePresence>
            </Box>
            <Box sx={{
                width: '798px',
                bgcolor: 'background.paper',
                position: 'absolute',
                bottom: '0px',
                left: '0px',
                display: 'flex',
                justifyContent: 'space-between',
                borderWidth:'1px',
                borderColor:'divider',
                borderStyle:'solid',
                borderRadius:2,
                flexDirection:'row',
                alignItems:'center'
            }}>
                <BillboardButton onClick={() => paginate(-1)} disabled={false} left='0px' icon={<ArrowBackIosNew />} />
                <Typography variant="h6" fontWeight="bold">
                    {items[index].title}
                </Typography>
                <BillboardButton onClick={() => paginate(1)} disabled={false} right='0px' icon={<ArrowForwardIos />} />
            </Box>
        </Paper>
    );
}

export default BillboardCarousel;