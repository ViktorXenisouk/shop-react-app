import React, { useState } from "react"
import { inputBodyHandler } from "../../../../utils/inputHandler"
import { Box, TextField, Button } from "@mui/material"
import { autoSaveFetch } from "../../../../services/safe-fetch"
import { useAdminAuthStore } from "../../../../store/useAdmin"

const AdminAdminsCreate : React.FC = () => {

    const [body, setBody] = useState<{ name: string, email: string, securityLvl: number, password: string }>({ name: '', email: '', securityLvl: 0, password: '' })
    const store = useAdminAuthStore()

    const nameHandler = inputBodyHandler(setBody, (prev, v) => prev.name = v)
    const emailHandler = inputBodyHandler(setBody, (prev, v) => prev.email = v)
    const passwordHandler = inputBodyHandler(setBody, (prev, v) => prev.password = v)
    const securityLvl = inputBodyHandler(setBody, (prev, v) => prev.securityLvl = parseInt(v))

    const submitHandler = async () => {
        const res = await autoSaveFetch('/admins/', { method: 'POST', body: body, token: store.token ?? '' })
        console.log(store.token)
        console.log(res)
    }

    return (
        <>
            <Box>
                <TextField onChange={nameHandler} label='name' />
                <TextField onChange={emailHandler} label='email' />
                <TextField onChange={passwordHandler} label='password' />
                <TextField type="number" onChange={securityLvl} label='security lvl' />
                <Button onClick={submitHandler}>Submit</Button>
            </Box>
        </>
    )
}

export default AdminAdminsCreate