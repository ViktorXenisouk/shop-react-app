import CountBlock from "./CountBlock";
import { IconButton } from "@mui/material"
import { ShoppingBasket, FavoriteBorder, Favorite } from "@mui/icons-material"
import { useAuthUserStore } from "../store/useAuth";

const BasketCountBlock = ({ count, setCount, onChange, id }: { count?: number, setCount: React.Dispatch<React.SetStateAction<number>>, onChange?: (count: number) => void, id: string }) => {

    const store = useAuthUserStore()
    const bucketHandler = () => {
if (count == 0) {
            setCount(1)
            store.createOrChangeBasketItem({ id, count: 1 })
        }
    }

    return (
        <>
            {
                !count || count <= 0 ?
                    <IconButton onClick={bucketHandler}>
                        <ShoppingBasket />
                    </IconButton>
                    :
                    <CountBlock onChange={onChange} count={count} setCount={setCount} />
            }
        </>
    )
}

export default BasketCountBlock