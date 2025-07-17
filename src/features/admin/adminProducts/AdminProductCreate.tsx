import AdminEditOrCreateForm from "./features/AdminEditOrCreateForm";
import { autoSaveFetch } from "../../../services/safeFetch";
import { ProductBody } from "./types";
import { useAdminAuthStore } from "../../../store/useAdmin";

const AdminProductsCreate = () => {
    const store = useAdminAuthStore()

    const onSubmit = async (body : ProductBody) => {
        const res = await autoSaveFetch(`/products/`, {token:store.token||'',body:body,method:'POST'})
    }

    return (
        <AdminEditOrCreateForm onSubmit={onSubmit}/>
    )
}

export default AdminProductsCreate
