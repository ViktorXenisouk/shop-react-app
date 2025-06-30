import { useNavigate, useParams } from "react-router-dom"
import { useAuthUserStore } from "../store/useAuth"
import FavouriteView from "../features/favourite/FavouriteView"
import Basket from '../features/basket/Basket';
import { Box, Typography, Container, } from "@mui/material"
import { ShoppingBasketRounded, Favorite, Person } from "@mui/icons-material"
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';


const MePage = () => {
    const params = useParams()
    const navigate = useNavigate()
    const page = params.page

    const store = useAuthUserStore()

    const user = store.user

    console.log(user)

    const handleChange = (
        event: any,
        value: any,
    ) => {
        navigate(`/me/${value}`);
    };

    const getPage = () => {
        switch (page) {
            case 'me':
                return (
                    <Box>
                        <Typography>{user?.username}</Typography>
                        <Typography>{user?.email}</Typography>
                    </Box>
                )
            case 'basket':
                return <Basket />
            case 'favourite':
                return <FavouriteView />
        }
    }

    return (
        <Box >
            <BottomNavigation
                showLabels
                value={page}
                onChange={handleChange}
                aria-label="Platform"
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <BottomNavigationAction value='me' label="Me" icon={<Person />} />
                <BottomNavigationAction value='basket' label="Shoping" icon={<ShoppingBasketRounded />} />
                <BottomNavigationAction value='favourite' label="Favorites" icon={<Favorite />} />
            </BottomNavigation>
            <Box>
                {getPage()}
            </Box>
        </Box>
    )
}

export default MePage