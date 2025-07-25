import BasketCard from "./UI/BacketCard"
import { useAuthUserStore } from "../../store/useAuth"
import { Box, Typography, Stack, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useMemo, useState } from "react"
import { useLocalStorage } from "../../store/useLocalStorage";
import HeaderText from "../../UI/HeaderText";

type Props = {
    onClose: (value: 'no' | 'yes' | 'no-ask' | 'nothing') => void
    open: boolean
}

const CustomDialog = ({ onClose, open }: Props) => {

    return (
        <Dialog open={open} onClose={() => onClose('nothing')}>
            <DialogTitle>Are you sure to remove this item from basket</DialogTitle>
            <DialogActions>
                <Button onClick={() => onClose('yes')}>
                    Yes
                </Button>
                <Button onClick={() => onClose('no')}>
                    No
                </Button>
                <Button onClick={() => onClose('no-ask')}>
                    Dont ask me again
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const BasketDisplay = () => {
    const store = useAuthUserStore()

    const localStore = useLocalStorage()

    const [open, setOpen] = useState(false)
    const [currentId, setCurentId] = useState<null | string>(null)

    const onClose = (value: 'no' | 'yes' | 'no-ask' | 'nothing') => {
        setOpen(false)
        if (currentId) {
            console.log('valid id')
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
        <>
            <Box>
                <HeaderText>Basket</HeaderText>
                <Stack>
                    {basket.length > 0 ? 
                    basket.map((item) =>
                        <BasketCard onChange={onChange} id={item.id} info={{ count: item.count, liked: (user.favourite.includes(item.id) ?? false) }} />)
                        :
                        <Typography>your basket is empty</Typography>
                    }
                    <Box>
                        <Typography>Total:{total}</Typography>
                    </Box>
                </Stack>
            </Box>
            <CustomDialog onClose={onClose} open={open} />
        </>
    )
}

export default BasketDisplay