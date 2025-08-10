import { DataLoaderFromHookSimple } from "../../loading/Loading"
import { type Product } from "../../../types/product"
import Filter from "./features/filter/Filter";
import { useLocation, useSearchParams } from "react-router-dom";
import ProductsHeader from "../features/header/ProductsHeader";
import { useRequest } from "../../../hooks/useRequest";
import ProductsLoader from "../components/ProductsLoader";
import { Box, Pagination, Divider } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material";
import { ErrorPage } from "../../../pages";


const Products = () => {
    const theme = useTheme();

    const isSmall = useMediaQuery(theme.breakpoints.down('md'))

    const location = useLocation()

    const fullPath = location.pathname; // /products/computers/notebook/mac
    const subPath = fullPath.replace(/^\/products\//, '')

    const [searchParams, setSearchParams] = useSearchParams()

    const url = `/products/search/?category=${encodeURIComponent(subPath)}&${searchParams.toString()}`

    const res = useRequest<Product[]>(url, { method: 'GET' })

    console.log(res)

    if (res[2]) {
        return (
           <ErrorPage status={res[2].status} message={res[2].message}/>
        )
    }

    const onChangePage = (ev: any, page: number) => {
        searchParams.set('limit', `${searchParams.get('limit') ?? 10}`)
        searchParams.set('page', `${page}`)
        setSearchParams(searchParams)
    }

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
                    <Pagination sx={{ my: '10px' }} page={parseInt(searchParams.get('page') ?? '1') ?? undefined} onChange={onChangePage} count={res[3]?.totalPages} />
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
                    <Pagination sx={{ my: '10px' }} page={parseInt(searchParams.get('page') ?? '1') ?? undefined} onChange={onChangePage} count={res[3]?.totalPages} />
                </Box>
            </Box>
        </Box>
    )
}

export default Products