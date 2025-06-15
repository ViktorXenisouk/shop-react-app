import type { Admin } from "../../../types/admin"
import { DataLoaderFromPromise } from "../../loading/Loading"
import { autoSaveFetch } from "../../../services/safeFetch"
import { useParams } from "react-router-dom"
import { useAdminAuthStore } from "../../../store/useAdmin"
import { useState } from "react"
import { inputBodyHandler } from "../../../utils/inputHandler"
import { Box, TextField, Button } from "@mui/material"
import { sanitizePayload } from "../../../utils/sanitizePayload"

const Loader = ({ data }: { data: Admin }) => {
    const store = useAdminAuthStore()

    const [body, setBody] = useState<{ name: string, email: string, password: string }>({ name: '', email: '', password: '' })

    const nameHandler = inputBodyHandler(setBody, (prev, v) => prev.name = v)
    const emailHandler = inputBodyHandler(setBody, (prev, v) => prev.name = v)
    const passwordHandler = inputBodyHandler(setBody, (prev, v) => prev.name = v)

    const submitHandler = async () => {
        const res = await autoSaveFetch(`/admins/${data._id}`, { method: 'PATCH', token: store.token || '', body: sanitizePayload(body) })
        console.log(res)
    }

    return (
        <Box>
            <TextField onChange={nameHandler} defaultValue={data.name} label='name' />
            <TextField onChange={emailHandler} defaultValue={data.name} label='email' />
            <TextField onChange={passwordHandler} label='password' />
            <Button onClick={submitHandler}>Submit</Button>
        </Box>
    )
}

const AdminAdminsEdit = () => {

    const params = useParams()
    const id = params.id
    const store = useAdminAuthStore()

    const res = autoSaveFetch<Admin>(`/admins/${id}`, { method: 'GET', token: store.token || '' })

    return (
        <DataLoaderFromPromise res={res} page={Loader} />
    )
}

export default AdminAdminsEdit