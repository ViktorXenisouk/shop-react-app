import CarouselWithButtons from "./features/carousel-with-buttons/CarouselWithButtons"
import ItemForCarousel from "./features/carousel-with-buttons/ItemForCarousel"
import { Box, Typography } from "@mui/material"
import { getItems } from "../../types/top-item"
import TopItemProduct from "./components/TopItemProduct"

const TopItems = () => {
    const categories = getItems()
   return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h3" align='center' sx={{textDecoration:'underline', mt:'30px', mb:'12px'}}>Top Products</Typography>
            {
                categories ?
                    <CarouselWithButtons height="350px">
                        {categories && categories.map((v) =>
                                <TopItemProduct {...v} />
                         )}
                    </CarouselWithButtons>
                    :
                    null
            }
        </Box>
    )
}

export default TopItems