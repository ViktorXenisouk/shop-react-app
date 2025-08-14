import React, { useState } from "react"
import type { Admin } from "../../../../types/admin"
import { DataLoaderFromPromise } from "../../../loading/Loading"
import { autoSaveFetch } from "../../../../services/safe-fetch"
import { useParams } from "react-router-dom"
import { useAdminAuthStore } from "../../../../store/useAdmin"
import { inputBodyHandler } from "../../../../utils/inputHandler"
import { Box, TextField, Button } from "@mui/material"
import { sanitizePayload } from "../../../../utils/sanitizePayload"

const Loader : React.FC<{data:Admin}> = ({ data }) => {
    const store = useAdminAuthStore()

    const [body, setBody] = useState<{ name: string, email: string, password: string, securityLvl: number }>({ name: data.name, email: data.email, password: '', securityLvl: data.securityLvl })

    const nameHandler = inputBodyHandler(setBody, (prev, v) => prev.name = v)
    const emailHandler = inputBodyHandler(setBody, (prev, v) => prev.name = v)
    const passwordHandler = inputBodyHandler(setBody, (prev, v) => prev.name = v)
    const securityLvlHandler = inputBodyHandler(setBody, (prev, v) => prev.securityLvl)

    const submitHandler = async () => {
        const res = await autoSaveFetch(`/admins/${data._id}`, { method: 'PATCH', token: store.token || '', body: sanitizePayload(body) })
        console.log(res)
    }

    return (
        <Box>
            <TextField onChange={nameHandler} placeholder={data.name} defaultValue={data.name} label='name' />
            <TextField onChange={emailHandler} placeholder={data.name} label='email' defaultValue={data.name} />
            <TextField onChange={passwordHandler} label='password' />
            <TextField onChange={securityLvlHandler} type="number" label='lvl' defaultValue={data.securityLvl} placeholder={data.securityLvl.toString()} />
            <Button onClick={submitHandler}>Submit</Button>
        </Box>
    )
}

const AdminAdminsEdit : React.FC = () => {

    const params = useParams()
    const id = params.id
    const store = useAdminAuthStore()

    const res = autoSaveFetch<Admin>(`/admins/${id}`, { method: 'GET', token: store.token || '' })

    return (
        <DataLoaderFromPromise res={res} page={Loader} />
    )
}

export default AdminAdminsEdit