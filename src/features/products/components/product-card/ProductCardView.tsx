import React from "react";
import { Link as RouterLink } from "react-router-dom"
import BasketCountButton from "../../../basket/UI/BasketCountButton";
import LikeButtonWithText from '../../../favourite/UI/LikeButtonWithText';
import { Card, CardMedia, Link as MuiLink, CardContent, CardActions, Skeleton, Typography, Button, ButtonGroup, useMediaQuery, useTheme, Chip } from '@mui/material';
import { Box } from "@mui/material"
import type { ImageItem } from "../../../../types/Image";
import PriceBlock from "../PriceBlock";
import SuperTag from "../../features/super-tag/SuperTag";
import BuyButton from "./UI/BuyButton";

type Props = {
    discription: string
    title: string;
    id: string;
    img: ImageItem;
    count: number;
    liked: boolean
    onLikeClick: () => void,
    onChangeHandlerCount: (count: number) => void
    view: string,
    superTag?: 'new' | 'super-price' | 'the-best' | null
    onButtonClick?: (id: string) => void
}

const ProductCardView: React.FC<Props> = (props) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

    if (isSmall) {
        return (
            <Box sx={{
                width: "100%",
                height: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                backgroundColor: 'paper',
                mb: '30px'
            }}>
                <Typography
                    align="center"
                    sx={{
                        display: 'block',
                        mt: 1,
                        fontWeight: 'bold',
                        color: 'text.primary',
                        textDecoration: 'underline',
                        minHeight: '3em'
                    }}>
                    {props.title}
                </Typography >
                <Box
                    component="img"
                    alt={props.img.name ?? ''}
                    height="auto"
                    width='100%'
                    src={props.img.url}
                />
                <Typography
                    sx={{
                        display: 'block',
                        mt: 1,
                        color: 'text.secondary',
                        height: '8em'
                    }}>
                    {props.discription.slice(0, 70).length === props.discription.length ? props.discription : props.discription.slice(0, 70) + '....'}
                </Typography>
                <PriceBlock price={2000} />
                <ButtonGroup orientation='vertical'>
                    <Button sx={{ width: '100%' }} variant="outlined" component={RouterLink} to={`/product/${props.id}`}>Show More</Button>
                    <BuyButton id={props.id} onClick={() => props.onButtonClick?.(props.id)} />
                    <LikeButtonWithText liked={props.liked} onClick={props.onLikeClick} />
                </ButtonGroup>
            </Box>
        )
    }
    if (props.view === 'grid') {
        return (
            <Box
                sx={{
                    width: "100%",
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    backgroundColor: 'transparent',
                    position: 'relative'
                }}>
                <Box>
                    {props.superTag && <SuperTag superTag={props.superTag} />}
                    <Box
                        component="img"
                        alt={props.img.name ?? ''}
                        height="auto"
                        width='100%'
                        src={props.img.url}
                    />
                    <CardContent component={RouterLink} to={`/product/${props.id}`}>
                        <Typography
                            sx={{
                                display: 'block',
                                mt: 1,
                                fontWeight: 'bold',
                                color: 'text.primary',
                                textDecoration: 'underline',
                                minHeight: '3em',
                                mx: '5px'
                            }}>
                            {props.title}
                        </Typography >
                        <Typography sx={{
                            display: 'block',
                            mt: 1,
                            color: 'text.secondary',
                            maxHeight: '8em',
                            mx: '5px'
                        }}>
                            {props.discription.slice(0, 70).length === props.discription.length ? props.discription : props.discription.slice(0, 70) + '....'}
                        </Typography>
                    </CardContent>
                </Box>
                <Box>
                    <PriceBlock price={2000} />
                    <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
                        <BuyButton id={props.id} onClick={() => props.onButtonClick?.(props.id)} />
                        <LikeButtonWithText liked={props.liked} onClick={props.onLikeClick} />
                    </CardActions>
                </Box>
            </Box>
        )
    }
    else
        return (
            <Box>
                <Box
                 sx={{
                     display: 'flex', 
                     justifyContent: 'space-between', 
                     flexDirection: 'row',
                      alignItems: 'center',
                       my: 1 ,
p:4
                    }}>
                    <Box
                        component="img"
                        alt={props.img.name ?? ''}
                        height="170px"
                        width='auto'
                        src={props.img.url}
                    />
                    <Box>
                        <Typography sx={{
                            display: 'block',
                            mt: 1,
                            fontWeight: 'bold',
                            color: 'text.primary',
                            textDecoration: 'underline',
                            minHeight: '3em',
                            textAlign: 'center'
                        }}>
                            {props.title}
                        </Typography >
                        <Typography sx={{
                            mt: 1,
                            color: 'text.secondary',
                            maxHeight: '10em',
                            maxWidth: '400px',
                            mx: '20px'
                        }}>
                            {props.discription.slice(0, 100).length === props.discription.length ? props.discription : props.discription.slice(0, 100) + '....'}
                        </Typography>
                    </Box>
                    <ButtonGroup orientation="vertical" sx={{ height: '100%' }}>
                        <Button
                            component={RouterLink}
                            to={`/product/${props.id}`}>
                            Show More
                        </Button>
                        <BuyButton id={props.id} onClick={() => props.onButtonClick?.(props.id)} />
                        <LikeButtonWithText liked={props.liked} onClick={props.onLikeClick} />
                    </ButtonGroup>
                </Box>
            </Box>
        )
}

const CardSkeleton = () => {
    return (
        <Box sx={{ width: "100%", height: '500px', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
            <Skeleton sx={{ m: 0 }} width='100%' height='140px' />
            <Skeleton sx={{ m: 0 }} width='100%' height='340px' />
            <Skeleton sx={{ m: 0 }} width='100%' height='120px' />
        </Box>
    )
}

export { ProductCardView, CardSkeleton }