import { useParams } from "react-router-dom"
import { createCategory } from "./api"
import { useAdminAuthStore } from "../../../../store/useAdmin"
import CategoryUpdateOrCreateForm from "./components/CategoryUpdateOrCreateForm"
import { Body } from "./types"

const AdminCategoryCreate = () => {
    const params = useParams()
    const store = useAdminAuthStore()

    const parentPath = params.id ? decodeURIComponent(params.id) : '#root'

    const submitHandler = async (body:Body) => {
        await createCategory(body, store.token);
    }

    return (
        <CategoryUpdateOrCreateForm parentPath={parentPath} onSubmit={submitHandler}/>
    )
}

export default AdminCategoryCreate