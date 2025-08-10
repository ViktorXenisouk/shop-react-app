import { getItems } from "../../types/top-item"
import TopProductCarousel from "./components/TopProductCarousel"

const RecentlyViewedProducts = () => {
    const categories = getItems()

   return (
        <TopProductCarousel title="recently vieved products"/>
    )
}

export default RecentlyViewedProducts