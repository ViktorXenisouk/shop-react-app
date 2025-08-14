import { getCategories } from "../../types/top-item"
import { Typography,Box } from "@mui/material"
import CarouselWithButtons from "./features/carousel-with-buttons/CarouselWithButtons"
import TopItemCard from "./components/TopItemCard"

const TopCategories = () => {
    const categories = getCategories()
   return (
        <Box sx={{ width: '100%' }}>
            <Typography 
            variant="h3" 
            align='center' 
            sx={{
                color:'text.primary',
                textDecoration:'underline', 
                mt:'30px', 
                mb:'12px'}}>
                Top Categories
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

export default TopCategories