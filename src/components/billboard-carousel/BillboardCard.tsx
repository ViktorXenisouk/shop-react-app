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
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                textDecoration: 'none',
                color: 'white',
                transition: 'opacity 0.5s ease-in-out',
                zIndex: 0,
                ...sx,
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}
        >
            <Box component='img' src={item.imgUrl} sx={{width:'100%',height:'auto'}}/>
            <Box
                sx={{
                    position: 'absolute',
                    bottom:{xs:2,sm:'20px',md:'40px'},
                    right: {xs:1,sm:3,md:'10px',lg:'50px'}
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