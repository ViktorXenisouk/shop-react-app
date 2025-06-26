import { Link as RouterLink } from "react-router-dom"
import { useEffect, useState } from "react";
import CountBlock from "../../UI/CountBlock";

import { Card, CardActions, CardContent, CardMedia, Box, Grid, Button, Link as MuiLink } from "@mui/material"
import { ShoppingBasket, FavoriteBorder, Favorite } from "@mui/icons-material"
import { useAuthUserStore } from "../../store/useAuth";
import BasketCountBlock from "../../UI/BasketCountBlock";
import LikeButton from '../../UI/LikeButton';
import type { ImageItem } from "../../types/Image";

type ItemCardProps = {
    title: string;
    id: string;
    img: ImageItem;
    count?: number;
    isLiked?: boolean
}

const ProductCard = ({ title, id, img, count, isLiked }: ItemCardProps) => {

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

    return (
        <Grid size={{ xs: 12, sm: 4, md: 3 }} sx={{ flexGrow: 0, minWidth:{md:200} }}>
            <Card sx={{ width: "100%" }}>
                <CardMedia
                    component="img"
                    alt={img.name ?? ''}
                    height="140"
                    image={img.url}
                />
                <CardContent>
                    <MuiLink
                        component={RouterLink}
                        to={`/product/${id}`}
                        underline="hover"
                        color="text.secondary"
                        sx={{ display: 'block', mt: 1, fontWeight: 'bold' }}>
                        {title}
                    </MuiLink>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <LikeButton liked={liked} onClick={onLikeClick}/>
                    <BasketCountBlock onChange={onChangeHandlerCount} count={count} setCount={setCnt} id={id} />
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ProductCard