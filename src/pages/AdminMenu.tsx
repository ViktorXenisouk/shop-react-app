import AdminMenuCard from "../features/admin/AdminMenuCard"

const AdminMenu = () => {
    
    return (
    <div>
        <AdminMenuCard name="products" href="/admin/procucts"/>
        <AdminMenuCard name="users" href="/admin/users"/>
        <AdminMenuCard name="categories" href="/admin/categories"/>
        <AdminMenuCard name="admins" href="/admin/admins"/>    
    </div>)
}

export default AdminMenu