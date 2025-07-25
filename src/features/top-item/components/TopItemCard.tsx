import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { TopItem } from "../../../types/top-item"

const TopItemCard = (props: TopItem) => {

    return (
        <Box
            component={Link}
            to={props.url}
            sx={{
                borderRadius: '0px',
                p: '0px',
                m: '0px',
                height: '100%',
                width: '350px',
                '&:hover': {
                    boxShadow: 5,                // можно добавить тень
                },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
            <Box>
                <Box
                    component="img"
                    height="auto"
                    width="300px"
                    src={props.imageUrl} 
                    />
                <Typography align="center" color="black" variant="h3">{props.title}</Typography>
            </Box>
            <Box sx={{mx:'12px',mb:'30px'}}>
                <Typography color="black" variant="subtitle1">{props.shortDescription}</Typography>
            </Box>
        </Box>
    )
}

export default TopItemCard