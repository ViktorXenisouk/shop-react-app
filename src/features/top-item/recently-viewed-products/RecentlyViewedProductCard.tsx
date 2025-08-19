import { Box, Stack, Typography, Button, ButtonGroup } from '@mui/material';
import { Link } from "react-router-dom"
import { TopItem } from "../../../types/top-item"
import BasketCountButton from "../../basket/UI/BasketCountButton"
import { useAuthUserStore } from '../../../store/useAuth';
import { useEffect, useState } from 'react';

const RecentlyViewedProductCard = (props: TopItem & { id: string }) => {
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
                width: '250px',
                flexShrink: 0,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': {
                    boxShadow: 10,
                    zIndex: 4,
                },
            }}>
            <Box
                component="img"
                height="auto"
                width="150px"
                src={props.imageUrl} />
            <Stack>
                <Typography
                    sx={{ color: 'text.primary', whiteSpace: 'normal' }}
                    variant="h3"
                    align='center'>
                    {props.title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        ml: 3,
                        display: 'block',
                        color: 'text.secondary',
                        height: '6em',
                        whiteSpace: 'normal'
                    }}>
                    {props.shortDescription}</Typography>
            </Stack>
            <ButtonGroup orientation='horizontal' sx={{ mb: '12px', mx: '8px' }}>
                <Button
                    component={Link}
                    to={props.url}
                    color="secondary"
                >
                    Show More
                </Button>
                <BasketCountButton
                    simple
                    count={count}
                    color="secondary"
                    onChange={bucketHandler}
                    setCount={setCount}
                />
            </ButtonGroup>
        </Box>
    )
}

export default RecentlyViewedProductCard