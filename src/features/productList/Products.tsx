import style from "./Products.module.css"
import { DataLoaderFromPromise } from "../loading/Loading"
import { Product } from "../../types/ItemData"
import ProductCard from "./ProductCard"
import Filter from '../filter/Filter';
import { safeFetch } from "../../services/safeFetch";
import { useLocation } from "react-router-dom";

import { Grid, Box } from "@mui/material"

const MyProducts = ({ data }: { data: Product[] }) => {

    const getProducts = () => {
        return data.map((item) => <ProductCard count={0} id={item._id} title={item.name} imgURL={item.imageURL} />)
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

    const queryParams = new URLSearchParams(location.search);
    const tagsParam = queryParams.get('tags'); // строка или null

    // 2. Получаем путь после /products/
    const fullPath = location.pathname; // /products/computers/notebook/mac
    const subPath = fullPath.replace(/^\/products\//, '')

    const requestInit: RequestInit = {}
    requestInit.method = 'GET'

    const res = safeFetch<Product[]>(`/products/search/${subPath}`, requestInit)

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
                margin: '10px 50px',
                height: '100%',
            }}
        >
            <Box sx={{ gridArea: 'header' }}>
                {/* Контент заголовка */}
            </Box>

            <Box sx={{ gridArea: 'filter', marginRight: 10 }}>
                <Filter />
            </Box>

            <Box sx={{ gridArea: 'main' }}>
                <DataLoaderFromPromise page={MyProducts} res={res} />
            </Box>
        </Box>
    )
}

export default Products