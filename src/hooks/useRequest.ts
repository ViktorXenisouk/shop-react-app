import { useState, useEffect } from "react";
import { FetchHookResponse } from "../types/fetch";

const useRequest = <T>(url: string, requestInit: RequestInit): FetchHookResponse<T> => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState<T | undefined>(undefined);
    const [error, setError] = useState<{ status: number, message: string } | undefined>(undefined);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await fetch(url, requestInit);
                if (!request.ok) {
                    const json = await request.json()
                    setError({ status: json.status, message: json.message || 'Something went wrong' });
                }
                else{
                    const json = await request.json()
                    setData(json.data as T);
                }
            } catch{
                setError({status:500,message:'Network error'});
            } finally {
                setIsLoaded(true);
            }
        };

        fetchData();
    }, []);

    return [isLoaded, data, error];
};

export { useRequest }