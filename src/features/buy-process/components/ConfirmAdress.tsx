import React,{Fragment} from "react";
import { PropsCnd } from "../types";
import { Address } from "../../../types/adress";
import AddressInput from "../../../UI/AdressInput";

const ConfirmAdress : React.FC<PropsCnd> = (props) => {

    const body = props.body

    const isCompleted = props.isCompleted

    const onChangeHandler = (address: Address) => {
        props.setBody({ adress: address })
    }

    return (
        <Fragment>
            <AddressInput value={body.adress} onChange={onChangeHandler} />
        </Fragment>
    )
}

export default ConfirmAdress