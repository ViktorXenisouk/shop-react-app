import { Catalog } from "../../../../../types/catalog"
import { useSearchParams,Link } from "react-router-dom"
import { Box,Grid,Paper,Typography,Skeleton } from "@mui/material"

const ProductHeaderCategories = ({ data }: { data: Catalog | null }) => {
    const [searchParams, setSearchParama] = useSearchParams()
    return (
            <Box sx={{p:'10px',minHeight: '24px', mt: '20px'}}>
                <Grid container spacing={3}>
                    {data?.subCategories ? data.subCategories.map((catalog) =>
                        <Grid size={{ xs: 4 }}>
                            <Paper
                                variant="outlined"
                                elevation={24}
                                sx={{ minHeight: '40px', display: 'flex', alignContent: 'center', justifyContent: 'center',':hover':{border:'#0071e3 solid 1px'} }}
                                component={Link} to={`/products/${catalog.fullPath}?${searchParams.toString()}`}
                                >
                                <Typography sx={{ color: 'black' }} justifyContent='center' align="center">{catalog.name}</Typography>
                            </Paper>
                        </Grid>)
                        :
                        <Skeleton width='100%' height='24px' />}
                </Grid >
            </Box>
    )
}

export default ProductHeaderCategories