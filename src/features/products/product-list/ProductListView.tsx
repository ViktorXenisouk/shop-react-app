import React from "react"
import { DataLoaderFromHookSimple } from "../../loading/Loading"
import { type Product } from "../../../types/product"
import Filter from "./features/filter/Filter";
import ProductsHeader from "../features/header/ProductsHeader";
import ProductsLoader from "../components/ProductsLoader";
import { Box, Pagination, Divider } from "@mui/material"
import { ErrorPage } from "../../../pages";
import { FetchHookResponse } from "../../../types/fetch";

type Props = {
    subPath: string;
    error?: boolean,
    onChangePage: (ev: any, page: number) => void;
    res: FetchHookResponse<Product[]>
    isSmall: boolean
    page:number,
}

const ProductListView: React.FC<Props> = ({ error, onChangePage, res, subPath, isSmall,page }) => {

    if (error) {
        return (
            <ErrorPage status={res[2]?.status || 500} message={res[2]?.message || ''} />
        )
    }

    const total = res[3]?.totalPages ?? undefined

    if (isSmall) {
        return (
            <Box>
                <ProductsHeader subPath={subPath} />
                <Filter modalOnly />
                <Box>
                    <DataLoaderFromHookSimple res={res} page={ProductsLoader} />
                </Box>
                <Divider sx={{ mt: '20px', mb: '10px' }} />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination sx={{ my: '10px' }} page={page} onChange={onChangePage} count={total} />
                </Box>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateAreas:
                    `'header header' 'filter main'`,
                gridTemplateColumns: 'auto 1fr',
                gridTemplateRows: 'auto 1fr',
                margin: 0,
                height: '100%',
            }}
        >
            <Box sx={{
                gridArea: 'header', pt: 3,
            }}>
                <ProductsHeader subPath={subPath} />
            </Box>

            <Box sx={{
                gridArea: 'filter', pt: 3, maxWidth: '300px'
            }}>
                <Filter />
            </Box>

            <Box sx={{ gridArea: 'main', pt: 3 }}>
                <DataLoaderFromHookSimple res={res} page={ProductsLoader} />
                <Divider sx={{ mt: '20px', mb: '10px' }} />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination sx={{ my: '10px' }} page={page} onChange={onChangePage} count={total} />
                </Box>
            </Box>
        </Box>
    )
}

export default ProductListView