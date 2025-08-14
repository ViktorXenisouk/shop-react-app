import React, { useMemo, useState, Fragment } from "react"
import BasketCard from "./UI/BacketCard"
import { useAuthUserStore } from "../../store/useAuth"
import { Box, Stack } from "@mui/material";
import { useLocalStorage } from "../../store/useLocalStorage";
import HeaderText from "../../UI/HeaderText";
import BasketEmpty from "./components/BasketEmpty"
import BasketDialog from "./BasketDialog";

const BasketDisplay: React.FC = () => {
    const store = useAuthUserStore()

    const localStore = useLocalStorage()

    const [open, setOpen] = useState(false)
    const [currentId, setCurentId] = useState<null | string>(null)

    const onClose = (value: 'no' | 'yes' | 'no-ask' | 'nothing') => {
        setOpen(false)
        if (currentId) {
            if (value === 'yes') {
                store.createOrChangeBasketItem({ id: currentId, count: 0 })
            }
            else if (value === 'no-ask') {
                localStore.setShowAlert(false)
            }
            else {
                store.createOrChangeBasketItem({ id: currentId, count: 1 })
            }
        }
    }

    const onChange = (id: string, count: number) => {
        if (count > 0 || !localStore.showAlert) {
            store.createOrChangeBasketItem({ id, count })
        }
        else {
            setCurentId(id)
            setOpen(true)
        }
    }

    const basket = useMemo(() => {
        if (!store?.user) {
            return []
        }

        console.log('update basket Info')

        return store.user.basketInfo
    }, [store.user?.basketInfo, store.user?.favourite])

    console.log(basket)


    const user = store.user

    let total = 0

    store.user.basketInfo.forEach((v) => {
        total += v.count * 2000
    })

    return (
        <Fragment>
            <Box>
                <HeaderText>Basket</HeaderText>
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
                            borderRadius:4
                        }}>
                        {basket.length > 0 ?
                            basket.map((item) =>
                                <BasketCard
                                    onChange={onChange}
                                    id={item.id}
                                    info={{ count: item.count, liked: (user.favourite.includes(item.id) ?? false) }}
                                />)
                            :
                            <BasketEmpty />
                        }
                    </Stack>
                </Box>
            </Box>
            <BasketDialog onClose={onClose} open={open} />
        </Fragment>
    )
}

export default BasketDisplay