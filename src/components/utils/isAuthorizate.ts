import * as Cookie from "./cookie"
import dotenv from "dotenv"

const url = process.env.server as string

const isAuthorizate = () => {
    const token = Cookie.get('user_token')

    if (!token)
        return false;

    return true
}

const isAdmin = () => {
    const token = Cookie.get('admin_token')
    if (token) return false

    return true
}