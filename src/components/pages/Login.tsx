import { useState, ChangeEventHandler } from "react"
import { login } from "../API/user"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message,setMessage] = useState('')

    const onChangeName: ChangeEventHandler<HTMLInputElement> = (event) => setEmail(event.target.value)
    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (event) => setPassword(event.target.value)

    const onClick = async (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        event.preventDefault()
        
        const data = await login(email, password)

        if(data.success){
            navigate('/')
        }
        else if (data.message){
            setMessage(data.message)
        }
    }
    return (
        <div>
            <input type="text" placeholder="email" value={email} onChange={onChangeName} />
            <input type="password" placeholder="password" value={password} onChange={onChangePassword} />
            <p>forgot password</p>
            <input onClick={onClick} type="submit" value="Enter" />
            {
                message ? <p>{message}</p> : ''
            }
        </div>
    )
}

export default Login