import React from "react"
import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { TopItem } from "../../../types/top-item"

const TopCategoriesCard : React.FC<TopItem> = (props) => {

    return (
        <Box
            sx={{
                borderRadius: '0px',
                p: '0px',
                m: '0px',
                height: '100%',
                width: '350px',
                '&:hover': {
                    boxShadow: 5,
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
                <Typography align="center" variant="h3" sx={{
                    color:'text.primary'
                }}>
                    {props.title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color:'text.secondary',
                        ml:3}}  >
                    {props.shortDescription}
                </Typography>

            </Box>
            <Box sx={{ mx: '12px', mb: '30px' }}>
                <Button
                    component={Link}
                    to={props.url}
                    variant="contained"
                    color="secondary"
                    sx={{
                        px:4,
                    }}>
                    Show More
                </Button>
            </Box>
        </Box>
    )
}

export default TopCategoriesCard