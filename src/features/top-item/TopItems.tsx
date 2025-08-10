import { getItems } from "../../types/top-item"
import TopProductCarousel from "./components/TopProductCarousel"

const TopItems = () => {
    const categories = getItems()

   return (
        <TopProductCarousel title="Top Items"/>
    )
}

export default TopItems