import TopCarousel from "./TopCarousel"
import { getCategories } from "../../../types/topItem"

const TopCategories = () => {
    const categories = getCategories()
    return (
        <TopCarousel items={categories} title='Categories'/>
    )
}

export default TopCategories