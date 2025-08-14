import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import BillboardButton from './BillboardButton';
import BillboardCard from './BillboardCard';
import { BillboardItem } from './types';
import {
    Box,
    Typography,
    SxProps,
    Theme,
    Paper
} from '@mui/material';

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

type Props = {
    items: BillboardItem[];
    width?: number | string | any;
    height?: number | string | any;
    interval?: number; // в мс, например, 3000
};


const BillboardCarousel: React.FC<Props> = ({ items, width, height }) => {
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
            width: width,
            height: 'auto',
            borderRadius: 2,
        }}>
            <Box sx={{
                position: 'relative',
                overflow: 'hidden',
                height: height
            }}>
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
                        <BillboardCard sx={{ width: width, height: height }} item={items[index]} />
                    </motion.div>
                </AnimatePresence>
            </Box>
            <Box sx={{
                width: width,
                bgcolor: 'background.paper',
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                borderWidth: '1px',
                borderColor: 'divider',
                borderStyle: 'solid',
                borderRadius: 2,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <BillboardButton
                    onClick={() => paginate(-1)}
                    disabled={false}
                    left='0px'
                    icon={<ArrowBackIosNew />}
                />
                <Typography variant="h6" fontWeight="bold">
                    {items[index].title}
                </Typography>
                <BillboardButton
                    onClick={() => paginate(1)}
                    disabled={false}
                    right='0px'
                    icon={<ArrowForwardIos />}
                />
            </Box>
        </Paper>
    );
}

export default BillboardCarousel;