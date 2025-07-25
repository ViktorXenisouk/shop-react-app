import { safeFetch } from "../../../../services/safe-fetch"
import { sanitizePayload } from "../../../../utils/sanitizePayload";
import { Filter,FilterItem } from "../../../../types/catalog";

const ParseFilterItem = (items : FilterItem[]) => {
const filter = {} as Filter
items.forEach((item) => {
    filter[item.title] = {props:item.props,variant:item.variant}
})
return filter
}

const createCategory = async (payload: { filter: FilterItem[], parentPath: string, name: string, discription: string, path: string }, token?: string | null) => {
    const updatedPayload = payload as any
    updatedPayload.filter = ParseFilterItem(payload.filter)
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

const editCategory = async (payload: { filter: FilterItem[], name: string, discription: string, path: string },id:string, token?: string | null) => {
     const updatedPayload = payload as any
    updatedPayload.filter = ParseFilterItem(payload.filter)
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