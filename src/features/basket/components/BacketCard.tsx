import React, { useEffect, useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { useAuthUserStore } from "../../../store/useAuth";
import { Card, CardContent, CardActions, Typography, Avatar } from "@mui/material";
import LikeButton from "../../favourite/UI/LikeButton";
import BasketCountBlock from '../UI/BasketCountBlock';
import { useRequest } from "../../../hooks/useRequest";
import { Product } from "../../../types/product";

type Props = {
    id: string;
    info: { count: number, liked: boolean };
    onChange: (id: string, count: number) => void;
}

const BacketCard: React.FC<Props> = ({ id, info, onChange }) => {
    const store = useAuthUserStore()
    const [liked, setLiked] = useState(info.liked)

    useEffect(() => {
    }, [info.count])
    useEffect(() => {
        setLiked(info.liked)
    }, [info.liked])

    const changeHandler = (count: number) => {
        onChange(id, count)
    }

    const onClick = () => {
        setLiked((prev) => {
            const newV = !prev
            store.addOrRemoveFavourite(id, newV)
            return newV
        })
    }

    const [success, data, error] = useRequest<Product>(`/products/${id}`, { method: 'GET' })

    return (
        <Card
            variant="outlined"
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row'
            }}
        >
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={data?.imgs[0].url} />
                <Typography
                    component={RouterLink}
                    to={`/product/${id}`}
                    sx={{ color: 'CaptionText' }}
                >
                    {data && data.name}
                </Typography>
                <Typography>Price: 2000-,</Typography>
                {
                    info.count > 0 && <Typography>Total: {info.count * 2000}</Typography>
                }
            </CardContent>
            <CardActions>
                <BasketCountBlock
                    onChange={changeHandler}
                    count={info.count}
                    id={id} />
                <LikeButton
                    onClick={onClick}
                    liked={liked} />
            </CardActions>
        </Card>
    )
}

export default BacketCard;