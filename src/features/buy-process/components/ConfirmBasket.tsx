import { Body, PropsCnd } from "../types";
import { useAuthUserStore } from "../../../store/useAuth"
import BasketForm from "../../basket/BasketDisplay"
import { Button } from "@mui/material"

const ConfirmBakset = (props: PropsCnd) => {
    const store = useAuthUserStore()

    const onClick = () => {
        props.setCompleted(props.index, true)
    }

    return (
        <>
            <BasketForm />
            <Button onClick={onClick}>Countinue</Button>
        </>
    )
}

export default ConfirmBakset