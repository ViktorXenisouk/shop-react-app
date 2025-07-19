import { Body, PropsCnd } from "../types";
import { Address } from "../../../types/adress";
import { TextField } from "@mui/material";
import AddressInput from "../../input/ControlledTextFields/AdressInput";

const ConfirmAdress = (props: PropsCnd) => {

    const textHandler = (event: any) => {
        props.setBody({ adress: event.target.value })
    }

    const body = props.body

    const isCompleted = props.isCompleted

    const onChangeHandler = (address: Address) => {
        props.setBody({ adress: address })
    }

    return (
        <>
            <AddressInput value={body.adress} onChange={onChangeHandler} />
        </>
    )
}

export default ConfirmAdress