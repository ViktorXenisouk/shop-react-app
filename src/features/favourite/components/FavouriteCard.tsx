import React from "react";
import { Link as RouterLink } from "react-router-dom"
import { useAuthUserStore } from "../../../store/useAuth";
import { Box, Card, CardContent, CardActions, Stack, Typography, Avatar, Button, IconButton, useTheme, useMediaQuery } from "@mui/material";
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

    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))


    const onClick = () => {
        onDelete(id)
    }

    const basketHandler = (value: number) => {
        store.createOrChangeBasketItem({ id, count: value })
    }

    const [success, data, error] = useRequest<Product>(`/products/${id}`, { method: 'GET' })

    return (
        <Card variant="outlined" sx={{p:1}}>
            <Stack spacing={3} direction={isMobile ? 'column' : 'row'} sx={{ alignItems: 'center' }}>
                {data?.imgs && data?.imgs[0] && <Avatar src={data?.imgs[0]?.url ?? ''} />}
                <Box>
                    <Typography component={RouterLink} sx={{ color: 'text.primary', ml: '10px' }} to={`/product/${id}`}>{data && data.name}</Typography>
                </Box>
                <Box>
                    <Stack direction={isMobile ? 'row' : 'column'}>
                        <Typography >Price: 2000-,</Typography>
                    </Stack>
                </Box>
                <Stack direction='row'>
                    <BasketCountButton
                        simple
                        count={count}
                        onChange={basketHandler}
                    />
                    <IconButton onClick={onClick}>
                        <Favorite sx={{ color: 'red' }} />
                    </IconButton>
                </Stack>
            </Stack>
        </Card>
    )
}

export default FavouriteCard;