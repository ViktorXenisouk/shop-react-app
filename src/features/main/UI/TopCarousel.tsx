import CarouselWithButtons from "../../carouselWithButtons/CarouselWithButtons"
import ItemForCarousel from "../../carouselWithButtons/ItemForCarousel"
import TopItemCard from "./TopItemCard"
import { Box, Typography } from "@mui/material"
import { TopItem } from "../../../types/topItem"

type Props = {
    items?: TopItem[] | null,
    title: string,
}

const TopCarousel = ({ items, title }: Props) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h3" align='center'>{title}</Typography>
            {
                items ?
                    <CarouselWithButtons>
                        {items && items.map((v) =>
                            <ItemForCarousel minWidth='250px' height='300px'>
                                <TopItemCard {...v} />
                            </ItemForCarousel>)}
                    </CarouselWithButtons>
                    :
                    null
            }
        </Box>
    )
}

export default TopCarousel