import { useNavigate, Link as LinkRouter } from 'react-router-dom';
import { autoSaveFetch } from "../../../services/safeFetch"
import { useAdminAuthStore } from "../../../store/useAdmin"
import { Admin } from "../../../types/admin"
import { Box, Button, Typography } from "@mui/material"
import { useEffect } from "react"
import { fetchAdmin } from '../../../utils/fetchAdmin';

const Render = ({ data }: { data: Admin }) => {

    return (
        <Box>
            <Typography>{data.name}</Typography>

        </Box>
    )
}

const AdminMe = () => {
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
        <Box>
            <Typography>{store.token}</Typography>
            <Typography>name:{store.admin?.name}</Typography>
            <Typography>email:{store.admin?.email}</Typography>
            <Typography>lvl:{store.admin?.securityLvl}</Typography>
            <Button onClick={loadAdmin}>Fetch</Button>
            <Button component={LinkRouter} to='/admin/edit'>Edit Me</Button>
            <Button onClick={logout}>Logout</Button>
        </Box>
    )

}

export default AdminMe