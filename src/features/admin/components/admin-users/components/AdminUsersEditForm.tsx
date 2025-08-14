import React, { useState } from "react"
import { TextField, Typography, Button, Paper,Stack } from "@mui/material"
import { safeFetch } from "../../../../../services/safe-fetch"
import {type User } from "../../../../../types/user"
import { useAdminAuthStore } from "../../../../../store/useAdmin"
import { sanitizePayload } from "../../../../../utils/sanitizePayload"
import {Edit} from "@mui/icons-material"

type Handle = React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>

type Props = {
  data:User
}

const AdminUsersEditForm : React.FC<Props> = ({ data }) => {
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
<Paper sx={{width:'400px',p:'30px',mt:'30px'}}>
 <Stack spacing={3}>
      <Typography>Id:{data._id}</Typography>
      <TextField onChange={handleName} defaultValue={data.username} label='username'/>
      <TextField onChange={handleEmail} defaultValue={data.email} label='email'/>
      <TextField onChange={handlePassword} label='new password'/>
      <Button endIcon={<Edit/>} onClick={save}>save</Button>
    </Stack>
</Paper>
  )
}

export default AdminUsersEditForm