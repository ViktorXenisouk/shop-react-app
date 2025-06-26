import { Box, Grid, Typography, } from "@mui/material"
import { DataLoaderFromPromise } from "../loading/Loading"
import { autoSaveFetch } from "../../services/safeFetch"
import type { Catalog } from "../../types/Catalog"
import { Link } from "react-router-dom"
import CategoryParser from "../../UI/CategoryParser"
import ViewSwitcher from "../../UI/ViewSwitcher"
import SortSwitcher from "../../UI/SortSwitcher"

const A = ({ data }: { data: Catalog }) => {

    console.log(data)

    return (
        <Grid container>
            {data.subCategories && data.subCategories.map((catalog) =>
                <Grid size={{ xs: 3 }}>
                    <Box component={Link} to={`/products/${catalog.fullPath}`}>
                        <Typography>{catalog.name}</Typography>
                    </Box>
                </Grid>)}
        </Grid >
    )
}

const ProductsHeader = ({ subPath }: { subPath: string }) => {
    const res = autoSaveFetch<Catalog>(`/category/${subPath}`, { method: 'GET' })

    return (
        <Box sx={{ borderBottom: '1px solid #ccc' }}>
            <CategoryParser category={subPath} />
            <DataLoaderFromPromise res={res} page={A} />
            <ViewSwitcher onChange={(v) => console.log('')} />
            <SortSwitcher />
        </Box >
    )
}

export default ProductsHeader