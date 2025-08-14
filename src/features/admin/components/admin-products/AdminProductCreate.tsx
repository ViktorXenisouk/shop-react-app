import React from "react";
import AdminEditOrCreateForm from "./components/AdminEditOrCreateForm";
import { autoSaveFetch } from "../../../../services/safe-fetch";
import { ProductBody } from "./types";
import { useAdminAuthStore } from "../../../../store/useAdmin";

const AdminProductsCreate : React.FC = () => {
    const store = useAdminAuthStore()

    const onSubmit = async (body : ProductBody) => {
        const res = await autoSaveFetch(`/products/`, {token:store.token||'',body:body,method:'POST'})
    }

    return (
        <AdminEditOrCreateForm onSubmit={onSubmit}/>
    )
}

export default AdminProductsCreate
