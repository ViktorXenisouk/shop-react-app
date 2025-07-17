import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { TopItem } from "../../../types/topItem"

const TopItemCard = (props: TopItem) => {

    return (
        <Card
            component={Link}
            to={props.url}
            sx={{
                borderRadius:'0px',
                p:'0px',
                m:'0px',
                height:'100%',
                width:'100%',
                '&:hover': {
                    border: '2px solid #1976d2', // основной цвет по умолчанию (или custom)
                    boxShadow: 3,                // можно добавить тень
                }
            }}>
            <CardMedia
                component="img"
                height="140"
                image={props.imageUrl}
                src={props.imageUrl} />
            <CardContent>
                <Typography variant="h3">{props.title}</Typography>
                <Typography variant="subtitle1">{props.shortDescription}</Typography>
            </CardContent>
        </Card>
    )
}

export default TopItemCard