import ErrorPage from "./ErrorPage";
import Basket from "../features/basket/Basket";
import Main from "./Main";
import Product from "../features/product/Product"
import Products from "../features/productList/Products";
import Login from "../features/login/Login";
import Register from "./Register";

import AdminLogin from "./AdminLogin";
import AdminUsers from "../features/admin/adminUsers/AdminUsers";
import AdminUsersEdit from "../features/admin/adminUsers/AdminUsersEdit";

import AdminProducts from "../features/admin/adminProducts/AdminProducts";
import AdminProductsEdit from "../features/admin/adminProducts/components/AdminProductEdit";

import AdminCategories from "../features/admin/adminCategory/AdminCategory";
import AdminCategoryCreate from "../features/admin/adminCategory/AdminCategoryCreate";
import AdminCategoryEdit from "../features/admin/adminCategory/AdminCategoryEdit"

import AdminAdmins from "../features/admin/adminAdmins/AdminAdmins";
import AdminAdminsCreate from "../features/admin/adminAdmins/AdminAdminsCreate";

import AdminEditMe from "../features/admin/adminMe/AdminEditMe";
import AdminMe from "../features/admin/adminMe/AdminMe";

export {
    Basket, Main, ErrorPage, Products, Product,
    Login, Register,
    AdminLogin, AdminMe, AdminEditMe,
    AdminUsers, AdminUsersEdit,
    AdminProducts, AdminProductsEdit,
    AdminCategories, AdminCategoryCreate, AdminCategoryEdit, 
    AdminAdmins, AdminAdminsCreate
}