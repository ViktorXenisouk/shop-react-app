import { Product } from "../../../types/ItemData"
import { DataLoaderFromPromise } from "../../loading/Loading"
import AdminProductsCard from "./components/AdminProductCard"
import { useLocation } from "react-router-dom"
import { safeFetch } from "../../../services/safeFetch"
import { Box, Stack, TextField,Button } from "@mui/material"
import Cookie from "../../../utils/cookie"
import { useState, useEffect } from "react"
import AdminProductsSearch from './components/AdminProductsSearch';
import { Link } from "react-router-dom"

const MyAdminProducts = ({ data }: { data: Product[] }) => {
  const imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmqfYB4D3aqQcH4HpWAQKcD5Hgx4jbs7HCciF9-UlXn9VV6J28rAtu1W8emao&s';

  const [list, setList] = useState(data)

  useEffect(() => {
    setList(data)
  }, [data])

  const deleteProduct = async (id: string) => {
    const requestInit: RequestInit = {}
    requestInit.method = 'DELETE'
    const token = Cookie.get('admin_token')
    requestInit.headers = {
      'Authorization': `Bearer ${token}`
    }

    const res = await safeFetch(`/products/delete/${id}`, requestInit)

    console.log(res)

    if (res.success) {
      setList((prev) => prev.filter((v, i) => v._id != id))
      alert('object succesfulu delete')
    }
    else {
      alert('some problem')
    }
  }

  return (
    <>
      {list.map((item) => <AdminProductsCard id={item._id} name={item.name} discription={'discription'} imgUrl={imgUrl} handleDelete={deleteProduct} />)}
    </>
  )

}

const AdminProducts = () => {
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search);
  const tagsParam = queryParams.get('tags'); // строка или null

  // 2. Получаем путь после /products/
  const fullPath = location.pathname; // /products/computers/notebook/mac
  const subPath = fullPath.replace(/^.*\/admin\/products\/search\//, '')

  console.log('sub:' + subPath)

  const requestInit: RequestInit = {}
  requestInit.method = 'GET'

  const res = safeFetch<Product[]>(`/products/search/${subPath}`, requestInit)

  return (
    <Box>
      <AdminProductsSearch/>
      <Button component={Link} to='/admin/products/create'>Create</Button>
      <Stack width={600}>
        <DataLoaderFromPromise res={res} page={MyAdminProducts} />
      </Stack>
    </Box>
  )
}

export default AdminProducts