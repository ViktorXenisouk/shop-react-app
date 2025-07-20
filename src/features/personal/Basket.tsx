import { useAuthUserStore } from '../../store/useAuth';
import { Link } from 'react-router-dom';
import BasketForm from '../basket/BasketDisplay';
import { Box, Button } from "@mui/material"

const Basket = () => {
    const store = useAuthUserStore()

    return (
        <Box>
            <BasketForm />
            {store.user.basketInfo.length > 0 && <Button component={Link} to='/buy-process'>Continue to buy</Button>}
        </Box>
    )
}

export default Basket