import { Link } from "react-router-dom"
import { useAuthUserStore } from "../../store/useAuth"
import { useLocalStorage } from "../../store/useLocalStorage"
import { Box, Typography, Button } from "@mui/material"

const Me = () => {
    const store = useAuthUserStore()
    const localStorage = useLocalStorage()

    const user = store.user

    return (
        <Box>
            {
                store.token ?
                    <>
                        <Typography>{user.username}</Typography>
                        <Typography>{user.email}</Typography>
                        <Button onClick={() => store.logout()}>Log out</Button>
                    </>
                    :
                    <>
                        <Typography>You are not login you are the guest</Typography>
                        <Button component={Link} to='/login'>Log in</Button>
                        <Button component={Link} to='/register'>create acount</Button>
                    </>
            }
            <Button onClick={() => localStorage.setShowAlert(!localStorage.showAlert)}>{localStorage.showAlert ? 'show alert' : 'dont show alert'}</Button>
        </Box>
    )
}

export default Me