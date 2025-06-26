import { FetchResponse } from "../types/fetch";

const baseUrl = process.env.REACT_APP_API_URL as string

const safeFetch = async <T>(url: string, requestInit: RequestInit): Promise<FetchResponse<T>> => {
    try {
        const response = await fetch((baseUrl + url), requestInit);

        if (!response.ok) {
            const errorData = await response.json();
            return {
                data: {} as T,
                success: false,
                status: response.status,
                message: errorData?.message || 'Something went wrong',
            };
        }

        const result = await response.json();
        return { data: result.data as T, success: true, message: result?.message || 'ok',paginationInfo:result?.paginationInfo };
    } catch (error: any) {
        return {
            data: {} as T,
            success: false,
            status: 500,
            message: error.message || 'Network error',
        };
    }
}

type AutoSafeFetch = {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    body?: any | string
    token?: string
}

const autoSaveFetch = async <T>(url: string, options: AutoSafeFetch, params?: { [name: string]: string }) => {

    const opt: RequestInit = {}

    opt.method = options.method || "GET"

    if (options.body) {
        if (typeof options.body === 'object')
            opt.body = JSON.stringify(options.body)
        else
            opt.body = options.body
    }

    const headers : any = {}

    if (options.token) {
        headers['Authorization'] = `Bearer ${options.token}`
    }
    if (options.body) {
        headers['Content-Type'] = 'application/json'
    }

    opt.headers = headers

    let queryString = "";
    if (params && Object.keys(params).length > 0) {
        const query = new URLSearchParams(params);
        queryString = "?" + query.toString();
    }

    return safeFetch<T>(url + queryString, opt)
}

export { safeFetch,autoSaveFetch,type AutoSafeFetch }