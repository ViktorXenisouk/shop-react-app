import { useState } from "react";
import { useEffect } from "react";
import { safeFetch } from "../services/safeFetch";
import { ErrorMessage } from "../types/fetch";


const usePaginatedItems = <T>(p: number, limit: number = 10, url: string, requestInit: RequestInit): [boolean, T | null, ErrorMessage | null, React.Dispatch<React.SetStateAction<number>>, { total: number, page: number, totalPages: number } | null] => {

    const [data, setData] = useState<T | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<{ message: string, status: number } | null>(null)
    const [page, setPage] = useState(p)
    const [paginationInfo, setPaginationInfo] = useState<{ total: number, page: number, totalPages: number } | null>(null)

    const myFetch = async () => {
        setIsLoaded(false)
        setError(null)
        setData(null)
        const res = await safeFetch<T>(`${url}?page=${page}&limit=${limit}`, requestInit)

        if (res.success && res.data) {
            setData(res.data)
            setPaginationInfo(res.paginationInfo ?? null)
            setIsLoaded(true)
        }
        else {
            setPaginationInfo(null)
            setError({ message: res.message || 'some error', status: res.status || 500 })
            setIsLoaded(true)
        }
    }
    useEffect(() => {
        myFetch()
    }, [page, limit]);

    return [isLoaded, data, error, setPage, paginationInfo]
}

export { usePaginatedItems }