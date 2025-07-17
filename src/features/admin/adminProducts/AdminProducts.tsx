import { Product } from "../../../types/product"
import { DataLoaderFromPromise } from "../../loading/Loading"
import AdminProductsCard from "./features/AdminProductCard"
import { useLocation } from "react-router-dom"
import { autoSaveFetch } from "../../../services/safeFetch"
import { useState, useEffect } from "react"
import AdminProductsSearch from './features/AdminProductsSearch';
import { useAdminAuthStore } from "../../../store/useAdmin"
import { Link } from "react-router-dom"
import { Box, Stack, Button } from "@mui/material"
import { Create } from "@mui/icons-material"

const MyAdminProducts = ({ data }: { data: Product[] }) => {
  const imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmqfYB4D3aqQcH4HpWAQKcD5Hgx4jbs7HCciF9-UlXn9VV6J28rAtu1W8emao&s';

  const [list, setList] = useState(data)

  const store = useAdminAuthStore()

  useEffect(() => {
    setList(data)
  }, [data])

  const deleteProduct = async (id: string) => {
    const res = await autoSaveFetch(`/products/delete/${id}`, { method: 'DELETE', token: store.token || '' })

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
    <Stack width='100%' spacing={1}>
      {list.map((item) => <AdminProductsCard id={item._id} name={item.name} discription={'discription'} imgUrl={imgUrl} handleDelete={deleteProduct} />)}
    </Stack>
  )

}

const AdminProducts = () => {
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search);
  const tagsParam = queryParams.get('tags'); // строка или null

  // 2. Получаем путь после /products/
  const fullPath = location.pathname; // /products/computers/notebook/mac
  const subPath = fullPath.replace(/^.*\/admin\/products\/search\//, '')

  const res = autoSaveFetch<Product[]>(`/products/search/${subPath}`, { method: 'GET' })

  return (
    <Box>
      <AdminProductsSearch />
      <Button startIcon={<Create />} component={Link} to='/admin/products/create'>Create</Button>
      <DataLoaderFromPromise res={res} page={MyAdminProducts} />
    </Box>
  )
}

export default AdminProducts