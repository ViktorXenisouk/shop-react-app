import { useEffect, useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import CountBlock from './CountBlock';
import { useAuthUserStore } from "../../../store/useAuth";
import { Box, Card, CardContent, CardActions, Typography, Avatar, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import LikeButton from "../../favourite/LikeButton";
import BasketCountBlock from './BasketCountBlock';
import { useRequest } from "../../../hooks/useRequest";
import { Product } from "../../../types/product";

type Props = {
    id: string, info: { count: number, liked: boolean },
    onChange: (id: string, count: number) => void
}

const BacketCard = ({ id, info, onChange }: Props) => {
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

    console.log('data')
    console.log(data)

    return (
        <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }} variant="outlined">
            <CardContent sx={{ display: 'flex', alignItems: 'center',height:'100%' }}>
                {
                    data?.imgs && data?.imgs[0] && <Avatar src={data?.imgs[0]?.url ?? ''} />
                }

                <Typography component={RouterLink} sx={{ color: 'CaptionText',ml:'10px' }} to={`/product/${id}`}>{data && data.name}</Typography>

                <Typography sx={{ml:'20px', }}>Price: 2000-,</Typography>

               <Typography sx={{ml:'20px', }}>Total: {info.count * 2000}</Typography>

            </CardContent>
            <CardActions>
                <BasketCountBlock onChange={changeHandler} count={info.count} id={id} />
                <LikeButton onClick={onClick} liked={liked} />
            </CardActions>
        </Card>
    )
}

export default BacketCard;