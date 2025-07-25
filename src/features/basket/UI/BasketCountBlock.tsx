import CountBlock from "./CountBlock";
import { Paper} from "@mui/material"

const BasketCountBlock = ({ count, onChange, id }: { count: number, onChange?: (count: number) => void, id: string }) => {

    const changeHandler = (count: number) => {
        onChange?.(count)
    }

    return (
        <Paper component={'div'} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <CountBlock onChange={changeHandler} count={count} />
        </Paper>
    )
}

export default BasketCountBlock