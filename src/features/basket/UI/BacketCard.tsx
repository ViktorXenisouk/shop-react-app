import React, { useEffect, useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { useAuthUserStore } from "../../../store/useAuth";
import { Stack, Card, Typography, Avatar, Box,useTheme,useMediaQuery } from "@mui/material";
import LikeButton from "../../favourite/UI/LikeButton";
import BasketCountBlock from './BasketCountBlock';
import { useRequest } from "../../../hooks/useRequest";
import { Product } from "../../../types/product";

type Props = {
    id: string, info: { count: number, liked: boolean },
    onChange: (id: string, count: number) => void
}

const BacketCard : React.FC<Props> = ({ id, info, onChange }) => {
    const store = useAuthUserStore()
    const [liked, setLiked] = useState(info.liked)

    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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
        <Card variant="outlined">
            <Stack spacing={3} direction={isMobile ? 'column' :'row'} sx={{alignItems:'center'}}>
                    {data?.imgs && data?.imgs[0] && <Avatar src={data?.imgs[0]?.url ?? ''} />}
                <Box>
                    <Typography component={RouterLink} sx={{ color: 'text.primary', ml: '10px' }} to={`/product/${id}`}>{data && data.name}</Typography>
                </Box>
                <Box>
                    <Stack direction={isMobile ? 'row' :'column'}>
                        <Typography >Price: 2000-,</Typography>
                        <Typography >Total: {info.count * 2000}-</Typography>
                    </Stack>
                </Box>
                <Stack direction={isMobile ? 'row' :'column'}>
                    <BasketCountBlock onChange={changeHandler} count={info.count} id={id} />
                    <LikeButton onClick={onClick} liked={liked} />
                </Stack>
            </Stack>
        </Card>
    )
}

export default BacketCard;