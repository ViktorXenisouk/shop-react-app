import React, { Fragment } from 'react';
import { useTheme } from '@mui/material';
import { Box, Stack, useMediaQuery } from '@mui/material';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import TopCategories from '../top-item/TopCaregories';
import TopItems from "../top-item/TopItems"
import { CatalogDisplay, CatalogMenu, CatalogModal } from './features/catalog';
import MyImageList from './components/MyImageList';

import BillboardMainCarousel from './UI/BillboardMainCarousel';

type Props = {
    currentId: number,
    onClose: () => void,
    setIsCatalogMouseOver: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentId: React.Dispatch<React.SetStateAction<number>>
}

const MainView: React.FC<Props> = ({ currentId, onClose, setIsCatalogMouseOver, setCurrentId }) => {
    const width = useWindowWidth()
    const theme = useTheme()
    const wWithotDisplay = `200px ${width - 200}px`
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Fragment>
            {
                isSmall &&
                <CatalogModal />
            }
            {
                !isSmall ?
                    <Fragment>
                        <CatalogDisplay
                            currentId={currentId}
                            onClose={onClose}
                            onMouseOut={setIsCatalogMouseOver}
                        />
                        <Box sx={{
                            display: 'grid',
                            bgcolor: 'background.default',
                            gridTemplateColumns: { md: wWithotDisplay, lg: '200px 1000px' },
                            gridTemplateRows: '1fr',
                            minHeight: '1700px',
                        }}>
                            <Box sx={{ height: '100%' }}>
                                <CatalogMenu
                                    currentId={currentId}
                                    onCurrentIndexUpdate={setCurrentId}
                                    onMouseOut={setIsCatalogMouseOver}
                                />
                            </Box>
                            <Stack sx={{
                                pb:4
                            }}>
                                <BillboardMainCarousel />
                                <MyImageList />
                                <TopCategories />
                                <TopItems />
                            </Stack>
                        </Box>
                    </Fragment>
                    :
                    <Stack spacing={4} sx={{ width: '100%',pb:4 }}>
                        <BillboardMainCarousel />
                        <MyImageList />
                        <TopCategories />
                        <TopItems />
                    </Stack>
            }
        </Fragment>
    )
}

export default MainView