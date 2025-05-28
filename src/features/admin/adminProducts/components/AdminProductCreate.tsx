import { useState } from "react"
import { createProduct } from "./api";
import MessageShower from "../../../../components/MessageShower";

const AdminProductsCreate = () => {

    const [name, setName] = useState('')
    const [discription, setDiscription] = useState('')
    const [category, setCategory] = useState('')

    const [message,setMessage] = useState('')

    const changeName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)
    const changeDiscription = (event: React.ChangeEvent<HTMLInputElement>) => setDiscription(event.target.value)
    const changeCategory = (event: React.ChangeEvent<HTMLInputElement>) => setCategory(event.target.value)

    const onSubmit: React.MouseEventHandler<HTMLInputElement> = async (event) => {
        event.preventDefault()
        const res = await createProduct(name, discription, category)
        if(res.message){
            console.log('message:')
            setMessage(res.message)
        }
    }

    return (
        <div>
            <form>
                <input type="text" placeholder="name" onChange={changeName} />
                <input type="text" placeholder="discription" onChange={changeDiscription} />
                <input type="text" placeholder="category/computers" onChange={changeCategory} />

                <input type="submit" value='submit' onClick={onSubmit} />
            </form>
            <MessageShower message={message}/>
        </div>
    )
}

export default AdminProductsCreate