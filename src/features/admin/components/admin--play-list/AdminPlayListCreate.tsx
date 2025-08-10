import { useParams } from "react-router-dom"
import { useAdminAuthStore } from "../../../../store/useAdmin"
import AdminPlayListCreateOrUpdateForm from "./components/AdminPlayListCreateOrUpdateForm"
import { createPlayList } from "./api"
import { Body } from "./types"

const AdminPlayListCreate = () => {
    const params = useParams()
    const store = useAdminAuthStore()

    const parentPath = params.id ? decodeURIComponent(params.id) : '#root'

    const submitHandler = async (body:Body) => {
        await createPlayList(store.token??'',body);
    }

    return (
        <AdminPlayListCreateOrUpdateForm parentPath={parentPath} onSubmit={submitHandler}/>
    )
}

export default AdminPlayListCreate