import React from "react"
import type { Admin } from "../../../../types/admin"
import { autoSaveFetch } from "../../../../services/safe-fetch"
import { parseParams } from "../../../../utils/parseParams"
import { useLocation } from "react-router-dom"
import { DataLoaderFromPromise } from "../../../loading/Loading"
import AdminAdminsCard from "./components/AdminAdminsCard"
import { useAdminAuthStore } from "../../../../store/useAdmin"
import { Box,Button } from "@mui/material"


const Loader : React.FC<{data:Admin[]}> = ({ data }) => {

    return (
        <Box>
            {data.map((item) => <AdminAdminsCard {...item} />)}
        </Box>
    )
}

const AdminAdmins = () => {
    const store = useAdminAuthStore()

    const location = useLocation()

    const url = `/admins/find/${parseParams(location.search, ['search'])}`

    const res = autoSaveFetch<Admin[]>(url, {method:'GET',token:store.token||''},)

    return (
        <Box>
            <DataLoaderFromPromise res={res} page={Loader} />

            <Button>ADD</Button>
        </Box>
    )
}

export default AdminAdmins