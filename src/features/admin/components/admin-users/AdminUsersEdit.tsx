import React from "react"
import { Box} from "@mui/material"
import { DataLoaderFromPromise } from "../../../loading"
import { safeFetch } from "../../../../services/safe-fetch"
import type { User } from "../../../../types/user"
import { useParams } from "react-router-dom"
import { useAdminAuthStore } from "../../../../store/useAdmin"
import AdminUsersEditForm from "./components/AdminUsersEditForm"

const AdminUsersEdit : React.FC = () => {
    const store = useAdminAuthStore()
  const requestInit: RequestInit = {}
  requestInit.method = 'GET'
  const token = store.token
  requestInit.headers = {
    'Authorization': `Bearer ${token}`
  }

  const params = useParams()

  const id = params.id as string;

  const res = safeFetch<User>(`/users/${id}`, requestInit)

  return (
    <Box sx={{display:'flex', justifyContent:'center'}}>
      <DataLoaderFromPromise res={res} page={AdminUsersEditForm} />
    </Box>
  )
}

export default AdminUsersEdit