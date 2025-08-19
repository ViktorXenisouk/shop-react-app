import { getTopProducts } from "../api"
import {Box,Typography} from "@mui/material"
import CarouselWithButtons from "../features/carousel-with-buttons/CarouselWithButtons"
import TopItemCard from "../top-categories/TopCategoriesCard"

const RecentlyViewedProducts = () => {
    const categories = getTopProducts()

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
                    <CarouselWithButtons height="350px">
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

export default RecentlyViewedProducts