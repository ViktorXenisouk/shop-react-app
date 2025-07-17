import type { User } from "../../../types/user"
import { Link as LinkRouter} from "react-router-dom"
import { Card,CardContent,Typography,ButtonGroup,Button } from "@mui/material"
import { autoSaveFetch } from "../../../services/safeFetch"
import { useAdminAuthStore } from "../../../store/useAdmin"
import { useState } from "react"
import { Link } from "react-router-dom"

const AdminUserCard = (props:User) => {
    const store = useAdminAuthStore()

    const [isBlocked,setIsBlocked] = useState(props.isBlocked ? true : false)

    const blockHandler = async () => {

      const body = {id:props._id,blocked:!isBlocked}

      console.log(body)
  
        const result = await autoSaveFetch('/users/block',{token:store.token??'',method:'PATCH',body:body})

        alert(result.message)

        if(result.success){
            setIsBlocked((prev) => !prev)
        }
        console.log(result)
    }


    return (
        <Card>
            <CardContent>
        <Typography>{props.username}</Typography>
        <Typography>{props.email}</Typography>
      </CardContent>
      <ButtonGroup>
        <Button onClick={blockHandler}>
          {isBlocked ? 'Unblock' : 'Block'}
        </Button>
        <Button>Delete</Button>
        <Button component={Link} to={`/admin/users/edit/${props._id}`}>Edit</Button>
      </ButtonGroup>
        </Card>
    )
}

export default AdminUserCard