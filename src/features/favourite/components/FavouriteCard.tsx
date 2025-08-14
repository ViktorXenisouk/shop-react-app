import React from "react";
import { Link as RouterLink } from "react-router-dom"
import { useAuthUserStore } from "../../../store/useAuth";
import { Box, Card, CardContent, CardActions, Stack, Typography, Avatar, Button, IconButton } from "@mui/material";
import { useRequest } from "../../../hooks/useRequest";
import { Product } from "../../../types/product";
import { Favorite } from "@mui/icons-material"
import BasketCountButton from '../../basket/UI/BasketCountButton';

type Props = {
    id: string,
    presentInBasket: boolean,
    onDelete: (id: string) => void
}

const FavouriteCard: React.FC<Props> = ({ id, presentInBasket, onDelete }) => {
    const store = useAuthUserStore()

    const count = store.user?.basketInfo.find((v) => v.id == id)?.count ?? 0

    const onClick = () => {
        onDelete(id)
    }

    const basketHandler = (value: number) => {
        store.createOrChangeBasketItem({ id, count: value })
    }

    const [success, data, error] = useRequest<Product>(`/products/${id}`, { method: 'GET' })

    return (
        <Card
            variant="outlined"
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row'
            }} >
            <CardContent
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                {
                    (data && data?.imgs && data?.imgs[0]) &&
                    <Avatar src={data?.imgs[0].url} />
                }
                <Typography
                    component={RouterLink}
                    to={`/product/${id}`}
                    sx={{
                        color: 'CaptionText'
                    }}>
                    {data && data.name}
                </Typography>
                <Typography>
                    Price: 2000-,
                </Typography>
            </CardContent>
            <CardActions>
                <BasketCountButton
                    simple
                    count={count}
                    onChange={basketHandler}
                />
                <IconButton onClick={onClick}>
                    <Favorite sx={{ color: 'red' }} />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default FavouriteCard;