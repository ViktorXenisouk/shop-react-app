import * as Cookie from "../../utils/cookie"
import { safeFetch } from "../../services/safeFetch"

const getResponse = () => {
    const token = Cookie.get('user_token')
    const requestInit: RequestInit = {}
    requestInit.method = 'GET'
    requestInit.headers = {
        'Authorization': `Bearer ${token}`
    }

    return safeFetch<string[]>('/user/favourite',requestInit)
}

export {getResponse}