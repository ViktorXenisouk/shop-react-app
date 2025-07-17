import { useEffect, useState } from 'react';
import { Box, Stack, useMediaQuery, ImageList, ImageListItem } from '@mui/material';
import TopCategories from './UI/TopCaregories';

import CatalogDisplay from './features/catalog/CatalogDisplay';
import CatalogMenu from './features/catalog/CatalogMenu';

import { useTimer } from '../../hooks/useTimer';

import TopItems from "./UI/TopItems"

import CatalogModal from './features/catalog/CatalogModal';

import { useTheme } from '@mui/material';

import { useWindowWidth } from '../../hooks/useWindowWidth';

const Main = () => {
    const theme = useTheme()
    const [currentId, setCurrentId] = useState(-1);
    const [isCatalogMouseOver, setIsCatalogMouseOver] = useState(false);

    const isSmall = useMediaQuery(theme.breakpoints.down('md'))

    const width = useWindowWidth()

    const onClose = () => {
        setCurrentId(-1)
    }

    const timer = useTimer(() => setCurrentId(-1), 10000000);

    useEffect(() => {
        if (!isCatalogMouseOver) {
            timer('reset');
        } else {
            timer('disactive');
        }
    }, [isCatalogMouseOver]);

    const wWithotDisplay = `200px ${width - 200}px`

    const MyImageList = (
        <ImageList
            variant="quilted"
            cols={2}
            rowHeight={300}>
            <ImageListItem rows={1} cols={2}>
                <img {...srcset("https://images.unsplash.com/photo-1551782450-a2132b4ba21d", 150, 1, 2)} />
            </ImageListItem>
            <ImageListItem>
                <img {...srcset("https://images.unsplash.com/photo-1551782450-a2132b4ba21d", 150, 1, 1)} />
            </ImageListItem>
            <ImageListItem>
                <img {...srcset("https://images.unsplash.com/photo-1551782450-a2132b4ba21d", 150, 1, 1)} />
            </ImageListItem>
        </ImageList>
    )

    function srcset(image: string, size: number, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    return (
        <>
            {
                isSmall &&
                <CatalogModal />
            }
            {
                !isSmall &&
                <CatalogDisplay
                    currentId={currentId}
                    onClose={onClose}
                    onMouseOut={setIsCatalogMouseOver}
                />
            }
            {
                !isSmall ?
                    <Box sx={{ display: 'grid', gridTemplateColumns: { md: wWithotDisplay, lg: '200px 1000px' }, gridTemplateRows: '1fr', minHeight: '1700px' }}>
                        <Box sx={{ height: '100%' }}>
                            <CatalogMenu
                                currentId={currentId}
                                onCurrentIndexUpdate={setCurrentId}
                                onMouseOut={setIsCatalogMouseOver}
                            />
                        </Box>
                        <Stack sx={{ width: '100%' }}>
                            {MyImageList}
                            <TopCategories />
                            <TopItems />
                        </Stack>
                    </Box>
                    :
                    <Stack sx={{ width: '100%' }}>
                        {MyImageList}
                        <TopCategories />
                        <TopItems />
                    </Stack>
            }
        </>
    )
}

export default Main