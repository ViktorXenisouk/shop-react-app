import CountBlock from "./CountBlock";
import { IconButton, Box, Button } from "@mui/material"
import { ShoppingBasket, FavoriteBorder, Favorite } from "@mui/icons-material"
import { useAuthUserStore } from "../../../store/useAuth";

const BasketCountBlock = ({ count, onChange, id }: { count: number, onChange?: (count: number) => void, id: string }) => {

    const changeHandler = (count: number) => {
        onChange?.(count)
    }

    return (
        <Button component={'div'} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <CountBlock onChange={changeHandler} count={count} />
        </Button>
    )
}

export default BasketCountBlock