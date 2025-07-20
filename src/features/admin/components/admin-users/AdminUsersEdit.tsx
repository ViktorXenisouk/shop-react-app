import { Box, TextField, Typography, Button, ButtonGroup } from "@mui/material"
import { DataLoaderFromPromise } from "../../../loading/Loading"
import { safeFetch } from "../../../../services/safe-fetch"
import type { User } from "../../../../types/user"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { useAdminAuthStore } from "../../../../store/useAdmin"
import { sanitizePayload } from "../../../../utils/sanitizePayload"

type Handle = React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>

const Render = ({ data }: { data: User }) => {
const store = useAdminAuthStore()
  const [body,setBody] = useState<{username:string,email:string,password:string|undefined}>({username:data.username,email:data.email,password:undefined})

  const handleName : Handle = (event) => {
    setBody((prev) => {
      prev.username = event.target.value
      return prev
    })
  }

  const handleEmail : Handle = (event) => {
    setBody((prev) => {
      prev.username = event.target.value
      return prev
    })
  }

  const handlePassword : Handle = (event) => {
    setBody((prev) => {
      const value = event.target.value;
      prev.password = value == '' ? undefined : value
      return prev
    })
  }

  const save = async () => {
    const requestInit: RequestInit = {}
    requestInit.method = 'PATCH'
    const token = store.token
    requestInit.headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    requestInit.body = JSON.stringify(sanitizePayload(body))


    const res = await safeFetch(`/users/edit/${data._id}`,requestInit)

    console.log(res)
  }

  return (
    <Box>
      <Typography>Id:{data._id}</Typography>
      <TextField onChange={handleName} defaultValue={data.username} label='username'/>
      <TextField onChange={handleEmail} defaultValue={data.email} label='email'/>
      <TextField onChange={handlePassword} label='new password'/>
      <Button onClick={save}>save</Button>
    </Box>
  )
}

const AdminUsersEdit = () => {
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
    <Box>
      <DataLoaderFromPromise res={res} page={Render} />
    </Box>
  )
}

export default AdminUsersEdit