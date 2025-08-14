import React from "react"
import { Box, Grid } from "@mui/material"
import { DataLoaderFromPromise } from "../../../loading/Loading"
import { safeFetch } from "../../../../services/safe-fetch"
import { useAdminAuthStore } from "../../../../store/useAdmin"
import type { User } from "../../../../types/user"
import { parseParams } from "../../../../utils/parseParams"
import { useLocation } from 'react-router-dom';
import AdminUserCard from "./components/AdminUserCard"


const Loader : React.FC<{data:User[]}> = ({ data }) => {
    console.log(data)

    return (
        <Grid container spacing={1}>
            {data.map((item) =>
                <Grid size={4}>
                    <AdminUserCard {...item} />
                </Grid>
            )}
        </Grid>
    )
}

const AdminUsers : React.FC = () => {
    const store = useAdminAuthStore()

    const location = useLocation()
    const requestInit: RequestInit = {}
    requestInit.method = 'GET'
    const token = store.token
    requestInit.headers = {
        'Authorization': `Bearer ${token}`
    }

    const url = `/users/find/${parseParams(location.search, ['search', 'isBlocked'])}`

    console.log(url)

    const res = safeFetch<User[]>(url, requestInit)

    return (
        <Box>
            <DataLoaderFromPromise res={res} page={Loader} />
        </Box>
    )
}

export default AdminUsers