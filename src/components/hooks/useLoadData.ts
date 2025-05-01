import { useState, useEffect } from "react";

const useRequest = <T>(url: string, requestInit: RequestInit): [boolean, T | undefined, { status: number, message: string } | undefined] => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<{ status: number, message: string } | undefined>(undefined);
    const [data, setData] = useState<T | undefined>(undefined);

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
                    setData(json as T);
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