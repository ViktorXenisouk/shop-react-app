import { useAuthUserStore } from '../../store/useAuth';
import { Link } from 'react-router-dom';
import BasketForm from '../basket/BasketDisplay';
import { Box, Button, Divider } from "@mui/material"
import { TopProducts } from '../top-item';
import { ArrowForward } from '@mui/icons-material';

const Basket = () => {
    const store = useAuthUserStore()

    return (
        <Box>
            <BasketForm />
            {store.user.basketInfo.length > 0 &&
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <Button
                        component={Link}
                        to='/buy-process'
                        variant='outlined'
                        endIcon={<ArrowForward />}
                        sx={{ mr: 4 }}>
                        Continue to buy
                    </Button>
                </Box>
            }
            <Divider sx={{ mt: '60px', mb: '30px' }} />
            <TopProducts grid />
        </Box>
    )
}

export default Basket