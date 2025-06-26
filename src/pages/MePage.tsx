import { useNavigate, useParams } from "react-router-dom"
import { useAuthUserStore } from "../store/useAuth"
import FavouriteView from "../features/favourite/FavouriteView"
import Basket from '../features/basket/Basket';
import { Box, Typography, ToggleButtonGroup, ToggleButton,Container } from "@mui/material"
import {ShoppingBasketRounded} from "@mui/icons-material"


const MePage = () => {
    const params = useParams()
    const navigate = useNavigate()
    const page = params.page

    const store = useAuthUserStore()

    const user = store.user

    console.log(user)

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        value: string,
    ) => {
        if(value)
        navigate(`/me/${value}`);
    };

    const getPage = () => {
        switch (page) {
            case 'favourite':
                return <FavouriteView />
            case 'basket':
                return <Basket />
            case 'me':
                return (
                    <Box>
                        <Typography>{user?.username}</Typography>
                        <Typography>{user?.email}</Typography>
                    </Box>
                )
        }
    }

    return (
        <Container >
            <ToggleButtonGroup
                color="primary"
                value={page}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                sx={{
                    display:'flex',
                    justifyContent:'center'
                }}
            >
                <ToggleButton value="me">Me</ToggleButton>
                <ToggleButton value="favourite">Favourite</ToggleButton>
                <ToggleButton value="basket"><ShoppingBasketRounded/>Basket</ToggleButton>
            </ToggleButtonGroup>
            <Box>
                {getPage()}
            </Box>
        </Container>
    )
}

export default MePage