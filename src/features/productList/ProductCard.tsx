import { Link as RouterLink } from "react-router-dom"
import { useEffect, useState } from "react";
import CountBlock from "../../UI/CountBlock";

import { Card, CardActions, CardContent, CardMedia, Box, Grid, Button, Link as MuiLink } from "@mui/material"
import { useAuthUserStore } from "../../store/useAuth";
import BasketCountBlock from "../../UI/BasketCountBlock";
import LikeButton from '../../UI/LikeButton';
import type { ImageItem } from "../../types/Image";

import { ProductCardView } from "./ProductCardView";

import { } from "@mui/icons-material"

type ItemCardProps = {
    title: string;
    id: string;
    img: ImageItem;
    count?: number;
    isLiked?: boolean
    view?: string | null
}

const ProductCard = ({ title, id, img, count, isLiked,view }: ItemCardProps) => {
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
    }

    return <ProductCardView img={img} id={id} onLikeClick={onLikeClick} onChangeHandlerCount={onChangeHandlerCount} count={cnt} liked={liked} view={view ?? 'grid'} title={title} setCnt={setCnt} />
}

export default ProductCard