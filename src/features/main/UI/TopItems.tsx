import CarouselWithButtons from "../../carouselWithButtons/CarouselWithButtons"
import ItemForCarousel from "../../carouselWithButtons/ItemForCarousel"
import TopItemCard from "./TopItemCard"
import { Box, Typography } from "@mui/material"
import { TopItem } from "../../../types/topItem"
import { getItems } from "../../../types/topItem"
import TopItemProduct from "./TopItemProduct"

const TopItems = () => {
    const categories = getItems()
   return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h3" align='center'>Top Products</Typography>
            {
                categories ?
                    <CarouselWithButtons>
                        {categories && categories.map((v) =>
                            <ItemForCarousel minWidth='250px' height='300px'>
                                <TopItemProduct {...v} />
                            </ItemForCarousel>)}
                    </CarouselWithButtons>
                    :
                    null
            }
        </Box>
    )
}

export default TopItems