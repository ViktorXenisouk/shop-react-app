import { useState, ChangeEventHandler } from "react"
import { loginAdmin } from "../API/admin"

const AdminLogin = () => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [message,setMessage] = useState('')

    const onChangeName: ChangeEventHandler<HTMLInputElement> = (event) => setName(event.target.value)
    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (event) => setPassword(event.target.value)

    const onClick = async () => {
        const data = await loginAdmin(name, password)

    }



    return (
        <div>
            <input type="text" placeholder="user" value={name} onChange={onChangeName} />
            <input type="password" placeholder="password" value={password} onChange={onChangePassword} />
            <input onClick={onClick} type="button" value="Enter" />
        </div>
    )
}

export default AdminLogin