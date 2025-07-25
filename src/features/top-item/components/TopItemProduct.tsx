import { Box, Card, Stack, CardMedia, Typography, CardActions } from '@mui/material';
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
        <Box
            sx={{
                borderRadius: '0px',
                p: '0px',
                m: '0px',
                height: '100%',
                width: '200px',
                flexShrink:0,
                display:'flex',
                justifyContent:'space-between',
                flexDirection:'column',
                alignItems:'center',
             '&:hover': {
                    boxShadow: 5,                // можно добавить тень
                },
            }}>
            <Box
                component="img"
                height="auto"
                width="150px"
                src={props.imageUrl} />
            <Stack component={Link}
                to={props.url}>
                <Typography sx={{ color: 'text.primary' }} variant="h3">{props.title}</Typography>
                <Typography sx={{ color: 'text.primary' }} variant="subtitle1">{props.shortDescription}</Typography>
            </Stack>
            <Box sx={{mb:'12px',mx:'8px'}}>
                <BasketCountButton simple onChange={bucketHandler} setCount={setCount} count={count} />
            </Box>
        </Box>
    )
}

export default TopItemCard