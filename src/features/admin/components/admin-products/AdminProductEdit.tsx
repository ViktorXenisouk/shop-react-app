import { DataLoaderFromPromise } from "../../../loading/Loading"
import { autoSaveFetch } from "../../../../services/safe-fetch"
import { useParams } from "react-router-dom"
import { Product } from "../../../../types/product"
import { useAdminAuthStore } from "../../../../store/useAdmin"
import { Box } from '@mui/material';
import { ProductBody } from "./types"
import AdminEditOrCreateForm from "./components/AdminEditOrCreateForm"

const Render = ({ data }: { data: Product }) => {

  const store = useAdminAuthStore()

  const save = async (body: ProductBody) => {
    const res = await autoSaveFetch(`/products/${data._id}`, { token: store.token || '', body: body, method: 'PATCH' })
  }

  return (
    <AdminEditOrCreateForm onSubmit={save} data={data} />
  )
}

const AdminProductsEdit = () => {
  const store = useAdminAuthStore()

  const params = useParams()

  const id = params.id as string;

  const res = autoSaveFetch<Product>(`/products/${id}`, { token: store.token || '', method: 'GET' })

  return (
    <Box>
      <DataLoaderFromPromise res={res} page={Render} />
    </Box>
  )
}

export default AdminProductsEdit