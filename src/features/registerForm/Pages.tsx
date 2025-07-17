import { useEffect, useState } from "react";
import { type childrenProps } from "./types";
import { Stack, TextField, Button, Typography } from '@mui/material';
import { autoSaveFetch } from "../../services/safeFetch";
import { useNavigate } from "react-router-dom";
import { useAuthUserStore } from "../../store/useAuth";
import EmailInput from "../input/ControlledTextFields/EmailInput";
import PhoneInput from "../input/ControlledTextFields/PhoneInput";
import MinCountInput from '../input/ControlledTextFields/MinCountInput';


const FirstPage = (props: childrenProps) => {
    const [completed, setCompleted] = useState(false)
    const [loading, setLoading] = useState(false)

    const [valid,setValid] = useState([false,false])

    const body = props.body

    useEffect(() => {
        if (valid[0] && valid[1]) {
            setCompleted(true)
        }
        else{
            setCompleted(false)
        }
    }, [valid])

    const nameHandler = (value: string) => {
        props.setBody({ username: value })
    }
    const emailHandler = async (value:string) => {
        props.setBody({ email:value })
    }

    const continueHandler = async () => {
        setLoading(true)
        const res = await autoSaveFetch<boolean>('/users/email', { method: 'PUT', body: { email: body.email } })
        if (!res.data) {
            props.next()
        }
        else {
            alert('your email is existing change your email')
        }
        setLoading(false)
    }

    return (
        <>
            <MinCountInput label="username" value={body.username} onChange={nameHandler} min={4} setIsValid={(v) => setValid((prev) => [v,prev[1]])} />
            <EmailInput onChange={emailHandler} value={body.email} setIsValid={(v) => setValid((prev) => [prev[0],v])}/>
            {completed && <Button loading={loading} onClick={continueHandler}>Continue</Button>}
        </>
    )
}

const SecondPage = (props: childrenProps) => {
    const [completed, setCompleted] = useState(false)
    const [password, setPassword] = useState('')

    const body = props.body

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
        props.setBody({ password: event.target.value })
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
            <TextField {...p} value={body.username} label='username' />
            <TextField {...p} value={body.email} label='email' />
            <TextField {...isPasswordStrong(body.password) ? success : normal} onChange={passwordHandler} value={body.password} label='password' />
            <TextField {...arePasswordTheSame() ? success : error} onChange={passwordReapeatHandler} value={password} label='password again' />
            {completed && <Button onClick={() => props.next()}>Continue</Button>}
        </>
    )
}

const ThirdPage = (props: childrenProps) => {
    const [completed, setCompleted] = useState(false)

    useEffect(() => {
        if (props.body.tel === '') {
            setCompleted(true)
        }
        else if (completed) {
            setCompleted(true)
        }
        else {
            setCompleted(false)
        }
    }, [props.body.tel && completed])

    const telHandler = (value: string) => {
        props.setBody({ tel: value })
    }

    const body = props.body

    return (
        <>
            <PhoneInput onChange={telHandler} value={body.tel} setIsValid={()=>setCompleted(true)}/>
            {completed && <Button onClick={() => props.next()}>Continuee</Button>}
        </>
    )
}

const FourthPage = (props: childrenProps) => {
    const [loadnig, setLoading] = useState(false)

    const store = useAuthUserStore()

    const navigate = useNavigate()

    const registerNewAccount = async () => {
        console.log(props.body)
        setLoading(true)
        const res = await autoSaveFetch('/auth/register', { method: 'POST', body: props.body })

        console.log(res)
        setLoading(false)
        if (res.success) {
            store.login(props.body.email,props.body.password)
            navigate('/me/me')
        }
        else {
            alert(res.message)
            //navigate('/me/me')
        }
    }

    const body = props.body

    const p = { disabled: true, }

    return (
        <>
            <Typography>Check your Account</Typography>
            <TextField {...p} value={body.username} label='username' />
            <TextField {...p} value={body.email} label='email' />
            <TextField {...p} value={body.tel === '' ? 'your tel is no' : body.tel} label='tel' />
            <Button loading={loadnig} onClick={registerNewAccount}>Create Account</Button>
        </>
    )
}


export { FirstPage, SecondPage, ThirdPage, FourthPage }