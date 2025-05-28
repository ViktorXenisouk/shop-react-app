import style from "./CountBlock.module.css"
import { IconButton, Box } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'
import TextField from "@mui/material/TextField";

const CountBlock = ({ count, setCount }: { count?: number, setCount: React.Dispatch<React.SetStateAction<number | undefined>> }) => {

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = parseInt(event.target.value)
        setCount(value)
    }

    const onIncrease = () => {
        setCount((previous) => !previous ? undefined : (previous + 1))
    }

    const onDecrease = () => {
        setCount((previous) => !previous ? undefined : previous - 1 <= 0 ? 0 : (previous - 1))
    }

    return (
            <Box display="flex">
                <IconButton onClick={onDecrease}>
                    <AddIcon />
                </IconButton>
                <TextField value={count} type="number" onChange={onChange}/>
                <IconButton onClick={onIncrease}>
                    <RemoveIcon />
                </IconButton>
            </Box>
    )
}

export default CountBlock