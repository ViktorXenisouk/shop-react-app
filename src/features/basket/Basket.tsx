import { type BasketInfo } from "./types"
import BasketCard from "./components/BacketCard"
import { useAuthUserStore } from "../../store/useAuth"
import {Box,Stack,Typography} from "@mui/material"
import { useMemo } from "react"

const Basket = () => {
   const store = useAuthUserStore()

    const user = store.user

    const basket = useMemo(() => {
        if(!store.user){
            return []
        }

        console.log('update basket Info')

        return store.user.basketInfo
    },[store.user?.basketInfo,store.user?.favourite])


    const page = user ? (
        <Stack>
            {basket.length > 0 ? basket.map((item) => <BasketCard id={item.id} info={{count:item.count,liked:(user.favourite.includes(item.id))}} />) :
            <Typography>your basket is empty</Typography>}
        </Stack>
    ) :
        (
            <Typography>You are not login</Typography>
        )

    return (
        <Box>
            <Typography>Basket</Typography>
            {page}
        </Box>
    )
}

export default Basket