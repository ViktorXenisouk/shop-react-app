import { useState, ChangeEventHandler } from "react"
import { useNavigate, Link } from 'react-router-dom';
import { useAuthUserStore } from "../../../store/useAuth"

import ButtonLink from "../../../UI/ButtonLink"
import TextField from '@mui/material/TextField';
import { Button, Stack, Paper, Box } from "@mui/material"

import { inputBodyHandler } from "../../../utils/inputHandler"
import HeaderText from "../../../UI/HeaderText";

import { Email, Password, Login as LoginIcon } from "@mui/icons-material";

const Login = () => {

    const { login } = useAuthUserStore();

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [body, setBody] = useState<{ email: string, password: string }>({ email: 'abcd@gmail.com', password: 'admin' })

    const emailHandler = inputBodyHandler(setBody, (prev, v) => prev.email = v)
    const passwordHandler = inputBodyHandler(setBody, (prev, v) => prev.password = v)

    const onClick = async (event: any) => {
        event.preventDefault()
        setLoading(true)

        const data = await login(body.email, body.password)

        if (data.success) {
            navigate('/me/me')
        }
        else if (data.message) {
            alert(data.message)
        }

        setLoading(false)
    }
    return (
        <Paper sx={{ width: '500px', p: '50px' }}>
            <HeaderText>Login Form</HeaderText>
            <Stack
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                direction="column"
                alignItems="center"
                justifyContent="flex-start"

            >
                <TextField
                    label={<Box sx={{ display: 'flex', alignItems: 'center' }}><Email sx={{ mx: '10px' }} /> email</Box>}
                    type="email"
                    onChange={emailHandler}
                    defaultValue={'abcd@gmail.com'}
                />
                <TextField
                    label={<Box sx={{ display: 'flex', alignItems: 'center' }}><Password sx={{ mx: '10px' }} /> password</Box>}
                    type="password"
                    autoComplete="current-password"
                    defaultValue={'admin'}
                    onChange={passwordHandler}
                />
                <Button
                    variant="text"
                    type="button"
                >
                    forgot password
                </Button>
                <Button
                component={Link}
                to='/register'
                    variant='text'
                    onClick={onClick}
                    loading={loading}
                >
                    create new acount
                </Button>
                 <Button
                    startIcon={<LoginIcon />}
                    variant="contained"
                    type="submit"
                    onClick={onClick}
                    loading={loading}
                >
                    Login
                </Button>
            </Stack>
        </Paper>
    )
}

export default Login