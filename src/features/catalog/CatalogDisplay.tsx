import CatalogDisplayCard from "./CatalogDisplayCard"
import { Grid, Box, Fade } from "@mui/material"
import { useCatalogStorage } from "./hooks/useCatalog";
import {useEffect,useState} from 'react';
import { Catalog } from "../../types/Catalog";

const CatalogDisplay = ({ currentId }: { currentId: number }) => {
    useEffect(() => {
        const catalog = store.catalog
        if(catalog)
            setCatalogs(catalog[currentId]?.catalogs || [])
    },[currentId])

    useEffect(() => {
        if(!store.isLoading && !store.catalog){
            store.fetchCatalog()
        }
    },[])

    const [catalogs,setCatalogs] = useState<Catalog[]>([])

    const store = useCatalogStorage()

    if (currentId === -1) return null;

    const isVisible = currentId !== -1;

    return (
        <Fade in={isVisible} timeout={200} unmountOnExit>
            <Box
                sx={{
                    padding: 2,
                    minWidth: 600,
                    borderLeft: '1px solid #ccc',
                }}
            >
                <Grid container spacing={2}>
                    {catalogs.map((item) => (
                        <CatalogDisplayCard
                            key={item.path}
                            name={item.name}
                            path={item.path}
                            subCataloge={item.catalogs}
                        />
                    ))}
                </Grid>
            </Box>
        </Fade>
    );
};

export default CatalogDisplay;