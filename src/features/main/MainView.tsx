import React from 'react';
import { useTheme } from '@mui/material';
import { Box, Stack, useMediaQuery} from '@mui/material';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import TopCategories from '../top-item/TopCaregories';
import TopItems from "../top-item/TopItems"
import CatalogDisplay from './features/catalog/CatalogDisplay';
import CatalogMenu from './features/catalog/CatalogMenu';
import CatalogModal from './features/catalog/CatalogModal';
import MyImageList from './components/MyImageList';

import MyCarousel from './components/MyCarousel';

type Props = {
    currentId: number,
    onClose: () => void,
    setIsCatalogMouseOver: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentId: React.Dispatch<React.SetStateAction<number>>
}

const MainView = ({ currentId, onClose, setIsCatalogMouseOver, setCurrentId }: Props) => {
    const width = useWindowWidth()
    const theme = useTheme()
    const wWithotDisplay = `200px ${width - 200}px`
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <>
            {
                isSmall &&
                <CatalogModal />
            }
            {
                !isSmall ?
                    <>
                        <CatalogDisplay
                            currentId={currentId}
                            onClose={onClose}
                            onMouseOut={setIsCatalogMouseOver}
                        />
                        <Box sx={{ display: 'grid', gridTemplateColumns: { md: wWithotDisplay, lg: '200px 1000px' }, gridTemplateRows: '1fr', minHeight: '1700px' }}>
                            <Box sx={{ height: '100%' }}>
                                <CatalogMenu
                                    currentId={currentId}
                                    onCurrentIndexUpdate={setCurrentId}
                                    onMouseOut={setIsCatalogMouseOver}
                                />
                            </Box>
                            <Stack>
                                <MyImageList />
                                <TopCategories />
                                <TopItems />
                            </Stack>
                        </Box>
                    </>
                    :
                    <Stack sx={{ width: '100%' }}>
                        <MyImageList />
                        <TopCategories />
                        <TopItems />
                    </Stack>
            }
        </>
    )
}

export default MainView