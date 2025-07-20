import ErrorPage from "./ErrorPage";
import Basket from "./Basket";
import Main from "./Main";
import Product from "./Product"
import Products from "./Products";
import Login from "./Login";
import Register from "./Register";
import Personal from "./Personal"
import SearchPage from "./SearchPage";
import BuyProcess from "../features/buy-process/BuyProcess";

import AdminLogin from "./AdminLogin";

import {
 AdminAdmins, AdminArticle, AdminCategory, AdminProducts, AdminUsers,
    AdminAdminsCreate, AdminArticleCreate, AdminCategoryCreate, AdminProductCreate,
    AdminAdminsEdit, AdminArticleEdit, AdminCategoryEdit, AdminProductsEdit, AdminUsersEdit,
    AdminMe, AdminEditMe
}
from "../features/admin/index"

export {
    BuyProcess,
    Personal,SearchPage,
    Basket, Main, ErrorPage, Products, Product,
    Login, Register,

    AdminLogin, AdminMe, AdminEditMe,
    AdminUsers, AdminUsersEdit,
    AdminProducts, AdminProductsEdit,AdminProductCreate,
    AdminCategory, AdminCategoryCreate, AdminCategoryEdit, 
    AdminAdmins, AdminAdminsCreate,AdminAdminsEdit
}