import React from "react";
import { Box } from "@mui/material"
import { useLocation } from "react-router-dom";
import { useRequest } from "../../../hooks/useRequest";
import { Product } from "../../../types/product";
import { DataLoaderFromHookSimple } from "../../loading";
import ProductsLoader from "../components/ProductsLoader";
import { useTheme, useMediaQuery } from "@mui/material";
import PlayListHeader from "./UI/PlayListHeader";
import ErrorDisplay from "../../../widgets/error-display/ErrorDisplay";

const PlayListDisplay : React.FC = () => {
    const theme = useTheme();

    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const location = useLocation()

    const fullPath = location.pathname; // /products/computers/notebook/mac
    const subPath = fullPath.replace(/^\/play-list\//, '')

    const res = useRequest<Product[]>(`/play-list/products-of/${subPath}`, { method: 'GET' })

    if (res[2]) {
        return (
            <ErrorDisplay status={res[2].status} message={res[2].message} />
        )
    }


    if (isSmall) {
        return (
            <Box>
                <PlayListHeader subPath={subPath} />
                <Box>
                    <DataLoaderFromHookSimple res={res} page={ProductsLoader} />
                </Box>
            </Box>
        )
    }

    return (
        <Box>
            <PlayListHeader subPath={subPath} />
            <Box sx={{ mx: '150px' }}>
                <DataLoaderFromHookSimple res={res} page={ProductsLoader} />
            </Box>
        </Box>
    )
}

export default PlayListDisplay