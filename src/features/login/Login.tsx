import { useState, ChangeEventHandler } from "react"
import { useNavigate } from "react-router-dom"
import MessageShower from "../../components/MessageShower"
import { useAuthUserStore } from "../../store/useAuth"
import ButtonLink from "../../UI/ButtonLink"
import Grid from "@mui/material/Grid"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material"
import Stack from "@mui/material/Stack"

const Login = () => {

    const { login } = useAuthUserStore();

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const onChangeName: ChangeEventHandler<HTMLInputElement> = (event) => setEmail(event.target.value)
    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (event) => setPassword(event.target.value)

    const onClick = async (event: any) => {
        event.preventDefault()

        const data = await login(email, password)

        console.log(data)

        if (data.token) {
            navigate('/')
        }
        else if (data.message) {
            setMessage(data.message)
        }
    }
    return (
        <>
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
                    required
                    label="email"
                    type="email"
                    value={email}
                    onChange={onChangeName}
                />
                <TextField
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={onChangePassword}
                />
                <Button
                    variant="text"
                    type="button"
                >
                    forgot password
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    onClick={onClick}
                >
                    Submit
                </Button>
                <ButtonLink to='/register'>create new acount</ButtonLink>
                <MessageShower message={message} />
            </Stack>
        </>
    )
}

export default Login