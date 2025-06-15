import { useState, ChangeEventHandler } from "react"
import { useAdminAuthStore } from "../store/useAdmin"
import { useNavigate } from "react-router-dom"

import { Stack, Typography, Button, FormGroup, Input, Box } from "@mui/material"

const AdminLogin = () => {

    const store = useAdminAuthStore()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState<{message:string,status:'error'|'success'} | null>(null)

    const onChangeName: ChangeEventHandler<HTMLInputElement> = (event) => setName(event.target.value)
    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (event) => setPassword(event.target.value)

    const onClick = async () => {
        const data = await store.login(name, password)
        if(data.admin){
            store.setAdmin(data.admin)
        }
        setMessage({message:data.message || 'error',status:data.success?'success':'error'})
        navigate('/admin/me')
        console.log(data)
    }

    return (
        <Box sx={{display:'flex',justifyContent:'center'}}>
            <FormGroup>
                <Input autoFocus type="text" placeholder="user" value={name} onChange={onChangeName} />
                <Input type="password" placeholder="password" value={password} onChange={onChangePassword} />
                <Button onClick={onClick} variant="contained">Submit</Button>
            </FormGroup>
            <Typography color={message?.status}>{message?.message}</Typography>
        </Box>
    )
}

export default AdminLogin