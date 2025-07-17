import { Box, Grid, Typography, useMediaQuery, useTheme, } from "@mui/material"
import { DataLoaderSimple } from "../loading/Loading"
import { autoSaveFetch } from "../../services/safeFetch"
import type { Catalog } from "../../types/Catalog"
import { Link, useSearchParams } from "react-router-dom"
import CategoryParser from "../../UI/CategoryParser"
import ViewSwitcher from "./UI/ViewSwitcher"
import SortSwitcher from "../../UI/SortSwitcher"
import { Skeleton } from "@mui/material"
import type { ViewType } from "./types"

const A = ({ data }: { data: Catalog | null }) => {
    const [searchParams, setSearchParama] = useSearchParams()
    return (
        <Box sx={{ minHeight: '24px', mt: '20px' }}>
            <Grid container>
                {data?.subCategories ? data.subCategories.map((catalog) =>
                    <Grid size={{ xs: 4 }} sx={{ border: 'black solid 1px' }}>
                        <Box
                            sx={{ minHeight: '40px', display: 'flex', alignContent: 'center', justifyContent: 'center' }}
                            component={Link} to={`/products/${catalog.fullPath}?${searchParams.toString()}`}>
                            <Typography sx={{ color: 'black' }} justifyContent='center' align="center">{catalog.name}</Typography>
                        </Box>
                    </Grid>)
                    :
                    <Skeleton width='100%' height='24px' />}
            </Grid >
        </Box>
    )
}

const ProductsHeader = ({ subPath }: { subPath: string }) => {
    const res = autoSaveFetch<Catalog>(`/category/subpath/${subPath}`, { method: 'GET' })

    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

    const [searchParams, setSearchParams] = useSearchParams()

    const onChange = (value: ViewType) => {
        searchParams.set('view', value)
        setSearchParams(searchParams)
    }

    return (
        <>
            {
                !isSmall ?
                    <Box sx={{ borderBottom: '1px solid #ccc', mb: '10px' }}>
                        <CategoryParser category={subPath} renderMain />
                        <DataLoaderSimple res={res} page={A} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '20px' }}>
                            <SortSwitcher />
                            <ViewSwitcher onChange={onChange} />
                        </Box>
                    </Box >
                    :
                    <Box sx={{ borderBottom: '1px solid #ccc', mb: '10px' }}>
                        <CategoryParser category={subPath} renderMain />
                        <DataLoaderSimple res={res} page={A} />
                        <Box sx={{ mt: '20px' }}>
                            <SortSwitcher fullWidth/>
                        </Box>
                    </Box >
            }
        </>
    )
}

export default ProductsHeader