import { Box,Button } from "@mui/material"
import { BillboardItem } from "./types"
import React from "react"
import { Link } from "react-router-dom"


const BillboardCard : React.FC<{ item:BillboardItem }> = ({ item }) => {
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
            }}
        >
            <Box sx={{ position: 'absolute', bottom: '70px', right: '10px' }}>
                <Button size='large' variant="contained" component={Link} to={item.url}>
                    Show More
                </Button>
            </Box>
        </Box>
    )
}

export default BillboardCard