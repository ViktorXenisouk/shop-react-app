import { useState,useEffect } from "react";

const useLoadData = <T>(getData: (params?: any) => T | undefined, params?: any): [boolean, T | undefined, any] => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<any>(undefined);
    const [data, setData] = useState<T | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getData(params);
                if (result) {
                    setData(result);
                } else {
                    setError('404');
                }
            } catch (err) {
                setError(err);
            } finally {
                setIsLoaded(true);
            }
        };

        fetchData();
    }, [getData, params]); // Эффект будет выполняться, если `getData` или параметры изменятся

    return [isLoaded, data, error];
};

export { useLoadData }