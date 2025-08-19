import React, { useMemo } from "react"
import { type Product } from "../../../types/product"
import { useNavigate } from "react-router"
import ImageCarousel from "../../../UI/ImageCarousel"
import { useState } from "react"
import { useAuthUserStore } from "../../../store/useAuth"
import { Box, Typography, Grid, Divider, Paper } from "@mui/material"
import CategoryParser from "../../../UI/CategoryParser"
import Article from "../../article/Article"
import Params from "./components/Params"
import BasketCountButton from "../../basket/UI/BasketCountButton"
import LikeButtonWithText from "../../favourite/UI/LikeButtonWithText"
import { TopProducts,TopCategories } from "../../top-item"
import Navigation from "./components/Navigation"
import WriteComment from "./components/WriteComment"
import ReadComments from "./components/ReadComments"
import TagsViewer from "./components/TagViewer"


type Props = {
    data: Product
}

const ProductLoader: React.FC<Props> = ({ data }) => {
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

    const getCnt = () => {
        if (data._id && store.user) {
            const cnt = store.user?.basketInfo.find((v) => v.id == data._id)?.count ?? 0
            return cnt
        }
        return 0
    }

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

    const changeHandler = (count: number) => {
        store.createOrChangeBasketItem({ id: data._id, count: count })
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography
                variant="h2"
                sx={{
                    fontSize: { xs: 'large', md: undefined },
                    color: 'text.primary',
                    textAlign: 'center',
                    textDecoration: 'underline',
                    mt: '30px'
                }}>
                {data.name}
            </Typography>
            <Box
                sx={{
                    p: 5
                }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', ml: '20px', mt: '20px' }}>
                            <CategoryParser category={data.category} />
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <ImageCarousel imgs={data.imgs.map((v) => { return { url: v.url, name: v.name ?? '' } })} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                                height: '100%'
                            }}>
                            <Box sx={{ p: '12px' }}>
                                <TagsViewer tags={data.tags} />
                                <Divider sx={{ mt: '10px', mb: '20px' }} />
                                <Typography>{data.discription}</Typography>
                            </Box>
                            <Box sx={{ p: '12px' }}>
                                <LikeButtonWithText liked={liked} onClick={likeHandler} />
                                <BasketCountButton onChange={changeHandler} count={getCnt()} />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Divider variant="middle" sx={{ mt: '10px', mb: '20px' }} />
                        <Navigation onChange={(v) => setValue(v)} value={value} />
                        {component}
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ mb: '50px' }}>
                            <Divider sx={{ mt: '30px', mb: '50px' }} />
                            <TopProducts grid />
                            <TopCategories/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ProductLoader