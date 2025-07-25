import CountBlock from "./CountBlock";
import { Box, Button, Paper, styled } from "@mui/material"
import { ShoppingBasket } from "@mui/icons-material"

const StyledPaper = styled(Paper)(({theme}) => ({
    border:'rgba(0, 113, 227, 0.5) solid 1px'
}))

const BasketCountButton = ({ count, setCount, onChange, simple }: { count: number, setCount?: React.Dispatch<React.SetStateAction<number>>, onChange?: (count: number) => void, simple?: boolean }) => {

    const bucketHandler = () => {
        if (count <= 0) {
            onChange?.(1)
        }
        else if (simple) {
            onChange?.(0)
        }
    }

    const changeHandler = (count: number) => {
        onChange?.(count)
    }

    return (
        <>
            {
                !count || count <= 0 ?
                    <Button variant="outlined" startIcon={<ShoppingBasket />} onClick={bucketHandler} sx={{ width: '100%', m: '0px!important' }}>
                        add to busket
                    </Button>
                    :
                    simple ?
                        <Button variant="outlined" startIcon={<ShoppingBasket />} onClick={bucketHandler} sx={{ width: '100%', m: '0px!important' }}>
                            is added in basket
                        </Button>
                        :
                        <StyledPaper sx={{ width: '100%', display: 'flex', justifyContent: 'center',border:'rgba(0, 113, 227, 0.5) solid 1px',py:'1px' }}>
                            <CountBlock onChange={changeHandler} count={count} setCount={setCount} />
                        </StyledPaper>
            }
        </>
    )
}

export default BasketCountButton