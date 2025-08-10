import React, { useEffect, useState } from "react";
import { autoSaveFetch } from "../../../../../services/safe-fetch";
import { type childrenProps } from "./../../types";
import EmailInput from "../../../../../UI/EmailInput";
import MinCountInput from '../../../../../UI/MinCountInput';
import { UserNameLabel } from "../../../../../components/labels";
import ContinueButton from "../../UI/ContinueButton";
import { Forward } from "@mui/icons-material";

const FirstPage : React.FC<childrenProps>= ({index,body,setBody,next}) => {
    const [completed, setCompleted] = useState(false)
    const [loading, setLoading] = useState(false)

    const [valid, setValid] = useState([false, false])

    useEffect(() => {
        if (valid[0] && valid[1]) {
            setCompleted(true)
        }
        else {
            setCompleted(false)
        }
    }, [valid])

    const nameHandler = (value: string) => {
        setBody({ username: value })
    }
    const emailHandler = async (value: string) => {
        setBody({ email: value })
    }

    const continueHandler = async () => {
        setLoading(true)
        const res = await autoSaveFetch<boolean>('/auth/email', { method: 'PUT', body: { email: body.email } })
        if (!res.data) {
            next()
        }
        else {
            alert('your email is existing change your email')
        }
        setLoading(false)
    }

    return (
        <>
            <MinCountInput
                label={UserNameLabel}
                value={body.username}
                onChange={nameHandler}
                min={4}
                setIsValid={(v) => setValid((prev) => [v, prev[1]])}
            />
            <EmailInput 
            onChange={emailHandler} 
            value={body.email} 
            setIsValid={(v) => setValid((prev) => [prev[0], v])} 
            />

            <ContinueButton endIcon={<Forward/>} disabled={!completed} completed={completed} loading={loading} onClick={continueHandler}>Continue</ContinueButton>
        </>
    )
}

export default FirstPage