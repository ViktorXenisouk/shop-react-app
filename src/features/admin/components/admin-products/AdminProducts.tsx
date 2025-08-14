import React from "react"
import { DataLoaderFromHook } from "../../../loading/Loading"
import AdminProductsCard from "./components/AdminProductCard"
import { useSearchParams } from "react-router-dom"
import { autoSaveFetch } from "../../../../services/safe-fetch"
import { useState, useEffect } from "react"
import AdminProductsSearch from './components/AdminProductsSearch';
import { useAdminAuthStore } from "../../../../store/useAdmin"
import { Link } from "react-router-dom"
import { Box, Stack, Button, Pagination } from "@mui/material"
import { useRequest } from "../../../../hooks/useRequest"
import { Create } from "@mui/icons-material"
import {type Product } from "../../../../types/product"

const MyAdminProducts : React.FC<{data:Product[]}> = ({ data }) => {
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

const AdminProducts : React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const res = useRequest<Product[]>(`/products/search/?${searchParams.toString()}`, { method: 'GET' })

  const onChangePage = (ev: any, page: number) => {
    searchParams.set('limit', `${searchParams.get('limit') ?? 10}`)
    searchParams.set('page', `${page}`)
    setSearchParams(searchParams)
  }

  return (
    <Box>
      <AdminProductsSearch />
      <Button startIcon={<Create />} component={Link} to='/admin/products/create'>Create</Button>
      <DataLoaderFromHook res={res} page={MyAdminProducts} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination sx={{ my: '10px' }} page={parseInt(searchParams.get('page') ?? '1') ?? undefined} onChange={onChangePage} count={res[3]?.totalPages} />
      </Box>
    </Box>
  )
}

export default AdminProducts