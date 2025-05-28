import { CATALOG_DATA } from "./api/catalog.data"
import CatalogDisplayCard from "./CatalogDisplayCard"
import { Grid, Box, Fade } from "@mui/material"

const CatalogDisplay = ({ currentId }: { currentId: number }) => {
    if (currentId === -1) return null;

    const catalogs = CATALOG_DATA[currentId]?.catalogs || [];
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