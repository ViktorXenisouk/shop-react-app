import { safeFetch } from "../../../../services/safeFetch"
import { getAdminToken } from "../../../../utils/getToken"
import { sanitizePayload } from "../../../../utils/sanitizePayload"

const createProduct = async (name:string,discription:string,category:string,imgs?:string[],tags?:string[]) => {
    const token = getAdminToken()
    if(!token) return {success:false,message:'cannot find your token'}

    const requestInit : RequestInit = {}

    requestInit.body = JSON.stringify(sanitizePayload({
        name,
        discription,
        category,
        imgs,
        tags,
    }))

    requestInit.headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    requestInit.method = 'POST'

    const response = await safeFetch('/products',requestInit)

    console.log(response)

    return {success:response.success,message:response.message}
}

export {createProduct}