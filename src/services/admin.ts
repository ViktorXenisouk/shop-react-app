import dotenv from "dotenv"
import * as Cookie from "../utils/cookie"
import { safeFetch } from "./safeFetch"

const loginAdmin = async (name: string, password: string) => {
    if (!name || !password) return { success: false, message: 'no name or password' }

    const body = {
        name: name,
        password: password,
    }

    const requestInit: RequestInit = {}

    requestInit.body = (JSON.stringify({
        name: name,
        password: password
    }))

    requestInit.headers = {
        'Content-Type': 'application/json'
    }

    requestInit.method = "POST"

    const response = await safeFetch<{ token: string }>('/admins/login', requestInit)
    console.log(response)

    if (response.success, response.data) {
        const token = response.data.token;

        if (token) {
            Cookie.set('admin_token', token)
            return {
                success: true,
            }
        }
        else {
            return {
                success: false,
                message: 'can not find your token'
            }
        }
    }
    else {
        return {
            success: false,
            message: response.message
        }

    }
}

export { loginAdmin }