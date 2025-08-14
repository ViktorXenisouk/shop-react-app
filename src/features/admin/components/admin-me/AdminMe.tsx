import React from 'react';
import { useNavigate, Link as LinkRouter } from 'react-router-dom';
import { useAdminAuthStore } from "../../../../store/useAdmin"
import { Paper, Stack, Button, Typography, ButtonGroup } from "@mui/material"
import { useEffect } from "react"
import { fetchAdmin } from './utils/fetchAdmin';

const AdminMe : React.FC = () => {
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
        if (result) {
            store.setAdmin(result)
        }
        else {
            alert('you are not admin')
            navigate('/')
        }
    }

    const logout = () => {
        store.logout()
        navigate('/')
    }

    return (
        <Paper sx={{ m: '40px', p: '40px' }}>
            <Stack spacing={3}>
                <Typography sx={{overflowWrap:'break-word'}} >token:{store.token}</Typography>
                <Typography>name: {store.admin?.name}</Typography>
                <Typography>email: {store.admin?.email}</Typography>
                <Typography>lvl: {store.admin?.securityLvl}</Typography>
                <ButtonGroup sx={{width:'100%',display:'grid', gridTemplateColumns:'1fr 1fr 1fr'}}>
                    <Button onClick={loadAdmin}>Fetch</Button>
                    <Button component={LinkRouter} to='/admin/edit'>Edit Me</Button>
                    <Button onClick={logout}>Logout</Button>
                </ButtonGroup>
            </Stack>
        </Paper>
    )

}

export default AdminMe