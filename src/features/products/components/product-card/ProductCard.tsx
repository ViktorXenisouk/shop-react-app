import React, { useState } from "react";
import { useAuthUserStore } from "../../../../store/useAuth";
import type { ImageItem } from "../../../../types/Image";

import { ProductCardView } from "./ProductCardView";

import { } from "@mui/icons-material"

type Props = {
    discription:string
    title: string;
    id: string;
    img: ImageItem;
    count?: number;
    isLiked?: boolean
    view?: string | null,
    superTag?:'new'|'super-price'|'the-best'|null
}

const ProductCard : React.FC<Props>= ({ title, id, img, count, isLiked,view ,discription,superTag}) => {
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

    return <ProductCardView 
    superTag={superTag} 
    count={cnt} 
    discription={discription} 
    img={img} 
    id={id} 
    onLikeClick={onLikeClick} 
    onChangeHandlerCount={onChangeHandlerCount} 
    liked={liked} 
    view={view ?? 'grid'}
     title={title} />
}

export default ProductCard