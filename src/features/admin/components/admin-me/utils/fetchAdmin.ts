import { autoSaveFetch } from "../../../../../services/safe-fetch"
import { Admin } from "../../../../../types/admin"

const fetchAdmin = async (token:string) => {
    const result = await autoSaveFetch<Admin>('/admins/', { method: "GET", token: token || '' })

    if(result.data){
        return result.data
    }
    else{
        return null
    }
}

export {fetchAdmin}