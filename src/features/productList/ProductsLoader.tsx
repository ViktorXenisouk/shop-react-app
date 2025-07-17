import { useAuthUserStore } from "../../store/useAuth"
import { CardSkeleton } from "./ProductCardView"
import { useSearchParams } from "react-router-dom"
import { type Product } from "../../types/product"
import ProductCard from "./ProductCard"
import { Grid, Box } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const ProductsLoader = ({ data }: { data?: Product[] | null }) => {

    const store = useAuthUserStore()

    const [searchParams, setSearchParams] = useSearchParams()

    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isSm = useMediaQuery(theme.breakpoints.only('sm'));
    const isMd = useMediaQuery(theme.breakpoints.only('md'));

            const getStyleBySize = () => {
            if (isXs || searchParams.get('view') === 'list') {
                return { borderTop: 'black solid 1px', borderRight: 'none',height:'auto', }
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
            return { xs: 12, sm: 6, md: 4,lg:3 }
        }
        else {
            return { xs: 12 }
        }
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

        return (data && typeof data.map === 'function') && data.map((item) => {
            const count = store.user?.basketInfo.find((v) => v.id == item._id)?.count ?? 0
            const liked = store.user?.favourite.includes(item._id) ?? false
            return (
                <Grid component='div' size={getSize()}
                    sx={{
                        flexGrow: 0, minWidth: { md: 200 },
                        height: '500px',
                        borderRight: 'black solid 1px',
                        borderTop: 'black solid 1px',
                        ...getStyleBySize()
                    }}>
                    <ProductCard discription={item.discription} count={count} isLiked={liked} id={item._id} title={item.name} img={item.imgs[0]} view={searchParams.get('view')} />
                </Grid>)
        })
    }

    return (
        <Box >
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