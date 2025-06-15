import { Link as RouterLink } from "react-router-dom"
import { useEffect, useState } from "react";
import CountBlock from "../countBlock/CountBlock";

import { Card, CardActions, CardContent, CardMedia, Box, Grid, Button, Link as MuiLink } from "@mui/material"
import { ShoppingBasket, FavoriteBorder } from "@mui/icons-material"
import Image from "../../UI/Image";

type ItemCardProps = {
    title: string;
    id: string;
    imgURL: string;
    count?: number;
}
const ProductCard = ({ title, id, imgURL, count }: ItemCardProps) => {

    const [cnt, setCnt] = useState(count)

    const imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmqfYB4D3aqQcH4HpWAQKcD5Hgx4jbs7HCciF9-UlXn9VV6J28rAtu1W8emao&s';


    useEffect(() => {
        if (!cnt || cnt <= 0) {

        }

    }, [cnt])

    const onLikeClick = (event: React.MouseEvent<HTMLButtonElement>) => {

    }

    const onBucketClick = (event: React.MouseEvent<HTMLButtonElement>) => {

    }

    return (
        <Grid size={{ xs: 12, sm: 4, md: 3 }} sx={{ flexGrow: 0,minWidth:200 }}>
            <Card sx={{ width: "100%" }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={imgUrl}
                />
                <CardContent>
                    <MuiLink
                        component={RouterLink}
                        to={`/product/${id}`}
                        underline="hover"
                        color="primary"
                        sx={{ display: 'block', mt: 1, fontWeight: 'bold' }}>
                        {title}
                    </MuiLink>
                </CardContent>
                <CardActions sx={{justifyContent:'space-between'}}>
                    <Button>
                        <FavoriteBorder />
                    </Button>
                    {
                        !cnt || cnt <= 0 ?
                            <Button>
                                <ShoppingBasket />
                            </Button>
                            :
                            <CountBlock count={cnt} setCount={setCnt} />
                    }
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ProductCard