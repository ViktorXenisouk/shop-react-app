import { Link } from "react-router-dom"
import { autoSaveFetch } from "../../../../../services/safe-fetch"
import { useAdminAuthStore } from "../../../../../store/useAdmin"
import type { Admin } from "../../../../../types/admin"
import { Box, Typography, ButtonGroup, Button } from "@mui/material"

const AdminAdminsCard = (props: Admin) => {

    const store = useAdminAuthStore()

    const deleteHandler = () => {
        const res = autoSaveFetch(`/admins/${props._id}`,{method:'DELETE',token:store.token||''})
    }

    return (
        <Box>
            <Typography>{props.name}</Typography>
            <Typography>{props.email}</Typography>
            <Typography>{props.securityLvl}</Typography>
            <ButtonGroup>
                <Button component={Link} to={`/admin/admins/edit/${props._id}`}>Edit</Button>
                <Button onClick={deleteHandler}>Delete</Button>
            </ButtonGroup>
        </Box>
    )
}

export default AdminAdminsCard