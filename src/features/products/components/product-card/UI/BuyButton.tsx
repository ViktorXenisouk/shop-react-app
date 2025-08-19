import React from "react"
import { Button } from "@mui/material"
import { ShoppingBasketOutlined, ShoppingBasket } from "@mui/icons-material"
import { useAuthUserStore } from "../../../../../store/useAuth"

type Props = {
    onClick: () => void,
    id: string
}

const BuyButton: React.FC<Props> = ({ onClick, id }) => {

    const store = useAuthUserStore()

    const isInBasket = (store.user.basketInfo.find((item) => item.id === id)?.count || 0) > 0

    return (
        <Button
            variant="outlined"
            onClick={onClick}
            endIcon={isInBasket ? <ShoppingBasket /> : <ShoppingBasketOutlined />}
            sx={{ width: '100%' }
            }>
            {isInBasket ? 'Added' : 'Add to Basket'}
        </Button>
    )
}

export default BuyButton