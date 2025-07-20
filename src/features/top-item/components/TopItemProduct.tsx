import { Box, Card, CardContent, CardMedia, Typography, CardActions } from '@mui/material';
import { Link } from "react-router-dom"
import { TopItem } from "../../../types/top-item"
import BasketCountButton from "../../basket/UI/BasketCountButton"
import { useAuthUserStore } from '../../../store/useAuth';
import { useEffect, useState } from 'react';

const TopItemCard = (props: TopItem & { id: string }) => {
    const [count, setCount] = useState(0)

    const store = useAuthUserStore()

    const bucketHandler = () => {
        if (count == 0) {
            setCount(1)
            store.createOrChangeBasketItem({ id: props.id, count: 1 })
        }
        else {
            setCount(0)
            store.createOrChangeBasketItem({ id: props.id, count: 0 })
        }
    }

    useEffect(() => {
        const item = store.user?.basketInfo.find((item) => item.id === props.id)
        setCount(item?.count ?? 0)
    }, [store.user?.basketInfo])

    return (
        <Card
            sx={{
                borderRadius: '0px',
                p: '0px',
                m: '0px',
                height: '100%',
                width: '100%',
            }}>
            <CardMedia
                component="img"
                height="140"
                image={props.imageUrl}
                src={props.imageUrl} />
            <CardContent component={Link}
                to={props.url}>
                <Typography sx={{ color: 'text.primary' }} variant="h3">{props.title}</Typography>
                <Typography sx={{ color: 'text.primary' }} variant="subtitle1">{props.shortDescription}</Typography>
            </CardContent>
            <CardActions>
                <BasketCountButton simple onChange={bucketHandler} setCount={setCount} count={count} />
            </CardActions>
        </Card>
    )
}

export default TopItemCard