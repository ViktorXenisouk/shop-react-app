import { useMemo, useState } from "react"
import { useAuthUserStore } from "../../store/useAuth"
import { Box, Stack, Typography } from "@mui/material"
import FavouriteCard from './components/FavouriteCard';
import FavouriteDialog from "./components/FavouriteDialog"

const FavouriteView = () => {
    const store = useAuthUserStore()

    const [open, setOpen] = useState(false)

    const [currentId, setCurrentId] = useState<string | null>(null)

    const onClose = (value: 'no' | 'yes' | 'no-ask' | 'nothing') => {
        setOpen(false)

        if (value == 'yes' && currentId) {
            store.addOrRemoveFavourite(currentId, false)
        }
    }

    const favourite = useMemo(() => {
        if (!store.user) {
            return []
        }
        return store.user.favourite


    }, [store.user?.favourite, store.user?.basketInfo])

    const onDelete = (id: string) => {
        setCurrentId(id)
        setOpen(true)
    }

    const page = store.user ? (
        <Stack>
            {favourite.length > 0 ? favourite.map((item) => {
                const countInBasket = store.user?.basketInfo?.find((v) => v.id === item)?.count ?? 0
                return <FavouriteCard onDelete={onDelete} id={item} presentInBasket={countInBasket > 0} />
            })
                :
                <Typography>is empty</Typography>}
        </Stack>
    ) :
        (
            <Typography>You are not login</Typography>
        )

    return (
        <>
            <Box>
                <Typography>Favourite</Typography>
                {page}
            </Box>
            <FavouriteDialog open={open} onClose={onClose} />
        </>
    )
}

export default FavouriteView