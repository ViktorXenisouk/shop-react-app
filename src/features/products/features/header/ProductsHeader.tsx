import React from "react"
import { Box, useMediaQuery, useTheme } from "@mui/material"
import { DataLoaderFromPromiseSimple } from "../../../loading"
import { autoSaveFetch } from "../../../../services/safe-fetch"
import type { Catalog } from "../../../../types/catalog"
import { useSearchParams } from "react-router-dom"
import CategoryParser from "../../../../UI/CategoryParser"
import ViewSwitcher from "../header/UI/ViewSwitcher"
import SortSwitcher from "../../../../UI/SortSwitcher"
import type { ViewType } from "../../types"

import ProductHeaderCategories from "./ProductHeaderCategories"

type Props = {
    subPath: string
}

const ProductsHeader: React.FC<Props> = ({ subPath }) => {
    const res = autoSaveFetch<Catalog>(`/category/subpath/${subPath}`, { method: 'GET' })

    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

    const [searchParams, setSearchParams] = useSearchParams()

    const onChange = (value: ViewType) => {
        searchParams.set('view', value)
        setSearchParams(searchParams)
    }

    return (
        <Box
            sx={{
                borderBottomWidth: '1px',
                borderBottomStyle: 'solid',
                borderBottomColor: 'divider',
                mb: '10px'
            }}>
            <CategoryParser category={subPath} renderMain />
            <DataLoaderFromPromiseSimple res={res} page={ProductHeaderCategories} />
            {
                !isSmall ?
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: '30px' }}>
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