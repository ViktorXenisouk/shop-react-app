import { useEffect, useState } from "react";
import { useAuthUserStore } from "../../store/useAuth";
import type { ImageItem } from "../../types/Image";

import { ProductCardView } from "./ProductCardView";

import { } from "@mui/icons-material"

type ItemCardProps = {
    discription:string
    title: string;
    id: string;
    img: ImageItem;
    count?: number;
    isLiked?: boolean
    view?: string | null
}

const ProductCard = ({ title, id, img, count, isLiked,view ,discription}: ItemCardProps) => {
    const [cnt, setCnt] = useState(count ?? 0)
    const [liked, setLiked] = useState(isLiked ?? false)

    const store = useAuthUserStore()

    const onLikeClick = () => {
        setLiked((prev) => {
            const newV = !prev
            store.addOrRemoveFavourite(id, newV)
            return newV
        })
    }

    const onChangeHandlerCount = (count: number) => {
        store.createOrChangeBasketItem({ id, count: count })
        setCnt(count)
    }

    return <ProductCardView count={cnt} discription={discription} img={img} id={id} onLikeClick={onLikeClick} onChangeHandlerCount={onChangeHandlerCount} liked={liked} view={view ?? 'grid'} title={title} />
}

export default ProductCard