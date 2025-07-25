import CatalogDisplayCard from "./UI/CatalogDisplayCard"
import { Grid, Box, Fade, IconButton, useScrollTrigger, useTheme, useMediaQuery } from '@mui/material';
import { useCatalogStorage } from "./hooks/useCatalog";
import { useEffect, useState } from 'react';
import { Catalog } from "../../../../types/catalog";
import { Close } from "@mui/icons-material"
import { grey } from "@mui/material/colors";
import React from "react";
import { useWindowWidth } from "../../../../hooks/useWindowWidth";

const CatalogDisplay = ({ currentId, onClose, onMouseOut }: { currentId: number, onClose?: () => void, onMouseOut?: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const trigger = useScrollTrigger({ threshold: 60 });

    const screenWidth = useWindowWidth()

    const [scrollY, setScrollY] = useState(0);

    const theme = useTheme()

    const hasContainer = !useMediaQuery(theme.breakpoints.down('lg'))

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        // Очистка при размонтировании
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const catalog = store.catalog
        if (catalog)
            setCatalogs(catalog[currentId]?.catalogs || [])
    }, [currentId])

    useEffect(() => {
        if (!store.isLoading && !store.catalog) {
            store.fetchCatalog()
        }
    }, [])

    const [catalogs, setCatalogs] = useState<Catalog[]>([])

    const store = useCatalogStorage()

    const isVisible = currentId !== -1;

    const containerSize = 1700
    const leftOffset = (screenWidth - containerSize) / 2

    const left = hasContainer ? `${leftOffset + 450}px` : '200px'
    const top = trigger ? '0px' : '65px'
    const width = { lg: '1020px', md: `${screenWidth - 200}px` }

    return (
        <Fade in={isVisible} timeout={500}>
            <Box
                component='div'
                sx={{
                    pt: top,
                    top: '0px',
                    left: left,
                    width: width,
                    position: scrollY > 60 ? 'fixed' : 'absolute',
                    zIndex: '2',
                    height: '100vh',
                    backgroundColor: grey[200],
                }}
                onMouseOut={() => onMouseOut && onMouseOut(false)}
                onMouseOver={() => onMouseOut && onMouseOut(true)}
            >
                <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                    <IconButton onClick={onClose}><Close /></IconButton>
                </Box>
                <Box sx={{ mx: '30px', my: '30px' }}>
                    <Grid
                        container
                        sx={{ backgroundColor: grey[200] }}
                        spacing={2}>
                        {catalogs.map((item) => (
                            <Grid size={4}>
                                <CatalogDisplayCard
                                    key={item.path}
                                    name={item.name}
                                    path={item.fullPath}
                                    subCataloge={item.catalogs}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Fade>
    );
};

export default CatalogDisplay;