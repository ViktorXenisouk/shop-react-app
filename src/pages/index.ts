import Basket from "./Basket";
import Main from "./Main";
import Product from "./Product"
import Products from "./Products";
import Login from "./Login";
import Register from "./Register";
import Personal from "./Personal"
import SearchPage from "./SearchPage";
import BuyProccess from "./BuingProccess";
import PlayListPage from "./PlayListPage";
import AdminLogin from "./AdminLogin";
import NoFoundErrorPage from "./NoFoundErrorPage";

import {
 AdminAdmins, AdminArticle, AdminCategory, AdminProducts, AdminUsers,AdminPlayList,AdminPlayListCreate,AdminPlayListEdit,
    AdminAdminsCreate, AdminArticleCreate, AdminCategoryCreate, AdminProductCreate,
    AdminAdminsEdit, AdminArticleEdit, AdminCategoryEdit, AdminProductsEdit, AdminUsersEdit,
    AdminMe, AdminEditMe
}
from "../features/admin/index"

export {
    BuyProccess,
    Personal,SearchPage,
    Basket, Main, Products, Product,
    Login, Register,PlayListPage,NoFoundErrorPage,

    AdminLogin, AdminMe, AdminEditMe,
    AdminUsers, AdminUsersEdit,
    AdminProducts, AdminProductsEdit,AdminProductCreate,
    AdminCategory, AdminCategoryCreate, AdminCategoryEdit, 
    AdminAdmins, AdminAdminsCreate,AdminAdminsEdit,
    AdminPlayList,AdminPlayListCreate,AdminPlayListEdit
}