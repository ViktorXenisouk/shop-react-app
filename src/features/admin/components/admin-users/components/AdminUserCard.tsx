import React, { useState } from "react"
import { type User } from "../../../../../types/user"
import { Paper, Typography, ButtonGroup, Button, Box } from "@mui/material"
import { autoSaveFetch } from "../../../../../services/safe-fetch"
import { useAdminAuthStore } from "../../../../../store/useAdmin"
import { Link } from "react-router-dom"
import {LockOutline,LockOpen,Edit,DeleteOutline} from "@mui/icons-material"

const AdminUserCard : React.FC<User> = (props) => {
  const store = useAdminAuthStore()

  const [isBlocked, setIsBlocked] = useState(props.isBlocked ? true : false)

  const blockHandler = async () => {

    const body = { id: props._id, blocked: !isBlocked }

    console.log(body)

    const result = await autoSaveFetch('/users/block', { token: store.token ?? '', method: 'PATCH', body: body })

    alert(result.message)

    if (result.success) {
      setIsBlocked((prev) => !prev)
    }
    console.log(result)
  }


  return (
    <Paper sx={{width:'100%'}}>
        <Box sx={{px:'20px'}}>
          <Typography>{props.username}</Typography>
          <Typography>{props.email}</Typography>
        </Box>
        <ButtonGroup sx={{py:'10px',width:'300px',mx:'auto',display:'grid',gridTemplateColumns:'1fr 1fr 1fr'}}>
          <Button endIcon={isBlocked ? <LockOutline color={'error'}/> : <LockOpen/>} onClick={blockHandler}>
            {isBlocked ? 'Blocked' : 'unblocked'}
          </Button>
          <Button endIcon={<DeleteOutline/>}>
            Delete
          </Button>
          <Button endIcon={<Edit/>} component={Link} to={`/admin/users/edit/${props._id}`}>
            Edit
          </Button>
        </ButtonGroup>
    </Paper>
  )
}

export default AdminUserCard