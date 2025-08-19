import { getTopCategories } from "../api"
import { Typography,Box } from "@mui/material"
import CarouselWithButtons from "../features/carousel-with-buttons/CarouselWithButtons"
import TopCategoriesCard from "./TopCategoriesCard"

const TopCategories = () => {
    const categories = getTopCategories()
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
                                <TopCategoriesCard {...v} />
                         )}
                    </CarouselWithButtons>
                    :
                    null
            }
        </Box>
    )
}

export default TopCategories