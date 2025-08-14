import { useAuthUserStore } from '../../store/useAuth';
import { Link } from 'react-router-dom';
import BasketForm from '../basket/BasketDisplay';
import { Box, Button,Divider } from "@mui/material"
import RecentlyViewedProducts from '../top-item/RecentlyViewedProducts';
import TopItems from '../top-item/TopItems';

const Basket = () => {
    const store = useAuthUserStore()

    return (
        <Box>
            <BasketForm />
            {store.user.basketInfo.length > 0 && <Button component={Link} to='/buy-process'>Continue to buy</Button>}
            <Divider sx={{ mt: '60px', mb: '30px' }} />
            <RecentlyViewedProducts />
            <TopItems />
        </Box>
    )
}

export default Basket