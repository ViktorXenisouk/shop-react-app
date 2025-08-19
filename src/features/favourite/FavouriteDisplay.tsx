import React, { useMemo, useState, Fragment } from "react"
import { useAuthUserStore } from "../../store/useAuth"
import { Box, Stack } from "@mui/material"
import FavouriteCard from './components/FavouriteCard';
import FavouriteDialog from "./components/FavouriteDialog"
import FavouriteEmpty from "./components/FavouriteEmpty";
import HeaderText from "../../UI/HeaderText";

const FavouriteDisplay: React.FC = () => {
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

    return (
        <Fragment>
            <Box>
                <HeaderText>Favourite</HeaderText>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        width: '100%'
                    }}>
                    <Stack
                        sx={{
                            bgcolor: 'background.paper',
                            width: '600px',
                            p: '16px',
                            mx: 'auto',
                            borderRadius:4,
                        }}>
                        {favourite.length > 0 ?
                            favourite.map((item) => {
                                const countInBasket = store.user?.basketInfo?.find((v) => v.id === item)?.count ?? 0
                                return (
                                    <FavouriteCard
                                        id={item}
                                        onDelete={onDelete}
                                        presentInBasket={countInBasket > 0}
                                    />)
                            })
                            :
                            <FavouriteEmpty />}
                    </Stack>
                </Box>
            </Box>
            <FavouriteDialog open={open} onClose={onClose} />
        </Fragment>
    )
}

export default FavouriteDisplay