import CatalogDisplayCard from "./CatalogDisplayCard"
import { Grid, Box, Fade, IconButton } from "@mui/material"
import { useCatalogStorage } from "./hooks/useCatalog";
import { useEffect, useState } from 'react';
import { Catalog } from "../../types/Catalog";
import { Close } from "@mui/icons-material"
import { grey } from "@mui/material/colors";
import React from "react";

const CatalogDisplay = ({ currentId, onClose, onMouseOut }: { currentId: number, onClose?: () => void, onMouseOut?: React.Dispatch<React.SetStateAction<boolean>> }) => {
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

    if (currentId === -1) return null;

    const isVisible = currentId !== -1;

    return (
        <Fade in={isVisible} timeout={200}>
            <Box
                component='div'
                sx={{
                    width:'100%',
                    position: 'sticky',
                    backgroundColor:grey[200]
                }}
                onMouseOut={() => onMouseOut && onMouseOut(false)}
                onMouseOver={() => onMouseOut && onMouseOut(true)}
            >
                <IconButton onClick={onClose}><Close /></IconButton>
                <Grid container spacing={2}>
                    {catalogs.map((item) => (
                        <CatalogDisplayCard
                            key={item.path}
                            name={item.name}
                            path={item.fullPath}
                            subCataloge={item.catalogs}
                        />
                    ))}
                </Grid>
            </Box>
        </Fade>
    );
};

export default CatalogDisplay;