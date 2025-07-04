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
            <Grid container>
                {data?.subCategories ? data.subCategories.map((catalog) =>
                    <Grid size={{ xs: 4 }} sx={{border:'black solid 1px'}}>
                        <Box 
                        sx={{minHeight:'40px', display:'flex', alignContent:'center', justifyContent:'center'}}
                        component={Link} to={`/products/${catalog.fullPath}?${searchParams.toString()}`}>
                            <Typography sx={{color:'black'}} justifyContent='center' align="center">{catalog.name}</Typography>
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