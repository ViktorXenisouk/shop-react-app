import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CountBlock from '../../../UI/CountBlock';
import { useAuthUserStore } from "../../../store/useAuth";
import { Box, Card, CardContent, CardActions, Stack } from "@mui/material";
import LikeButton from "../../../UI/LikeButton";
import BasketCountBlock from '../../../UI/BasketCountBlock';

const BacketCard = ({ id, info }: { id: string, info: { count: number, liked: boolean } }) => {
    const store = useAuthUserStore()
    const [count, setCount] = useState(info.count)
    const [liked, setLiked] = useState(info.liked)

    useEffect(() => {
        setCount(info.count)
        console.log('update my count:' + id)
    }, [info.count])
    useEffect(() => {
        setLiked(info.liked)
    }, [info.liked])

    const changeHandler = (count: number) => {
        store.createOrChangeBasketItem({ id, count })
    }

    const onClick = () => {
        setLiked((prev) => {
            const newV = !prev
            store.addOrRemoveFavourite(id, newV)
            return newV
        })
    }

    return (
        <Card variant="outlined">
            <Stack direction="row">
                <CardContent>
                    <Link to={`/product/${id}`}>{'name'}</Link>
                </CardContent>
                <CardActions>
                    <BasketCountBlock onChange={changeHandler} count={count} setCount={setCount} id={id}/>
                    <LikeButton onClick={onClick} liked={liked} />
                </CardActions>
            </Stack>
        </Card>
    )
}

export default BacketCard;