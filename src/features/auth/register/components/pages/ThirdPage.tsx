import React, { useState } from "react";
import { type childrenProps } from "./../../types";
import PhoneInput from "../../../../../UI/PhoneInput";
import ContinueButton from "../../UI/ContinueButton";
import { Forward } from "@mui/icons-material";

const ThirdPage : React.FC<childrenProps>  = ({index,body,setBody,next}) => {
    const [completed, setCompleted] = useState(false)

    console.log(completed)

    const telHandler = (value: string) => {
        setBody({ tel: value })
    }

    const canForward =( body.tel === '' || completed)

    return (
        <>
            <PhoneInput onChange={telHandler} value={body.tel} setIsValid={(value) => setCompleted(value)} />
            <ContinueButton endIcon={<Forward/>} disabled={!canForward} completed={canForward} onClick={next}>{completed ? 'continue' : 'skip'}</ContinueButton>
        </>
    )
}

export default ThirdPage