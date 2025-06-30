import { Box, Grid, Typography, } from "@mui/material"
import { DataLoaderSimple } from "../loading/Loading"
import { autoSaveFetch } from "../../services/safeFetch"
import type { Catalog } from "../../types/Catalog"
import { Link, useSearchParams } from "react-router-dom"
import CategoryParser from "../../UI/CategoryParser"
import ViewSwitcher from "../../UI/ViewSwitcher"
import SortSwitcher from "../../UI/SortSwitcher"
import { Skeleton } from "@mui/material"

const A = ({ data }: { data: Catalog | null }) => {
    const [searchParams,setSearchParama] = useSearchParams()
    return (
        <Box sx={{ minHeight: '24px' }}>
            <Grid container
            sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          },
        }}>
                {data?.subCategories ? data.subCategories.map((catalog) =>
                    <Grid size={{ xs: 4 }}>
                        <Box 
                        sx={{minHeight:'40px',borderRight:'black solid 1px'}}
                        component={Link} to={`/products/${catalog.fullPath}?${searchParams.toString()}`}>
                            <Typography align="center">{catalog.name}</Typography>
                        </Box>
                    </Grid>)
                    :
                    <Skeleton width='100%' height='24px' />}
            </Grid >
        </Box>
    )
}

const ProductsHeader = ({ subPath }: { subPath: string }) => {
    const res = autoSaveFetch<Catalog>(`/category/${subPath}`, { method: 'GET' })

    return (
        <Box sx={{ borderBottom: '1px solid #ccc' }}>
            <CategoryParser category={subPath} renderMain/>
            <DataLoaderSimple res={res} page={A} />
            <ViewSwitcher onChange={(v) => console.log('')} />
            <SortSwitcher />
        </Box >
    )
}

export default ProductsHeader