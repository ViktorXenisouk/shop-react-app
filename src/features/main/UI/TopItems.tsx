import TopCarousel from "./TopCarousel"
import { getItems } from "../../../types/topItem"

const TopItems = () => {
    const categories = getItems()
    return (
        <TopCarousel items={categories} title='Items'/>
    )
}

export default TopItems