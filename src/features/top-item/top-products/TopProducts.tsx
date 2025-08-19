import React, { Fragment, useState } from "react"
import { getTopProducts } from "../api"
import { Box, Typography } from "@mui/material"
import CarouselWithButtons from "../features/carousel-with-buttons/CarouselWithButtons"
import TopItemCard from "../top-categories/TopCategoriesCard"
import ProductsLoader from "../../products/components/ProductsLoader"
import { DataLoaderFromPromise } from "../../loading"
import { autoSaveFetch } from "../../../services/safe-fetch"
import { Product } from "../../../types/product"
import { BuyDrawer } from "../../products/product-list/components"
import { useRequest } from "../../../hooks/useRequest"

type Props = {
    grid?: boolean
}

const TopProducts: React.FC<Props> = ({ grid }) => {
    const categories = getTopProducts()

    const [id, setId] = useState<string | null>(null)
    const ids = categories.map((item) => item.id).slice(0, 10)
    const res = useRequest<Product[]>('/products/get-ids', { method: 'PUT', body: { ids: ids } })

    const onProductSelect = (id: string) => {
        setId(id)
    }


    if (grid) {
        return (
            <Fragment>
                <Box>
                    <Typography
                        variant="h2"
                        align="center"
                        sx={{ color: 'text.primary' }}>
                        Top Products
                    </Typography>
                    <ProductsLoader data={res[1]} onButtonBuyClick={onProductSelect} />
                </Box>
                <BuyDrawer id={id} onClose={() => setId(null)} />
            </Fragment>
        )
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Typography
                variant="h3"
                align='center'
                sx={{
                    textDecoration: 'underline',
                    color: 'text.primary',
                    mt: '30px',
                    mb: '12px'
                }}>
                Top Products
            </Typography>
            {
                categories ?
                    <CarouselWithButtons height="500px">
                        {categories && categories.map((v) =>
                            <TopItemCard {...v} />
                        )}
                    </CarouselWithButtons>
                    :
                    null
            }
        </Box>
    )
}

export default TopProducts