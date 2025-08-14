import React from "react"
import { Typography } from "@mui/material"

type Props = {
    variant?: 'new' | 'sale' | 'normal',
    price: number
}

const PriceBlock: React.FC<Props> = ({ price, variant = 'normal' }) => {
    return <Typography
        align='center'
        color="text.secondary"
        variant='h6'
        sx={{
            px: '20px',
            mt: '30px',
            mx: '20px',
            borderWidth:'1px',
            borderStyle:'solid',
            borderColor:'primary'
        }}>
        {price},-
    </Typography>
}

export default PriceBlock