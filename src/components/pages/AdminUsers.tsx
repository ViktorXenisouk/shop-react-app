import * as Cookie from "../utils/cookie"
import { Loading } from "../UI/loading/Loading"
import AdminUserCard from "../card/adminUserCard/AdminUserCard"




const MyAdminUsers = ({ data }: { data: { data: { username: string, email: string, id: string }[] } }) => {
    const d = data.data

    return (
        <div>
            {d.map((item) => <AdminUserCard email={item.email} username={item.username} id={item.id} />)}
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

    return (
        <Loading page={MyAdminUsers} url={`${url}/admin/users`} requestInit={requestInit} />
    )
}

export default AdminUsers