import React from "react"
import { useAuthUserStore } from "../../../store/useAuth"
import { CardSkeleton } from "./product-card/ProductCardView"
import { useSearchParams } from "react-router-dom"
import { type Product } from "../../../types/product"
import ProductCard from "./product-card/ProductCard"
import { Grid, Box } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import { SuperTag } from "../features/super-tag/types"
import { useTheme } from "@mui/material/styles"

type Props = {
    data?: Product[] | null,
    onButtonBuyClick?: (id: string) => void
}

const ProductsLoader: React.FC<Props> = ({ data, onButtonBuyClick }) => {

    const store = useAuthUserStore()

    const [searchParams, setSearchParams] = useSearchParams()

    const theme = useTheme();

    const border = `${theme.palette.divider} solid 2px`

    const isSm = useMediaQuery(theme.breakpoints.only('sm'));
    const isMd = useMediaQuery(theme.breakpoints.only('md'));
    const isLg = useMediaQuery(theme.breakpoints.only('lg'));

    const getStyleBySize = () => {
        if (searchParams.get('view') === 'list') {
            return { borderTop: border, borderRight: 'none', height: 'auto', }
        }
        else if (isSm) {
            return {
                ':nth-child(-n+2)': {
                    borderTop: 'none'
                },
                ':nth-child(2n)': {
                    borderRight: 'none'
                }
            }
        }
        else if (isMd) {
            return {
                ':nth-child(-n+3)': {
                    borderTop: 'none'
                },
                ':nth-child(3n)': {
                    borderRight: 'none'
                }
            }
        }
        else {
            return {
                ':nth-child(-n+4)': {
                    borderTop: 'none'
                },
                ':nth-child(4n)': {
                    borderRight: 'none'
                }
            }
        }
    }

    const getSize = () => {
        if (!searchParams.get('view') || searchParams.get('view') === 'grid') {
            return { xs: 6, sm: 6, md: 4, lg: 3 }
        }
        else {
            return { xs: 12 }
        }
    }

    const getSuperTag = (i: number): SuperTag | undefined => {
        if (i == 0) {
            return "new"
        }
        if (i == 1) {
            return "super-price"
        }
        if (i == 2) {
            return "the-best"
        }
        return undefined
    }

    const getProducts = () => {
        if (!data) {
            const arr = []

            const limit = searchParams.get('limit') ?? '10'

            for (let i = 0; i < parseInt(limit); i++) {
                arr.push(
                    <Grid component='div' size={getSize()}
                        {...getStyleBySize()}

                        sx={{ flexGrow: 0, minWidth: { md: 200 } }}>
                        <CardSkeleton />
                    </Grid>
                )
            }

            return arr
        }

        return (data && typeof data.map === 'function') && data.map((item, i) => {
            const count = store.user?.basketInfo.find((v) => v.id == item._id)?.count ?? 0
            const liked = store.user?.favourite.includes(item._id) ?? false
            return (
                <Grid component='div' size={getSize()}
                    sx={{
                        flexGrow: 0,
                        minWidth: { md: 200 },
                        height: { md: '800px', lg: '700px' },
                        borderRight: border,
                        borderTop: border,
                        ...getStyleBySize()
                    }}>
                    <ProductCard
                        superTag={getSuperTag(i)}
                        discription={item.discription}
                        count={count}
                        isLiked={liked}
                        id={item._id}
                        title={item.name}
                        img={item.imgs[0]}
                        view={searchParams.get('view')}
                        onButtonClick={onButtonBuyClick} />
                </Grid>)
        })
    }

    return (
        <Box
            sx={{
                width: { xs: '100%', sm: '600px', md: '100%', lg: '100%' },
                mx: 'auto'
            }}>
            <Grid container
                direction="row"
                sx={{
                    justifyContent: 'stretch',
                    alignItems: "stretch",
                    flexGrow: 0,
                }} >
                {getProducts()}
            </Grid>
        </Box>
    )
}

export default ProductsLoader