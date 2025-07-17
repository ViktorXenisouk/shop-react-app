import { useParams } from "react-router-dom"
import { DataLoaderFromPromise } from "../loading/Loading"
import { type Product } from "../../types/product"
import { useNavigate } from "react-router"
import { Link as RouterLink } from "react-router-dom"
import { autoSaveFetch } from "../../services/safeFetch"
import ImageCarousel from "../../UI/ImageCarousel"
import { useState } from "react"
import { useAuthUserStore } from "../../store/useAuth"
import { Box, Typography, Grid, Container, Divider } from "@mui/material"
import CategoryParser from "../../UI/CategoryParser"
import Article from "../article/Article"
import Params from "./components/Params"
import BasketCountButton from "../basketForm/UI/BasketCountButton"
import LikeButtonWithText from "../favourite/LikeButtonWithText"
import TopItems from "../main/UI/TopItems"

import { useMemo } from "react"

import Navigation from "./components/Navigation"
import WriteComment from "./components/WriteComment"
import ReadComments from "./components/ReadComments"

const MyProduct = ({ data }: { data: Product }) => {
    const navigate = useNavigate();

    const [value, setValue] = useState(0)

    const store = useAuthUserStore()

    const component = useMemo(() => {
        switch (value) {
            case 0: return <ReadComments />
            case 1: return <WriteComment />
            case 2: return <Article articles={data.blocks ?? []} />
            case 3: return <ReadComments />
            case 4: return <Params />
            default: return null
        }
    }, [value])

    const [count, setCount] = useState<number>(() => {
        if (data._id && store.user) {
            const cnt = store.user?.basketInfo.find((v) => v.id == data._id)?.count ?? 0
            return cnt
        }
        return 0
    })

    const [liked, setLiked] = useState<boolean>(
        () => {
            if (data._id && store.user) {
                const isLiked = store.user?.favourite.includes(data._id)
                return isLiked
            }
            return false
        }

    )

    const likeHandler = () => {
        setLiked((prev) => {
            const newV = !prev
            store.addOrRemoveFavourite(data._id, newV)
            return newV
        })
    }

    const onButtonClick = () => {
        navigate(-1)
    }

    const changeHandler = (count: number) => {
        store.createOrChangeBasketItem({ id: data._id, count: count })
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container>
                <Grid size={{ xs: 12 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', ml: '20px', mt: '20px' }}>
                        <CategoryParser category={data.category} />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12,md:6 }}>
                    <ImageCarousel imgs={data.imgs.map((v) => { return { url: v.url, name: v.name ?? '' } })} />
                </Grid>
                <Grid size={{ xs: 12,md:6 }}>
                    <Container maxWidth='sm' sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
                        <Box>
                            <Typography variant="h2">{data.name}</Typography>
                            <Typography>{data.discription}</Typography>
                        </Box>
                        <Box>
                            <LikeButtonWithText liked={liked} onClick={likeHandler} />
                            <BasketCountButton onChange={changeHandler} count={count} setCount={setCount} />
                        </Box>
                    </Container>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography>Tags: {data.tags?.map((item) => <Typography sx={{
                        color: 'black', '&:hover': {
                            colot: 'rgb(60, 60, 60)',
                            textDecoration: 'underline',
                        }
                    }} component={RouterLink} to={`/products/?tag=${item}`}>{item}, </Typography>)}</Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Navigation onChange={(v) => setValue(v)} value={value} />
                    {component}
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Divider sx={{ mt: '10px' }} />
                    <TopItems />
                </Grid>
            </Grid>
        </Box>
    )
}

const ProductPage = () => {
    const params = useParams()

    const id = params.id as string;

    const res = autoSaveFetch<Product>(`/products/${id}`, { method: 'GET' })

    return (
        <DataLoaderFromPromise page={MyProduct} res={res} />
    )
}

export default ProductPage