import { useMemo } from "react"
import { autoSaveFetch } from "../../services/safeFetch"
import { useAuthUserStore } from "../../store/useAuth"
import { DataLoaderFromPromise } from "../loading/Loading"
import BacketCard from "../basket/components/BacketCard"
import { Box, Stack, Typography } from "@mui/material"

const FavouriteView = () => {
    const store = useAuthUserStore()

    const favourite = useMemo(() => {
        if (!store.user) {
            return []
        }
        return store.user.favourite


    }, [store.user?.favourite,store.user?.basketInfo])

    const page = store.user ? (
        <Stack>
            {favourite.length > 0 ? favourite.map((item) => <BacketCard id={item} info={{liked:true,count:store.user?.basketInfo.find((v) => v.id === item)?.count ?? 0}} />) :
                <Typography />}
        </Stack>
    ) :
        (
            <Typography>You are not login</Typography>
        )

    return (
        <Box>
            <Typography>Favourite</Typography>
            {page}
        </Box>
    )
}

export default FavouriteView