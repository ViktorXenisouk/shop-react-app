import React, { useEffect, useState } from "react";
import { type childrenProps } from "./../../types";
import { EmailLabel, UserNameLabel, PasswordLabel, PasswordAgainLabel } from "../../../../../components/labels";
import ContinueButton from "../../UI/ContinueButton";
import { TextField } from '@mui/material';
import { Forward } from "@mui/icons-material";

const SecondPage: React.FC<childrenProps> = ({ index, body, setBody, next }) => {
    const [completed, setCompleted] = useState(false)
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (body.password !== '' && isPasswordStrong(body.password) && body.password === password) {
            setCompleted(true)
        }
        else {
            setCompleted(false)
        }
    }, [body.password, password])

    const isPasswordStrong = (value: string) => {
        if (value === '') {
            return false
        }
        return true
    }

    const arePasswordTheSame = () => {
        if (body.password !== '' && body.password === password) {
            return true
        }
        return false
    }

    const passwordHandler = (event: any) => {
        setBody({ password: event.target.value })
    }

    const passwordReapeatHandler = (event: any) => {
        setPassword(event.target.value)
    }

    const p = { disabled: true, }
    const success = { focused: true, color: 'success' as 'success' }
    const error = { color: 'error' as 'error' }
    const normal = { color: 'info' as 'info' }

    return (
        <>
            <TextField
                {...p}
                label={UserNameLabel}
                value={body.username}
            />
            <TextField {...p}
                label={EmailLabel}
                value={body.email} />
            <TextField
                {...isPasswordStrong(body.password) ? success : normal}
                onChange={passwordHandler}
                value={body.password}
                label={PasswordLabel}
            />
            <TextField
                {...arePasswordTheSame() ? success : error}
                onChange={passwordReapeatHandler} value={password}
                label={PasswordAgainLabel}
            />
            <ContinueButton endIcon={<Forward />} disabled={!completed} completed={completed} onClick={next}>create password</ContinueButton>
        </>
    )
}

export default SecondPage