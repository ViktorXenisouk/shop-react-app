import style from './Main.module.css';
import { useEffect, useState } from 'react';
import Catalog from '../catalog/Catalog';
import { Box, Container, Grid, Divider, Stack, Typography } from '@mui/material';
import CarouselWithButtons from '../carouselWithButtons/CarouselWithButtons';
import TopCategories from './UI/TopCaregories';

import CatalogDisplay from '../catalog/CatalogDisplay';
import CatalogMenu from '../catalog/CatalogMenu';

import { useTimer } from '../../hooks/useTimer';

import { TopItem,getCategories,getArticles } from '../../types/topItem';
import ItemForCarousel from '../carouselWithButtons/ItemForCarousel';
import TopItemCard from '../TopItemCard';

import TopItems from "./UI/TopItems"

const Main = () => {
    const [currentId, setCurrentId] = useState(-1);
    const [isCatalogMouseOver, setIsCatalogMouseOver] = useState(false);

    const onClose = () => {
        setCurrentId(-1)
    }

    const timer = useTimer(() => setCurrentId(-1), 3000);

    useEffect(() => {
        if (!isCatalogMouseOver) {
            timer('reset');
        } else {
            timer('disactive');
        }
    }, [isCatalogMouseOver]);

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: {md:'300px 900px'}, gridTemplateRows: '1fr', minHeight: '1700px' }}>
            <Box sx={{ height: '100%' }}>
                <CatalogMenu
                    currentId={currentId}
                    onCurrentIndexUpdate={setCurrentId}
                    onMouseOut={setIsCatalogMouseOver}
                />
            </Box>
            <Stack sx={{width:'900px'}}>
                <CatalogDisplay
                    currentId={currentId}
                    onClose={onClose}
                    onMouseOut={setIsCatalogMouseOver}
                />
               <TopCategories/>
               <TopItems/>
            </Stack>
        </Box>
    )
}

export default Main