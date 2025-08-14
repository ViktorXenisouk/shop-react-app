import React,{Fragment} from "react";
import { PropsCnd } from "../types";
import BasketForm from "../../basket/BasketDisplay"
import { Button } from "@mui/material"

const ConfirmBakset : React.FC<PropsCnd> = (props) => {
    const onClick = () => {
        props.setCompleted(props.index, true)
    }

    return (
        <Fragment>
            <BasketForm />
            <Button variant='outlined' onClick={onClick}>Countinue</Button>
        </Fragment>
    )
}

export default ConfirmBakset