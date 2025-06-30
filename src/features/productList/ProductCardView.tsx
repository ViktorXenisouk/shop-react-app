import { Link as RouterLink } from "react-router-dom"
import BasketCountBlock from "../../UI/BasketCountBlock";
import LikeButton from '../../UI/LikeButton';
import { Grid, Card, CardMedia, Link as MuiLink, CardContent, CardActions, Skeleton, Typography } from "@mui/material"
import type { ImageItem } from "../../types/Image";
import PriceBlock from "./PriceBlock";

type ItemCardProps = {
    title: string;
    id: string;
    img: ImageItem;
    count?: number;
    liked: boolean
    setCnt: React.Dispatch<React.SetStateAction<number>>
    onLikeClick: () => void,
    onChangeHandlerCount: (count: number) => void
    view:string,
}

const ProductCardView = (props: ItemCardProps) => {

    const getSize = () => {
        if(props.view === 'grid'){
return { xs: 12, sm: 4, md: 3 }
        }
        else{
return {xs:12}
        }
    }

    return (
        <Grid size={getSize()} sx={{ flexGrow: 0, minWidth: { md: 200 } }}>
            <Card sx={{ width: "100%" }}>
                <CardMedia
                    component="img"
                    alt={props.img.name ?? ''}
                    height="140"
                    image={props.img.url}
                />
                <CardContent>
                    <MuiLink
                        component={RouterLink}
                        to={`/product/${props.id}`}
                        underline="hover"
                        color="text.secondary"
                        sx={{ display: 'block', mt: 1, fontWeight: 'bold' }}>
                        {props.title}
                    </MuiLink>
                    <PriceBlock price={2000}/>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <LikeButton liked={props.liked} onClick={props.onLikeClick} />
                    <BasketCountBlock onChange={props.onChangeHandlerCount} count={props.count} setCount={props.setCnt} id={props.id} />
                </CardActions>
            </Card>
        </Grid>
    )
}

const CardSkeleton = () => {
    return (
        <Grid size={{ xs: 12, sm: 4, md: 3 }} sx={{ flexGrow: 0, minWidth: { md: 200 }, minHeight: '270px' }}>
            <Card sx={{ width: '100%' }}>
                <Skeleton sx={{ mt: 0 }} width='100%' height='140px' />
                <CardContent>
                    <Skeleton width='100%' height='70px' />
                </CardContent>
                <CardActions>
                    <Skeleton width='100%' height='56px' />
                </CardActions>
            </Card>
        </Grid >

    )
}

export { ProductCardView, CardSkeleton }