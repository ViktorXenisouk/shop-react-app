import { FetchResponse } from "../types/fetch";

const baseUrl = process.env.REACT_APP_API_URL as string

const safeFetch = async <T>(url: string,requestInit: RequestInit): Promise<FetchResponse<T>> => {
    try {
        const response = await fetch((baseUrl + url), requestInit);

        if (!response.ok) {
            const errorData = await response.json();
            return {
                data:{} as T,
                success: false,
                status: response.status,
                message: errorData?.message || 'Something went wrong',
            };
        }

        const data = await response.json();
        return { data: data.data as T, success: true,message:data?.message || 'ok' };
    } catch (error: any) {
        return {
            data:{} as T,
            success: false,
            status: 500,
            message: error.message || 'Network error',
        };
    }
}

export { safeFetch }