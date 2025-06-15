import { safeFetch } from "../../../services/safeFetch"
import { getAdminToken } from "../../../utils/getToken"
import { sanitizePayload } from "../../../utils/sanitizePayload"

const createProduct = async (body:{name:string,discription:string,category:string,imgs?:string[],tags?:string[]}) => {
    const token = getAdminToken()
    if(!token) return {success:false,message:'cannot find your token'}

    const sanitized = sanitizePayload(body)

    if(!sanitized.name || !sanitized.discription || !sanitized.category)
        return {success:false,message:'empty fields'}

    const requestInit : RequestInit = {}

    requestInit.body = JSON.stringify(sanitized)

    requestInit.headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    requestInit.method = 'POST'

    const response = await safeFetch('/products',requestInit)

    return {success:response.success,message:response.message}
}

export {createProduct}