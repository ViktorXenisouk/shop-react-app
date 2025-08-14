import React from "react";
import { type Product } from "../../../types/product"
import { useLocation, useSearchParams } from "react-router-dom";
import { useRequest } from "../../../hooks/useRequest";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material";
import ProductListView from "./ProductListView";


const Products : React.FC = () => {
    const theme = useTheme();

    const isSmall = useMediaQuery(theme.breakpoints.down('md'))

    const location = useLocation()

    const fullPath = location.pathname; // /products/computers/notebook/mac
    const subPath = fullPath.replace(/^\/products\//, '')

    const [searchParams, setSearchParams] = useSearchParams()

    const url = `/products/search/?category=${encodeURIComponent(subPath)}&${searchParams.toString()}`

    const res = useRequest<Product[]>(url, { method: 'GET' })

    const onChangePage = (ev: any, page: number) => {
        searchParams.set('limit', `${searchParams.get('limit') ?? 12}`)
        searchParams.set('page', `${page}`)
        setSearchParams(searchParams)
    }

    return (
        <ProductListView
        page={parseInt(searchParams.get('page') ?? '1')}
        isSmall={isSmall}
        subPath={subPath}
        res={res}
        onChangePage={onChangePage}
        />
    )
}

export default Products