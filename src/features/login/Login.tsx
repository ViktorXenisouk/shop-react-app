import { useState, ChangeEventHandler } from "react"
import { useNavigate } from "react-router-dom"
import MessageShower from "../../components/MessageShower"
import { useAuthUserStore } from "../../store/useAuth"

import ButtonLink from "../../UI/ButtonLink"
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material"
import Stack from "@mui/material/Stack"

import { inputBodyHandler } from "../../utils/inputHandler"

const Login = () => {

    const { login } = useAuthUserStore();

    const navigate = useNavigate()

    const [body,setBody] = useState<{email:string,password:string}>({email:'abcd@gmail.com',password:'admin'})

    const [message, setMessage] = useState('')

    const emailHandler = inputBodyHandler(setBody,(prev,v) => prev.email = v)
    const passwordHandler = inputBodyHandler(setBody,(prev,v) => prev.password = v)

    const onClick = async (event: any) => {
        event.preventDefault()

        const data = await login(body.email, body.password)

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
                    onChange={emailHandler}
                    defaultValue={'abcd@gmail.com'}
                />
                <TextField
                    label="Password"
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