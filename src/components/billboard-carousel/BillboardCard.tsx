import React from "react"
import { Box, Button, SxProps,Theme } from '@mui/material';
import { BillboardItem } from "./types"
import { Link } from "react-router-dom"

type Props = {
    item:BillboardItem,
    sx?:SxProps<Theme>
}


const BillboardCard: React.FC<Props> = ({ item,sx }) => {
    return (
        <Box
            sx={{
                width: '800px', height: '600px',
                backgroundImage: `url(${item.imgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                textDecoration: 'none',
                color: 'white',
                transition: 'opacity 0.5s ease-in-out',
                zIndex: 0,
                ...sx
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '70px',
                    right: '10px'
                }}
            >
                <Button
                    size='large'
                    variant="contained"
                    component={Link}
                    to={item.url}
                >
                    Show More
                </Button>
            </Box>
        </Box>
    )
}

export default BillboardCard