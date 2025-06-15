import { useState } from "react"
import { createProduct } from "../api";
import { Box, TextField, Button } from "@mui/material"
import MessageShower from "../../../../components/MessageShower";
import TagsInput from "./TagsInput";
import CategorieInput from "./CategorieInput"

const AdminProductsCreate = () => {

    const [body, setBody] = useState<{ name: string, discription: string, tags: string[], category: string }>({ name: '', discription: '', tags: [], category: '' })

    const [message, setMessage] = useState('')

    const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => setBody((prev) => {
        prev.name = event.target.value
        return prev
    })
    const discriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => setBody((prev) => {
        prev.discription = event.target.value
        return prev
    })
    const categoryHandler = (event: React.ChangeEvent<HTMLInputElement>) => setBody((prev) => {
        prev.category = event.target.value
        return prev
    })
    const tagsHandler = (value:string[]) => setBody((prev) => {
        prev.tags = value
        return prev
    })

    const submitHandler: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault()
        console.log(body)
        const res = await createProduct(body)
        if (res.message) {
            console.log('message:')
            setMessage(res.message)
        }
    }

    return (
            <Box>
                <TextField onChange={nameHandler} label='name' />
                <TextField onChange={discriptionHandler} multiline defaultValue='some discription' label='discription' />
                <TagsInput/>
                <CategorieInput />
                <Button onClick={submitHandler}>
                    Submit
                </Button>
                <MessageShower message={message} />
            </Box>
    )
}

export default AdminProductsCreate