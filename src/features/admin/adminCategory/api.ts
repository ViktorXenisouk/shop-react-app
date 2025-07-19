import { safeFetch } from "../../../services/safeFetch"
import { Tags } from "../../input/types"
import { Tag } from "../../../types/catalog";
import { sanitizePayload } from "../../../utils/sanitizePayload";

const createCategory = async (payload: { tags: Tags[], parentPath: string, name: string, discription: string, path: string }, token?: string | null) => {
    const obj = {} as any;
    if (payload.tags && payload.tags.length > 0) {
        payload.tags.forEach((value) => {
            obj[value.name] = value.tags
        })
        payload.tags = obj
    }
    else {
        payload.tags = {} as []
    }
    payload.tags = obj
    const options: RequestInit = {}
    options.body = JSON.stringify(payload);
    options.method = "POST"
    options.headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    const res = await safeFetch('/category/create', options)
    console.log(res)
}

const editCategory = async (payload: { tags: Tag, name: string, discription: string, path: string },id:string, token?: string | null) => {
    const options: RequestInit = {}
    options.body = JSON.stringify(sanitizePayload(payload));
    options.method = "PATCH"
    options.headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    const res = await safeFetch(`/category/${id}`, options)
    console.log(res)
}

export { createCategory, editCategory }