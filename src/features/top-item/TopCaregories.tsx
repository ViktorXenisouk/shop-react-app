import TopCarousel from "./components/TopCarousel"
import { getCategories } from "../../types/top-item"

const TopCategories = () => {
    const categories = getCategories()
    return (
        <TopCarousel items={categories} title='Categories'/>
    )
}

export default TopCategories