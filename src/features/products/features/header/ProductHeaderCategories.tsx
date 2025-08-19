import React from "react"
import { Catalog } from "../../../../types/catalog"
import { PlayList } from "../../../../types/play-list"
import { useSearchParams, Link } from "react-router-dom"
import { Box, Grid, Paper, Skeleton } from "@mui/material"

type Props = {
    data: Catalog | PlayList | null
}

const ProductHeaderCategories: React.FC<Props> = ({ data }) => {
    const [searchParams] = useSearchParams()
    return (
        <Box sx={{ p: '10px', minHeight: '24px', mt: '20px' }}>
            <Grid container spacing={3}>
                {data?.subCategories ? data.subCategories.map((catalog) =>
                    <Grid size={{ xs: 4 }}>
                        <Paper
                            component={Link}
                            to={`/products/${catalog.fullPath}?${searchParams.toString()}`}
                            variant="outlined"
                            elevation={24}
                            sx={{
                                minHeight: '40px',
                                display: 'flex',
                                alignItems:'center',
                                alignContent: 'center',
                                justifyContent: 'center',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: 'secondary.main',
                                ':hover': {
                                    borderColor: 'primary.main',
                                }
                            }} >
                            {catalog.name}
                        </Paper>
                    </Grid>)
                    :
                    <Skeleton width='100%' height='24px' />}
            </Grid >
        </Box>
    )
}

export default ProductHeaderCategories