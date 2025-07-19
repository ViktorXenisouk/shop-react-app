import { Route, RouteProps } from "react-router-dom";

import { AdminLogin } from "../../pages";
import AdminMe from "./adminMe/AdminMe";
import AdminEditMe from "./adminMe/AdminEditMe";

import AdminUsers from "./adminUsers/AdminUsers";
import AdminUsersEdit from "./adminUsers/AdminUsersEdit"

import AdminCategory from "./adminCategory/AdminCategory"
import AdminCategoryCreate from "./adminCategory/AdminCategoryCreate"
import AdminCategoryEdit from "./adminCategory/AdminCategoryEdit"

import AdminAdmins from "./adminAdmins/AdminAdmins"
import AdminAdminsCreate from "./adminAdmins/AdminAdminsCreate"
import AdminAdminsEdit from "./adminAdmins/AdminAdminsEdit"

import AdminProducts from "./adminProducts/AdminProducts";
import AdminProductEdit from "./adminProducts/AdminProductEdit";
import AdminProductCreate from "./adminProducts/AdminProductCreate";

import AdminArticle from "./adminArticle/AdminArticle";

const AdminRoutes = () : React.ReactElement => {

  return (
    <Route path='/admin'>
      <Route path='/admin' element={<AdminLogin />} />
      <Route path='/admin/me' element={<AdminMe />} />
      <Route path='/admin/edit' element={<AdminEditMe />} />
      <Route path='/admin/users'>
        <Route path='/admin/users/search/*' element={<AdminUsers />} />
        <Route path='/admin/users/edit/:id' element={<AdminUsersEdit />} />
      </Route>
      <Route path='/admin/categories'>
        <Route path='/admin/categories/search/*' element={<AdminCategory />} />
        <Route path='/admin/categories/create/:id' element={<AdminCategoryCreate />} />
        <Route path='/admin/categories/edit/:id' element={<AdminCategoryEdit />} />
      </Route>
      <Route path='/admin/admins'>
        <Route path='/admin/admins/search/*' element={<AdminAdmins />} />
        <Route path='/admin/admins/create' element={<AdminAdminsCreate />} />
        <Route path='/admin/admins/edit/:id' element={<AdminAdminsEdit />} />
      </Route>
      <Route path='/admin/products'>
        <Route path='/admin/products/search/*' element={<AdminProducts />} />
        <Route path='/admin/products/edit/:id' element={<AdminProductEdit />} />
        <Route path='/admin/products/create' element={<AdminProductCreate />} />
      </Route>
    </Route>
  )
}

export default AdminRoutes