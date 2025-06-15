import { useState, useEffect } from "react";
import { FetchHookResponse } from "../types/fetch";
import { autoSaveFetch,AutoSafeFetch } from "../services/safeFetch";


const useRequest = <T>(url: string, options: AutoSafeFetch): FetchHookResponse<T> => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState<T | undefined>(undefined);
    const [error, setError] = useState<{ status: number, message: string } | undefined>(undefined);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoaded(false)
            const res = await autoSaveFetch<T>(url,options)
            setData(res.data)
            setIsLoaded(true)
        }

        fetchData();
    }, []);

    return [isLoaded, data, error];
};

export { useRequest }