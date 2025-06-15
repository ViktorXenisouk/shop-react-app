import { useNavigate, Link as LinkRouter } from 'react-router-dom';
import { useAdminAuthStore } from "../../../store/useAdmin"
import { autoSaveFetch } from '../../../services/safeFetch';
import { Box, Button, Typography, TextField } from '@mui/material';
import { useEffect, useState } from "react"
import { fetchAdmin } from '../../../utils/fetchAdmin';
import { inputBodyHandler } from '../../../utils/inputHandler';
import { sanitizePayload } from '../../../utils/sanitizePayload';
import { Admin } from '../../../types/admin';

const AdminEditMe = ( ) => {
    const [body,setBody] = useState<{name:string,email:string,password:string}>({name:'',email:'',password:''})
    const navigate = useNavigate()
    const store = useAdminAuthStore()

    useEffect(() => {
        if (!store.admin) {
            loadAdmin()
        }
    }, [store.admin])

    const loadAdmin = async () => {
        const result = await fetchAdmin(store.token || '')

        console.log(result)
        if(result){
            store.setAdmin(result)
        }
        else{
            alert('you are not admin')
            navigate('/')
        }
    }

    const nameHandler = inputBodyHandler(setBody,(prev,v) => prev.name = v)
    const emailHandler = inputBodyHandler(setBody,(prev,v) => prev.email = v)

    const saveHandler = async () => {
        console.log(body)
        const res = await autoSaveFetch<Admin>('/admins/',{method:"PATCH",token:store.token||'',body:sanitizePayload(body)})

        if(res.data){
            store.setAdmin(res.data)
        }

        navigate('/admin/me')
    }

    const admin = store.admin

    return (
        <Box>
            <TextField onChange={nameHandler} defaultValue={admin?.name} label='name'/>
            <TextField onChange={emailHandler} defaultValue={admin?.email} label='email'/>
            <Button onClick={saveHandler}>Save</Button>
        </Box>
    )
}

export default AdminEditMe