import { Box, TextField, Typography, Button, ButtonGroup } from "@mui/material"
import { DataLoaderFromPromise } from "../../../loading/Loading"
import { safeFetch } from "../../../../services/safeFetch"
import Cookie from "../../../../utils/cookie"
import { useParams } from "react-router-dom"
import { Product } from "../../../../types/ItemData"
import TagsInput from "./TagsInput"
import { useState } from "react"

type Handle = React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>

const Render = ({ data }: { data: Product }) => {

  const [body,setBody] = useState({} as {name?:string,tags?:string[],discription?:string})

  const handleName : Handle = (event) => {
    setBody((prev) => {
      prev.name = event.target.value
      return prev
    })
  }

  const handleTags = (tags?:string[]) => {
    setBody((prev) => {
      prev.tags = tags
      return prev
    })
  }

  const handleDiscription : Handle = (event) => {
    setBody((prev) => {
      prev.discription = event.target.value
      return prev
    })
  }

  const save = async () => {
    const requestInit: RequestInit = {}
    requestInit.method = 'PATCH'
    const token = Cookie.get('admin_token')
    requestInit.headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    requestInit.body = JSON.stringify(body)


    const res = await safeFetch(`/products/${data._id}`,requestInit)

    console.log(res)
  }

  return (
    <Box>
      <Typography>Id:{data._id}</Typography>
      <TextField onChange={handleName} defaultValue={data.name} label='name'/>
      <TextField onChange={handleDiscription} multiline defaultValue={data.discription} label='discription'/>
      <TagsInput onChange={handleTags} defaultValue={data.tags ?? []}/>
      <Button onClick={save}>save</Button>
    </Box>
  )
}

const AdminProductsEdit = () => {
  const requestInit: RequestInit = {}
  requestInit.method = 'GET'
  const token = Cookie.get('admin_token')
  requestInit.headers = {
    'Authorization': `Bearer ${token}`
  }

  const params = useParams()

  const id = params.id as string;

  const res = safeFetch<Product>(`/products/${id}`, requestInit)

  return (
    <Box>
      <DataLoaderFromPromise res={res} page={Render} />
    </Box>
  )

}

export default AdminProductsEdit