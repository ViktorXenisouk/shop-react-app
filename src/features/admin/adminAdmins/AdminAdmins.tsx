import type { Admin } from "../../../types/admin"
import { autoSaveFetch, safeFetch } from "../../../services/safeFetch"
import { parseParams } from "../../../utils/parseParams"
import { useLocation } from "react-router-dom"
import { DataLoaderFromPromise } from "../../loading/Loading"
import AdminAdminsCard from "./AdminAdminsCard"
import { useAdminAuthStore } from "../../../store/useAdmin"
import { Box,Button } from "@mui/material"

const Loader = ({ data }: { data: Admin[] }) => {

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