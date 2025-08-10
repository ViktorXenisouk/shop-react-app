import React,{ useState } from "react";
import { type childrenProps } from "./../../types";
import { TextField, Typography } from '@mui/material';
import { autoSaveFetch } from "../../../../../services/safe-fetch";
import { useNavigate } from "react-router-dom";
import { useAuthUserStore } from "../../../../../store/useAuth";
import { EmailLabel,PhoneLabel,UserNameLabel } from "../../../../../components/labels";
import CheckboxWithLabel from "../../../../../UI/CheckboxWithLabel";
import ContinueButton from "../../UI/ContinueButton";
import { Create } from "@mui/icons-material";

const FourthPage : React.FC<childrenProps> = ({index,body,setBody,next}) => {
    const [loadnig, setLoading] = useState(false)

    const [agree,setAgree] = useState(false)

    const store = useAuthUserStore()

    const navigate = useNavigate()

    const registerNewAccount = async () => {
        setLoading(true)
        const res = await autoSaveFetch('/auth/register', { method: 'POST', body: body })

        console.log(res)
        setLoading(false)
        if (res.success) {
            store.login(body.email, body.password)
            navigate('/me/me')
        }
        else {
            alert(res.message)
            //navigate('/me/me')
        }
    }

    const p = { disabled: true, }

    return (
        <>
            <Typography variant="h3" align="center">Check your Account</Typography>

            <TextField
                {...p} value={body.username}
                label={UserNameLabel}
            />
            <TextField
                {...p} value={body.email}
                label={EmailLabel}
            />
            <TextField
                {...p} 
                value={body.tel === '' ? 'you do not input your tel' : body.tel}
                label={PhoneLabel}
            />

            <CheckboxWithLabel onClick={() => setAgree((prev) => !prev)} label="i agree that it is my data" isSelected={agree}/>

            <ContinueButton loading={loadnig} endIcon={<Create/>} disabled={!agree} completed={agree} onClick={registerNewAccount}>Create Account</ContinueButton>
        </>
    )
}

export default FourthPage