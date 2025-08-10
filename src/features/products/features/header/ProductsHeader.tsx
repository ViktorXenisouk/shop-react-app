import { Box, useMediaQuery, useTheme } from "@mui/material"
import { DataLoaderSimple } from "../../../loading/Loading"
import { autoSaveFetch } from "../../../../services/safe-fetch"
import type { Catalog } from "../../../../types/catalog"
import { useSearchParams } from "react-router-dom"
import CategoryParser from "../../../../UI/CategoryParser"
import ViewSwitcher from "../header/UI/ViewSwitcher"
import SortSwitcher from "../../../../UI/SortSwitcher"
import type { ViewType } from "../../types"

import ProductHeaderCategories from "./ProductHeaderCategories"

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
        <Box sx={{ borderBottom: '1px solid #ccc', mb: '10px' }}>
            <CategoryParser category={subPath} renderMain />
            <DataLoaderSimple res={res} page={ProductHeaderCategories} />
            {
                !isSmall ?
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' ,mx:'30px'}}>
                        <SortSwitcher />
                        <ViewSwitcher onChange={onChange} />
                    </Box>
                    :
                    <Box sx={{ mt: '20px' }}>
                        <SortSwitcher fullWidth />
                    </Box>
            }
        </Box >
    )
}

export default ProductsHeader