import { Typography } from "@mui/material"

type Props = {
    variant?: 'new' | 'sale' | 'normal',
    price:number
}

const PriceBlock = ({price,variant='normal'}:Props) => {
    return <Typography align='center' color="text.secondary" variant='h6' sx={{ px: '20px', mt: '30px',mx:'20px' ,border: 'grey solid 1px' }}>{price},-</Typography>
}

export default PriceBlock