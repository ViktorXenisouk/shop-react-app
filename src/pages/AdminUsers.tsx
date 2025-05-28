import * as Cookie from "../utils/cookie"
import { DataLoaderFromHook } from "../features/loading/Loading"
import AdminUserCard from "../features/admin/AdminUserCard"
import { useRequest } from "../hooks/useRequest"




const MyAdminUsers = ({ data }: {data: { username: string, email: string, id: string }[] }) => {
    return (
        <div>
            {data.map((item) => <AdminUserCard email={item.email} username={item.username} id={item.id} />)}
        </div>
    )
}

const AdminUsers = () => {
    const url = process.env.REACT_APP_API_URL as string
    const token = Cookie.get('admin_token')
    const requestInit: RequestInit = {}
    requestInit.method = 'GET'
    requestInit.headers = {
        'Authorization': `Bearer ${token}`
    }

    const response = useRequest<{ username: string, email: string, id: string }[]>(`${url}/admin/users`,requestInit)

    return (
        <DataLoaderFromHook page={MyAdminUsers} res={response} />
    )
}

export default AdminUsers