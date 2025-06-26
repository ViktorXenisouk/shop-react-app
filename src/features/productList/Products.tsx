import style from "./Products.module.css"
import { DataLoaderFromHook, DataLoaderFromHookWithPagination, DataLoaderFromPromise } from "../loading/Loading"
import { Product } from "../../types/ItemData"
import ProductCard from "./ProductCard"
import Filter from '../filter/Filter';
import { autoSaveFetch, safeFetch } from "../../services/safeFetch";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

import { Grid, Box, Pagination } from "@mui/material"
import { useAuthUserStore } from "../../store/useAuth";
import ProductsHeader from "./ProductsHeader";
import { usePaginatedItems } from "../../hooks/usePaginatedItems";
import { parseParams } from "../../utils/parseParams";
import { useEffect, useState } from "react";
import { useRequest } from "../../hooks/useRequest";
import { isArray } from "util";

const MyProducts = ({ data }: { data: Product[] | null }) => {

    const store = useAuthUserStore()

    const getProducts = () => {
        return (data && typeof data.map === 'function') && data.map((item) => {
            const count = store.user?.basketInfo.find((v) => v.id == item._id)?.count ?? 0
            const liked = store.user?.favourite.includes(item._id) ?? false
            return <ProductCard count={count} isLiked={liked} id={item._id} title={item.name} img={item.imgs[0]} />
        })
    }

    return (
        <Box >
            <Grid container
                spacing={4}
                direction="row"
                sx={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexGrow: 0
                }} >
                {getProducts()}
            </Grid>
        </Box>
    )
}

const Products = () => {
    const location = useLocation()

    // 2. Получаем путь после /products/
    const fullPath = location.pathname; // /products/computers/notebook/mac
    const subPath = fullPath.replace(/^\/products\//, '')

    const [searchParams, setSearchParams] = useSearchParams()

    const requestInit: RequestInit = {}
    requestInit.method = 'GET'

    const res = useRequest<Product[]>(`/products/search/?${searchParams.toString()}`,{method:'GET'})

    //const [isLoaded, data, error, setPage, info] = usePaginatedItems<Product[]>(parseInt(searchParams.get('page') ?? '1'), parseInt(searchParams.get('limit') ?? '10'), '/products/search/', { method: "GET" })

    const onChangePage = (ev: any, page: number) => {
        //setPage(page)
        searchParams.set('page',`${page}`)
        setSearchParams(searchParams)
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateAreas: `
      'header header'
      'filter main'
    `,
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
                gridArea: 'filter', marginRight: 10, pt: 3,
            }}>
                <Filter />
            </Box>

            <Box sx={{ gridArea: 'main', pt: 3 }}>
                <DataLoaderFromHook res={res} page={MyProducts}/>
                <Pagination page={parseInt(searchParams.get('page') ?? '') ?? undefined} onChange={onChangePage} count={res[3]?.totalPages} />
            </Box>
        </Box>
    )
}

export default Products
//                <DataLoaderFromHookWithPagination isLoaded={isLoaded} data={data} error={error} page={MyProducts} />
