import { useState, ChangeEventHandler } from "react"
import { register } from "../API/user"
import { useNavigate } from "react-router-dom"

const Register = () => {

    const navigate = useNavigate()

    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [message,setMessage] = useState('')

    const onChangeName: ChangeEventHandler<HTMLInputElement> = (event) => setName(event.target.value)
    const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (event) => setEmail(event.target.value)
    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (event) => setPassword(event.target.value)

    const onClick = async () => {
        const data = await register(name,email, password)

        if(data.success){
            navigate('/')
        }
        else if (data.message){
            setMessage(data.message)
        }
    }
    return (
        <div>
            <input type="text" placeholder="email" value={email} onChange={onChangeEmail}/>
            <input type="text" placeholder="name" value={name} onChange={onChangeName} />
            <input type="password" placeholder="password" value={password} onChange={onChangePassword} />
            <p>forgot password</p>
            <input onClick={onClick} type="button" value="Enter" />
            {
                message ? <p>{message}</p> : ''
            }
        </div>
    )
}

export default Register