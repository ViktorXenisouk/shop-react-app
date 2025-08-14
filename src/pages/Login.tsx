import LoginForm from "../features/auth/login/LoginForm"
import { Box } from "@mui/material"

const Login = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                mt: '40px'
            }}
        >
            <LoginForm />
        </Box>
    )
}

export default Login