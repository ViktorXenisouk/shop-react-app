import React, { Fragment } from "react"
import { type Product } from "../../../types/product"
import Filter from "./features/filter/Filter";
import ProductsHeader from "../features/header/ProductsHeader";
import ProductsLoader from "../components/ProductsLoader";
import { Box, Pagination, Divider } from "@mui/material"
import { FetchHookResponse } from "../../../types/fetch";
import { BuyDrawer } from "./components";
import ErrorDisplay from "../../../widgets/error-display/ErrorDisplay";

type Props = {
    subPath: string;
    error?: boolean,
    onChangePage: (ev: any, page: number) => void;
    res: FetchHookResponse<Product[]>
    isSmall: boolean
    page: number,
    onDrawerClose: () => void
    onProductSelect: (id: string) => void,
    selectedId: string | null
}

const ProductListView: React.FC<Props> = ({ error, onChangePage, res, subPath, isSmall, page, onDrawerClose, onProductSelect, selectedId }) => {

    const [loaded, data] = res

    if (error) {
        return (
            <ErrorDisplay status={res[2]?.status || 500} message={res[2]?.message || ''} />
        )
    }

    const total = res[3]?.totalPages ?? undefined

    const DrawerOpen = selectedId ? true : false

    if (isSmall) {
        return (
            <Fragment>
                <Box>
                    <ProductsHeader subPath={subPath} />
                    <Filter modalOnly />
                    <Box>
                    <ProductsLoader data={data} onButtonBuyClick={onProductSelect} />
                    </Box>
                    <Divider sx={{ mt: '20px', mb: '10px' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Pagination sx={{ my: '10px' }} page={page} onChange={onChangePage} count={total} />
                    </Box>
                </Box>
                <BuyDrawer id={selectedId || ''} onClose={onDrawerClose} />
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateAreas:
                        `'header header' 'filter main'`,
                    gridTemplateColumns: 'auto 1fr',
                    gridTemplateRows: 'auto 1fr',
                    margin: 0,
                    height: '100%',
                }}>
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
                    <ProductsLoader data={data} onButtonBuyClick={onProductSelect} />
                    <Divider sx={{ mt: '20px', mb: '10px' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Pagination sx={{ my: '10px' }} page={page} onChange={onChangePage} count={total} />
                    </Box>
                </Box>
            </Box>
            <BuyDrawer id={selectedId || ''} onClose={onDrawerClose} />
        </Fragment>
    )
}

export default ProductListView