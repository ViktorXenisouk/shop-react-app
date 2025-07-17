import { safeFetch } from "../../../services/safeFetch"
import { sanitizePayload } from "../../../utils/sanitizePayload"
import type { ImageItem } from "../../../types/Image"

const createProduct = async (body:{name:string,discription:string,category:string,imgs?:ImageItem[],tags?:string[]},token:string) => {
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

//export {createProduct}